import { FC } from 'react'

interface DataHeaderProps {
  title: string
  btnText?: string
  btnAction: () => void
}

const DataHeader: FC<DataHeaderProps> = ({ title, btnText, btnAction }) => {
  return (
    <div className="mb-5 flex justify-between align-middle">
      <h2>{title}</h2>
      <button onClick={btnAction} className="btn btn-outline btn-primary">
        {btnText ?? 'Nouveau'}
      </button>
    </div>
  )
}

export default DataHeader
