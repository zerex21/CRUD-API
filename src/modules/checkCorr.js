export const serverErrorRespond = (resolve) => {
    resolve.writeHead(500, {
        'Content-Type': 'text/plain'
    });
    resolve.end('Internal server error');
}

export const checkBaseName = (resolve) => {
    resolve.writeHead(404, {
        'Content-Type': 'text/plain'
    });
    resolve.end("Wrong path!")
}

export const checkUuidRed = (resolve) => {
    resolve.writeHead(400, {
        'Content-Type': 'text/plain'
    });
    resolve.end("ID user is invalid!");
}