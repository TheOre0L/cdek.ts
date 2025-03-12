import { UUID } from "crypto";

export interface CdekAuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  jti: string;
}

export interface CdekTariffRequest {
  type: number;
  from_location: { code: number };
  to_location: { code: number };
  packages: { weight: number; length: number; width: number; height: number }[];
}

export interface CdekTariffResponse {
  tariff_code: number;
  price: number;
  delivery_period_min: number;
  delivery_period_max: number;
}

export interface CdekDeliveryPointRequest {
  code?: string;
  type?: string;
  postal_code?: string;
  city_code?: string;
  country_code: string;
  region_code?: number;
  allowed_cod?: boolean;
  is_handout?: boolean;
  size: number;
  page?: number;
}

export interface CdekDeliveryPointResponse {
  uuid: UUID;
  code: string;
  type: string;
  name: string;
  address_comment?: string;
  work_time?: string;
  phones?: [];
  email?: string;
  owner_code?: string;
  location: LocationCdekPoint;
  size: number;
  page?: number;
}

export interface LocationCdekPoint {
  country_code: string;
  region_code: number;
  region: string;
  city_code: number;
  city: string;
  postal_code: string;
  longitude: number;
  latitude: number;
  address: string;
  address_full: string;
  city_uuid: UUID;
}
