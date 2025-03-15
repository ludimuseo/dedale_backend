//component/roleBasedDashboard.tsx
// Dynamic component that changes the homepage based on the user's role.
import 'daisyui/dist/full.css'

import { motion } from 'framer-motion'
import React from 'react'
import { useNavigate } from 'react-router'

import { CheckdTextIcon } from '../ui/icons/CheckedTextIcon'
import { InProgressIcon } from '../ui/icons/InProgressIcon'
import { ToCorrectIcon } from '../ui/icons/ToCorrectIcon'

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
    <div className="flex flex-col items-center p-6">
      <header className="text-center">
        <h1 className="font-inclusive text-3xl font-semibold text-[#0a184d]">
          Bonjour, vous êtes sur le tableau de bord de correction des textes.
        </h1>
      </header>

      <main className="mb-4 grid w-full max-w-5xl grid-cols-1 justify-center gap-20 sm:grid-cols-2 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3, ease: 'linear' }}
          className="dashboard-item shadow-extra-dark card flex h-[250px] w-[250px] transform cursor-pointer flex-col items-center gap-4 rounded-lg border-4 border-[#0a184d] bg-[#f4fdff] p-4 transition-transform hover:scale-110 hover:border-4 hover:border-[#0a184d] hover:font-bold hover:shadow-2xl"
          tabIndex={0}
          aria-labelledby="text-to-correct-card-title">
          <ToCorrectIcon />
          <p
            className="mt-2 text-center font-inclusive text-2xl text-[#0a184d]"
            id="text-to-correct-card-title">
            Textes à corriger
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6, ease: 'linear' }}
          className="dashboard-item shadow-extra-dark card flex h-[250px] w-[250px] transform cursor-pointer flex-col items-center gap-4 rounded-lg border-4 border-[#0a184d] bg-[#f4fdff] p-4 transition-transform hover:scale-110 hover:border-4 hover:border-[#0a184d] hover:font-bold hover:shadow-2xl"
          tabIndex={0}
          aria-labelledby="text-to-correct-in-progress-card-title">
          <InProgressIcon />
          <p
            className="text-center font-inclusive text-2xl text-[#0A184D]"
            id="text-to-correct-in-progress-card-title">
            Textes en cours de correction
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.9, ease: 'linear' }}
          className="dashboard-item shadow-extra-dark card flex h-[250px] w-[250px] transform cursor-pointer flex-col items-center gap-4 rounded-lg border-4 border-[#0a184d] bg-[#f4fdff] p-4 transition-transform hover:scale-110 hover:border-4 hover:border-[#0a184d] hover:font-bold hover:shadow-2xl"
          tabIndex={0}
          aria-labelledby="text-validate-and-send-card-title"
          onClick={() => void navigate('/validateText')}>
          <CheckdTextIcon />
          <p
            className="text-center font-inclusive text-2xl text-[#0a184d]"
            id="text-validate-and-send-card-title">
            Textes validés et envoyés
          </p>
        </motion.div>
      </main>

      {/* Section des boutons */}
      <div className="flex w-full justify-around gap-4">
        {isReferent && (
          <motion.div className="group relative mt-8">
            {/* Conteneur parent avec la classe `group` */}
            <div
              className="flex w-48 flex-col items-center rounded-lg px-6 py-4 text-lg text-[#0a184d]"
              aria-label="Ajouter un correcteur"
              aria-labelledby="add-corrector-button">
              <span
                className="mb-3 inline whitespace-nowrap font-inclusive text-2xl font-semibold"
                id="add-corrector-button">
                Ajouter un correcteur
              </span>
              <button className="group btn btn-circle btn-lg transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl">
                <span className="flex h-[60px] w-[60px] transform items-center justify-center rounded-full border-2 border-[#0a184d] bg-white text-[#0a184d] shadow-xl transition-all duration-300 group-hover:bg-[#0a184d] group-hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                    fill="none">
                    <path
                      fillRule="evenodd"
                      d="M12 4a1 1 0 011 1v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6h-6a1 1 0 110-2h6V5a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </button>
            </div>
            {/* Infobulle */}
            <div
              role="tooltip"
              aria-label="Ajouter un correcteur"
              className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 transform whitespace-nowrap rounded-md bg-gray-800 px-3 py-1 text-sm text-white shadow-lg group-hover:block">
              Ajouter un correcteur
            </div>
          </motion.div>
        )}

        {/* Bouton Voir tous les textes */}
        <motion.div className="group relative mt-8">
          <div
            className="relative flex w-48 cursor-pointer flex-col items-center rounded-lg px-6 py-4 text-lg text-[#0a184d] transition-all duration-300 ease-in-out"
            onClick={handleNavigateTextList}>
            <span
              className="mb-3 inline whitespace-nowrap font-inclusive text-2xl font-semibold"
              id="view-all-texts-button">
              Voir tous les textes
            </span>
            <button className="group btn btn-circle btn-lg transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl">
              <span className="flex h-[60px] w-[60px] transform items-center justify-center rounded-full border-2 border-[#0a184d] bg-white text-[#0a184d] shadow-xl transition-all duration-300 group-hover:bg-[#0a184d] group-hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  fill="none">
                  <path
                    fillRule="evenodd"
                    d="M13.293 16.707a1 1 0 010-1.414L16.586 12H4a1 1 0 110-2h12.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </button>
          </div>

          {/* Infobulle pour le bouton "Voir tous les textes" */}
          <div
            role="tooltip"
            aria-label="Voir tous les textes"
            className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 transform whitespace-nowrap rounded-md bg-gray-800 px-3 py-1 text-sm text-white shadow-lg group-hover:block">
            Voir tous les textes
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default TalosDashboard
