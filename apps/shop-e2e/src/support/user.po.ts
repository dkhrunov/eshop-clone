import { RegisterUserDto, UserEntity, UserResponse } from '@esc/user/models';
import { environment } from '@env/environment';

const baseUrlUsers = `${environment.baseUrlApi}/users`;

export const registerUserOnServer = (user: RegisterUserDto) => {
  cy.log('Register user');
  return cy.request<UserResponse>({
    url: `${baseUrlUsers}`,
    method: 'POST',
    body: {
      ...user,
    },
    failOnStatusCode: false,
  });
};

export const loginUserOnServer = (email: string, password: string) => {
  cy.log('Login user');
  return cy.request({
    url: `${baseUrlUsers}/login`,
    method: 'POST',
    body: {
      email,
      password,
    },
    failOnStatusCode: false,
  });
};

export const deleteUserOnServer = (id: string, token: string) => {
  cy.log('Delete user');
  return cy.request({
    url: `${baseUrlUsers}/${id}`,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    failOnStatusCode: false,
  });
};

export const getUserFromServer = (id: string, token: string) => {
  cy.log('Get user from server');
  return cy.request({
    url: `${baseUrlUsers}/${id}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    failOnStatusCode: false,
  });
};

export const getAllUsersFromServer = (token: string) => {
  cy.log('Get all users');
  return cy.request<UserEntity[]>({
    url: `${baseUrlUsers}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    failOnStatusCode: false,
  });
};

export const getUserCount = (token: string) => {
  cy.log('Get users count');
  return cy.request({
    url: `${baseUrlUsers}/count`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    failOnStatusCode: false,
  });
};

export const updateUserOnServer = (
  id: string,
  user: Partial<UserEntity>,
  token: string
) => {
  cy.log('Update user on server');

  return cy.request<UserResponse>({
    url: `${baseUrlUsers}/${id}`,
    method: 'PUT',
    body: {
      ...user,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
    failOnStatusCode: false,
  });
};
