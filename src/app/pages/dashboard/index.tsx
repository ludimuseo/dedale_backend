import { type FC } from 'react'
import { useNavigate } from 'react-router'

const Dashboard: FC = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className="flex min-h-full flex-row items-center justify-center">
        <div
          className="card w-96 cursor-pointer bg-base-100 shadow-xl"
          onClick={() => void navigate('/form')}>
          <figure>
            <img
              src="/src/assets/imgs/formMenu/dedale-mobile.svg"
              alt="Formulaires"
              className="aspect-video scale-75"
            />
          </figure>
          <hr className="mt-2 border-gray-300" />
          <div className="card-body rounded-xl bg-sky-50">
            <h2 className="card-title">CREATION DE PARCOURS</h2>
            <p className="font-inclusive">
              Créer les parcours et jeux pas à pas.
            </p>
          </div>
        </div>

        <div
          className="card w-96 cursor-pointer bg-base-100 shadow-xl"
          onClick={() => void navigate('/talos')}>
          <figure>
            <img
              src="/src/assets/imgs/talos-backoffice.svg"
              alt="Talos"
              className="aspect-video scale-75"
            />
          </figure>
          <hr className="mt-2 border-gray-300" />
          <div className="card-body rounded-xl bg-sky-50">
            <h2 className="card-title">INTERFACE TALOS</h2>
            <p className="font-inclusive">Correction et lecture de texte.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export { Dashboard }
