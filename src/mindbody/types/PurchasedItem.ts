import type { DeepReadonly } from '$types';

export type PurchasedItem = DeepReadonly<{
  SaleDetailId: number;
  Id: number;
  IsService: boolean;
  BarcodeId: string;
  Description: string;
  ContractId: number;
  CategoryId: number;
  SubCategoryId: number;
  UnitPrice: number;
  Quantity: number;
  DiscountPercent: number;
  DiscountAmount: number;
  Tax1: number;
  Tax2: number;
  Tax3: number;
  Tax4: number;
  Tax5: number;
  TaxAmount: number;
  TotalAmount: number;
  Notes: string;
  Returned: boolean;
  PaymentRefId: number;
  ExpDate: string;
  ActiveDate: string;
}>;
