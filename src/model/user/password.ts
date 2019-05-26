import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string, saltRounds: number) => await bcrypt.hash(password, saltRounds);

export const comparePassword = async (password: string, hash: string) => bcrypt.compare(password, hash);