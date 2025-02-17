import type { FC } from 'react'

import TalosDashboard from '@/app/components/Talos/TalosDashboard'

const TalosHome: FC = () => {
  // Supposons qu'on récupère les données de l'utilisateur, ici en statique pour l'exemple.
  const userRole: 'referent' | 'corrector' = 'referent' // Exemple de rôle dynamique
  const userName = 'Maëva' // Exemple de nom d'utilisateur

  return (
    <>
      <div className="talos-home">
        <TalosDashboard role={userRole} userName={userName} />
      </div>
    </>
  )
}

export { TalosHome }
