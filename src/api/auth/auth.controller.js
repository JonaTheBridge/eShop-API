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
    const myError = JSON.parse(err.message);
    res.status(myError.status);
    res.send(myError.message);
    return;
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
    const myError = JSON.parse(err.message);
    res.status(myError.status);
    res.send(myError.message);
    return;
  }

  res.json({ token });
}

export { login, register };
