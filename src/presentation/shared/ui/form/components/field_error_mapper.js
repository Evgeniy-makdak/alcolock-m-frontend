export const mapFieldError = (errors, name) => {
  if (!errors) return []

  const nameError = errors.find(item => item.field === name)

  if (nameError) {
    return [nameError.message]
  } else {
    return []
  }
}
