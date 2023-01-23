import express from 'express';
import './dbConnection.js';
// eslint-disable-next-line import/no-extraneous-dependencies
import cors from 'cors';
const server = express();
const port = process.env.PORT || 3000;
server.use(express.json());
server.use(cors({ origin: true }));

server.listen(port, () => {
  console.info(`Server started on port ${port}`);
});
