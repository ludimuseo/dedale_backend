import { motion } from 'framer-motion'
import { type FC } from 'react'
import { Link } from 'react-router'

import { DashboardConfig } from '@/app/pages/dashboard/getDashboardConfig'
import { StateAuth } from '@/app/services/redux/slices/reducerAuth'
import { MENU } from '@/enums/icons'

interface DashboardMenuProps {
  menu: DashboardConfig[]
  auth: StateAuth
}

const DashboardMenu: FC<DashboardMenuProps> = ({ menu, auth }) => {
  const userRole = auth.user?.role ?? 'CORRECTOR'

  return (
    <ul className="flex flex-row flex-wrap gap-3 rounded-xl">
      {menu.map((item, index: number) => {
        if (item.role.includes(userRole))
          return (
            <motion.li
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.2,
                delay: index * 0.4,
                ease: 'easeInOut',
              }}
              key={item.id}
              className="card m-0 flex-auto bg-base-100 shadow-xl sm:max-w-[calc(50%-0.75rem)] sm:flex-[1_1_calc(50%-2*0.75rem)] md:max-w-[calc((100%/3)-0.75rem)] md:flex-[1_1_calc((100%/3)-3*0.75rem)] xl:max-w-[calc(25%-0.75rem)] xl:flex-[1_1_calc(25%-4*0.75rem)] 2xl:max-w-[calc(20%-0.75rem)] 2xl:flex-[1_1_calc(20%-5*0.75rem)]"
              tabIndex={index}>
              <figure className="aspect-video scale-75 p-4">
                {MENU[item.image]}
              </figure>
              <hr className="mt-2 border-gray-300" />
              <Link
                to={{ pathname: item.route }}
                className="card-body rounded-b-xl bg-sky-50 dark:bg-sky-950"
                aria-label={item.ariaLabel}>
                <p className="card-title grow-0 font-inclusive uppercase">
                  {item.title}
                </p>
                <p className="font-inclusive">{item.subTitle}</p>
              </Link>
            </motion.li>
          )
      })}
    </ul>
  )
}

export { DashboardMenu }
