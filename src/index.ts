import http from "http";
/* import {
    users
} from "./modules/users.js"; */
import "dotenv/config"
import {
    createUser,
    deleteUser,
    getAllUsers,
    getUser,
    updateUser
} from "./modules/routes.ts";
import {
    url
} from "inspector";
import {
    checkBaseName,
    checkUuidRed
} from "./modules/checkCorr.ts";
import { ServerResponse, IncomingMessage } from "http";


const DEFAULT_API_PORT = 4200
const PORT = process.env.PORT || DEFAULT_API_PORT

const localhost = `http://localhost:${PORT}/`
const baseName = '/api/users'

const checkUUID = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
const checkPath = /^\/api\/users\/?$/

let server = http
    .createServer((request:IncomingMessage, resolve:ServerResponse) => {
        console.log("Server is running")
        /* let str:string[];
        if(request.url){ */
        let str = request.url!.split('/')
        /* } */

        switch (request.method) {

            case 'GET':

                if (request.url === baseName) {
                    getAllUsers(request, resolve)
                } else if ( /* (`${baseName}/${checkUUID}`) */ checkUUID.test(str![3])) {
                    getUser(request, resolve, str![3])
                } else if (!(`/${str![1]}/${str![2]}`.match(checkPath))) {
                    checkBaseName(resolve)
                } else if (!checkUUID.test(str![3])) {
                    checkUuidRed(resolve)
                }
                break;

            case 'POST':
                if (request.url === baseName) {
                    createUser(request, resolve)
                } else {
                    checkBaseName(resolve)
                }
                break;

            case 'PUT':
                if (checkUUID.test(str![3])) {
                    updateUser(request, resolve, str![3])
                } else if (!(`/${str![1]}/${str![2]}`.match(checkPath))) {
                    checkBaseName(resolve)
                } else if (!checkUUID.test(str![3])) {
                    checkUuidRed(resolve)
                }

                break;

            case 'DELETE':
                /* console.log(`/${str[1]}/${str[2]}`, request.url) */
                if ( /* request.url === baseName */ checkUUID.test(str![3])) {
                    deleteUser(request, resolve, str![3])

                } else if (!(`/${str![1]}/${str![2]}`.match(checkPath))) {
                    checkBaseName(resolve)
                } else if (!checkUUID.test(str![3])) {
                    checkUuidRed(resolve)
                }
                break;
            default:
                checkBaseName(resolve)
        }
    })
    .listen(PORT, () => {
        console.log(`Server is running on port ${PORT}. Go to ${localhost}`)
    })