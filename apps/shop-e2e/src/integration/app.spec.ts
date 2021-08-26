import { environment } from '../../../../environments/environment';
import {
  generateProduct,
  generateCategory,
  generateNonExistentCategoryId,
} from '@esc/shared/util-helpers';

describe('Eshop Clone', () => {
  const baseUrlProducts = `${environment.baseUrlApi}/api/products`;
  const baseUrlCategories = `${environment.baseUrlApi}/api/categories`;

  beforeEach(() => cy.visit('/'));

  context('API', () => {
    const product = generateProduct();
    const category = generateCategory();
    let createdCategoryId: string;
    let createdProductId: string;

    it('List Categories', () => {
      cy.request({
        url: baseUrlCategories,
        method: 'GET',
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.be.eq(200);
      });
    });
    it('Create Category', () => {
      cy.request({
        url: baseUrlCategories,
        method: 'POST',
        body: {
          ...category,
          name: 'New Category',
        },
        failOnStatusCode: false,
      }).then((response) => {
        createdCategoryId = response.body.id;
        expect(response.body.name).to.be.eq('New Category');
        expect(response.status).to.be.eq(201);
      });
    });

    it('Get Category By Id', () => {
      cy.request({
        url: `${baseUrlCategories}/${createdCategoryId}`,
        method: 'GET',
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.body.id).to.be.eq(createdCategoryId);
      });
    });

    it('Update Category', () => {
      cy.request({
        url: `${baseUrlCategories}/${createdCategoryId}`,
        method: 'PUT',
        body: {
          ...category,
        },
        failOnStatusCode: false,
      }).then((response) => {
        createdCategoryId = response.body.id;
        expect(response.status).to.be.eq(200);
        expect(response.body.name).to.be.eq(category.name);
      });
    });

    it('Create Product', () => {
      cy.request({
        url: baseUrlProducts,
        method: 'POST',
        body: {
          ...product,
          category_id: createdCategoryId,
        },
        failOnStatusCode: false,
      }).then((response) => {
        createdProductId = response.body.id;
        expect(response.status).to.be.eq(201);
      });
    });

    it('Get Product By Id', () => {
      cy.request({
        url: `${baseUrlProducts}/${createdProductId}`,
        method: 'GET',
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.be.eq(200);
        expect(response.body.id).to.be.eq(createdProductId);
        cy.log(response.body.category_id);
      });
    });

    it('Create Product Validate Category', () => {
      cy.request({
        url: baseUrlProducts,
        method: 'POST',
        body: {
          ...product,
          category_id: generateNonExistentCategoryId(),
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.be.eq(404);
        expect(response.body.message).to.be.eq('Category not found');
      });
    });
    it('List Products', () => {
      cy.request({
        url: baseUrlProducts,
        method: 'GET',
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.be.eq(200);
        expect(response.body.length).to.above(0);
      });
    });
  });
});
