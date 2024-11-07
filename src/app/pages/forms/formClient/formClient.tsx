import { type FC } from 'react'

const FormClient: FC = () => {
  return (
    <>
      {/*CONTAINER */}
      <div className="grid grid-cols-1 gap-1 bg-yellow-500 sm:grid-cols-1">
        {/*SELECTION AREA */}
        <div className="border-stroke shadow-defaul dark:border-strokedark dark:bg-boxdark rounded-sm border bg-white">
          <span>SELECTION AREA</span>
        </div>

        {/*NAVIGATION AREA */}
        <div className="border-stroke shadow-defaul dark:border-strokedark dark:bg-boxdark rounded-sm border bg-white">
          <span>NAVIGATION AREA</span>
        </div>

        {/*TIMELINE AREA */}
        <div className="border-stroke shadow-defaul dark:border-strokedark dark:bg-boxdark rounded-sm border bg-white">
          <span>TIMELINE AREA</span>
        </div>

        {/*INPUT AREA CONTAINER*/}
        <div className="border-stroke shadow-defaul dark:border-strokedark dark:bg-boxdark flex flex-col rounded-sm border bg-white p-10">
          <span>INPUT AREA CONTAINER</span>

          {/*INPUT AREA 1*/}
          <div className="border-stroke shadow-defaul dark:border-strokedark dark:bg-boxdark rounded-sm border bg-blue-800"></div>
          <span>INPUT AREA 1</span>
          <span>Input 1</span>
          <input
            className="border-stroke focus:border-primary active:border-primary disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary w-1/3 rounded border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition disabled:cursor-default dark:text-white"
            placeholder="test"
            type="text"
          />

          <span>Input 2</span>
          <input
            className="border-stroke focus:border-primary active:border-primary disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary w-1/3 rounded border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition disabled:cursor-default dark:text-white"
            placeholder="test"
            type="text"
          />

          <span>Input 3</span>
          <input
            className="border-stroke focus:border-primary active:border-primary disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary w-1/3 rounded border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition disabled:cursor-default dark:text-white"
            placeholder="test"
            type="text"
          />

          {/*INPUT AREA 2*/}
          <div className="border-stroke shadow-defaul dark:border-strokedark dark:bg-boxdark rounded-sm border bg-blue-800"></div>
          <span>INPUT AREA 2</span>
        </div>

        {/*STEP AREA */}
        <div className="border-stroke shadow-defaul dark:border-strokedark dark:bg-boxdark rounded-sm border bg-red-500">
          <span>STEP AREA</span>
        </div>
      </div>
    </>
  )
}

export default FormClient
