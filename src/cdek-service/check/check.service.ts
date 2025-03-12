import axios from "axios";
import { CdekAuthService } from "../auth/auth.service";
import { UUID } from "crypto";
import { CheckInfoDto, CheckInfoResponseDto } from "./dto/check.dto";

export class CdekCheckService {
  private client: Axios.AxiosInstance;
  private authService: CdekAuthService;

  constructor(authService: CdekAuthService) {
    this.authService = authService;
    this.client = axios.create({
      baseURL: authService.baseUrl,
      headers: { "Content-Type": "application/json" },
    });
  }

  public async getCheckInfo(request: CheckInfoDto): Promise<CheckInfoResponseDto[]> {
    await this.authService.authenticate();
    const { data } = await this.client.get(`/check`, {
      headers: { Authorization: `Bearer ${this.authService.getToken()}` },
      params: { order_uuid: request.order_uuid, cdek_number: request.cdek_number, date: request.date },
    });
    return data as CheckInfoResponseDto[];
  }
}
