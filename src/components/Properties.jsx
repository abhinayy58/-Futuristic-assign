function Properties({ element, onChange, onRemove }) {
  if (!element) return null;
  const { type, props, style } = element;
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Selected: <span className="font-medium">{type}</span>
        </div>
        <button className="btn-outline" onClick={onRemove}>
          Remove
        </button>
      </div>
      {type === "text" && (
        <label className="block text-sm">
          Font size (px)
          <input
            className="mt-1 w-full border rounded px-3 py-2"
            type="number"
            min="10"
            max="72"
            value={style.fontSize || 16}
            onChange={(e) =>
              onChange({ style: { fontSize: Number(e.target.value) } })
            }
          />
        </label>
      )}
      {type === "image" && (
        <>
          <label className="block text-sm">
            Width (px)
            <input
              className="mt-1 w-full border rounded px-3 py-2"
              type="number"
              min="50"
              max="1200"
              value={props.width || 300}
              onChange={(e) =>
                onChange({ props: { width: Number(e.target.value) } })
              }
            />
          </label>
          <label className="block text-sm">
            Alt text
            <input
              className="mt-1 w-full border rounded px-3 py-2"
              type="text"
              value={props.alt || ""}
              onChange={(e) => onChange({ props: { alt: e.target.value } })}
            />
          </label>
        </>
      )}
      {type === "button" && (
        <label className="block text-sm">
          Label
          <input
            className="mt-1 w-full border rounded px-3 py-2"
            type="text"
            value={props.label || ""}
            onChange={(e) => onChange({ props: { label: e.target.value } })}
          />
        </label>
      )}
      <div className="grid grid-cols-2 gap-2">
        <label className="block text-sm">
          Padding (px)
          <input
            className="mt-1 w-full border rounded px-3 py-2"
            type="number"
            min="0"
            max="64"
            value={style.padding || 0}
            onChange={(e) =>
              onChange({ style: { padding: Number(e.target.value) } })
            }
          />
        </label>
        <label className="block text-sm">
          Text Align
          <select
            className="mt-1 w-full border rounded px-3 py-2"
            value={style.textAlign || "left"}
            onChange={(e) => onChange({ style: { textAlign: e.target.value } })}
          >
            <option>left</option>
            <option>center</option>
            <option>right</option>
            <option>justify</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export default Properties;