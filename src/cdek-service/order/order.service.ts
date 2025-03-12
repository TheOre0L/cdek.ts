import axios from "axios";

import { CdekAuthService } from "../auth/auth.service";
import { DeleteResponseDto, OrderByUUIDResponseDto, RefusalResponseDto, RegisterOrderDto, RegisterOrderResponseDto, UpdateOrderDto, UpdateOrderResponseDto } from "./dto/order.dto";
import { UUID } from "crypto";

export class CdekOrderService {
  private client: Axios.AxiosInstance;
  private authService: CdekAuthService;

  constructor(authService: CdekAuthService) {
    this.authService = authService;
    this.client = axios.create({
      baseURL: authService.baseUrl,
      headers: { "Content-Type": "application/json" },
    });
  }

  public async register(request: RegisterOrderDto): Promise<RegisterOrderResponseDto> {
    await this.authService.authenticate();
    try {
      const response = await this.client.post<any>("/orders", request, {
        headers: { Authorization: `Bearer ${this.authService.getToken()}` },
      });
      return response.data as RegisterOrderResponseDto;
    } catch (error: any) {
      if (error.response) {
        throw new Error(
          JSON.stringify(error.response.data.requests?.[0]?.errors, null, 2)
        );
      } else {
        throw new Error(`Ошибка запроса: ${error.message}`);
      }
    }
  }

  public async update(request: UpdateOrderDto): Promise<UpdateOrderResponseDto> {
    await this.authService.authenticate();
    try {
      const response = await this.client.patch<any>("/orders", request, {
        headers: { Authorization: `Bearer ${this.authService.getToken()}` },
      });
      return response.data as UpdateOrderResponseDto;
    } catch (error: any) {
      if (
        error.response.data.requests?.[0]?.errors[0].code ===
        "v2_entity_not_found"
      ) {
        throw new Error(`Заказ с таким uuid (${request.uuid}) не найден!`);
      }
      if (error.response) {
        throw new Error(
          JSON.stringify(error.response.data.requests?.[0]?.errors, null, 2)
        );
      } else {
        throw new Error(`Ошибка запроса: ${error.message}`);
      }
    }
  }

  public async registrationOfRefusal(uuid: UUID): Promise<RefusalResponseDto> {
    await this.authService.authenticate();
    try {
      const response = await this.client.post<any>(`/orders/${uuid}/refusal`, {
        headers: { Authorization: `Bearer ${this.authService.getToken()}` },
      });
      return response.data as RefusalResponseDto;
    } catch (error: any) {
      if (
        error.response.data.requests?.[0]?.errors[0].code ===
        "v2_entity_not_found"
      ) {
        throw new Error(`Заказ с таким uuid (${uuid}) не найден!`);
      }
      if (error.response) {
        throw new Error(
          JSON.stringify(error.response.data.requests?.[0]?.errors, null, 2)
        );
      } else {
        throw new Error(`Ошибка запроса: ${error.message}`);
      }
    }
  }

  /**
   * @async
   * @param uuid
   * @returns {orderInfo}
   */

  public async remove(uuid: UUID): Promise<DeleteResponseDto> {
    await this.authService.authenticate();
    try {
      const response = await this.client.delete<any>(`/orders/${uuid}`, {
        headers: { Authorization: `Bearer ${this.authService.getToken()}` },
      });
      return response.data as DeleteResponseDto;
    } catch (error: any) {
      if (
        error.response.data.requests?.[0]?.errors[0].code ===
        "v2_entity_not_found"
      ) {
        throw new Error(`Заказ с таким uuid (${uuid}) не найден!`);
      }
      if (error.response) {
        throw new Error(
          JSON.stringify(error.response.data.requests?.[0]?.errors, null, 2)
        );
      } else {
        throw new Error(`Ошибка запроса: ${error.message}`);
      }
    }
  }

  public async getOrderByUUID(uuid: UUID): Promise<OrderByUUIDResponseDto> {
    await this.authService.authenticate();
    try {
      const response = await this.client.get<any>(`/orders/${uuid}`, {
        headers: { Authorization: `Bearer ${this.authService.getToken()}` },
      });
      return response.data as OrderByUUIDResponseDto;
    } catch (error: any) {
      if (
        error.response.data.requests?.[0]?.errors[0].code ===
        "v2_entity_not_found"
      ) {
        throw new Error(`Заказ с таким uuid (${uuid}) не найден!`);
      }
      if (error.response) {
        throw new Error(
          JSON.stringify(error.response.data.requests?.[0]?.errors, null, 2)
        );
      } else {
        throw new Error(`Ошибка запроса: ${error.message}`);
      }
    }
  }
}
