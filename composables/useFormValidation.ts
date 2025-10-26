import { reactive, ref } from 'vue'

export interface FormField {
  value: string
  error: string
}

export interface FormValidationRules {
  required?: boolean
  email?: boolean
  minLength?: number
  maxLength?: number
  custom?: (value: string) => string | null
}

export interface FormConfig {
  [fieldName: string]: FormValidationRules
}

/**
 * Composable для валидации форм
 *
 * @example
 * // Базовая конфигурация
 * const formConfig = {
 *   email: { required: true, email: true },
 *   password: { required: true, minLength: 6 }
 * }
 *
 * const { form, validateForm, errorMessage } = useFormValidation(formConfig)
 *
 * @example
 * // Расширенная конфигурация с кастомной валидацией
 * const formConfig = {
 *   username: {
 *     required: true,
 *     minLength: 3,
 *     custom: (value) => value.includes('admin') ? 'Username cannot contain "admin"' : null
 *   },
 *   email: { required: true, email: true },
 *   password: { required: true, minLength: 8, maxLength: 50 }
 * }
 *
 * @example
 * // Использование в компоненте
 * const { form, validateForm, resetForm } = useFormValidation(formConfig)
 *
 * const handleSubmit = () => {
 *   if (!validateForm()) return
 *   // Отправка формы
 * }
 */
export const useFormValidation = (config: FormConfig) => {
  const REQUIRED_FIELD_ERROR = 'Required field'
  const INVALID_EMAIL_ERROR = 'Invalid address'
  const MIN_LENGTH_ERROR = (min: number) => `Minimum length is ${min} characters`
  const MAX_LENGTH_ERROR = (max: number) => `Maximum length is ${max} characters`

  // Создаем реактивную форму на основе конфигурации
  const createForm = () => {
    const form: Record<string, FormField> = {}
    Object.keys(config).forEach((key) => {
      form[key] = { value: '', error: '' }
    })
    return reactive(form)
  }

  const form = createForm()
  const errorMessage = ref('')
  const successMessage = ref('')

  // Валидация email
  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  // Валидация отдельного поля
  const validateField = (fieldName: string, value: string): string => {
    const rules = config[fieldName]
    if (!rules) return ''

    const trimmedValue = value.trim()

    // Проверка обязательности поля
    if (rules.required && !trimmedValue) {
      return REQUIRED_FIELD_ERROR
    }

    // Если поле пустое и не обязательное, пропускаем остальные проверки
    if (!trimmedValue && !rules.required) {
      return ''
    }

    // Валидация email
    if (rules.email && !isValidEmail(trimmedValue)) {
      return INVALID_EMAIL_ERROR
    }

    // Проверка минимальной длины
    if (rules.minLength && trimmedValue.length < rules.minLength) {
      return MIN_LENGTH_ERROR(rules.minLength)
    }

    // Проверка максимальной длины
    if (rules.maxLength && trimmedValue.length > rules.maxLength) {
      return MAX_LENGTH_ERROR(rules.maxLength)
    }

    // Кастомная валидация
    if (rules.custom) {
      const customError = rules.custom(trimmedValue)
      if (customError) return customError
    }

    return ''
  }

  // Валидация всей формы
  const validateForm = (): boolean => {
    // Очищаем ошибки
    Object.keys(form).forEach((key) => {
      form[key].error = ''
    })
    errorMessage.value = ''

    let isValid = true

    // Валидируем каждое поле
    Object.keys(form).forEach((fieldName) => {
      const fieldError = validateField(fieldName, form[fieldName].value)
      if (fieldError) {
        form[fieldName].error = fieldError
        isValid = false
      }
    })

    return isValid
  }

  // Валидация отдельного поля по событию
  const validateFieldOnBlur = (fieldName: string) => {
    form[fieldName].error = validateField(fieldName, form[fieldName].value)
  }

  // Сброс формы
  const resetForm = () => {
    Object.keys(form).forEach((key) => {
      form[key].value = ''
      form[key].error = ''
    })
    errorMessage.value = ''
    successMessage.value = ''
  }

  // Получение значений формы без ошибок
  const getFormValues = () => {
    const values: Record<string, string> = {}
    Object.keys(form).forEach((key) => {
      values[key] = form[key].value
    })
    return values
  }

  return {
    form,
    errorMessage,
    successMessage,
    validateForm,
    validateFieldOnBlur,
    resetForm,
    getFormValues,
    isValidEmail,
  }
}
