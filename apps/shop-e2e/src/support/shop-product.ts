export const listProducts = () => {
  return cy.get('[data-cy=productItem]');
};

export const categoriesFilters = () => {
  return cy.get('[data-cy=categoryName]');
};

export const isNumberCategoriesEqualFoundResults = () => {
  listProducts()
    .its('length')
    .then((numberOfProducts) => {
      cy.get('[data-cy=numberOfProducts]').should('contain', numberOfProducts);
    });
};
