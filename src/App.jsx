
import { useCallback, useMemo, useState, useEffect } from 'react'
import Properties from './components/Properties'
import Toolbar from './components/Toolbar'
import Canvas from './components/Canvas'

export default function App(){
  const [elements, setElements] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [preview, setPreview] = useState(false)
  const [canvasBg, setCanvasBg] = useState('#ffffff')

  const addElement = useCallback((type) => {
    const id = crypto.randomUUID()
    const base = { id, type, style: {}, props: {} }
    if (type === 'text') base.props = { html: '<p>Edit me</p>' }
    if (type === 'image') base.props = { src: '', alt: 'Image', width: 300 }
    if (type === 'button') base.props = { label: 'Click me' }
    setElements(prev => [...prev, base])
    setSelectedId(id)
  }, [])

  const updateElement = useCallback((id, patch) => {
    setElements(prev => prev.map(e => e.id === id ? { ...e, ...patch, props:{...e.props, ...(patch.props||{})}, style:{...e.style, ...(patch.style||{})} } : e))
  }, [])

  const removeElement = useCallback((id) => {
    setElements(prev => prev.filter(e => e.id !== id))
    if (selectedId === id) setSelectedId(null)
  }, [selectedId])

  useEffect(()=>{
    const handler = (e)=> addElement(e.detail.type)
    window.addEventListener('add-element', handler)
    return ()=> window.removeEventListener('add-element', handler)
  }, [addElement])

  useEffect(() => {
    const saved = localStorage.getItem("builder-state");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.elements) setElements(parsed.elements);
        if (parsed.canvasBg) setCanvasBg(parsed.canvasBg);
      } catch (err) {
        console.error("Failed to parse saved state", err);
      }
    }
  }, []);


  useEffect(() => {
    localStorage.setItem(
      "builder-state",
      JSON.stringify({ elements, canvasBg })
    );
  }, [elements, canvasBg]);



  const serialized = useMemo(()=> JSON.stringify({ canvasBg, elements }, null, 2), [canvasBg, elements])

  function downloadJson(){
    const blob = new Blob([serialized], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'page.json'; a.click(); URL.revokeObjectURL(url)  
  }

  return (
    <div className="bg-[#FBFBFB]">
      <div className="min-h-screen">
        <header className="px-4 py-3 border-b bg-[#0077cc] sticky top-0 z-10">
          <div className="max-w-6xl mx-auto flex items-center gap-3">
            <h1 className="text-xl font-semibold">Futuractic Assignment</h1>
            <div className="ml-auto flex items-center gap-2">
              <label className="flex items-center gap-2 text-sm">
                Canvas BG
                <input
                  type="color"
                  value={canvasBg}
                  onChange={(e) => setCanvasBg(e.target.value)}
                />
              </label>
              <button className="btn-outline" onClick={downloadJson}>
                Export JSON
              </button>
              <button
                className="btn-outline"
                onClick={() => {
                  setElements([]);
                  setCanvasBg("#ffffff");
                  localStorage.removeItem("builder-state");
                }}
              >
                Clear
              </button>
              <button className="btn" onClick={() => setPreview((p) => !p)}>
                {preview ? "Back to Design" : "Preview"}
              </button>
            </div>
          </div>
        </header>
        <main className="max-w-6xl mx-auto p-4 grid grid-cols-12 gap-4">
          <aside className="col-span-12 md:col-span-3 space-y-3">
            <div className="card">
              <Toolbar preview={preview} onAdd={addElement} />
            </div>
            {!preview && selectedId && (
              <div className="card space-y-3">
                <h3 className="font-semibold">Properties</h3>
                <Properties
                  element={elements.find((e) => e.id === selectedId)}
                  onChange={(patch) => updateElement(selectedId, patch)}
                  onRemove={() => removeElement(selectedId)}
                />
              </div>
            )}
          </aside>
          <section className="col-span-12 md:col-span-9">
            <div className="card">
              <Canvas
                elements={elements}
                setSelectedId={setSelectedId}
                selectedId={selectedId}
                updateElement={updateElement}
                preview={preview}
                bg={canvasBg}
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

