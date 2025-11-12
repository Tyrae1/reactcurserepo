import {Sidebar, Sidenav, Nav, Message, Loader, Input, SelectPicker} from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';

export default function AlbumSidebar({albums, activeId, onSelect, loading, error, query, onQueryChange, idFilter, onIdFilterChange}) {
    const idOptions = Array.from(new Set(albums.map(a=> a.id)))
        .map(id => ({label: `Album #${id}`, value: id}));

    return (
        <Sidebar width={280} collapsible>
            <Sidenav>
                <Sidenav.Body>

                   <div style={{padding: 12, borderBottom: '1px solid #eee', display: 'grid', gap: 8}}>
                        <Input
                            value={query}
                            onChange={onQueryChange}
                            placeholder="Search albums..."
                            prefix={<SearchIcon />}
                            role="searchbox"
                            />
                       <SelectPicker
                           data={idOptions}
                           value={idFilter ? Number(idFilter) : null}
                           onChange={(val) => onIdFilterChange(val ?? '')}
                           placeholder="Filter by ID"
                           cleanable
                           block
                           />
                    </div>

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