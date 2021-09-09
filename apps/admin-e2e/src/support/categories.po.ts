import { CreateCategoryDto } from '@esc/product/models';

export const createCategory = ({
  name,
  icon,
  color,
  image,
}: CreateCategoryDto) => {
  cy.visit('categories/form');
  cy.get('[data-cy=createCategoryName]').clear().type(name);
  cy.get('[data-cy=createCategoryIcon]').clear().type(icon);
  cy.get('[data-cy=createCategoryColor]').clear().type(color);
  cy.get('[data-cy=createCategoryImage]').clear().type(image);
  cy.get('[data-cy=createCategoryButton]').click();
  cy.get('[data-cy=categoryFormGoBack]').should('be.visible').click();
};

export const updateCategory = (name: string, newName: string) => {
  cy.contains(name)
    .parent('tr')
    .within(() => {
      cy.get('[data-cy=editCategory]').click();
    });

  cy.get('[data-cy=createCategoryName]')
    .should('contain.value', name)
    .clear()
    .type(newName);
  cy.get('[data-cy=updateCategoryButton]').click();
  cy.get('[data-cy=categoryFormGoBack]').should('be.visible').click();
};
