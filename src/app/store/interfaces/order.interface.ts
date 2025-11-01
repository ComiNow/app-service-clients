export interface OrderServiceRequest {
  table: number
  paidMethodType: PaidMethodType;
  items: Item[];
  businessId: string;
  serviceCharge?: boolean;
}

export interface Item {
  productId: number;
  price: number;
  quantity: number;
}

export enum PaidMethodType {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  CASH = 'CASH',
  BANK_TRANSFER = 'BANK_TRANSFER',
  ONLINE = 'ONLINE',
}

export interface OrderServiceResponse {
  order: Order;
  paymentPreference: PaymentPreference;
}

export interface Order {
  id: number;
  totalAmount: number;
  totalItems: number;
  status: string;
  paid: boolean;
  paiddAt: null;
  createdAt: Date;
  OrderItem: OrderItem[];
}

export interface OrderItem {
  price: number;
  quantity: number;
  productId: number;
  name: string;
}

export interface PaymentPreference {
  preferenceId: string;
  init_point: string;
}

export interface TableResponse {
  id: string;
  number: number;
}

export interface OrderPositionResponse {
  orderPosition: number;
}

export interface PaidOrderRespnse {
  id:             number;
  totalAmount:    number;
  totalItems:     number;
  status:         string;
  paid:           boolean;
  paidMethodType: string;
  paiddAt:        Date;
  createdAt:      Date;
  tableId:        string;
}
