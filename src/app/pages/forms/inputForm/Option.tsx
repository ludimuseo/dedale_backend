// import { T } from "@/types"

// interface OptionType {
//     label: string,
//     id: string,
//     name: string,
//     section: string,
//     option: {},
//     handleInputChange: <S extends keyof T, K extends keyof T[S]>(
//         section: S,
//         name: K,
//         event: T[S][K]
//     ) => void,
// }

// export default function Option({ label, id, name, handleInputChange, section, option }: OptionType) {
//     return (
//         <div className="mt-2 flex flex-col" key={id}>
//             <span>{label}</span>
//             <select
//                 name={name}
//                 id={id}
//                 value={formData[section][name as keyof T[keyof T]]}
//                 onChange={(e) => {
//                     handleInputChange(
//                         section,
//                         name as keyof T[keyof T],
//                         e.target.value as T[keyof T][keyof T[keyof T]]
//                     )
//                 }}
//                 className="select select-bordered w-full max-w-xs">
//                 {option.map((opt, index) => (
//                     <option key={index} value={opt}>
//                         {opt}
//                     </option>
//                 ))}
//             </select>
//         </div>
//     )
// }
