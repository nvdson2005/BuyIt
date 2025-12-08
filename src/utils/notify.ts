import { toast } from 'vue3-toastify'

export function notify(message: string, type: 'success' | 'error' | 'warning' | 'info') {
  toast(message, {
    type,
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
  })
}

export function notifyAsync<T>(promise: Promise<T>): Promise<T> {
  return toast.promise<T>(promise, {
    pending: 'Pending...',
  })
}
