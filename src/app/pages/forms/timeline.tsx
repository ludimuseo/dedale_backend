import { CircleIcon } from '@/app/components/ui/icons/CircleIcon'
import { CircleWithLineIcon } from '@/app/components/ui/icons/CircleWithLineIcon'
import { GetInputConfigType, MessageType } from '@/types'

interface TimelineProps {
  getInput: GetInputConfigType[][]
  currentStep: number
  step: number
  message: MessageType
}

const Timeline = ({ getInput, currentStep, step, message }: TimelineProps) => {
  return (
    <div className="border-stroke shadow-defaul dark:border-strokedark dark:bg-boxdark rounded-sm border bg-white p-5">
      <h1>{getInput[currentStep][step]?.sectionLabel}</h1>
      <div className="flex flex-row">
        {getInput.map((inputs, index) => {
          if (currentStep + 1 > index + 1 || message.info) {
            return (
              <div key={index}>
                <CircleWithLineIcon index={index} currentStep={currentStep} />
                <div className="mr-12 text-center">
                  <span>{inputs[index].sectionLabel}</span>
                  <br />
                  <span className="font-bold text-emerald-500">Complet</span>
                </div>
              </div>
            )
          } else {
            return (
              <div className="mr-5" key={index}>
                <CircleIcon index={index} currentStep={currentStep} />
                <div className="text-center">
                  {currentStep + 1 === index + 1 ? (
                    <div>
                      <span>{getInput[index][step]?.sectionLabel}</span>
                      <br />
                      <span className="font-bold text-rose-500">En cours</span>
                    </div>
                  ) : (
                    <>
                      <span className="text-gray-400">
                        {getInput[index][step]?.sectionLabel}
                      </span>
                      <br />
                      <span className="text-gray-400">En attente</span>
                    </>
                  )}
                </div>
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}

export default Timeline
