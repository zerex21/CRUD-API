import {
    v4 as uuidv4
} from 'uuid';
import {
    validateUser,
    validateUpdateUser
} from './usersValidation.js';
import {
    serverErrorRespond
} from './checkCorr.js';
/* export const users = JSON.stringify([{
    "username": "Oleg",
    "age": 21,
    "hobbies": "SGHJ, hkjhkh"
}])
 */
let users = [];


export const getUser = (request, resolve, userId) => {
    if (users.length < 1) {
        resolve.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        resolve.end("This is user doesn't exist!")
    } else {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === userId) {
                resolve.writeHead(200, {
                    "Content-Type": "application/json"
                });
                resolve.end(JSON.stringify(users[i]))
            }
        }
    }
}

export const getAllUsers = (request, resolve) => {
    try {
        if (users.length === 0) {
            resolve.writeHead(404, {
                "Content-Type": "application/json"
            });
            return resolve.end("Users don't exist!")
        }
        resolve.writeHead(200, {
            "Content-Type": "application/json"
        });
        resolve.end(JSON.stringify(users))
    } catch {
        serverErrorRespond(resolve)
    }

}

export const createUser = (request, resolve) => {
    try {
        let body = '';
        request.on('data', (chunk) => {
            body += chunk.toString();
        });

        request.on('end', () => {
            try {
                const feedbackData = JSON.parse(body);
                const userUUID = uuidv4();

                if (validateUser(feedbackData)) {
                    resolve.writeHead(400, {
                        'Content-Type': 'application/json'
                    });
                    resolve.end('Invalid User data')
                } else {
                    users.push({
                        id: userUUID,
                        ...feedbackData
                    })
                    resolve.writeHead(201, {
                        'Content-Type': 'application/json'
                    });
                    resolve.end(`User was created: ${body}` /* JSON.stringify(body) */ );
                }
            } catch {
                resolve.writeHead(400, {
                    'Content-Type': 'application/json'
                });
                resolve.end('Invalid User data')
            }
        });
    } catch {
        serverErrorRespond(resolve)
    }

}

export const updateUser = (request, resolve, userId) => {

    if (users.length < 1) {
        resolve.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        resolve.end("This is user doesn't exist!")
    }

    for (let i = 0; i < users.length; i++) {
        if (users[i].id === userId) {
            let replacementData = '';
            request.on('data', (chunk) => {
                replacementData += chunk.toString();
            });
            request.on('end', () => {
                const feedbackData = JSON.parse(replacementData);

                if (validateUpdateUser(feedbackData)) {
                    resolve.writeHead(400, {
                        'Content-Type': 'application/json'
                    });
                    resolve.end('Invalid User data')
                } else {
                    const index = users.indexOf(users[i]);
                    users[index] = {
                        id: users[i].id,
                        ...feedbackData
                    };
                    resolve.writeHead(200, {
                        'Content-Type': 'application/json'
                    });
                    resolve.end( /* feedbackData  */ JSON.stringify(feedbackData));
                }
            });
        }
    }

}

export const deleteUser = (request, resolve, userId) => {
    if (users.length === 0) {
        resolve.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        resolve.end("This is user doesn't exist!")
    }
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === userId) {
            const updatedProducts = users.filter((product) => product.id !== userId)
            resolve.writeHead(204, {
                'Content-Type': 'text/plain'
            });
            resolve.end(`You deleted the User`);

            users = updatedProducts;
        } else {
            resolve.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            resolve.end("This is user doesn't exist!")
        }
    }

}