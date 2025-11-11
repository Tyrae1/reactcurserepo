import {Message, Loader} from 'rsuite';

export default function PhotoGrid({photos, loading, error}) {
    if (loading) return <Loader center content="Loading photos..."/>;
    if (error) return <Message type="error" showIcon>{error}</Message>;
    if (!photos?.length) return <Message>There is no photos for this album.</Message>;
    return (
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12}}>
            {photos.map(p=> (
                <div key={p.id} style={{border: '1px solid #eee', padding: 8, borderRadius: 8}}>
                <img src={p.thumbnailUrl} alt={p.title} style={{width:'100%', display: 'block'}}/>
                    <div style={{fontSize: 12, marginTop: 6}}>{p.title}</div>
                </div>
            ))}
        </div>
    );
}