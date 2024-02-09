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
import {
    url
} from "inspector";

const DEFAULT_API_PORT = 4200
const PORT = process.env.PORT || DEFAULT_API_PORT
const localhost = `http://localhost:${PORT}/`
const baseName = '/api/users'

const checkUUID = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
const checkPath = /^\/api\/users\/?$/
const checkPathWay = /^\/api\/users\/[^\/]+$/

let server = http
    .createServer((request, resolve) => {
        console.log("Server is running")
        /*   if (!request.url.match(checkPath) && !request.url.match(checkPathWay)) {
              resolve.writeHead(404, {
                  'Content-Type': 'text/plain'
              });
              resolve.end("Wrong path!")
          } */
        /* console.log(request.url, 'sds') */
        let str = request.url.split('/')
        switch (request.method) {

            case 'GET':
                /* console.log(checkUUID.test(str[3])) */
                if (request.url === baseName) {
                    getAllUsers(request, resolve)
                } else if ( /* (`${baseName}/${checkUUID}`) */ checkUUID.test(str[3])) {
                    getUser(request, resolve, str[3])
                } else if (!(`/${str[1]}/${str[2]}`.match(checkPath))) {

                    resolve.writeHead(404, {
                        'Content-Type': 'text/plain'
                    });
                    resolve.end("Wrong path!")
                } else if (!checkUUID.test(str[3])) {

                    resolve.writeHead(400, {
                        'Content-Type': 'text/plain'
                    });
                    resolve.end("ID user is invalid!");
                }
                /* else {
                                    resolve.writeHead(404, {
                                        'Content-Type': 'text/plain'
                                    });
                                    resolve.end("Wrong path!")
                                } */
                break;

            case 'POST':
                if (request.url === baseName) {
                    createUser(request, resolve)
                } else /* if (!checkUUID.test(str[3])) */ {
                    resolve.writeHead(404, {
                        'Content-Type': 'text/plain'
                    });
                    resolve.end("Wrong path!")
                }
                break;

            case 'PUT':
                if (checkUUID.test(str[3])) {
                    updateUser(request, resolve, str[3])
                } else if (!(`/${str[1]}/${str[2]}`.match(checkPath))) {

                    resolve.writeHead(404, {
                        'Content-Type': 'text/plain'
                    });
                    resolve.end("Wrong path!")
                } else if (!checkUUID.test(str[3])) {

                    resolve.writeHead(400, {
                        'Content-Type': 'text/plain'
                    });
                    resolve.end("ID user is invalid!");
                }
                /*  else if (!checkUUID.test(str[3])) {
                                    resolve.writeHead(400, {
                                        'Content-Type': 'text/plain'
                                    });
                                    resolve.end("ID user is invalid!");
                                } */
                break;

            case 'DELETE':
                console.log(`/${str[1]}/${str[2]}`, request.url)
                if ( /* request.url === baseName */ checkUUID.test(str[3])) {
                    deleteUser(request, resolve, str[3])

                } else if (!(`/${str[1]}/${str[2]}`.match(checkPath))) {

                    resolve.writeHead(404, {
                        'Content-Type': 'text/plain'
                    });
                    resolve.end("Wrong path!")
                } else if (!checkUUID.test(str[3])) {

                    resolve.writeHead(400, {
                        'Content-Type': 'text/plain'
                    });
                    resolve.end("ID user is invalid!");
                }
                break;
            default:
                resolve.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                resolve.end("Wrong path!")
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