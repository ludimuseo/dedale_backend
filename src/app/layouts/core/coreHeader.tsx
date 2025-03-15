import { BlockUserMenu, LogoDedale } from '@component'
import { type FC, ReactElement } from 'react'
import { NavLink } from 'react-router'

interface HeaderProps {
    toggleMenu: ReactElement<HTMLElement> | null
}

const CoreHeader: FC<HeaderProps> = ({ toggleMenu }) => {
    return (
        <>
            <header className="navbar min-h-24 p-4">
                <div className="navbar-start gap-x-3">
                    {toggleMenu}
                    <div className="logo-container">
                        <NavLink to={{ pathname: '/' }}>
                            <LogoDedale width={140} />
                        </NavLink>
                    </div>
                </div>
                <div className="navbar-center"></div>
                <div className="navbar-end">
                    <BlockUserMenu />
                </div>
            </header>
        </>
    )
}

export default CoreHeader
