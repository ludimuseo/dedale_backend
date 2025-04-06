interface TextPreviewProps {
  description: string
}

export default function TextPreview({ description }: TextPreviewProps) {
  return (
    <>
      <p className="mb-5 text-xl">
        {description.length > 100
          ? `${description.slice(0, 150)}...`
          : description}
      </p>
    </>
  )
}
