import { FC } from 'react'

import { getContributorConfig } from './getContributorConfig'

const Contributor: FC = () => {
  const contributors = getContributorConfig
  const logo = '@img/logo-colonne-ludimuseo.png'

  return (
    <>
      <div className="overflow-x-auto">
        <h1 className="mb-10 text-center font-inclusive text-5xl">
          Contributeurs Ludimuseo
        </h1>
        <img src={logo} alt="LudiMuséo" width={100} />
        <table className="table">
          <thead>
            <tr>
              <th className="font-inclusive text-2xl">Name</th>
              <th className="font-inclusive text-2xl">Github</th>
              <th className="font-inclusive text-2xl">Contributes to</th>
              <th className="font-inclusive text-2xl">Developer</th>
            </tr>
          </thead>
          <tbody>
            {contributors.map((contributor) => {
              return (
                <>
                  <tr>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-16 w-16">
                            <img
                              src={contributor.avatar}
                              alt={contributor.name}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-inclusive text-xl font-bold">
                            {contributor.name}
                          </div>
                          <div className="font-inclusive text-lg opacity-50">
                            {contributor.developper}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {contributor.gitHub}
                      <br />
                      <span className="badge badge-ghost badge-sm">
                        Desktop Support Technician
                      </span>
                    </td>
                    <td>Purple</td>
                    <th>
                      <button className="btn btn-ghost btn-xs">details</button>
                    </th>
                  </tr>
                </>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export { Contributor }
