const http = require('http');
const server = http.createServer((req, res) => {
  console.log(req.headers);
  res.end('Server response');
});

const port = 7070;

server.listen(port, (err) => {
    if (err) {
      return console.log('Error occured:', err)
    }
    console.log(`Server is listening on port: ${port}.`)
});
