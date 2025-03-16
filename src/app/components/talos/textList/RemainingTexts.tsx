interface RemainingTextsProps {
  placesToCorrect: number
  journeysToCorrect: number
  stepsToCorrect: number
  piecesToCorrect: number
}

export default function RemainingTexts({
  placesToCorrect,
  journeysToCorrect,
  stepsToCorrect,
  piecesToCorrect,
}: RemainingTextsProps) {
  return (
    <div className="rounded-xl border-4 border-[#0A184D] bg-[#f8dd27] bg-opacity-50 px-6 py-4">
      <p className="text-xl leading-[2rem]">
        Textes de Lieux à corriger : {placesToCorrect}
      </p>
      <p className="text-xl leading-[2rem]">
        Textes de Parcours à corriger : {journeysToCorrect}
      </p>
      <p className="text-xl leading-[2rem]">
        Textes d'Indices d'étapes à corriger : {stepsToCorrect}
      </p>
      <p className="text-xl leading-[2rem]">
        Textes d'œuvres à corriger : {piecesToCorrect}
      </p>
    </div>
  )
}
