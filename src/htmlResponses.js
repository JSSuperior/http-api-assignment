// Requirements/dependencies
const fs = require('fs');
const client = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

// Html response
const getClient = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(client);
    response.end();
};

// Css response
const getCSS = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/css' });
    response.write(css);
    response.end();
};

module.exports = {
    getClient,
    getCSS,
};