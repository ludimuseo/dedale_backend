import { ComponentPropsWithoutRef, forwardRef } from 'react'

interface FromEditProps extends ComponentPropsWithoutRef<'form'> {
  handleSubmit: (event: React.FormEvent) => void
  resetForm: () => void
  isModified: boolean
}

const FormEdit = forwardRef<HTMLFormElement, FromEditProps>(
  ({ children, handleSubmit, resetForm, isModified }) => {
    return (
      <form onSubmit={handleSubmit}>
        <div
          style={{ backgroundColor: '#f1f5f9', top: '-12px' }}
          className="sticky z-50 flex justify-end gap-2 p-5">
          <button
            onClick={resetForm}
            disabled={!isModified}
            type="button"
            className="btn btn-outline">
            Annuler
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!isModified}>
            Valider
          </button>
        </div>
        {children}
      </form>
    )
  }
)

export { FormEdit }
