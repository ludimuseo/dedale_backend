interface RightClipboard {
  activeTextId: boolean
  newSentence: string[]
  handleMouseOverCorrectedText: (index: number) => void
  handleMouseLeave: () => void
  handleChangeText: (
    index: number,
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => void
  hoveredIndexCorrectedText: number | null
  handleDeleteText: (index: number) => void
}

const RightClipboard = ({
  activeTextId,
  newSentence,
  handleMouseOverCorrectedText,
  handleMouseLeave,
  handleChangeText,
  hoveredIndexCorrectedText,
  handleDeleteText,
}: RightClipboard) => {
  return (
    <>
      {activeTextId && (
        <div className="w-1/2 pl-4">
          <div className="mt-4 h-auto max-h-[600px] min-h-[419px] rounded-md border-2 border-black bg-white p-6 shadow-2xl">
            <h2 className="mb-4 text-xl font-bold text-[#0a184d]">
              Je corrige et je vérifie :
            </h2>
            <>
              {newSentence.length > 0 ? (
                newSentence.map((item: string, index: number) => (
                  <>
                    <div
                      className="mb-2 flex cursor-pointer flex-row rounded-lg p-2 hover:bg-slate-200"
                      key={index}
                      onMouseOver={() => {
                        handleMouseOverCorrectedText(index)
                      }}
                      onMouseLeave={() => {
                        handleMouseLeave()
                      }}>
                      <textarea
                        onChange={(e) => {
                          handleChangeText(index, e)
                        }}
                        value={newSentence[index]}
                        className="textarea textarea-ghost textarea-xs w-full max-w-xl"
                        style={{ fontSize: '22px' }}>
                        {item}
                      </textarea>
                      {hoveredIndexCorrectedText === index && (
                        <div className="border-1 ml-auto w-12 rounded-xl p-2">
                          <div
                            onClick={() => {
                              handleDeleteText(index)
                            }}>
                            <img
                              src="/src/assets/imgs/talos/coche-faux.svg"
                              alt="supprimer"
                              className="h-[25px] w-[200px]"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ))
              ) : (
                <p className="italic text-gray-500">
                  Cliquez sur texte de à gauche pour le modifier ...
                </p>
              )}
            </>
          </div>
        </div>
      )}
    </>
  )
}

export default RightClipboard
