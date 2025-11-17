import {Container, Header, Sidebar, Sidenav, Nav, Content} from "rsuite";
import {useState, useEffect} from "react";
import AppHeader from "../Components/AppHeader.jsx";
import AlbumSidebar from "../Components/AlbumSidebar";
import PhotoGrid from "../Components/PhotoGrid";
import PhotoModal from "../Components/PhotoModal";

function App() {
    const [albums, setAlbums] = useState([]);
    const [selectedAlbumId, setSelectedAlbumId] = useState(null);
    const [albumLoading, setAlbumLoading] = useState(false);
    const [albumError, setAlbumError] = useState(null);
    const [photosByAlbum, setPhotosByAlbum] = useState({});
    const [photosLoading, setPhotosLoading] = useState(false);
    const [photosError, setPhotosError] = useState(null);
    const [albumQuery, setAlbumQuery] = useState('');
    const [albumIdFilter, setAlbumIdFilter] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);

    const currentPhotos = selectedAlbumId ? photosByAlbum[selectedAlbumId] : [];
    const totalPhotos = currentPhotos?.length || 0;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const visiblePhotos = currentPhotos ? currentPhotos.slice(start, end) : [];

    const [modalOpen, setModalOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const controller = new AbortController();

        async function loadAlbums() {
            try {
                setAlbumLoading(true);
                setAlbumError(null);
                const res = await fetch("https://jsonplaceholder.typicode.com/albums", {
                    signal: controller.signal,
                });
                if (!res.ok) throw new Error("Failed to load albums");
                const data = await res.json();
                setAlbums(data);
                if (data.length && selectedAlbumId === null) {
                    setSelectedAlbumId(Number(data[0].id));
                }
            } catch (err) {
                if (err.name !== "AbortError") setAlbumError(err.message);
            } finally {
                setAlbumLoading(false);
            }
        }
        loadAlbums();
        return () => controller.abort();
    }, []);

    useEffect(() => {
        if (selectedAlbumId == null) return;
        if (photosByAlbum[selectedAlbumId]) return;
        
        const controller = new AbortController();
        
        async function loadPhotos() {
            try {
                setPhotosLoading(true);
                setPhotosError(null);
                
                const res = await fetch( `https://jsonplaceholder.typicode.com/photos?albumId=${selectedAlbumId}`, 
                    {signal: controller.signal }
                );
                if (!res.ok) throw new Error("Failed to load photos");
                
                const data = await res.json();

                const patched = data.map(item => ({
                    ...item,
                    thumbnailUrl: item.thumbnailUrl.replace("https://via.placeholder.com", "https://dummyimage.com"),
                    url: item.url.replace("https://via.placeholder.com", "https://dummyimage.com")
                }));

                setPhotosByAlbum(prev => ({
                    ...prev,
                    [selectedAlbumId]: patched,
                }));
            } catch (err) {
                if (err.name !== "AbortError") setPhotosError(err.message);
            } finally {
                setPhotosLoading(false);
            }
        }
        loadPhotos();
        return () => controller.abort();
    }, [selectedAlbumId]);

    useEffect(() => {
        setPage(1);
    }, [selectedAlbumId]);

    useEffect(() => {
        setActiveIndex(0);
        setModalOpen(false);
    }, [selectedAlbumId]);

    const filteredAlbums = albums.filter( a => {
        const byTitle = a.title.toLowerCase().includes(albumQuery.toLowerCase());
        const byId = albumIdFilter ? a.id === Number(albumIdFilter) : true;
        return byTitle && byId;
    });

    const handlePhotoClick = (indexInPage) => {
        setActiveIndex(start + indexInPage);
        setModalOpen(true);
    };

    const handleNext = () => {
        if (!totalPhotos) return;
        setActiveIndex(prev => (prev + 1) % totalPhotos);
    };

    const handlePrev = () => {
      if (!totalPhotos) return;
      setActiveIndex(prev => (prev - 1 + totalPhotos) % totalPhotos);
    };

    return (
        <Container style={{height:'100vh'}}>
            <AppHeader />
            <Container>
            <AlbumSidebar
                albums={filteredAlbums}
                activeId={selectedAlbumId}
                onSelect={(id) => setSelectedAlbumId(Number(id))}
                query = {albumQuery}
                onQueryChange = {setAlbumQuery}
                idFilter = {albumIdFilter}
                onIdFilterChange = {setAlbumIdFilter}
                loading={albumLoading}
                error={albumError}
            />
                <Content style={{padding: 20}}>
                    <h3>
                        {selectedAlbumId
                            ? `Photos for album ID: ${selectedAlbumId}`
                            : `Select an album`}
                    </h3>
                    {selectedAlbumId && (
                        <PhotoGrid
                            photos={visiblePhotos}
                            loading={photosLoading}
                            error={photosError}
                            page={page}
                            pageSize={pageSize}
                            total={totalPhotos}
                            onPageChange={setPage}
                            onPhotoClick={handlePhotoClick}
                            />
                    )}
                    {modalOpen && currentPhotos && currentPhotos.length > 0 && (
                        <PhotoModal
                            open={modalOpen}
                            photos={currentPhotos[activeIndex]}
                            title={currentPhotos[activeIndex]?.title}
                            index={activeIndex}
                            total={currentPhotos.length}
                            onClose={() => setModalOpen(false)}
                            onNext={handleNext}
                            onPrev={handlePrev}
                            />
                    )}
                    </Content>
        </Container>
        </Container>
    );
}

export default App;
