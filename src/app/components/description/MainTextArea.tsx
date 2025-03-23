export default function MainTextArea() {
  return (
    <>
      <div className="border-stroke shadow-defaul dark:bg-boxdark ml-2 mt-1 flex w-96 flex-col rounded-lg border">
        <textarea
          className="textarea textarea-bordered font-inclusive text-xl"
          placeholder="Inscrivez votre texte"
          rows={10}></textarea>
      </div>
      <div className="border-stroke shadow-defaul dark:bg-boxdark ml-16 mt-1 flex w-96 flex-col rounded-lg border">
        <textarea
          className="textarea textarea-bordered font-inclusive text-xl"
          placeholder="Inscrivez votre texte"
          rows={10}></textarea>
      </div>
    </>
  )
}
