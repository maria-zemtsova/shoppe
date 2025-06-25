import { ref } from 'vue'

export const useEmailSubscribe = (storageKey: string) => {
  const email = ref('')
  const errorMessage = ref('')
  const isSuccess = ref(false)

  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = (): void => {
    const trimmedEmail = email.value.trim()
    errorMessage.value = ''
    isSuccess.value = false

    if (!trimmedEmail) {
      errorMessage.value = 'Required field.'
      return
    }
    if (!isValidEmail(trimmedEmail)) {
      errorMessage.value = 'Invalid address'
      return
    }

    const storedEmails = JSON.parse(localStorage.getItem(storageKey) || '[]')
    if (storedEmails.includes(trimmedEmail)) {
      errorMessage.value = 'The email address already exists'
      return
    }

    storedEmails.push(trimmedEmail)
    localStorage.setItem(storageKey, JSON.stringify(storedEmails))
    email.value = ''
    isSuccess.value = true
  }

  return {
    email,
    errorMessage,
    isSuccess,
    handleSubmit,
  }
}
