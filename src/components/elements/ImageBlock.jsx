
export default function ImageBlock({ el, selected, onSelect, update, preview }){
  function onFile(e){
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => update({ props: { src: reader.result } })
    reader.readAsDataURL(file)
  }
  return (
    <div className={"relative rounded-lg p-2 " + (selected && !preview ? 'ring-2 ring-blue-400' : '')} onClick={onSelect}>
      {el.props.src ? (
        <img src={el.props.src} alt={el.props.alt || ''} style={{ width: el.props.width || 300 }} />
      ) : !preview ? (
        <label className="block text-sm text-gray-600"><input type="file" accept="image/*" onChange={onFile} /></label>
      ) : (
        <div className="text-gray-500">No image</div>
      )}
      <div style={{ textAlign: el.style.textAlign || 'left', padding: el.style.padding || 0 }} />
    </div>
  )
}
