export const listProducts = () => {
  return cy.get('[data-cy=productItem]');
};

export const addToCartButtons = () => {
  return cy.get('[data-cy=addToCartButton]');
};

export const deleteItemButtons = () => {
  return cy.get('[data-cy=deleteItemButton]');
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
