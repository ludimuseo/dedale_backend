interface FlagLanguageProps {
  language: string
}

export default function FlagLanguage({ language }: FlagLanguageProps) {
  return (
    <div>
      {language === 'fr' ? (
        <svg width="32" height="24" viewBox="0 0 16 16" className="scale-150">
          <rect width="5" height="16" fill="#002654" />
          <rect x="5" width="6" height="16" fill="#FFFFFF" />
          <rect x="11" width="5" height="16" fill="#ED2939" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 16 16">
          <rect width="16" height="16" fill="#FFFFFF" />
          <rect y="7" width="16" height="2" fill="#C8102E" />
          <rect x="7" width="2" height="16" fill="#C8102E" />
        </svg>
      )}
    </div>
  )
}
