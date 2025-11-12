import {Message, Placeholder, Pagination, Loader} from 'rsuite';

export default function PhotoGrid({photos, loading, error, page, pageSize, total, onPageChange}) {
    if (error) return <Message type="error" showIcon>{error}</Message>;
    if (loading) {
        const skeleton = Array.from({length: 12});
        return (
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12}}>
                {skeleton.map((_, i) => (
                    <div key={i} style={{border: '1px solid #eee', padding: 8, borderRadius: 8}}>
                        <Placeholder.Graph active height={120}/>
                        <div style={{marginTop: 6}}>
                            <Placeholder.Paragraph active rows={2}/>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
    if (!photos?.length) return <Message>There is no photos for this album.</Message>;

    return (
        <div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12}}>
            {photos.map(p=> (
                <div key={p.id} style={{border: '1px solid #eee', padding: 8, borderRadius: 8}}>
                <img src={p.thumbnailUrl} alt={p.title} style={{width:'100%', display: 'block'}} referrerPolicy="no-referrer"/>
                    <div style={{fontSize: 12, marginTop: 6}}>{p.title}</div>
                </div>
            ))}
        </div>
    {total > pageSize && (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: 16}}>
            <Pagination
                total={total}
                limit={pageSize}
                activePage={page}
                onChangePage={onPageChange}
                layout={['total', '-', 'pager']}
                prev
                next
                />
        </div>
    )}
    </div>
    );
}