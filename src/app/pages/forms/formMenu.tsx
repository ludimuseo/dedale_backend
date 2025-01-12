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
          <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="p-2">
              <img src={item.image} alt={item.alt} />
            </figure>
            <hr className="mt-2 border-gray-300" />
            <div className="card-body">
              <h2 className="card-title">{item.title}</h2>
              <p>{item.description}</p>
              <div className="card-actions justify-end">
                <button
                  onClick={() => void navigate(item.route)}
                  className="btn btn-primary">
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
