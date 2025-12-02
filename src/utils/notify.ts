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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function notifyAsync(promise: Promise<any>) {
  return toast.promise(promise, {
    pending: 'Pending...',
    // success: 'Success!',
    // error: 'Error!',
  })
}
