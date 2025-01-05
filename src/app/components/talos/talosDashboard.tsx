//component/roleBasedDashboard.tsx
// Dynamic component that changes the homepage based on the user's role.
import 'daisyui/dist/full.css'

import React from 'react'
import { useNavigate } from 'react-router'

interface TalosDashboardProps {
  role: 'referent' | 'corrector'
  userName: string
}

const TalosDashboard: React.FC<TalosDashboardProps> = ({ role, userName }) => {
  const isReferent = role === 'referent' // Détermine si l'utilisateur est un référent
  //const aCorrigerSvg = "assets/imgs/Talos/acorriger.svg"
  const navigate = useNavigate()

  const handleNavigateTextList = () => {
    void navigate('/textList', { state: { userName: userName, role: role } })
  }

  return (
    <div className="p-6">
      <header className="mt-0 text-center">
        <h1 className="text-2xl font-semibold text-[#0a184d]">
          Bonjour {userName}, vous êtes sur le tableau de bord de correction des
          textes.
        </h1>
      </header>

      <main className="mb-20 mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        <div
          className="dashboard-item shadow-extra-dark card flex h-[300px] w-[300px] transform cursor-pointer flex-col items-center gap-4 rounded-lg bg-[#f4fdff] p-4 transition-transform hover:scale-125 hover:border-4 hover:border-[#0a184d] hover:font-bold hover:shadow-2xl"
          tabIndex={0}
          aria-labelledby="text-to-correct-card-title">
          <img
            src="/src/assets/imgs/Talos/acorriger.svg"
            alt="Texte à corriger"
            className="mx-auto mb-4 ml-[15px] h-[200px] w-[200px]"
          />
          <p
            className="text-center text-lg text-[#0a184d]"
            id="text-to-correct-card-title">
            Textes à corriger
          </p>
        </div>

        <div
          className="dashboard-item shadow-extra-dark card flex h-[300px] w-[300px] transform flex-col items-center gap-4 rounded-lg bg-[#0a184d] p-4 transition-transform hover:scale-125 hover:font-bold hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,1),_0_10px_10px_-5px_rgba(0,0,0,0.2),_inset_0_0_0_8px_#ffffff]"
          tabIndex={0}
          aria-labelledby="text-to-correct-in-progress-card-title">
          <img
            src="/src/assets/imgs/Talos/en-cours-blanc.svg"
            alt="Textes en cours de correction"
            className="mx-auto mb-4 ml-[55px] h-[200px] w-[200px]"
          />
          <p
            className="text-center text-lg text-[#ffffff]"
            id="text-to-correct-in-progress-card-title">
            Textes en cours de correction
          </p>
        </div>

        <div
          className="dashboard-item shadow-extra-dark card flex h-[300px] w-[300px] transform flex-col items-center gap-4 rounded-lg bg-[#f4fdff] p-4 transition-transform hover:scale-125 hover:border-4 hover:border-[#0a184d] hover:font-bold hover:shadow-2xl"
          tabIndex={0}
          aria-labelledby="text-validate-and-send-card-title">
          <img
            src="/src/assets/imgs/Talos/valide-texte.svg"
            alt="Textes validés et envoyés"
            className="mx-auto mb-4 ml-[35px] h-[200px] w-[200px]"
          />
          <p
            className="text-center text-lg text-[#0a184d]"
            id="text-validate-and-send-card-title">
            Textes validés et envoyés
          </p>
        </div>
      </main>

      {/* Section des boutons */}
      <div className="mt-12 flex w-full justify-around gap-4">
        {isReferent && (
          <div className="group relative mt-10">
            {/* Conteneur parent avec la classe `group` */}
            <button
              className="relative flex w-48 flex-col items-center rounded-lg border-2 border-transparent bg-white px-6 py-4 text-lg text-[#0a184d] transition-all duration-300 hover:border-[#0a184d] hover:bg-gray-100"
              aria-label="Ajouter un correcteur"
              aria-labelledby="add-corrector-button">
              <span
                className="mb-2 inline whitespace-nowrap font-semibold"
                id="add-corrector-button">
                Ajouter un correcteur
              </span>

              <div className="absolute bottom-0 left-1/2 flex h-10 w-10 -translate-x-1/2 translate-y-1/2 transform items-center justify-center rounded-full border-2 border-[#0a184d] bg-white text-[#0a184d]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M12 4a1 1 0 011 1v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6h-6a1 1 0 110-2h6V5a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </button>
            {/* Infobulle */}
            <div
              role="tooltip"
              aria-label="Ajouter un correcteur"
              className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 transform whitespace-nowrap rounded-md bg-gray-800 px-3 py-1 text-sm text-white shadow-lg group-hover:block">
              Ajouter un correcteur
            </div>
          </div>
        )}

        {/* Bouton Voir tous les textes */}
        <div className="group relative mt-10">
          <div
            className="relative flex w-48 cursor-pointer flex-col items-center rounded-lg border-2 border-transparent bg-white px-6 py-4 text-lg text-[#0a184d] transition-all duration-300 hover:border-[#0a184d] hover:bg-gray-100"
            onClick={handleNavigateTextList}>
            <span
              className="mb-2 inline whitespace-nowrap font-semibold"
              id="view-all-texts-button">
              Voir tous les textes
            </span>
            <div className="absolute bottom-0 left-1/2 flex h-10 w-10 -translate-x-1/2 translate-y-1/2 transform items-center justify-center rounded-full border-2 border-[#0a184d] bg-white text-[#0a184d]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M13.293 16.707a1 1 0 010-1.414L16.586 12H4a1 1 0 110-2h12.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* Infobulle pour le bouton "Voir tous les textes" */}
          <div
            role="tooltip"
            aria-label="Voir tous les textes"
            className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 transform whitespace-nowrap rounded-md bg-gray-800 px-3 py-1 text-sm text-white shadow-lg group-hover:block">
            Voir tous les textes
          </div>
        </div>
      </div>
    </div>
  )
}

export default TalosDashboard
