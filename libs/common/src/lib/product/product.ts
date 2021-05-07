export enum ProductType {
  COKE = 'COKE',
  PEPSI = 'PEPSI',
  DEW = 'DEW',
}
export interface IProductRequest {
  type: string;
  count: number;
}
export interface IProduct extends IProductRequest {
  rate: number;
}
