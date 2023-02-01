import * as usersBll from './users.bll.js';
import unauthorized from '../../utils/unauthorized.js';

async function getAll(req, res) {
  const users = await usersBll.getAll();
  res.send(users);
}

async function getById(req, res) {
  const { id } = req.params;
  if (req.user.role !== 'admin' && req.user._id.toString() !== id) {
    unauthorized(res);
    return;
  }

  const user = await usersBll.getById({ id });
  res.send(user);
}

async function getByEmail(req, res) {
  const { email } = req.params;
  if (req.user.role !== 'admin' && req.user.email !== email) {
    unauthorized(res);
    return;
  }

  const user = await usersBll.getByEmail({ email });
  res.send(user);
}

async function getByUsername(req, res) {
  const { username } = req.params;
  if (req.user.role !== 'admin' && req.user.username !== username) {
    unauthorized(res);
    return;
  }

  const user = await usersBll.getByUsername({ username });
  res.send(user);
}

async function update(req, res) {
  const { id } = req.params;
  if (req.user.role !== 'admin' && req.user._id.toString() !== id) {
    unauthorized(res);
    return;
  }

  const propsToUpdate = req.body;
  delete propsToUpdate.password;
  const user = await usersBll.update({ id, propsToUpdate });
  res.send(user);
}

async function remove(req, res) {
  const { id } = req.params;
  const user = await usersBll.remove({ id });
  res.send(user);
}

export {
  getAll,
  getById,
  getByEmail,
  getByUsername,
  update,
  remove,
};
