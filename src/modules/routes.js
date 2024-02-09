import {
    v4 as uuidv4
} from 'uuid';
import {
    validateUser,
    validateUpdateUser
} from './usersValidation.js';
/* export const users = JSON.stringify([{
    "username": "Oleg",
    "age": 21,
    "hobbies": "SGHJ, hkjhkh"
}])
 */
let users = [];

export const createUser = (request, resolve) => {
    let body = '';
    request.on('data', (chunk) => {
        // Append the data chunk to the 'body' string
        console.log(chunk)
        body += chunk.toString();
    });

    request.on('end', () => {
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
            resolve.writeHead(200, {
                'Content-Type': 'application/json'
            });
            resolve.end(body /* JSON.stringify(body) */ );
        }
        // Send a simple success message as the response

    });
}

export const getAllUsers = (request, resolve) => {
    if (users.length === 0) {
        return resolve.end("Users don't exist!")
    }

    resolve.writeHead(200, {
        "Content-Type": "application/json"
    });


    return resolve.end(JSON.stringify(users))
}


export const getUser = (request, resolve, userId) => {
    if (users.length < 1) {
        resolve.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        resolve.end("This is user doesn't exist!")
    } else {
        for (let i = 0; i < users.length; i++) {
            /* console.log(users[i].id, userId) */
            if (users[i].id === userId) {
                resolve.writeHead(200, {
                    "Content-Type": "application/json"
                });
                resolve.end(JSON.stringify(users[i]))
            }
            /* else {
                           resolve.writeHead(404, {
                               "Content-Type": "application/json"
                           });
                           resolve.end("This is user doesn't exist!")
                       } */
        }
        /*    */
    }


}


export const updateUser = (request, resolve, userId) => {

    if (users.length < 1) {
        resolve.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        resolve.end("This is user doesn't exist!")
    }

    /* if (users.length >= 1) { */
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === userId) {
            let replacementData = '';
            request.on('data', (chunk) => {
                // Append the data chunk to the 'body' string
                console.log(chunk)
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
    /*  } else {
         resolve.writeHead(404, {
             'Content-Type': 'text/plain'
         });
         return resolve.end("User doesn't exist!");
     } */
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