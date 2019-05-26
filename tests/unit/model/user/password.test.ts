import {comparePassword, hashPassword} from '../../../../src/model/user/password';
import * as bcrypt from 'bcrypt';

test('should hash the password', async () => {
    const password = 'password';
    const hash = await hashPassword(password, 10);
    expect(await bcrypt.compare(password, hash)).toBe(true);
});


test('should return true if the password is valid', async () => {
    const password = 'password';
    const hash = await bcrypt.hash(password, 10);

    expect(await comparePassword(password, hash)).toBe(true);
    expect(await comparePassword(password, 'random_hash')).toBe(false);
});