interface Error {
  field: string;
  message?: string;
}

export const mapFieldError = (errors: Error[], name: string) => {
  if (!errors) return [];

  const nameError = errors.find((item) => item?.field === name);

  if (nameError) {
    return [nameError?.message];
  } else {
    return [];
  }
};
