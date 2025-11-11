import {Container, Header, Sidebar, Sidenav, Nav, Content} from "rsuite";
import {useState, useEffect} from "react";
import AppHeader from "../Components/AppHeader.jsx";
import AlbumSidebar from "../Components/AlbumSidebar";
import PhotoGrid from "../Components/PhotoGrid";

function App() {
    const [albums, setAlbums] = useState([]);
    const [selectedAlbumId, setSelectedAlbumId] = useState(null);
    const [albumLoading, setAlbumLoading] = useState(false);
    const [albumError, setAlbumError] = useState(null);
    const [photosByAlbum, setPhotosByAlbum] = useState({});
    const [photosLoading, setPhotosLoading] = useState(false);
    const [photosError, setPhotosError] = useState(null);
    const currentPhotos = selectedAlbumId ? photosByAlbum[selectedAlbumId] : [];

    useEffect(() => {
        let cancelled = false;
        setAlbumLoading(true);
        setAlbumError(null);

        fetch(`https://jsonplaceholder.typicode.com/albums`)
            .then(r => (r.ok ? r.json() : Promise.reject(new Error('Failed to load album'))))
            .then(data => {
                if (cancelled) return;
                setAlbums(data);
                if (data.length && selectedAlbumId === null) {
                    setSelectedAlbumId(Number(data[0].id));
                }
            })
            .catch(err => !cancelled && setAlbumError(err.message))
            .finally(() => !cancelled && setAlbumLoading(false));
        return () => {cancelled = true;};
    }, []);
    useEffect(() => {
        if (selectedAlbumId === null) return;
        if (photosByAlbum[selectedAlbumId]) return;
        let cancelled = false;
        setPhotosLoading(true);
        setPhotosError(null);
        fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${selectedAlbumId}`)
            .then(r => (r.ok ? r.json() : Promise.reject(new Error('Failed to load photos'))))
            .then(data => {
                console.log('Fetched photos raw:', data?.length, data?.[0]);
                if (cancelled) return;
                const patched = data.map(p => ({
                    ...p,
                    thumbnailUrl: p.thumbnailUrl.replace('via.placeholder.com', 'placehold.co'),
                    url: p.url.replace('via.placeholder.com', 'placehold.co'),
                }));
                console.log('patched thumb:', patched?.[0]?.thumbnailUrl);

                setPhotosByAlbum(prev => ({...prev, [selectedAlbumId]: patched}));
            })
            .catch(err => !cancelled && setPhotosError(err.message))
            .finally(() => !cancelled && setPhotosLoading(false));
        return () => {cancelled = true;}
    }, [selectedAlbumId, photosByAlbum]);

    return (
        <Container style={{height:'100vh'}}>
            <AppHeader />
            <Container>
            <AlbumSidebar
                albums={albums}
                activeId={selectedAlbumId}
                onSelect={(id) => setSelectedAlbumId(Number(id))}
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
                            photos={currentPhotos}
                            loading={photosLoading}
                            error={photosError}
                            />
                    )}
                    </Content>
        </Container>
        </Container>
    );
}

export default App;
