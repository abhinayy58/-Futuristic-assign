
import { useCallback } from 'react'
import { useDrop } from 'react-dnd'
import { ItemTypes } from '../dnd/types'
import TextBlock from './elements/TextBlock'
import ImageBlock from './elements/ImageBlock'
import ButtonBlock from './elements/ButtonBlock'

export default function Canvas({ elements, setSelectedId, selectedId, updateElement, preview, bg }){
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.TOOL,
    drop: (item) => window.dispatchEvent(new CustomEvent('add-element', { detail: { type: item.type } })),
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  }))

  const render = useCallback((el) => {
    const common = { el, selected: selectedId===el.id, onSelect:()=>setSelectedId(el.id), update:(patch)=>updateElement(el.id, patch), preview }
    if (el.type === 'text') return <TextBlock key={el.id} {...common} />
    if (el.type === 'image') return <ImageBlock key={el.id} {...common} />
    if (el.type === 'button') return <ButtonBlock key={el.id} {...common} />
    return null
  }, [selectedId, setSelectedId, updateElement, preview])

  return (
    <div ref={drop} className="min-h-[60vh] rounded-xl border-2 border-dashed p-6"
      style={{ backgroundColor: bg, borderColor: isOver ? '#3b82f6' : '#e5e7eb' }}
      onMouseDown={(e)=>{ if(e.target === e.currentTarget) setSelectedId(null) }}
    >
      <div className="space-y-4">
        {elements.length === 0 && <div className="text-gray-500 text-center py-20">Drag components here or use the toolbar buttons.</div>}
        {elements.map(render)}
      </div>
    </div>
  )
}
