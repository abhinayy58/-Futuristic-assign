
import { useDrag } from 'react-dnd'
import { ItemTypes } from '../dnd/types'

function Tool({ type, label }){
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TOOL,
    item: { type },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }))
  return <div ref={drag} className="toolbar-item" style={{opacity:isDragging?0.5:1}}>{label}</div>
}

export default function Toolbar({ onAdd, preview }){
  return (
    <div className="space-y-3">
      <h3 className="font-semibold mb-2">Components</h3>
      <div className="grid grid-cols-2 gap-2">
        <Tool type="text" label="Text" />
        <Tool type="image" label="Image" />
        <Tool type="button" label="Button" />
      </div>
      {!preview && (
        <div className="pt-2 text-sm text-gray-600">
          Or click to add:
          <div className="mt-2 flex gap-2">
            <button className="btn-outline" onClick={()=>onAdd('text')}>+ Text</button>
            <button className="btn-outline" onClick={()=>onAdd('image')}>+ Image</button>
            <button className="btn-outline" onClick={()=>onAdd('button')}>+ Button</button>
          </div>
        </div>
      )}
    </div>
  )
}
