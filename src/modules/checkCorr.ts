import { ServerResponse } from "http";

export const serverErrorRespond = (resolve:ServerResponse) => {
    resolve.writeHead(500, {
        'Content-Type': 'text/plain'
    });
    resolve.end('Internal server error');
}

export const checkBaseName = (resolve:ServerResponse) => {
    resolve.writeHead(404, {
        'Content-Type': 'text/plain'
    });
    resolve.end("Wrong path!")
}

export const checkUuidRed = (resolve:ServerResponse) => {
    resolve.writeHead(400, {
        'Content-Type': 'text/plain'
    });
    resolve.end("ID user is invalid!");
}