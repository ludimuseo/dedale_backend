import { forwardRef } from 'react'

import { Description } from './Description'

interface MainTextAreaProps {
  descriptions: Description[]
  handleAddDescription: (
    id: number,
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void
}
const MainTextArea = forwardRef<HTMLTextAreaElement, MainTextAreaProps>(
  ({ descriptions, handleAddDescription }, ref) => {
    const desc = descriptions[0] // comme on passe un seul desc à la fois
    return (
      <>
        <div className="border-stroke shadow-defaul dark:bg-boxdark ml-2 mt-1 flex w-screen flex-col rounded-lg border">
          <textarea
            name="leftarea"
            ref={ref}
            id={String(desc.id)}
            className="textarea textarea-bordered font-inclusive text-xl"
            placeholder="Inscrivez votre texte"
            rows={10}
            value={desc.text}
            onChange={(event) => {
              handleAddDescription(desc.id, event)
            }}></textarea>
        </div>
        {/* <div className="border-stroke shadow-defaul dark:bg-boxdark ml-16 mt-1 flex w-96 flex-col rounded-lg border">
                    <textarea
                        name="rightarea"
                        id={String(desc.id)}
                        className="textarea textarea-bordered font-inclusive text-xl"
                        placeholder="Inscrivez votre texte"
                        rows={10}
                        value={desc.text}
                        onChange={(event) => { handleAddDescription(desc.id, event) }}
                    ></textarea> 
                </div>*/}
      </>
    )
  }
)

export default MainTextArea
