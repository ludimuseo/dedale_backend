interface AddDocumentTypeProps {
<<<<<<< HEAD
    isSending: boolean
    handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
    imgName: string | undefined
    label: string
}

export default function AddDocument({ handleImageUpload, imgName, label, isSending }: AddDocumentTypeProps) {
    return (
        <div className="mt-3">
            <input
                disabled={isSending}
                type="file"
                onChange={handleImageUpload}
                className="hidden"
                id="imageUpload"
            />
            <label
                htmlFor="imageUpload"
                className={`cursor-pointer rounded-md px-4 py-2 text-white ${isSending
                    ? 'bg-gray-500 hover:bg-gray-600 focus:ring focus:ring-gray-300 focus:ring-opacity-50'
                    : 'bg-blue-500 hover:bg-blue-600'
                    }`}
            //className='cursor-pointer rounded-md px-4 py-2 text-white bg-gray-500 hover:bg-gray-600 focus:ring focus:ring-gray-300 focus:ring-opacity-50'
            >
                {label}
            </label>
            {imgName && (
                <p className="mt-1 text-sm text-gray-600">{imgName}</p>
            )}
        </div>
    )
}
=======
  isSending: boolean
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  imgName: string
  label: string
}

export default function AddDocument({
  handleImageUpload,
  imgName,
  label,
  isSending,
}: AddDocumentTypeProps) {
  return (
    <div className="mt-3">
      <input
        disabled={isSending}
        type="file"
        onChange={handleImageUpload}
        className="hidden"
        id="imageUpload"
      />
      <label
        htmlFor="imageUpload"
        // className={`cursor-pointer rounded-md px-4 py-2 text-white ${isSending
        //   ? 'bg-gray-500 hover:bg-gray-600 focus:ring focus:ring-gray-300 focus:ring-opacity-50'
        //   : 'bg-blue-500 hover:bg-blue-600'
        //   }`}
        className="cursor-pointer rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 focus:ring focus:ring-gray-300 focus:ring-opacity-50">
        {label}
      </label>
      {imgName && <p className="mt-1 text-sm text-gray-600">{imgName}</p>}
    </div>
  )
}
>>>>>>> 4b8eaba4 (:bug:fix(getDashboard): fix bug)
