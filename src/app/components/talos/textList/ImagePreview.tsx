interface ImagePreviewProps {
  label: string
  img: string
  id: string
  fetch: (id: string) => void
  instruction: string
}

export default function ImagePreview({
  label,
  img,
  fetch,
  id,
  instruction,
}: ImagePreviewProps) {
  return (
    <div className="mb-2 flex gap-5">
      <div className="avatar">
        <div className="w-16 rounded-xl">
          <img src={img} />
        </div>
      </div>
      <button
        onMouseOver={() => {
          fetch(id)
        }}
        className="duration-5 rounded-xl border-2 border-[#0A184D] bg-[#0A184D] px-6 py-4 text-xl text-white transition-all hover:border-2 hover:border-[#0A184D] hover:bg-[#ffffff] hover:text-[#0A184D]"
        aria-label={`Voir les étapes pour ${label}`}>
        {instruction}
      </button>
    </div>
  )
}
