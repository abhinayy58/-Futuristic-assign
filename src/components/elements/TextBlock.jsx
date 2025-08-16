
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.bubble.css'

export default function TextBlock({ el, selected, onSelect, update, preview }){
  const modules = { toolbar: !preview ? [['bold','italic','underline'], [{'size': []}], [{'align': []}], ['clean']] : false }
  return (
    <div className={"relative rounded-lg " + (selected && !preview ? 'ring-2 ring-blue-400' : '')} onClick={onSelect}>
      {!preview ? (
        <ReactQuill theme="bubble" value={el.props.html} onChange={(v)=>update({ props: { html: v }})} modules={modules} />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: el.props.html }} />
      )}
      <style>{`.ql-editor { font-size: ${el.style.fontSize || 16}px; text-align: ${el.style.textAlign || 'left'}; padding: ${el.style.padding || 0}px; }`}</style>
    </div>
  )
}
