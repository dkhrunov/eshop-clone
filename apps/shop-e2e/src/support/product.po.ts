import {
  CreateCategoryDto,
  CreateProductDto,
  ProductEntity,
  ProductEntityWithCategory,
  UpdateCategoryDto,
  UpdateProductDto,
} from '@esc/product/models';
import { environment } from '../../../../environments/environment';

const baseUrlProducts = `${environment.baseUrlApi}/products`;
const baseUrlCategories = `${environment.baseUrlApi}/categories`;

export const getAllCategoriesFromServer = () => {
  return cy.request({
    url: baseUrlCategories,
    method: 'GET',
    failOnStatusCode: false,
  });
};

export const createCategoryOnServer = (
  category: CreateCategoryDto,
  token: string
) => {
  return cy.request({
    url: baseUrlCategories,
    method: 'POST',
    body: {
      ...category,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
    failOnStatusCode: false,
  });
};

export const getCategoryFromServer = (id: string) => {
  return cy.request({
    url: `${baseUrlCategories}/${id}`,
    method: 'GET',
    failOnStatusCode: false,
  });
};

export const updateCategoryOnServer = (
  id: string,
  category: UpdateCategoryDto,
  token: string
) => {
  return cy.request({
    url: `${baseUrlCategories}/${id}`,
    method: 'PUT',
    body: {
      ...category,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
    failOnStatusCode: false,
  });
};

export const createProductOnServer = (
  product: CreateProductDto,
  category: string,
  token: string
) => {
  return cy.request({
    url: baseUrlProducts,
    method: 'POST',
    body: {
      ...product,
      category,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
    failOnStatusCode: false,
  });
};

export const getProductFromServer = (id: string) => {
  return cy.request({
    url: `${baseUrlProducts}/${id}`,
    method: 'GET',
    failOnStatusCode: false,
  });
};

export const updateProductOnServer = (
  id: string,
  product: UpdateProductDto,
  token: string
) => {
  return cy.request({
    url: `${baseUrlProducts}/${id}`,
    method: 'PUT',
    body: {
      ...product,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
    failOnStatusCode: false,
  });
};

export const deleteProductOnServer = (id: string, token: string) => {
  return cy.request({
    url: `${baseUrlProducts}/${id}`,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    failOnStatusCode: false,
  });
};

export const getAllProductsFromServer = () => {
  return cy.request({
    url: baseUrlProducts,
    method: 'GET',
    failOnStatusCode: false,
  });
};

export const getProductsWithCategory = (categories: string) => {
  return cy.request<ProductEntityWithCategory[]>({
    url: `${baseUrlProducts}?categories=${categories}`,
    method: 'GET',
    failOnStatusCode: false,
  });
};

export const getProductsCount = () => {
  return cy.request({
    url: `${baseUrlProducts}/count`,
    method: 'GET',
    failOnStatusCode: false,
  });
};

export const getFeaturedProducts = (limit?: number) => {
  return cy.request<ProductEntity[]>({
    url: `${baseUrlProducts}/featured/${limit ? limit : ''}`,
    method: 'GET',
    failOnStatusCode: false,
  });
};
