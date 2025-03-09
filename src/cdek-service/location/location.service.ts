import axios from "axios";
import { CdekAuthService } from "../auth/auth.service";
import { UUID } from "crypto";

export class CdekLocationService {
  private client: Axios.AxiosInstance;
  private authService: CdekAuthService;

  constructor(authService: CdekAuthService) {
    this.authService = authService;
    this.client = axios.create({
      baseURL: authService.baseUrl,
      headers: { "Content-Type": "application/json" },
    });
  }
  public async getLocationByCity(request: {
    name: string;
    country_code?: string;
  }): Promise<{ city_uuid: UUID; code: number; full_name: string }[]> {
    const { data } = await this.client.get(
      `/location/suggest/cities`,

      {
        headers: { Authorization: `Bearer ${this.authService.getToken()}` },
        params: { name: request.name, country_code: request.country_code },
      }
    );
    return data as any;
  }
}
