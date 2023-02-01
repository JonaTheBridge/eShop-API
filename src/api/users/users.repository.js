import userModel from './users.model.js';

const defaultOptions = { password: false };

async function getAll() {
  const users = await userModel.find({}, defaultOptions);
  return users;
}

async function getById({ id }) {
  const user = await userModel.findOne({ _id: id }, defaultOptions);
  return user;
}

async function getByUsername({ username }, options = defaultOptions) {
  const user = await userModel.findOne({ username }, options);
  return user;
}

async function getByEmail({ email }) {
  const user = await userModel.findOne({ email }, defaultOptions);
  return user;
}

async function insert({ username, email, password }) {
  const user = await userModel.create({ username, email, password });
  return user;
}

async function update({ id, propsToUpdate }) {
  const filter = { _id: id };
  const query = { $set: propsToUpdate };
  const options = { ...defaultOptions, new: true };
  const user = await userModel.findOneAndUpdate(filter, query, options);
  return user;
}

async function remove({ id }) {
  const user = await userModel.findOneAndDelete({ _id: id }, defaultOptions);
  return user;
}

export {
  getAll,
  getById,
  getByEmail,
  getByUsername,
  insert,
  update,
  remove,
};
