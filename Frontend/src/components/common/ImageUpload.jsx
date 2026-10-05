import { useEffect, useMemo, useRef } from "react";
import toast from "react-hot-toast";
import { FiImage, FiTrash2, FiUpload } from "react-icons/fi";

const MAX_SIZE = 10 * 1024 * 1024; // 10 MB (same limit as the API)

const ImageUpload = ({
  label = "Image",
  currentUrl = "",
  file,
  onFile,
  removed = false,
  onRemove,
  required = false,
  shape = "rect",
}) => {
  const inputRef = useRef(null);
  const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : ""), [file]);

  useEffect(() => () => previewUrl && URL.revokeObjectURL(previewUrl), [previewUrl]);

  const shown = previewUrl || (removed ? "" : currentUrl);

  const handleChange = (e) => {
    const picked = e.target.files?.[0];
    e.target.value = "";
    if (!picked) return;

    if (!picked.type.startsWith("image/")) return toast.error("Please choose an image file");
    if (picked.size > MAX_SIZE) return toast.error("Image is too large (max 10MB)");
    onFile(picked);
  };

  return (
    <div>
      <span className="label-admin">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      <div className="flex items-center gap-4">
        <div
          className={`flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden border border-dashed border-slate-300 bg-slate-50 text-slate-400 ${
            shape === "round" ? "rounded-full" : "rounded-xl"
          }`}
        >
          {shown ? (
            <img src={shown} alt="Preview" className="h-full w-full object-cover" />
          ) : (
            <FiImage size={28} />
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => inputRef.current?.click()} className="btn-admin-ghost">
            <FiUpload size={16} />
            {shown ? "Change" : "Upload"}
          </button>
          {shown && !required && (
            <button
              type="button"
              onClick={() => {
                onFile(null);
                onRemove?.();
              }}
              className="btn-admin-ghost text-red-600"
            >
              <FiTrash2 size={16} />
              Remove
            </button>
          )}
        </div>
        <input ref={inputRef} type="file" accept="image/*" onChange={handleChange} className="hidden" />
      </div>
    </div>
  );
};

export default ImageUpload;