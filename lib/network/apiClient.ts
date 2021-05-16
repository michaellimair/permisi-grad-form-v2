import axios, { AxiosInstance } from 'axios';
import { Wish } from 'lib/types/Wish';

export interface SignedURLResponse {
  directUploadUrl: string;
  uploadFileName: string;
  headers: Record<string, string>;
  message: string;
}

export interface WishPayload extends Omit<Wish, 'images'> {
  images: string[];
}

class APIClient {
  private static instance: APIClient;

  private readonly http: AxiosInstance;

  constructor() {
    if (APIClient.instance) {
      return APIClient.instance;
    }

    const baseURL = 'https://wishes.permisi.hk/api/v2';

    this.http = axios.create({
      baseURL,
      timeout: 20000,
    });

    Object.freeze(this.http);
    Object.freeze(this);
    APIClient.instance = this;
  }

  uploadFile = async ({
    url,
    file,
    headers,
  }: {
    file: File;
    headers: Record<string, string>;
    url: string;
  }) => this.http
    .put(url, file, { headers });

  generateSignedURL = async (file: File): Promise<SignedURLResponse> => this.http
    .post<SignedURLResponse>(
      '/generateSignedUrl', {
        filename: file.name,
        contentLength: file.size,
        contentType: file.type,
      },
    ).then((res) => res.data);

  submitWish = async (wish: WishPayload) => this.http.post(
    '/submitWish',
    wish,
  )
}

export default APIClient;
