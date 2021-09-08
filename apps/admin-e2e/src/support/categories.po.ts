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
