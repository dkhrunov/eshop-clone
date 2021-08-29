import { RegisterUserDto, UserResponse } from '@esc/user/models';
import { environment } from '../../../../environments/environment';

const baseUrlUsers = `${environment.baseUrlApi}/users`;

export const registerUser = (user: RegisterUserDto) => {
  return cy.request<UserResponse>({
    url: `${baseUrlUsers}`,
    method: 'POST',
    body: {
      ...user,
    },
    failOnStatusCode: false,
  });
};
