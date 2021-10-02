import { JwtUserPayload } from '@esc/user/models';

export const isTokenExpired = (token: string): boolean => {
  const [, tokenPayload] = token.split('.');
  const { isAdmin, exp } = JSON.parse(atob(tokenPayload)) as JwtUserPayload;

  if (exp) {
    if (isAdmin && !isDateExpired(exp)) return true;
  }

  return false;
};

const isDateExpired = (exp: number): boolean => {
  return Math.floor(new Date().getTime() / 1000) >= exp;
};
