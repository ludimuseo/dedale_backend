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
          <div className="card w-96 border-2 bg-base-100 shadow-xl">
            <figure className="p-4">
              <img src={item.image} alt={item.alt} />
            </figure>
            <hr className="mt-2 border-gray-300" />
            <div className="card-body">
              <h2 className="card-title font-inclusive text-3xl">
                {item.title}
              </h2>
              <p className="font-inclusive">{item.description}</p>
              <div className="card-actions justify-end">
                <button
                  onClick={() => void navigate(item.route)}
                  className="btn btn-primary font-inclusive">
                  Accéder
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export { FormMenu }
