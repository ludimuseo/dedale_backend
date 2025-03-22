export default function FileUploadArea() {
  return (
    <div className="flex flex-col">
      {/* <img
                        src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                        className="max-w-16 rounded-lg shadow-2xl" /> */}
      <p className="mb-2 font-inclusive">Télécharger l'image</p>

      <input
        type="file"
        className="file-input file-input-bordered w-full max-w-xs"
      />

      <p className="mb-2 font-inclusive">Télécharger l'audio</p>
      <input
        type="file"
        className="file-input file-input-bordered w-full max-w-xs"
      />
    </div>
  )
}
