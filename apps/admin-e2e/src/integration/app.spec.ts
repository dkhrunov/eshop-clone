import { environment } from '../../../../environments/environment';
import { generateCategory } from '@esc/shared/util-helpers';
import { createCategory, updateCategory } from '../support/categories.po';
import { CreateCategoryDto } from '@esc/product/models';

describe('Admin App', () => {
  beforeEach(() => {
    cy.visit(`${environment.baseUrlFrontAdmin}`);
    cy.viewport(600, 500);
    cy.viewport(1000, 700);
  });
  it('Show main dashboard', () => {
    //TODO
  });

  it('Delete Category', () => {
    const category = generateCategory();

    createCategory(category);

    cy.get('[data-cy=category]')
      .contains(category.name)
      .parent()
      .find('[data-cy=deleteCategoryConfirmation]')
      .click();

    cy.get('button').contains('No').click().should('not.exist');

    cy.get('[data-cy=category]')
      .contains(category.name)
      .parent()
      .find('[data-cy=deleteCategoryConfirmation]')
      .click();

    cy.get('button').contains('Yes').click().should('not.exist');
  });

  it('Create category', () => {
    const category = generateCategory();

    createCategory(category);

    cy.get('[data-cy=category]').should('contain', category.name);
  });

  it('Edit category', () => {
    const category = generateCategory();

    createCategory(category);

    updateCategory(category.name, 'Updated Category');

    updateCategory('Updated Category', category.name);

    cy.contains(category.name);
  });

  it('List categories', () => {
    cy.visit('categories');
    cy.get('[data-cy=category]').each((category) => {
      cy.wrap(category).should('be.visible');
    });
  });
});
