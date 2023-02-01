import jwt from 'jsonwebtoken';
import { hashSync, compareSync } from 'bcrypt';
import * as usersRepository from '../users/users.repository.js';

function getToken(user) {
  const payload = {
    userId: user._id,
  };

  const token = jwt.sign(payload, process.env.AUTH_SECRET_KEY, {
    // expiresIn: 60 * 60 // in secs
    expiresIn: process.env.AUTH_EXPIRES_IN, // string
  });

  return token;
}

async function login({ username, password }) {
  const options = { password: true };
  const dbUser = await usersRepository.getByUsername({ username }, options);
  if (!dbUser) {
    const myError = {
      status: 401,
      message: 'Wrong credentials',
    };

    throw new Error(JSON.stringify(myError));
  }

  const isSamePassword = compareSync(password, dbUser.password);
  if (!isSamePassword) {
    const myError = {
      status: 401,
      message: 'Wrong credentials',
    };

    throw new Error(JSON.stringify(myError));
  }

  const token = getToken({ username: dbUser.username, _id: dbUser._id });
  if (!token) {
    const myError = {
      status: 500,
      message: 'Some problem generating token',
    };

    throw new Error(JSON.stringify(myError));
  }

  return token;
}

async function register({ username, email, password }) {
  const hashedPassword = hashSync(password, 10);
  const dbUser = await usersRepository.insert({ username, email, password: hashedPassword });
  if (!dbUser) {
    const myError = {
      status: 500,
      message: 'Some problem at insert',
    };

    throw new Error(JSON.stringify(myError));
  }

  const token = getToken({ username: dbUser.username, _id: dbUser._id });
  if (!token) {
    const myError = {
      status: 500,
      message: 'Some problem generating token',
    };

    throw new Error(JSON.stringify(myError));
  }

  return token;
}

export { login, register };
