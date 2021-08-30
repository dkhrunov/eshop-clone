import { CreateOrderDto } from '@esc/order/models';
import { environment } from '../../../../environments/environment';

const baseUrlOrders = `${environment.baseUrlApi}/orders`;

export const createOrderOnServer = (order: CreateOrderDto) => {
  cy.log('Create order');
  cy.request({ url: baseUrlOrders });
};
