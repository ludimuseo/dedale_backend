import { FC } from 'react'
import { useNavigate } from 'react-router'

import { getButtonFormMenuConfig } from './formMenu/getButtonFormMenuConfig'

const FormMenu: FC = () => {
  const navigate = useNavigate()

  const menu = getButtonFormMenuConfig

  return (
    <div className="flex flex-wrap">
      {menu.map((item) => {
        return (
          <div
            className="card w-96 cursor-pointer border-2 bg-base-100 shadow-xl"
            onClick={() => void navigate(item.route)}>
            <figure className="p-4">
              <img src={item.image} alt={item.alt} />
            </figure>
            <hr className="mt-2 border-gray-300" />
            <div className="card-body bg-slate-100 dark:bg-sky-950">
              <h2 className="card-title font-inclusive text-2xl">
                {item.title}
              </h2>
              <p className="font-inclusive">{item.description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export { FormMenu }
