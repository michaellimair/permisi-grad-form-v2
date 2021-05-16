import axios from 'axios';
import APIClient, { SignedURLResponse } from 'lib/network/apiClient';

function getPathFromUrl(url: string) {
  return url.split('?').shift();
}

const getProxiedUploadUrl = (url) => url.replace('https://storage.googleapis.com/', 'https://');

const uploadFileAndGetFileUrl = async ({
  files,
  onProgress,
}: {
  files: File[];
  // eslint-disable-next-line no-unused-vars
  onProgress: (data: { message: string, progress: number }) => void;
}) => {
  const apiClient = new APIClient();
  const uploadResponse: SignedURLResponse[] = [];
  for (let i = 0; i < files.length; i += 1) {
    onProgress({
      message: `Preparing to upload image(s) ${i + 1}/${files.length}`,
      progress: (i + 1) / files.length,
    });
    // eslint-disable-next-line no-await-in-loop
    uploadResponse.push(await apiClient.generateSignedURL(files[i]));
  }

  // Perform PUT upload for the different images in Firebase
  for (let i = 0; i < files.length; i += 1) {
    onProgress({
      message: `Uploading images ${i + 1}/${files.length}`,
      progress: 0,
    });
    // eslint-disable-next-line no-await-in-loop
    await axios.put(uploadResponse[i].directUploadUrl, files[i], {
      headers: uploadResponse[i].headers,
      onUploadProgress: (progressEvent) => {
        const currentProgress = (progressEvent.loaded * 100) / files[i].size;
        onProgress({
          message: `Uploading images ${i + 1}/${files.length} (${Math.round(currentProgress)}%)`,
          progress: progressEvent.loaded / files[i].size,
        });
      },
    });
  }

  return uploadResponse.map((resp) => getPathFromUrl(getProxiedUploadUrl(resp.directUploadUrl)));
};

export default uploadFileAndGetFileUrl;
