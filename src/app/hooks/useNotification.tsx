import { type SnackbarAction, useSnackbar } from 'notistack'

interface OptionsProps {
  type?: 'success' | 'error' | 'warning' | 'info'
  persist?: boolean
  callback?: SnackbarAction
}

const useNotification = () => {
  const { enqueueSnackbar } = useSnackbar()

  const notify = (message: string, options: OptionsProps = {}) => {
    enqueueSnackbar(message, {
      action: options.callback,
      anchorOrigin: {
        horizontal: 'right',
        vertical: 'bottom',
      },
      persist: options.persist,
      variant: options.type,
    })
  }

  return { notify }
}

export { useNotification }
