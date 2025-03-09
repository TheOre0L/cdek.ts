// service/Cdek.ts
import { UUID } from "crypto";
import { CdekAuthService } from "./auth/auth.service";
import { RegisterOrderDto, UpdateOrderDto } from "./order/dto/order.dto";
import { CdekOrderService } from "./order/order.service";
import { CdekTariffService } from "./tariff/tariff.service";
import {
  CdekDeliveryPointRequest,
  CdekDeliveryPointResponse,
  CdekTariffRequest,
  CdekTariffResponse,
} from "./types";
import { CdekLocationService } from "./location/location.service";

export class Cdek {
  public authService: CdekAuthService;
  public tariffService: CdekTariffService;
  public orderService: CdekOrderService;
  public locationService: CdekLocationService;

  constructor(clientId: string, clientSecret: string, baseUrl: string) {
    this.authService = new CdekAuthService(clientId, clientSecret, baseUrl);
    this.tariffService = new CdekTariffService(this.authService);
    this.orderService = new CdekOrderService(this.authService);
    this.locationService = new CdekLocationService(this.authService);
  }

  public async getTariff(
    request: CdekTariffRequest
  ): Promise<CdekTariffResponse[]> {
    const response = await this.tariffService.getTariff(request);
    return response;
  }

  public async getDeliveryPoints(
    request: CdekDeliveryPointRequest
  ): Promise<CdekDeliveryPointResponse[]> {
    return await this.tariffService.getDeliveryPoints(request);
  }

  public async orderRegister(request: RegisterOrderDto): Promise<any> {
    return await this.orderService.register(request);
  }

  public async orderUpdate(request: UpdateOrderDto): Promise<any> {
    return await this.orderService.update(request);
  }

  public async getOrderByUUID(uuid: UUID): Promise<any> {
    return await this.orderService.getOrderByUUID(uuid);
  }

  public async getLocationsByCity(request: {
    name: string;
    country_code?: string;
  }): Promise<any> {
    return await this.locationService.getLocationByCity(request);
  }
}
