import { type SnackbarAction, useSnackbar } from 'notistack'

interface OptionsProps {
  type: 'success' | 'error' | 'warning' | 'info'
  persist?: boolean
  callback?: SnackbarAction
}

const useNotification = () => {
  const { enqueueSnackbar } = useSnackbar()

  const push = (
    message: string,
    options: OptionsProps = { type: 'success' }
  ) => {
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

  return { push }
}

export { useNotification }
