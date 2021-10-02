import { environment } from '@env/environment';
import { generateUser } from '@esc/shared/util-helpers';

export const listProducts = () => {
  return cy.get('[data-cy=productItem]');
};

export const addToCartButtons = () => {
  return cy.get('[data-cy=addToCartButton]');
};

export const registerAndLoginUser = () => {
  const { name, email, password, phone, street, apartment, zip, city } =
    generateUser();

  cy.get('[data-cy=userIcon]').should('not.have.class', 'isLoggedIn');

  cy.get('[data-cy=userIcon]').click();
  cy.get('.ant-dropdown-menu-item').contains('Login').click();
  cy.url().should('contain', 'auth#login');
  cy.get('[data-cy=registerMode]').click();
  cy.get('h1').contains('Register User');

  cy.get('[data-cy=registerUserName]').type(name);
  cy.get('[data-cy=registerUserEmail]').type(email);
  cy.get('[data-cy=registerUserPassword]').type(password);
  cy.get('[data-cy=registerUserPasswordConfirmation]').type(password);
  cy.get('[data-cy=registerUserSubmit]').click();

  cy.get('[data-cy=loginUserEmail]').type(email);
  cy.get('[data-cy=loginUserPassword]').type(password);
  cy.get('[data-cy=loginUserSubmit]').click();

  cy.get('[data-cy=userIcon]').should('have.class', 'isLoggedIn');

  cy.url().should('contain', 'profile');
  cy.get('h1').contains('User Profile');
  cy.reload();

  cy.get('[data-cy=userProfilePhone]').type(phone);
  cy.get('[data-cy=userProfileStreet]').type(street);
  cy.get('[data-cy=userProfileApartment]').type(apartment);
  cy.get('[data-cy=userProfileZip]').type(zip);
  cy.get('[data-cy=userProfileCity]').type(city);

  cy.get('[data-cy=profileUserCountry]').click();

  cy.get('nz-option-item').as('countries');

  cy.get('@countries')
    .its('length')
    .then((len) => Math.floor(Math.random() * Math.floor(len)))
    .then((index) => {
      cy.get('@countries').eq(index).click();
    });

  cy.get('[data-cy=profileUserUpdateSubmit]').click();
};

export const addFeaturedProductsToCart = () => {
  cy.visit(`${environment.baseUrlFrontShop}`);
  addToCartButtons().click({ multiple: true });
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
