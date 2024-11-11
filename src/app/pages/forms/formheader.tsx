import ArrowLeftIcon from '@/app/icons/ArrowLeftIcon'

interface HeaderProps {
  icon: React.JSX.Element
  title: string
  handleSubmit: () => void
}
const FormHeader = ({ title, icon, handleSubmit }: HeaderProps) => {
  return (
    <div className="border-stroke shadow-defaul dark:border-strokedark dark:bg-boxdark rounded-sm border bg-white">
      <div className="mx-5 mb-4 mt-4 flex flex-row">
        <button
          onClick={handleSubmit}
          className="flex justify-center rounded bg-rose-400 p-3 font-bold text-white hover:bg-opacity-100">
          <ArrowLeftIcon className="5" />
        </button>
        <h1 className="ml-4 mt-2">{title}</h1>
        {icon}
      </div>
    </div>
  )
}

export default FormHeader
