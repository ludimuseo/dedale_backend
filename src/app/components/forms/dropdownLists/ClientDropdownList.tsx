import { ClientType } from '@/types'

interface ClientDropdownListProps {
  title: string
  handleSelectClient?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  client?: ClientType[] | undefined
}

export default function ClientDropdownList({
  title,
  handleSelectClient,
  client,
}: ClientDropdownListProps) {
  if (title === 'Formulaire Client' || title === 'Formulaire Médaille') {
    return <></>
  }
  return (
    <div className="navbar rounded-xl bg-base-100 shadow-xl">
      <div className="navbar-start">
        <a className="btn btn-ghost font-inclusive text-3xl">Client: </a>
        <p className="font-inclusive text-2xl">{}</p>
      </div>
      <select
        onChange={handleSelectClient}
        defaultValue=""
        className="select-neutral select w-full font-inclusive text-xl">
        <option disabled value="">
          Associer un client:
        </option>
        {client?.map(({ id, name }, index) => {
          return (
            <option key={index} value={id as unknown as keyof ClientType}>
              {name as keyof ClientType}
            </option>
          )
        })}
      </select>
    </div>
  )
}
