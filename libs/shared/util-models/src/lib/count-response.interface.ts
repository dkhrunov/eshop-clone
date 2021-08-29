export type CountResponse = {
  [key in CountEnum]?: number;
};

export enum CountEnum {
  PRODUCT_COUNT = 'product_count',
  USER_COUNT = 'user_count',
}
