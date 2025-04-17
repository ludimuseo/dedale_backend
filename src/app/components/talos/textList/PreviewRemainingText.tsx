interface PreviewRemainingText {
  sumTextToCorrect: number
  journeysToCorrect: number
  stepsToCorrect: number
  piecesToCorrect: number
}

export default function PreviewRemainingText({
  sumTextToCorrect,
  journeysToCorrect,
  stepsToCorrect,
  piecesToCorrect,
}: PreviewRemainingText) {
  return (
    <>
      {sumTextToCorrect > 0 && (
        <p className="ml-4 rounded-xl bg-[#f8dd27] bg-opacity-50 p-4 text-xl text-[#0A184D] opacity-0 transition-opacity group-hover:opacity-100">
          Il reste à corriger :{' '}
          {journeysToCorrect
            ? `${String(journeysToCorrect)} "texte(s) Parcours `
            : ''}
          {stepsToCorrect
            ? `${String(stepsToCorrect)} "texte(s) Indice(s) d'étape, `
            : ''}
          {piecesToCorrect
            ? `${String(piecesToCorrect)} texte(s) Oeuvres. `
            : ''}
        </p>
      )}
    </>
  )
}
