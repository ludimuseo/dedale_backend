import { forwardRef } from 'react'

import { DescriptionType } from '@/types'
interface MainTextAreaProps {
  descriptions: DescriptionType[]
  handleAddDescription: (
    id: number,
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void
  language: string | undefined
  isFalc: boolean
}
const MainTextArea = forwardRef<HTMLTextAreaElement, MainTextAreaProps>(
  ({ descriptions, handleAddDescription, isFalc }, ref) => {
    const desc = descriptions[0] // comme on passe un seul desc à la fois

    return (
      <>
        <label className="font-inclusive text-2xl">
          {isFalc ? 'Texte FALC' : 'Texte Standard'}
        </label>
        <div className="border-stroke shadow-defaul dark:bg-boxdark ml-2 mt-1 flex w-screen flex-row rounded-lg border">
          <textarea
            name="description"
            ref={ref}
            id={String(desc.id)}
            className="textarea textarea-bordered w-full font-inclusive text-xl"
            placeholder="Inscrivez votre texte"
            rows={10}
            value={desc.text}
            onChange={(event) => {
              handleAddDescription(desc.id, event)
            }}></textarea>
        </div>
      </>
    )
  }
)

export default MainTextArea
