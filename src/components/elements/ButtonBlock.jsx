
export default function ButtonBlock({ el, selected, onSelect, update, preview }){
  return (
    <div className={"relative inline-block " + (selected && !preview ? 'ring-2 ring-blue-400 rounded' : '')} onClick={onSelect}
      style={{ textAlign: el.style.textAlign || 'left', padding: el.style.padding || 0 }}
    >
      {!preview ? (
        <input className="px-4 py-2 rounded-lg bg-blue-600 text-white" value={el.props.label || ''} onChange={e=>update({ props: { label: e.target.value }})} />
      ) : (
        <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">{el.props.label || 'Click'}</button>
      )}
    </div>
  )
}
