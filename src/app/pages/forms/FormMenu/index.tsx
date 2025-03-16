import { motion } from 'framer-motion'
import { FC } from 'react'
import { useNavigate } from 'react-router'

import { getButtonFormMenuConfig } from './getButtonFormMenuConfig'

const FormMenu: FC = () => {
  const navigate = useNavigate()

  const menu = getButtonFormMenuConfig

  return (
    <>
      <h1 className="mb-10 mt-10 text-center font-inclusive text-4xl">
        Création de parcours
      </h1>
      <motion.div
        className="flex flex-wrap rounded-xl bg-slate-50 p-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3, ease: 'easeInOut' }}>
        {menu.map((item, index: number) => {
          return (
            <div
              key={index}
              className="transition-duration-500 mr-18 card w-64 translate-x-0 translate-y-0 cursor-pointer bg-base-100 shadow-xl transition-transform ease-in-out hover:-translate-x-2 hover:-translate-y-2"
              onClick={() => void navigate(item.route)}>
              {/* <figure className="p-6">
              <img src={item.image} alt={item.alt} />
            </figure> */}
              <hr className="mt-2 border-gray-300" />
              <div className="card-body bg-slate-100 dark:bg-sky-950">
                <h2 className="card-title font-inclusive text-3xl">
                  {item.title}
                </h2>
                <p className="font-inclusive">{item.description}</p>
              </div>
            </div>
          )
        })}
      </motion.div>
    </>
  )
}

export { FormMenu }
