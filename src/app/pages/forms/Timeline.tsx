import { GetInputConfigType, MessageType } from '@/types'

interface TimelineProps {
  getInput: GetInputConfigType[][]
  currentStep: number
  step: number
  message: MessageType
}

const Timeline = ({ getInput, currentStep }: TimelineProps) => {
  return (
    <div className="navbar rounded-xl bg-base-100 p-4 shadow-xl">
      {
        <ul className="steps">
          {getInput.map((inputs, index: number) => {
            if (currentStep + 1 > index + 1) {
              return (
                //CHECKED
                <li key={index} className="step step-success" data-content="✓">
                  <p className="font-inclusive text-emerald-500">
                    {getInput[index][0]?.sectionLabel}
                  </p>
                  <p className="font-inclusive text-emerald-500">Complet</p>
                </li>
              )
            }
            if (currentStep + 1 === index + 1) {
              return (
                //EN COURS
                <li key={index} className="step step-primary">
                  <p className="font-inclusive text-blue-900">
                    {getInput[currentStep][0]?.sectionLabel}
                  </p>
                  <p className="font-inclusive text-rose-500">En cours</p>
                </li>
              )
            }
            if (currentStep + 1 < index + 1) {
              return (
                //EN ATTENTE
                <li key={index} className="step">
                  <p className="font-inclusive text-gray-400">
                    {inputs[0]?.sectionLabel}
                  </p>
                  <p className="font-inclusive text-gray-400">En attente</p>
                </li>
              )
            }
          })}
        </ul>
      }
    </div>
  )
}

export default Timeline
