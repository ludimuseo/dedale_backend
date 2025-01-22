import { motion } from 'framer-motion'
import { type FC } from 'react'
import { useNavigate } from 'react-router'

const Dashboard: FC = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className="flex min-h-full flex-row items-center justify-center">
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3, ease: 'linear' }}
          className="card w-96 cursor-pointer bg-base-100 shadow-xl"
          onClick={() => void navigate('/')}>
          <figure>
            <img src="/src/assets/imgs/ludi_couv_applimobile.jpg" alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">CREATION DE PARCOURS</h2>
            <p>Créer les parcours et jeux pas à pas.</p>
          </div>
        </motion.div>

        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5, ease: 'linear' }}
          className="card w-96 cursor-pointer bg-base-100 p-2 shadow-xl"
          onClick={() => void navigate('/talos')}>
          <figure>
            <img
              src="/src/assets/imgs/Talos/logo-talos-fond-blanc.svg"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">INTERFACE TALOS</h2>
            <p>
              Correction et lecture de texte.
              <br /> Validation de texte FALC
            </p>
          </div>
        </motion.div>
      </div>
    </>
  )
}

export { Dashboard }
