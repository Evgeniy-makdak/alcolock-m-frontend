export const copyContent = async (text: string | number, setState?: (state: boolean) => void) => {
  try {
    await navigator.clipboard.writeText(`${text}`);
    setState && setState(true);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to copy: ', err);
  }
};
