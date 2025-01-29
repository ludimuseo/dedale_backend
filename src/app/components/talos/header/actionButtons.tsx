import { useState } from 'react'

interface ActionButtonsProps {
  imageIcon: string
  image: string[] | undefined
}

const ActionButtons = ({ imageIcon, image }: ActionButtonsProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="flex flex-row items-center">
      <span
        className="mr-4 font-inclusive text-blue-950"
        onMouseEnter={() => {
          setIsHovered(false)
        }}
        onMouseLeave={() => {
          setIsHovered(false)
        }}>
        Image 👉
      </span>
      <button
        className="btn btn-circle btn-lg flex h-10 w-10 items-center justify-center rounded-full bg-white shadow"
        onClick={() => {
          setSelectedImage(image ? image[0] : imageIcon)
        }}>
        <img
          src={image ? image[0] : imageIcon}
          alt="Image"
          className="h-16 w-16 rounded-full"
        />
      </button>

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
      {isHovered && image && (
        <div className="w-128 absolute left-40 top-10 mt-2 rounded-md border-4 border-sky-950 bg-black shadow-md">
          <img
            src={image[0]}
            alt="Aperçu"
            className="h-auto w-full rounded-md"
          />
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
