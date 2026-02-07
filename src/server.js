// Requirements/dependencies
const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const jsonxmlHandler = require('./jsonxmlResponses.js');

// Port
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// Urls
const urlStruct = {
    '/': htmlHandler.getClient,
    '/style.css': htmlHandler.getCSS,
    '/success': jsonxmlHandler.success,
    '/badRequest': jsonxmlHandler.badRequest,
    '/unauthorized': jsonxmlHandler.unauthorized,
    '/forbidden': jsonxmlHandler.forbidden,
    '/internal': jsonxmlHandler.internal,
    '/notImplemented': jsonxmlHandler.notImplimented,
    notFound: jsonxmlHandler.notFound,
};

// Request
const onRequest = (request, response) => {
    //console.log(request);
    console.log(request.url);
    const protocol = request.connection.encrypted ? 'https' : 'http';
    const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);

    // Dividing up data
    request.acceptedTypes = request.headers.accept.split(',');
    request.query = Object.fromEntries(parsedUrl.searchParams);

    // If path exists, call specific function
    if (urlStruct[parsedUrl.pathname]) {
        return urlStruct[parsedUrl.pathname](request, response);
    }
    // Else not found
    return urlStruct.notFound(request, response);
}

// Launch server
http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1${port}`);
});