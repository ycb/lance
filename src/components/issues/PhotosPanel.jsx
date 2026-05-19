// src/components/issues/PhotosPanel.jsx
// 2-column photo grid. Each card: emoji placeholder + caption (filename · uploader · time).
// Photos are thread items with hasPhoto: true from the original thread format,
// or a flat photos array passed in.

export function PhotosPanel({ photos = [] }) {
  return (
    <div style={{ background: 'white', padding: '10px 12px', overflowY: 'auto', height: '100%' }}>
      {photos.length === 0 ? (
        <p style={{ fontSize: 11, color: '#9ca3af', textAlign: 'center', marginTop: 20 }}>No photos yet.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
          {photos.map(photo => (
            <div key={photo.id} style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ height: 80, background: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>
                {photo.photoEmoji || '📷'}
              </div>
              <div style={{ padding: '5px 7px' }}>
                <p style={{ fontSize: 9, fontWeight: 600, color: '#374151', marginBottom: 1 }}>{photo.photoCaption || 'Photo'}</p>
                <p style={{ fontSize: 9, color: '#9ca3af' }}>{photo.name} · {photo.time}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <button style={{ width: '100%', background: 'white', color: '#6b7280', border: '1px dashed #d1d5db', borderRadius: 8, padding: 7, fontSize: 11, marginTop: 4 }}>
        + Add Photo
      </button>
    </div>
  )
}
