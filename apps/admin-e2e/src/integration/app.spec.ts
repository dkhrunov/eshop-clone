import { environment } from '../../../../environments/environment';
import { generateCategory } from '@esc/shared/util-helpers';
import { should } from 'chai';

describe('Admin App', () => {
  beforeEach(() => {
    cy.visit(`${environment.baseUrlFrontAdmin}`);
    cy.viewport(600, 500);
    cy.viewport(1000, 700);
  });
  it('Show main dashboard', () => {
    //
  });

  it('List categories', () => {
    cy.visit('categories');
  });
  it.only('Create category', () => {
    const { name, icon, color, image } = generateCategory();

    cy.visit('categories/form');
    cy.get('[data-cy=createCategoryName]').clear().type(name);
    cy.get('[data-cy=createCategoryIcon]').clear().type(icon);
    cy.get('[data-cy=createCategoryColor]').clear().type(color);
    cy.get('[data-cy=createCategoryImage]').clear().type(image);
    cy.get('[data-cy=createCategoryButton]').click();
    cy.get('[data-cy=categoryFormGoBack]').should('be.visible').click();

    cy.get('[data-cy=category]').should('contain', name);
  });
});
