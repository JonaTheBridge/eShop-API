export default function unauthorized(response) {
  response.status(401);
  response.send('Unauthorized');
}
