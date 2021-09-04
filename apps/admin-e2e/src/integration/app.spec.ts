import { environment } from '../../../../environments/environment';

describe('Admin App', () => {
  beforeEach(() => {
    cy.visit(`${environment.baseUrlFrontAdmin}`);
    cy.viewport(600, 500);
    cy.viewport(1000, 700);
  });
  it('Show main dashboard', () => {
    //
  });

  it('Show categories', () => {
    cy.visit('categories');
  });
});
