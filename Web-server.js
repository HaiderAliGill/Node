import http from 'http';



const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  
  const routes = {
    '/': '<h1>Hello Haider Gill hh G</h1>',
    '/about': '<h1>About Page</h1>',
    '/contact': '<h3>Contact Us Now</h3>'
  };

  const response = routes[req.url] || '<h1>404 Not Found</h1>';
  const statusCode = req.url in routes ? 200 : 404;
  
  res.writeHead(statusCode);
  res.end(response);
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});