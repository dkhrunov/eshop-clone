import { CreateOrderDto, OrderEntity } from '@esc/order/models';
import { CountResponse } from '@esc/shared/util-models';
import { environment } from '@env/environment';

const baseUrlOrders = `${environment.baseUrlApi}/orders`;

export const createOrderOnServer = (order: CreateOrderDto, token: string) => {
  cy.log('Create order');
  return cy.request({
    url: baseUrlOrders,
    method: 'POST',
    body: { ...order },
    headers: {
      Authorization: `Bearer ${token}`,
    },
    failOnStatusCode: false,
  });
};

export const getAllOrdersFromServer = (token: string) => {
  cy.log('Get orders from order');
  return cy.request({
    url: baseUrlOrders,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    failOnStatusCode: false,
  });
};

export const getOrderFromServer = (id: string, token: string) => {
  cy.log('Get order from order');
  return cy.request({
    url: `${baseUrlOrders}/${id}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    failOnStatusCode: false,
  });
};

export const updateOrderStatus = (
  id: string,
  status: string,
  token: string
) => {
  cy.log('Update order status');
  return cy.request({
    url: `${baseUrlOrders}/${id}`,
    method: 'PUT',
    body: {
      status,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
    failOnStatusCode: false,
  });
};

export const deleteOrderOnServer = (id: string, token: string) => {
  cy.log('Delete order');
  return cy.request({
    url: `${baseUrlOrders}/${id}`,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    failOnStatusCode: false,
  });
};

export const getTotalSales = (token: string) => {
  cy.log('Get total sales');
  return cy.request<CountResponse>({
    url: `${baseUrlOrders}/totalsales`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    failOnStatusCode: false,
  });
};

export const getOrderCount = (token: string) => {
  cy.log('Get order count');
  return cy.request<CountResponse>({
    url: `${baseUrlOrders}/count`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    failOnStatusCode: false,
  });
};

export const getUserOrders = (id: string, token: string) => {
  cy.log('Get user orders');
  return cy.request<OrderEntity[]>({
    url: `${baseUrlOrders}/user/${id}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    failOnStatusCode: false,
  });
};
