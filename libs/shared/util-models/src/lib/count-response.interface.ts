export type CountResponse = {
  [key in CountEnum]?: number;
};

export enum CountEnum {
  PRODUCT_COUNT = 'product_count',
  USER_COUNT = 'user_count',
  SALES_COUNT = 'total_sales',
  ORDER_COUNT = 'order_count',
}
