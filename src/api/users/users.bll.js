import * as usersRepo from './users.repository.js';

async function getAll() {
  const users = await usersRepo.getAll();
  return users;
}

async function getById({ id }) {
  const user = await usersRepo.getById({ id });
  return user;
}

async function getByEmail({ email }) {
  const user = await usersRepo.getByEmail({ email });
  return user;
}

async function getByUsername({ username }) {
  const user = await usersRepo.getByUsername({ username });
  return user;
}

async function update({ id, propsToUpdate }) {
  const updateUser = await usersRepo.update({ id, propsToUpdate });
  return updateUser;
}

async function remove({ id }) {
  const user = await usersRepo.remove({ id });
  return user;
}

export {
  getAll,
  getById,
  getByEmail,
  getByUsername,
  update,
  remove,
};
