import http from "http";
/* import {
    users
} from "./modules/users.js"; */
import "dotenv/config.js"
import {
    createUser,
    deleteUser,
    getAllUsers,
    getUser,
    updateUser
} from "./modules/routes.js";

const DEFAULT_API_PORT = 4200
const PORT = process.env.PORT || DEFAULT_API_PORT
const localhost = `http://localhost:${PORT}/`
const baseName = '/api/users'

const checkUUID = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i

let server = http
    .createServer((request, resolve) => {
        console.log("Server is running")
        /* console.log(request.url, 'sds') */
        let str = request.url.split('/')
        switch (request.method) {

            case 'GET':
                /* console.log(checkUUID.test(str[3])) */
                if (request.url === baseName) {
                    getAllUsers(request, resolve)
                } else if ( /* (`${baseName}/${checkUUID}`) */ checkUUID.test(str[3])) {
                    getUser(request, resolve, str[3])
                }
                /* else if (!checkUUID.test(str[3])) {
                                   resolve.end("Invalid UUID!")
                               } */
                else {
                    resolve.end("Wrong way!")
                }
                break;

            case 'POST':
                if (request.url === baseName) {
                    createUser(request, resolve)
                }
                break;

            case 'PUT':
                if ( /* request.url === baseName */ checkUUID.test(str[3])) {
                    updateUser(request, resolve, str[3])
                    /*  createUser(request, resolve) */
                }
                break;

            case 'DELETE':
                if ( /* request.url === baseName */ checkUUID.test(str[3])) {
                    /* updateUser(request, resolve, str[3]) */
                    deleteUser(request, resolve, str[3])

                }
                break;
            default:
                resolve.end("Wrong method!")
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