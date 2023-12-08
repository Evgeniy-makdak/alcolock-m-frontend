import {SERVER_ERRORS} from "./server_errors";

export const getErrorMessagesFromServer = (error) => {
  if (!error) return []

  if (Array.isArray(error?.response?.fieldErrors)) {
    return error.response.fieldErrors.map(error => {
      const field = SERVER_ERRORS[error.field] ?? error.field
      return `${field}: ${error.message}`
    })
  } else if (error?.response?.detail) {
    const message = SERVER_ERRORS[error.response.detail]

    if (message) {
      return [message]
    } else {
      return [error.response.detail]
    }
  } else if (error?.response?.message) {
    const message = SERVER_ERRORS[error.response.message]
    if (message) {
      return [message]
    } else {
      return [error.response.message]
    }
  } else {
    return []
  }
}
