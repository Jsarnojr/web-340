const http = require('http');
const url = require('url');

let character = null;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { pathname, query } = parsedUrl;

  if (req.method === 'POST' && pathname === '/create-character') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const { class: charClass, gender, funFact } = query;

      if (!charClass || !gender || !funFact) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Missing parameters' }));
        return;
      }

      character = { class: charClass, gender, funFact };

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Character created successfully', character }));
    });
  } else if (req.method === 'POST' && pathname === '/confirm-character') {
    req.on('data', () => {});
    req.on('end', () => {
      if (!character) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'No character to confirm' }));
        return;
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Character creation confirmed' }));
    });
  } else if (req.method === 'GET' && pathname === '/view-character') {
    if (!character) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'No character found' }));
      return;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ character }));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not Found' }));
  }
});

module.exports = server;

if (require.main === module) {
  server.listen(3000, () => {
    console.log('Server listening on port 3000');
  });
}
