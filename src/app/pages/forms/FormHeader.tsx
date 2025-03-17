import { ReactElement } from 'react'

import { ArrowLeftIcon } from '@/app/components'
interface HeaderProps {
  icon: ReactElement<SVGElement>
  title: string
  handleSubmit: () => void
}
const FormHeader = ({ title, icon, handleSubmit }: HeaderProps) => {
  return (
    <div className="navbar rounded-xl bg-base-100 shadow-xl">
      <div className="mx-5 mb-2 mt-2 flex flex-row">
        <button
          onClick={handleSubmit}
          className="flex justify-center rounded font-bold text-white hover:bg-opacity-100">
          <ArrowLeftIcon className="mt-2 w-12" />
        </button>
        <h1 className="ml-4 mt-2 font-inclusive">{title}</h1>
        {icon}
      </div>
    </div>
  )
}

export default FormHeader
