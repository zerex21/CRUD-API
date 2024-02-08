import http from "http";
/* import {
    users
} from "./modules/users.js"; */
import "dotenv/config.js"
import {
    getAllUsers
} from "./modules/routes.js";

const DEFAULT_API_PORT = 4200
const PORT = process.env.PORT || DEFAULT_API_PORT
const localhost = `http://localhost:${PORT}/`
const baseName = '/api/users'

const checkUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i

let server = http
    .createServer((request, resolve) => {
        console.log("Server is running")
        /* console.log(request.url, 'sds') */

        switch (request.method) {
            case 'GET':
                if (request.url === baseName) {
                    getAllUsers(request, resolve)
                } else if (request.url === `${baseName}/${checkUUID}`) {
                    getAllUsers(request, resolve)
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
    .listen(PORT, () => {
        console.log(`Server is running on port ${PORT}. Go to ${localhost}`)
    })