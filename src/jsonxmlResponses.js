const respond = (request, response, status, content) => {
    // Default json
    let formattedContent = JSON.stringify(content);
    let contentType = 'application/json';

    // Xml builder
    if (request.acceptedTypes[0] === 'text/xml') {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${content.message}</message>`;
        if (content.id) {
            responseXML = `${responseXML} <id>${content.id}</id>`;
        }
        responseXML = `${responseXML} </response>`;

        // replace current content
        formattedContent = responseXML;
        contentType = 'text/xml';
    }

    // Write head and body
    response.writeHead(status, {
        'Content-type': contentType,
        'Content-Length': Buffer.byteLength(formattedContent, 'utf8'),
    });
    response.write(formattedContent);
    response.end();
};

// Success response
const success = (request, response) => {
    const responseJSON = {
        message: 'This is a successful response',
    }
    const status = 200;

    return respond(request, response, status, responseJSON);
};

// Bad request response
const badRequest = (request, response) => {
    const responseJSON = {
        message: 'This request has the required parameters',
    }
    let status = 200;

    if (!request.query.valid || request.query.valid !== 'true') {
        responseJSON.message = 'Missing valid query parameter set to true';
        responseJSON.id = 'badRequest';
        status = 400;
    }

    return respond(request, response, status, responseJSON);
};

// Unauthorized response
const unauthorized = (request, response) => {
    const responseJSON = {
        message: 'You have successfully viewed the content.',
    }
    let status = 200;

    if (!request.query.loggedIn || request.query.loggedIn !== 'yes') {
        responseJSON.message = 'Missing loggedIn query parameted set to yes';
        responseJSON.id = 'unauthorized';
        status = 401;
    }

    return respond(request, response, status, responseJSON);
};

// Not found response
const forbidden = (request, response) => {
    const responseJSON = {
        message: 'You do not have access to this content.',
        id: 'forbidden',
    }
    const status = 403;

    return respond(request, response, status, responseJSON);
};

// Internal server error response
const internal = (request, response) => {
    const responseJSON = {
        message: 'Internal Server Error. Something went wrong.',
        id: 'internalError',
    }
    const status = 500;

    return respond(request, response, status, responseJSON);
};

// Not implimented response
const notImplimented = (request, response) => {
    const responseJSON = {
        message: 'A get request for this page has not been implimented yet.',
        id: 'notImplimented',
    }
    const status = 501;

    return respond(request, response, status, responseJSON);
};

// Not found response
const notFound = (request, response) => {
    const responseJSON = {
        message: 'The page you are looking for was not found.',
        id: 'notFound',
    }
    const status = 404;

    return respond(request, response, status, responseJSON);
};

module.exports = {
    success,
    badRequest,
    unauthorized,
    forbidden,
    internal,
    notImplimented,
    notFound,
};