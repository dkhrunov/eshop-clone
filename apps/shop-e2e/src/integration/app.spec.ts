import { environment } from '../../../../environments/environment';

describe('Eshop Clone', () => {
  const baseUrlProducts = `${environment.baseUrlApi}/api/products`;

  beforeEach(() => cy.visit('/'));

  context('API', () => {
    it('List Products', () => {
      cy.request({
        url: baseUrlProducts,
        method: 'GET',
        failOnStatusCode: false,
      }).then((response) => {
        cy.log(response.body);
      });
    });
  });
});
