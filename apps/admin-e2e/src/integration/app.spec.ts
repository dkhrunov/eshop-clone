import { environment } from '@env/environment';
import { generateCategory } from '@esc/shared/util-helpers';
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from '../support/categories.po';

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
    cy.get('[data-cy=category]').each((category) => {
      cy.wrap(category).should('be.visible');
    });
  });
});
