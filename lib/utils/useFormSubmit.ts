import uploadFileAndGetFileUrl from 'lib/network/uploadFileAndGetUrl';
import { useCallback } from 'react';
import { Wish } from 'lib/types/Wish';
import fileListToFiles from 'lib/utils/fileListToFiles';
import APIClient from 'lib/network/apiClient';
import { SubmitHandler } from 'react-hook-form';

export type SubmitProgressEvent = {
  message: string;
  progress: number;
};

export type SubmitProgressHandler = (progressEvent: SubmitProgressEvent) => void;

const useFormSubmit = (onProgress: SubmitProgressHandler): SubmitHandler<Wish> => {
  const onSubmit = useCallback(async (data: Wish) => {
    const images = await uploadFileAndGetFileUrl({
      files: fileListToFiles(data.images),
      onProgress,
    });

    const apiClient = new APIClient();
    onProgress({
      progress: 0,
      message: 'Finalizing wish submission...',
    });
    await apiClient.submitWish({
      ...data,
      images,
    });
    onProgress({
      progress: 100,
      message: 'Wish submitted successfully.',
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }, []);

  return onSubmit;
};

export default useFormSubmit;
