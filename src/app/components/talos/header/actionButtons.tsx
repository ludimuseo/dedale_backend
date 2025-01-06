interface ActionButtonsProps {
  imageIcon: string
  zoomIconLess: string
  zoomIconMore: string
  image: string[] | undefined
}

const ActionButtons = ({
  imageIcon,
  zoomIconLess,
  zoomIconMore,
  image,
}: ActionButtonsProps) => {
  return (
    <div className="flex space-x-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow hover:bg-gray-100">
        <img
          src={image ? image[0] : imageIcon}
          alt="Image"
          className="h-10 w-10 rounded-full"
        />
      </div>
      {
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Hello!</h3>
            <p className="py-4">
              Press ESC key or click the button below to close
            </p>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Fermer</button>
              </form>
            </div>
          </div>
        </dialog>
      }
      <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow hover:bg-gray-100">
        <img src={zoomIconLess} alt="rechercher" className="h-10 w-10" />
      </button>
      <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow hover:bg-gray-100">
        <img src={zoomIconMore} alt="zoomer" className="h-10 w-10" />
      </button>
    </div>
  )
}

export default ActionButtons
