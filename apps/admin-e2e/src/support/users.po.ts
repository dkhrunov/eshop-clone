import { RegisterUserDto, UpdateUserDto } from '@esc/user/models';

export const createUser = (user: RegisterUserDto) => {
  cy.visit('users');
  cy.get('[data-cy=createUserButton]').click();
  cy.get('[data-cy=registerUserName]').type(user.name, { force: true });
  cy.get('[data-cy=registerUserEmail]').type(user.email);
  cy.get('[data-cy=registerUserPassword]').type(user.password);
  cy.get('[data-cy=registerUserPhone]').type(user.phone);
  cy.get('[data-cy=registerUserStreet]').type(user.street);
  cy.get('[data-cy=registerUserApartment]')
    .clear()
    .type(user.apartment.toString());
  cy.get('[data-cy=registerUserZip]').type(user.zip);
  cy.get('[data-cy=registerUserCity]').type(user.city);

  user.isAdmin && cy.get('[data-cy=registerUserIsAdmin]').click();

  cy.get('[data-cy=registerUserCountry]').click();

  cy.get('nz-option-item').as('countries');

  cy.get('@countries')
    .its('length')
    .then((len) => Math.floor(Math.random() * Math.floor(len)))
    .then((index) => {
      cy.get('@countries').eq(index).click();
    });

  cy.get('[data-cy=saveUserButton]').click();
};

export const listUsers = () => {
  return cy.get('[data-cy=user]');
};

export const updateUser = (user: UpdateUserDto) => {
  //
};
