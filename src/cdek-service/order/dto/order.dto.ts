import { UUID } from "crypto";

export interface RegisterOrderDto {
  type: number;
  number: string;
  tariff_code: number;
  sender: {
    company: string;
    name: string;
    phones: { number: string }[];
  };
  recipient: {
    name: string;
    phones: { number: string }[];
  };
  from_location: { code: number };
  to_location: {
    code: number;
    address: string;
  };
  packages: {
    number: string;
    weight: number;
    length: number;
    width: number;
    height: number;
    items: {
      name: string;
      ware_key: string;
      quantity: number;
      price: number;
      weight: number;
      amount: number;
      cost: number;
      payment: {
        value: number;
      };
    }[];
  }[];
}

export interface UpdateOrderDto {
  uuid: string;
  type?: number;
  number?: string;
  tariff_code?: number;
  sender?: {
    company?: string;
    name?: string;
    phones?: { number: string }[];
  };
  recipient?: {
    name?: string;
    phones?: { number: string }[];
  };
  from_location?: { code?: number };
  to_location?: {
    code?: number;
    address?: string;
  };
  packages?: {
    number?: string;
    weight?: number;
    length?: number;
    width?: number;
    height?: number;
    items?: {
      name?: string;
      ware_key?: string;
      quantity?: number;
      price?: number;
      weight?: number;
      amount?: number;
      cost?: number;
      payment?: {
        value?: number;
      };
    }[];
  }[];
}

export interface RegisterOrderResponseDto {
  entity?: {uuid: UUID}, 
  requests: Array<{
    request_uuid?: UUID;
    type: string;
    date_time: string;
    state: string;
    errors: Array<{
      code: string;
      message: string;
    }>
    warnings: Array<{
      code: string;
      message: string;
    }>
  }>, 
  related_entities?: Array<{
    uuid: UUID;
    type: string;
    url?: string;
    create_time?: string;
    cdek_number?: string;
    date?: string;
    time_from?: string;
    time_to?: string;
  }>
}

export interface UpdateOrderResponseDto extends RegisterOrderResponseDto {};
export interface RefusalResponseDto extends RegisterOrderResponseDto {};
export interface DeleteResponseDto extends RegisterOrderResponseDto {};
export interface OrderByUUIDResponseDto extends RegisterOrderResponseDto {};
