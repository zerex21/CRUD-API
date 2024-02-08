import http from "http";
import {
    users
} from "./modules/users.js";

const localhost = 'http://localhost:4200/'
const baseName = '/api/users'

let server = http
    .createServer((request, resolve) => {
        console.log("Server is running")
        /* console.log(request.url, 'sds') */

        switch (request.method) {
            case 'GET':
                if (request.url === baseName) {
                    resolve.writeHead(200, {
                        "Content-Type": "application/json"
                    });
                    /* console.log(request.url) */
                    resolve.end(users)
                }
        }

        /* switch (request.method) {
            case "GET":
                request.url = `${localhost}${baseName}`
                resolve.writeHead(200, {
                    "Content-Type": "application/json"
                });
                resolve.end(users)


        } */


        /* resolve.setHeader("Content-Type", "application/json");

        switch (request.url) {
            case '/books':
                resolve.writeHead(200);
                resolve.end(users);
                break
            default:
                resolve.writeHead(404);
                resolve.end(JSON.stringify({
                    error: "Resource not found"
                }));
        } */
    })
    .listen(4200, () => {
        console.log(`Server is running on port 4200. Go to ${localhost}`)
    })