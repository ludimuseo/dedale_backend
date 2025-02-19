import { motion } from 'framer-motion'
import { type FC } from 'react'
import { useNavigate } from 'react-router'

import { DashboardConfig } from '@/app/pages/dashboard/GetDashbordConfig'
import { StateAuth } from '@/app/services/redux/slices/reducerAuth'
import { MENU } from '@/enums/icons'

interface DashboardMenuProps {
  menu: DashboardConfig[]
  auth: StateAuth
}

const DashboardMenu: FC<DashboardMenuProps> = ({ menu, auth }) => {
  const navigate = useNavigate()
  const userRole = auth.user?.role ?? 'CORRECTOR'

  return (
    <div className="flex min-h-full flex-row items-center justify-center">
      {menu.map((item, index: number) => {
        if (item.role.includes(userRole))
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
              <figure className="aspect-video scale-75 p-4">
                {MENU[item.image]}
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

export { DashboardMenu }
