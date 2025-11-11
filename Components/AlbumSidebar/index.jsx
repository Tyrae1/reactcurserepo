import {Sidebar, Sidenav, Nav, Message, Loader} from 'rsuite';

export default function AlbumSidebar({albums, activeId, onSelect, loading, error}) {
    return (
        <Sidebar width={280} collapsible>
            <Sidenav>
                <Sidenav.Body>
                    {loading && (
                        <div style={{padding: 12}}>
                            <Loader center content="Loading albums..." />
                        </div>
                    )}
                    {error && (
                        <div style={{padding: 12}}>
                            <Message type='error' showIcon>
                                {error}
                            </Message>
                        </div>
                    )}
                    {!loading && !error && (
                        <Nav
                            activeKey={activeId}
                            onSelect={(k) => onSelect(Number(k))}
                        >
                            {albums.map(album => (
                                <Nav.Item key={album.id} eventKey={album.id}>
                                    {album.title}
                                </Nav.Item>
                            ))}
                        </Nav>
                    )}
                </Sidenav.Body>
            </Sidenav>
        </Sidebar>
    );
}