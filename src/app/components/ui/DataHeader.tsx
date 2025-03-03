import { FC } from 'react'
import { useTranslation } from 'react-i18next'

interface DataHeaderProps {
  title: string
  btnText?: string
  btnAction: () => void
}

const DataHeader: FC<DataHeaderProps> = ({ title, btnText, btnAction }) => {
  const { t } = useTranslation()

  return (
    <div className="mb-5 flex justify-between align-middle">
      <h2>{title}</h2>
      <button onClick={btnAction} className="btn btn-outline btn-primary">
        {btnText ?? t('button.new')}
      </button>
    </div>
  )
}

export default DataHeader
