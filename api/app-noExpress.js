/**Without express how to set up a http module */
const http = require('http');
const { readFileSync } = require('fs');

//get all files
// const homePage = readFileSync('./index.html');
const homePage = readFileSync('./navbar-app/index.html');
const homeStyles = readFileSync('./navbar-app/styles.css');
const homeBrowserApp = readFileSync('./navbar-app/browser-app.js');
const homeLogo = readFileSync('./navbar-app/logo.svg');

const server = http.createServer((req, res) => {
  // console.log('user hit the server');
  console.log(req.url);
  switch (req.url) {
    // statis files
    case '/styles.css':
      res.writeHead(200, { 'content-type': 'text/css' });
      res.write(homeStyles);
      break;
    case '/browser-app.js':
      res.writeHead(200, { 'content-type': 'text/javascript' });
      res.write(homeBrowserApp);
      break;
    case '/logo.svg':
      res.writeHead(200, { 'content-type': 'image/svg+xml' });
      res.write(homeLogo);
      break;

    /************************* */
    case '/':
      res.writeHead(200, { 'content-type': 'text/html' });
      res.write(homePage);
      break;
    case '/about':
      res.writeHead(200, { 'content-type': 'text/html' });
      res.write('<h1>About Page</h1>');
      break;
    default:
      res.writeHead(400, { 'content-type': 'text/html' });
      res.write('Page not found');
  }

  res.end();
});

server.listen(5000);
