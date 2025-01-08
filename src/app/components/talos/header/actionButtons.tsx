import { useState } from 'react'

interface ActionButtonsProps {
  imageIcon: string
  image: string[] | undefined
}

const ActionButtons = ({ imageIcon, image }: ActionButtonsProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <div className="flex space-x-4">
      <span className="flex items-center text-xl">Image:</span>
      <button
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow"
        onClick={() => {
          setSelectedImage(image ? image[0] : imageIcon)
        }}>
        <img
          src={image ? image[0] : imageIcon}
          alt="Image"
          className="h-10 w-10 rounded-full"
        />
      </button>
      <div
        role="tooltip"
        aria-label="Cliquez pour afficher"
        className="absolute bottom-full left-1/2 hidden -translate-x-1/2 transform whitespace-nowrap rounded-md bg-yellow-300 px-3 py-1 text-sm text-black shadow-lg group-hover:block">
        Cliquez pour afficher
      </div>
      {selectedImage && (
        <div className="modal modal-open" role="dialog">
          <div className="modal-box relative">
            <button
              className="btn btn-circle btn-primary btn-sm absolute right-2 top-2"
              onClick={() => {
                setSelectedImage(null)
              }}>
              <span className="font-extrabold text-stone-50">✕</span>
            </button>
            <img
              src={selectedImage}
              alt="Zoomed"
              className="h-auto w-full rounded-lg"
            />
          </div>
        </div>
      )}

      {/* <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow hover:bg-gray-100">
                <img src={zoomIconLess} alt="rechercher" className="h-10 w-10" />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow hover:bg-gray-100">
                <img src={zoomIconMore} alt="zoomer" className="h-10 w-10" />
            </button> */}
    </div>
  )
}

export default ActionButtons
