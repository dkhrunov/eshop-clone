import { environment } from '../../../../environments/environment';
import { generateProduct } from '@esc/shared/util-helpers';

describe('Eshop Clone', () => {
  const baseUrlProducts = `${environment.baseUrlApi}/api/products`;

  beforeEach(() => cy.visit('/'));

  context('API', () => {
    const product = generateProduct();

    it('List Products', () => {
      cy.request({
        url: baseUrlProducts,
        method: 'GET',
        failOnStatusCode: false,
      }).then((response) => {
        cy.log(response.body);
      });
    });
    it('Create Product', () => {
      cy.request({
        url: baseUrlProducts,
        method: 'POST',
        body: {
          ...product,
        },
        failOnStatusCode: false,
      }).then((response) => {
        cy.log(response.body);
      });
    });
  });
});
