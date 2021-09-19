import {
  CategoryEntity,
  CreateCategoryDto,
  CreateProductDto,
  ProductEntity,
  ProductEntityWithCategory,
  UpdateCategoryDto,
  UpdateProductDto,
} from '@esc/product/models';
import { environment } from '@env/environment';

const baseUrlProducts = `${environment.baseUrlApi}/products`;
const baseUrlCategories = `${environment.baseUrlApi}/categories`;

export const getAllCategoriesFromServer = () => {
  cy.log('Get all categories');
  return cy.request<CategoryEntity[]>({
    url: baseUrlCategories,
    method: 'GET',
    failOnStatusCode: false,
  });
};

export const createCategoryOnServer = (
  category: CreateCategoryDto,
  token: string
) => {
  cy.log('Create category');
  return cy.request<CategoryEntity>({
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
  cy.log('Get category');
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
  cy.log('Update category');
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

export const deleteCategoryOnServer = (id: string, token: string) => {
  cy.log('Delete category');
  return cy.request({
    url: `${baseUrlCategories}/${id}`,
    method: 'DELETE',
    body: {
      id,
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
  cy.log('Create product');
  return cy.request<ProductEntity>({
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
  cy.log('Get product');
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
  cy.log('Update product');
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
  cy.log('Delete product');
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
  cy.log('Get all products');
  return cy.request({
    url: baseUrlProducts,
    method: 'GET',
    failOnStatusCode: false,
  });
};

export const getProductsWithCategory = (categories: string) => {
  cy.log('Get products with category');
  return cy.request<ProductEntityWithCategory[]>({
    url: `${baseUrlProducts}?categories=${categories}`,
    method: 'GET',
    failOnStatusCode: false,
  });
};

export const getProductsCount = () => {
  cy.log('Get products count');
  return cy.request({
    url: `${baseUrlProducts}/count`,
    method: 'GET',
    failOnStatusCode: false,
  });
};

export const getFeaturedProducts = (limit?: number) => {
  cy.log('Get featured products');
  return cy.request<ProductEntity[]>({
    url: `${baseUrlProducts}/featured/${limit ?? ''}`,
    method: 'GET',
    failOnStatusCode: false,
  });
};
