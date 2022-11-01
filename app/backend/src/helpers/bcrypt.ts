import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

const hashPassword = (password: string) => {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);
  return hash;
};

const comparePassword = (password: string, hash: string) => {
  const result = compareSync(password, hash);
  return result;
};

export { hashPassword, comparePassword };
