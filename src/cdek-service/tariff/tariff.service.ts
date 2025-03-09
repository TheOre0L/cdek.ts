import axios from "axios";
import {
  CdekTariffRequest,
  CdekTariffResponse,
  CdekDeliveryPointResponse,
  CdekDeliveryPointRequest,
} from "../types";
import { CdekAuthService } from "../auth/auth.service";

export class CdekTariffService {
  private client: Axios.AxiosInstance;
  private authService: CdekAuthService;

  constructor(authService: CdekAuthService) {
    this.authService = authService;
    this.client = axios.create({
      baseURL: authService.baseUrl,
      headers: { "Content-Type": "application/json" },
    });
  }

  public async getTariff(
    request: CdekTariffRequest
  ): Promise<CdekTariffResponse[]> {
    await this.authService.authenticate();

    const { data } = await this.client.post<CdekTariffResponse>(
      "/calculator/tarifflist",
      request,
      {
        headers: { Authorization: `Bearer ${this.authService.getToken()}` },
      }
    );

    return data as unknown as CdekTariffResponse[];
  }

  public async getDeliveryPoints(
    request: CdekDeliveryPointRequest
  ): Promise<CdekDeliveryPointResponse[]> {
    try {
      await this.authService.authenticate();

      const params = new URLSearchParams({
        country_code: request.country_code || "RU",
        ...(request.code && { code: request.code }),
        ...(request.type && { type: request.type }),
        ...(request.postal_code && { postal_code: request.postal_code }),
        ...(request.city_code && { city_code: request.city_code }),
        ...(request.region_code !== undefined && {
          region_code: String(request.region_code),
        }),
        ...(request.is_handout !== undefined && {
          is_handout: String(request.is_handout),
        }),
        ...(request.size && { size: String(request.size) }),
        ...(request.page && { page: String(request.page) }),
      });

      const { data } = await this.client.get(
        `/deliverypoints?${params.toString()}`,
        {
          headers: { Authorization: `Bearer ${this.authService.getToken()}` },
        }
      );

      return data as CdekDeliveryPointResponse[];
    } catch (error) {
      if (typeof error === "object" && error !== null) {
        const err = error as any;
        console.error(
          err.response?.data?.errors?.[0]?.message ||
            err.message ||
            "Неизвестная ошибка"
        );
      } else {
        console.error("Произошла неизвестная ошибка", error);
      }
      throw error;
    }
  }
}
