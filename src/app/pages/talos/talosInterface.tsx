// import { Pencil } from "@/app/components/ui/icons/Pencil"
// import { FC, useState } from "react"
// import { useLocation } from 'react-router'

// type TextType = {
//     [keyof :string]: string
// }
// const TalosInterface: FC = () => {

//     const location = useLocation()
//     const { formData } = location.state || {}
//     const [showAction, setShowAction] = useState(false)
//     // const [bgColor, setbgColor] = useState('')
//     const [newSentence, setNewSentence] = useState<string[]>([])
//     const [text, setText] = useState<TextType[]>()

//     const sentences = formData.description.falc.fr.split(/(?<=[.!?])\s+/)
//     const sentencesData = sentences.map((item: string, index: number) => {
//         let bgColor = "bg-info"

//         if (text[item]) {
//             const isIncluded = text[item].includes(item)
//         }

//         return (
//             <div className={`hover:bg-slate-200 ${bgColor} rounded-lg mb-2 p-2`}
//                 key={index}
//                 onClick={() => handleSentence(index, item)}
//             >
//                 {item}
//             </div>
//         )
//     })

//     const handleSentence = (index: number, item: string) => {
//         setShowAction(true)
//         setNewSentence(prevSentence => [...prevSentence, item])
//         setText({
//             [item]: item
//         })
//     }

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         console.log(name)
//         setText({
//             [name]: value
//         })
//     }

//     console.log('newSentence: ', newSentence)
//     return (
//         <div>
//             <h1>Talos Interface</h1>
//             <div className="flex flex-row">
//                 <div className="border-2 w-1/2 h-5/6 rounded-xl overflow-x-auto">
//                     <div className="leading-loose"><h2>{sentencesData}</h2></div>
//                 </div>
//                 <div className=" rounded-xl w-48 h-5/6 p-4 flex items-center flex-col space-y-10">
//                     {
//                         showAction &&
//                         <div className="border-2 rounded-xl w-32 h-5/6 p-4 flex items-center flex-col space-y-10">
//                             <div>
//                                 <Pencil />
//                             </div>
//                             <div>
//                                 <Pencil />
//                             </div>
//                             <div>
//                                 <Pencil />
//                             </div>
//                         </div>
//                     }
//                 </div>
//                 <div className="border-2 w-1/2 h-5/6 rounded-xl overflow-x-auto">
//                     {
//                         newSentence.map((item, index) => {
//                             return (
//                                 <div className={`hover:bg-slate-200 rounded-lg mb-2 p-2 `}
//                                     key={index}
//                                 >
//                                     <textarea
//                                         className="textarea-md textarea-ghost text-2xl w-full max-w-xl"
//                                         name={item}
//                                         rows={2}
//                                         value={text[item]}
//                                         onChange={(e) => handleChange(e)}
//                                     />

//                                 </div>
//                             )
//                         })
//                     }
//                 </div>
//             </div>

//         </div>
//     )
// }

// export { TalosInterface }
