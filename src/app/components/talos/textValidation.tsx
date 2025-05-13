interface TextValidationProps {
  sentence: string[]
  title: string
  onValidationClick: () => void
  version: string
}

interface VersionMap {
  divider: string
  title: string
  text: string
  wrapper: string
}

export const TextValidation = ({
  sentence,
  title,
  onValidationClick,
  version,
}: TextValidationProps) => {
  const versionMaps: Record<string, VersionMap> = {
    standard: {
      divider: 'border-[#0a184d]',
      title: 'text-[#0a184d]',
      text: 'text-[#0a184d]',
      wrapper: 'bg-white',
    },
    falc: {
      divider: 'border-[#0a184d]',
      title: 'text-[#0a184d]',
      text: 'text-[#0a184d]',
      wrapper: 'bg-[#F4FDFF]',
    },
    falcCertified: {
      divider: 'border-white',
      title: 'text-white',
      text: 'text-white',
      wrapper: 'bg-[#0a184d]',
    },
  }

  const versionStyles = versionMaps[version] ?? versionMaps.standard
  return (
    <div
      className={`flex max-w-xl flex-col items-center gap-4 rounded-[20px] border border-solid border-[#0a184d] p-5 drop-shadow-md ${versionStyles.wrapper}`}>
      <h1 className={`text-3xl font-bold ${versionStyles.title}`}>{title}</h1>
      <hr className={`w-full ${versionStyles.divider}`} />
      <div className="flex flex-col text-justify">
        {sentence.map((sentence, index) => (
          <p
            key={`sentence-${index.toString()}`}
            className={`font-inclusive text-xl leading-[2] ${versionStyles.text}`}>
            <span className="text-sm">{index + 1}</span>
            {'. '}
            {sentence}
          </p>
        ))}
      </div>
      {version === 'falcCertified' && (
        <button className="btn btn-primary" onClick={onValidationClick}>
          Modifier
        </button>
      )}
    </div>
  )
}
