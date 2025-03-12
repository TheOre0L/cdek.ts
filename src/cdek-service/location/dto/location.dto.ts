import { UUID } from "crypto";

export interface LocationByCityDto {
  name: string;
  country_code?: string;
};

export interface LocationByCityResponseDto {
  city_uuid: UUID;
  code: number;
  full_name: string
}

export interface CitysListDto {
  country_codes: Array<string>;
  region_code: number;
  size: number;
  page: number;
  lang: string;
}

export interface CityListResponseDto {
  code: number; 
  city_uuid: UUID; 
  city: string; 
  country_code: string; 
  country: string; 
  region: string; 
  payment_limit: number
}