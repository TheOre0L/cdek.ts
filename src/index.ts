// service/Cdek.ts
import { UUID } from "crypto";
import { CdekAuthService } from "./cdek-service/auth/auth.service";
import {
  RegisterOrderDto,
  UpdateOrderDto,
} from "./cdek-service/order/dto/order.dto";
import { CdekOrderService } from "./cdek-service/order/order.service";
import { CdekTariffService } from "./cdek-service/tariff/tariff.service";
import {
  CdekDeliveryPointRequest,
  CdekDeliveryPointResponse,
  CdekTariffRequest,
  CdekTariffResponse,
} from "./cdek-service/types";
import { CdekLocationService } from "./cdek-service/location/location.service";
import { CdekCheckService } from "./cdek-service/check/check.service";

export class Cdek {
  public authService: CdekAuthService;
  public tariffService: CdekTariffService;
  public orderService: CdekOrderService;
  public locationService: CdekLocationService;
  public checkService: CdekCheckService;

  constructor(clientId: string, clientSecret: string, baseUrl: string) {
    this.authService = new CdekAuthService(clientId, clientSecret, baseUrl);
    this.tariffService = new CdekTariffService(this.authService);
    this.orderService = new CdekOrderService(this.authService);
    this.locationService = new CdekLocationService(this.authService);
    this.checkService = new CdekCheckService(this.authService);
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

  public async removeOrder(uuid: UUID): Promise<any> {
    return await this.orderService.remove(uuid);
  }

  public async registrationOfRefusal(uuid: UUID): Promise<any> {
    return await this.orderService.registrationOfRefusal(uuid);
  }

  public async getLocationsByCity(request: {
    name: string;
    country_code?: string;
  }): Promise<any> {
    return await this.locationService.getLocationByCity(request);
  }

  public async getCitysList(request: {
    country_codes: Array<string>;
    region_code: number;
    size: number;
    page: number;
    lang: string;
  }): Promise<any> {
    return await this.locationService.getCitysList(request);
  }

  //Решить проблему с регионами
  /*public async getRegionList(request: {
    country_codes: Array<string>;
    size: number;
    page: number;
    lang: string;
  }): Promise<any> {
    return await this.locationService.getRegionList(request);
  }*/

  public async getCheckInfo(request: {
    order_uuid: UUID;
    cdek_number?: string;
    date?: string;
  }): Promise<any> {
    return await this.checkService.getCheckInfo(request);
  }
}
