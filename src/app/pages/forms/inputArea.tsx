import { FormEvent, MouseEvent } from 'react'

import successImage from '@/assets/imgs/minos-reussi.png'
import { GetInputConfigType, MessageType, T } from '@/types'

interface InputAreaProps {
  message: MessageType
  handleSubmit: (
    event: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>
  ) => void
  getInput: GetInputConfigType[][]
  currentStep: number
  formData: T
  handleInputChange: <S extends keyof T, K extends keyof T[S]>(
    section: S,
    name: K,
    event: T[S][K]
  ) => void
}

const InputArea = ({
  message,
  handleSubmit,
  getInput,
  currentStep,
  formData,
  handleInputChange,
}: InputAreaProps) => {
  return (
    <div className="border-stroke shadow-defaul dark:border-strokedark dark:bg-boxdark dark:border-strokedark dark:bg-boxdark flex flex-row justify-center rounded-sm border bg-white p-5">
      {/*INPUT AREA 1*/}
      {!message.info ? (
        <form
          onSubmit={() => handleSubmit}
          className="border-stroke shadow-defaul dark:border-strokedark dark:bg-boxdark flex w-1/2 flex-col rounded-sm p-2">
          {/* <span>-- INPUT AREA 1 --</span> */}
          {getInput[currentStep].map(
            ({ id, section, rows, type, name, label, option, placeholder }) => {
              {
                /*TEXTAREA*/
              }
              if (rows) {
                return (
                  <div className="mt-2 flex flex-col" key={id}>
                    <span>{label}</span>
                    <textarea
                      key={id}
                      id={id}
                      name={name}
                      className="border-stroke disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary mt-1 w-4/6 rounded border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-blue-800 active:border-blue-400 disabled:cursor-default dark:text-white"
                      placeholder={placeholder}
                      rows={rows}
                      value={formData[section][name as keyof T[keyof T]]}
                      onChange={(e) => {
                        handleInputChange(
                          section,
                          name as keyof T[keyof T],
                          e.target.value as T[keyof T][keyof T[keyof T]]
                        )
                      }}
                    />
                  </div>
                )
              } else if (option) {
                return (
                  <div className="flex flex-col" key={id}>
                    <span>{label}</span>
                    <select
                      name={name}
                      id={id}
                      value={formData[section][name as keyof T[keyof T]]}
                      onChange={(e) => {
                        handleInputChange(
                          section,
                          name as keyof T[keyof T],
                          e.target.value as T[keyof T][keyof T[keyof T]]
                        )
                      }}
                      className="border-stroke disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary mt-1 w-4/6 rounded border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-blue-800 active:border-blue-400 disabled:cursor-default dark:text-white">
                      {option.map((opt, index) => (
                        <option key={index} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                )
              } else {
                {
                  /*INPUT*/
                }
                return (
                  <div className="mt-2 flex flex-col" key={id}>
                    <span>{label}</span>
                    <input
                      key={id}
                      id={id}
                      name={name}
                      className="border-stroke disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary mt-1 w-4/6 rounded border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-blue-800 active:border-blue-400 disabled:cursor-default dark:text-white"
                      placeholder={placeholder}
                      type={type}
                      value={formData[section][name as keyof T[keyof T]]}
                      onChange={(e) => {
                        handleInputChange(
                          section,
                          name as keyof T[keyof T],
                          e.target.value as T[keyof T][keyof T[keyof T]]
                        )
                      }}
                    />
                  </div>
                )
              }
            }
          )}
        </form>
      ) : (
        <>
          <div className="border-stroke shadow-defaul dark:border-strokedark dark:bg-boxdark mt-5 flex w-1/2 flex-col items-center rounded-sm p-2">
            <h1> 🚀 {message.info}</h1>
            <img
              width="30%"
              src={successImage}
              alt="Success Minos"
              className="mt-10"
            />
          </div>
        </>
      )}
      {
        //translate eonz s'affiche si il y a une traduction a executer
        getInput[currentStep].map(({ translate }, index) => {
          if (translate) {
            return (
              <div
                key={index}
                className="border-stroke shadow-defaul dark:border-strokedark dark:bg-boxdark mt-5 w-1/2 rounded-sm border bg-sky-100 p-2">
                <span>-- TRANSLATION ZONE --</span>
              </div>
            )
          }
        })
      }
    </div>
  )
}

export default InputArea
