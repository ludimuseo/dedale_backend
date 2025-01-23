import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'

import { DashboardConfig } from '@/app/pages/dashboard/getDashbordConfig'

interface DashboardMenuType {
  menu: DashboardConfig[]
}
export default function DashboardMenu({ menu }: DashboardMenuType) {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-full flex-row items-center justify-center">
      {menu.map((item, index) => {
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.2,
              delay: index * 0.4,
              ease: 'easeInOut',
            }}
            key={item.id}
            className="card w-96 cursor-pointer bg-base-100 shadow-xl"
            aria-label={item.ariaLabel}
            tabIndex={index}
            onClick={() => void navigate(item.route)}>
            <figure>
              <img
                src={item.image}
                alt={item.imageAlt}
                className="aspect-video scale-75"
              />
            </figure>
            <hr className="mt-2 border-gray-300" />
            <div className="card-body rounded-xl bg-sky-50 dark:bg-sky-950">
              <h2 className="card-title">{item.title}</h2>
              <p className="font-inclusive">{item.subTitle}</p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
