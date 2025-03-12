import { UUID } from "crypto";

export interface CheckInfoDto {
  order_uuid: UUID;
  cdek_number?: string;
  date?: string;
}

export interface CheckInfoResponseDto {
  errors: Array<Object>;
  warnings: Array<Object>;
  check_info: Array<Object>;
}