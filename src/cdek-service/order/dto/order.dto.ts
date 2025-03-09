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
