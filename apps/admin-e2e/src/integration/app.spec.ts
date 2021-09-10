import { environment } from '@env/environment';
import { generateCategory } from '@esc/shared/util-helpers';

import {
  createCategory,
  deleteCategory,
  getCategoriesList,
  mapCategoriesToNames,
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

  context('Products', () => {
    it('List products', () => {
      //
    });
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

      cy.get('[data-cy=categoryNameHeader]').click();

      getCategoriesList()
        .then(mapCategoriesToNames)
        .then((unsortedCategories) => {
          const sortedCategories = unsortedCategories.slice().sort();
          expect(unsortedCategories).to.be.deep.eq(sortedCategories);
        });

      cy.get('[data-cy=categoryNameHeader]').click();

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
});
