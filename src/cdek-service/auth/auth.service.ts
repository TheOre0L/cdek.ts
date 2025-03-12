import axios from "axios";
import { CdekAuthResponse } from "../types";

export class CdekAuthService {
  private client: Axios.AxiosInstance;
  private token: string | null = null;
  private tokenExpiresAt: number | null = null;

  constructor(
    private clientId: string,
    private clientSecret: string,
    public baseUrl: string
  ) {
    this.client = axios.create({
      baseURL: baseUrl,
      headers: { "Content-Type": "application/json" },
    });
  }

  public async authenticate(): Promise<void> {
    if (this.token && this.tokenExpiresAt && Date.now() < this.tokenExpiresAt) {
      return;
    }

    const { data } = await this.client.post<CdekAuthResponse>(
      "/oauth/token",
      null,
      {
        params: {
          grant_type: "client_credentials",
          client_id: this.clientId,
          client_secret: this.clientSecret,
        },
      }
    );

    this.token = data.access_token;
    this.tokenExpiresAt = Date.now() + data.expires_in * 1000;
  }

  public getToken(): string | null {
    return this.token;
  }
}
