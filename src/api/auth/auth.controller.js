import * as authBll from './auth.bll.js';

async function login(req, res) {
  const { username, password } = req.body;
  let token;

  if (!username || !password) {
    res.status(400); // Bad request
    res.send('Empty required params');
    return;
  }

  try {
    token = await authBll.login({ username, password });
  } catch (err) {
    res.status(err.status);
    res.send(err.message);
  }

  res.json({ token });
}

async function register(req, res) {
  const { username, email, password } = req.body;
  let token;

  if (!username || !password) {
    res.status(400);
    res.send('Empty required params');
    return;
  }

  try {
    token = await authBll.register({ username, email, password });
  } catch (err) {
    console.error(err);
    res.status(500);
    res.send(err.message);
  }

  res.json({ token });
}

export { login, register };
