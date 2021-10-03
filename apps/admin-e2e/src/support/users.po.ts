import { LoginUserDto, RegisterUserDto } from '@esc/user/models';

export const createUser = (user: RegisterUserDto) => {
  cy.visit('users');
  cy.get('[data-cy=createUserButton]').click();
  cy.get('[data-cy=registerUserName]').type(user.name, { force: true });
  cy.get('[data-cy=registerUserEmail]').type(user.email);
  cy.get('[data-cy=registerUserPassword]').type(user.password);
  user.phone && cy.get('[data-cy=registerUserPhone]').type(user.phone);
  user.street && cy.get('[data-cy=registerUserStreet]').type(user.street);
  user.apartment &&
    cy
      .get('[data-cy=registerUserApartment]')
      .clear()
      .type(user.apartment.toString());
  user.zip && cy.get('[data-cy=registerUserZip]').type(user.zip);
  user.city && cy.get('[data-cy=registerUserCity]').type(user.city);

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

export const registerUser = (user: RegisterUserDto): void => {
  const { name, email, password } = user;

  cy.get('[data-cy=registerUserName]').type(name);
  cy.get('[data-cy=registerUserEmail]').type(email);
  cy.get('[data-cy=registerUserPassword]').type(password);
  cy.get('[data-cy=registerUserPasswordConfirmation]').type(password);
  cy.get('[data-cy=registerUserSubmit]').click();
};

export const loginUser = ({ email, password }: LoginUserDto) => {
  cy.get('[data-cy=loginUserEmail]').type(email);
  cy.get('[data-cy=loginUserPassword]').type(password);
  cy.get('[data-cy=loginUserSubmit]').click();

  cy.getLocalStorage('token');
};
