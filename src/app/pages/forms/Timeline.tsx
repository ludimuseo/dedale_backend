import { GetInputConfigType, MessageType } from '@/types'

interface TimelineProps {
  getInput: GetInputConfigType[][]
  currentStep: number
  step: number
  message: MessageType
}

const Timeline = ({ getInput, currentStep, message }: TimelineProps) => {
  return (
    <div className="border-stroke shadow-defaul dark:border-strokedark dark:bg-boxdark rounded-sm border bg-white p-5">
      {
        <ul className="steps">
          {getInput.map((inputs, index: number) => {
            //console.log("getInput:", getInput[2][0].sectionLabel);

            if (currentStep + 1 > index + 1 || message.result) {
              return (
                //CHECKED
                <li key={index} className="step step-success" data-content="✓">
                  <span className="font-bold text-emerald-500">
                    {getInput[index][0]?.sectionLabel}
                  </span>
                  <span className="font-bold text-emerald-500">Complet</span>
                </li>
              )
            }
            if (currentStep + 1 === index + 1) {
              return (
                //EN COURS
                <li key={index} className="step step-primary">
                  <span className="font-bold text-blue-900">
                    {getInput[currentStep][0]?.sectionLabel}
                  </span>
                  <span className="text-rose-500">En cours</span>
                </li>
              )
            }
            if (currentStep + 1 < index + 1) {
              return (
                //EN ATTENTE
                <li key={index} className="step">
                  <span className="text-gray-400">
                    {inputs[0]?.sectionLabel}
                  </span>
                  <span className="text-gray-400">En attente</span>
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
