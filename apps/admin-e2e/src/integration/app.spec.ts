import { environment } from '@env/environment';
import { CreateProductDto } from '@esc/product/models';
import { generateCategory, generateProduct } from '@esc/shared/util-helpers';

import {
  createCategory,
  deleteCategory,
  getCategoriesList,
  mapCategoriesToNames,
  updateCategory,
} from '../support/categories.po';
import {
  createProduct,
  deleteProduct,
  getProductsList,
  updateProduct,
} from '../support/products.po';

describe('Admin App', () => {
  beforeEach(() => {
    cy.visit(`${environment.baseUrlFrontAdmin}`);
    cy.viewport(600, 500);
    cy.viewport(1000, 800);
  });
  it('Show main dashboard', () => {
    //TODO
  });

  context('Categories', () => {
    it('Delete Category', () => {
      const category = generateCategory();
      const { name } = category;

      createCategory(category);

      deleteCategory(name);

      cy.get('button').contains('No').click().should('not.exist');

      deleteCategory(name);

      cy.get('button').contains('Yes').click().should('not.exist');
    });

    it('Create category', () => {
      const category = generateCategory();
      const { name } = category;

      createCategory(category);

      cy.get('[data-cy=category]').should('contain', name);
    });

    it('Edit category', () => {
      const category = generateCategory();
      const { name } = category;

      createCategory(category);

      updateCategory(name, 'Updated Category');

      updateCategory('Updated Category', name);

      cy.contains(name);
    });

    it('List categories', () => {
      cy.visit('categories');
      getCategoriesList().each((category) => {
        cy.wrap(category).should('be.visible');
      });
    });

    it('Sort categories', () => {
      cy.visit('categories');

      cy.get('[data-cy=sortTableByName]').click();

      getCategoriesList()
        .then(mapCategoriesToNames)
        .then((unsortedCategories) => {
          const sortedCategories = unsortedCategories.slice().sort();
          expect(unsortedCategories).to.be.deep.eq(sortedCategories);
        });

      cy.get('[data-cy=sortTableByName]').click();

      getCategoriesList()
        .then(mapCategoriesToNames)
        .then((unsortedCategories) => {
          const sortedCategories = unsortedCategories
            .slice()
            .sort((a: string, b: string) => b.localeCompare(a));
          expect(unsortedCategories).to.be.deep.eq(sortedCategories);
        });
    });
  });

  context('Products', () => {
    it('List products', () => {
      cy.visit('products');
    });
    it('Create product', () => {
      const product = generateProduct();

      createProduct(product);

      getProductsList().should('contain', product.name);
    });
    it('Delete product', () => {
      const product = generateProduct();
      const { name } = product;

      createProduct(product);

      deleteProduct(name);

      cy.get('button').contains('Yes').click().should('not.exist');
    });

    it('Edit product', () => {
      const product = generateProduct();
      const { name } = product;

      createProduct(product);

      updateProduct(name, 'Updated Product');

      updateProduct('Updated Product', name);

      cy.contains(name);
    });
  });
});
