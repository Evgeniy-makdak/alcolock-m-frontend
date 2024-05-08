import { useImageApi } from '../api/useImageApi';

export const useImage = (url: string) => {
  const { data, isLoading } = useImageApi(url);
  const img = data?.data;
  // Нужно для того чтоб  URL.createObjectURL не ложил страницу если в ответе не Blob
  if (!img || !(img instanceof Blob))
    return {
      img: '',
      isLoading,
    };

  return {
    img: URL.createObjectURL(img),
    isLoading,
  };
};
