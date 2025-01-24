import { DedaleMobile } from '@/app/components/ui/icons/DedaleMobile'
import { Talos } from '@/app/components/ui/icons/Talos'

type MENUTYPE = Record<string, React.ReactNode>

export const MENU: MENUTYPE = {
  DEDALE_MOBILE: <DedaleMobile />,
  TALOS: <Talos />,
}
