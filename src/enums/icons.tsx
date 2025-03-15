import AccessibilityIcon from '@/app/components/ui/icons/AccessibilityIcon'
import { DedaleMobile } from '@/app/components/ui/icons/DedaleMobile'
import { Lists } from '@/app/components/ui/icons/Lists'
import { Talos } from '@/app/components/ui/icons/Talos'

type MENUTYPE = Record<string, React.ReactNode>

export const MENU: MENUTYPE = {
  DEDALE_MOBILE: <DedaleMobile />,
  TALOS: <Talos />,
  LISTS: <Lists />,
  ACCESSIBILITY: <AccessibilityIcon />,
}
