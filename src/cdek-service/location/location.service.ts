import axios from "axios";
import { CdekAuthService } from "../auth/auth.service";
import { UUID } from "crypto";
import { CityListResponseDto, CitysListDto, LocationByCityDto, LocationByCityResponseDto } from "./dto/location.dto";

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
  public async getLocationByCity(request: LocationByCityDto): Promise<LocationByCityResponseDto[]> {
    await this.authService.authenticate();
    const { data } = await this.client.get(`/location/suggest/cities`, {
      headers: { Authorization: `Bearer ${this.authService.getToken()}` },
      params: { name: request.name, country_code: request.country_code },
    });
    return data as LocationByCityResponseDto[];
  }

  public async getCitysList(request: CitysListDto): Promise<CityListResponseDto[]> {
    await this.authService.authenticate();
    const { data } = await this.client.get(
      `/location/cities`,

      {
        headers: { Authorization: `Bearer ${this.authService.getToken()}` },
        params: { 
          country_codes: request.country_codes, 
          region_code: request.region_code, 
          size: request.size, 
          page: request.page, 
          lang: request.lang 
        },
      }
    );
    return data as CityListResponseDto[];
  }

  //Выяснить, в чем проблема со списком регионов
  /*public async getRegionList(request: {
    country_codes: string[];
    size: number;
    page: number;
    lang: string;
  }): Promise<{ region: string, region_code: number, country: string, country_code: string }[]> {
    await this.authService.authenticate();
    const { data } = await this.client.get(
      `/location/regions`,

      {
        headers: { Authorization: `Bearer ${this.authService.getToken()}` },
        params: { 
          country_codes: request.country_codes, 
          size: request.size, 
          page: request.page, 
          lang: request.lang, 
        },
      }
    );
    return data as any;
  }*/
}
