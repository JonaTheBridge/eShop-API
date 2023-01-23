import jwt from 'jsonwebtoken';
import { hashSync, compareSync } from 'bcrypt';
import * as usersRepository from '../users/users.repository.js';

function getToken(user) {
  const payload = {
    userId: user._id,
    username: user.username,
  };

  const token = jwt.sign(payload, process.env.AUTH_SECRET_KEY, {
    // expiresIn: 60 * 60 // in secs
    expiresIn: process.env.AUTH_EXPIRES_IN, // string
  });

  return token;
}

async function login({ username, password }) {
  const dbUser = await usersRepository.getByUsername({ username });
  if (!dbUser) {
    throw new Error('Wrong credentials');
  }

  const isSamePassword = compareSync(password, dbUser.password);
  if (!isSamePassword) {
    throw new Error('Wrong credentials');
  }

  const token = getToken({ username: dbUser.username, _id: dbUser._id });
  if (!token) {
    throw new Error('Some problem generating token');
  }

  return token;
}

async function register({ username, email, password }) {
  const hashedPassword = hashSync(password, 10);
  const dbUser = await usersRepository.insert({ username, email, password: hashedPassword });
  if (!dbUser) {
    throw new Error('Some problem at insert');
  }

  const token = getToken({ username: dbUser.username, _id: dbUser._id });
  if (!token) {
    throw new Error('Some problem generating token');
  }

  return token;
}

export { login, register };
