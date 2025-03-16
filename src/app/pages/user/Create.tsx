import { collection, getDocs } from 'firebase/firestore'
import { type FC, useEffect, useState } from 'react'

import { db } from '@/firebase/firebase'

import {
  getInputConfig,
  getSelectConfig,
} from './configCreateUser/getInputCreateUser'

const UserCreate: FC = () => {
  const [clientIdAndName, setClientIdAndName] = useState<
    { id: string; name: string }[] | undefined
  >([])
  const [clientName, setClientName] = useState<string>('')
  //const [user, setUser] = useState<User>()

  const selectOptions = getSelectConfig
  const inputs = getInputConfig

  //fetchClients
  const fetchClients = async () => {
    interface ClientData {
      id: string
      client?: {
        company?: {
          name?: string
        }
      }
      company?: {
        name?: string
      }
    }
    try {
      const querySnapshot = await getDocs(collection(db, 'clients'))
      const clientData: ClientData[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<ClientData, 'id'>),
      }))

      const clientPackageData = clientData
        .map((item) => {
          if (item.client?.company?.name) {
            return { id: item.id, name: item.client.company.name } // Si "client" et "company.name" existent
          } else if (item.company?.name) {
            return { id: item.id, name: item.company.name } // Si "company.name" existe directement;
          }
          return undefined
        })
        .filter(
          (item): item is { id: string; name: string } => item !== undefined
        ) //Ce filtre assure à TypeScript que le tableau résultant ne contient que des objets conformes au type { id: string, name: string }.

      setClientIdAndName(clientPackageData)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const associateClientId = (name: string) => {
    setClientName(name)
  }

  useEffect(() => {
    void fetchClients()
  }, [])

  return (
    <>
      {/* NAVEBAR */}
      <div>
        <div className="navbar rounded-xl bg-base-100">
          <div className="flex-1">
            <a className="btn btn-ghost font-inclusive text-xl">
              User Management
            </a>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <a>Link</a>
              </li>
              <li>
                <details>
                  <summary>Ajouter</summary>
                  <ul className="rounded-t-none bg-base-100 p-2">
                    <li>
                      <a>Administrateur</a>
                    </li>
                    <li>
                      <a>Référent</a>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <main>
        <form action="submit" className="w-1/2">
          <select className="select select-bordered mt-4 w-full max-w-xs">
            <option disabled>Selectionner le role de l'utilisateur</option>
            {selectOptions.map((option) => {
              return <option key={option.id}> {option.label} </option>
            })}
          </select>

          {/* INPUT  PART 1*/}
          <div className="flex flex-row space-x-10">
            <div className="mt-6 w-1/2 border p-4">
              {inputs.map((input) => {
                return (
                  <label
                    className="form-control w-full max-w-xs"
                    key={input.id}>
                    <div className="label"></div>
                    <p className="font-inclusive">{input.label}</p>
                    <input
                      type={input.type}
                      placeholder={input.placeholder}
                      aria-label={input.placeholder}
                      pattern={input.pattern}
                      maxLength={50}
                      className="input input-bordered w-full max-w-xs font-inclusive invalid:border-red-500"
                    />
                  </label>
                )
              })}
            </div>

            {/* INPUT PART 2 */}
            <div className="mt-6 w-1/2 border p-4">
              <div
                tabIndex={0}
                className="collapse collapse-arrow border border-base-300 bg-base-200">
                <div className="collapse-title font-inclusive text-xl font-medium">
                  Associer un client
                </div>
                <div className="collapse-content">
                  {clientIdAndName?.map((item) => {
                    return (
                      <p
                        key={item.id}
                        className="cursor-pointer hover:underline"
                        onClick={() => {
                          associateClientId(item.name)
                        }}>
                        {' '}
                        {item.name}
                      </p>
                    )
                  })}
                </div>
              </div>
              <div className="mt-6 flex justify-center font-inclusive">
                <span>{clientName && `Associer au client: ${clientName}`}</span>
              </div>
            </div>
          </div>

          <div className="flex w-1/2 justify-center">
            <button className="btn btn-primary mt-6 w-2/6 font-inclusive">
              Soumettre
            </button>
          </div>
        </form>
      </main>
    </>
  )
}

export { UserCreate }
