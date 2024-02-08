import {
    v4 as uuidv4
} from 'uuid';
/* export const users = JSON.stringify([{
    id: 1,
    username: 'Oleg',
    age: 21,
    hobbies: 'SGHJ, hkjhkh'
}])
 */
let users = [];

export const createUser = (nameUser, ageUser, hobbiesUser) => {
    return {
        id: uuidv4(),
        username: nameUser,
        age: ageUser,
        hobbies: hobbiesUser
    }
}
export let getAllUsers = (request, resolve) => {
    if (users.length === 0) {
        return resolve.end("Users don't exist!")
    }

    resolve.writeHead(200, {
        "Content-Type": "application/json"
    });


    return resolve.end(JSON.stringify(users))
}


export let getUser = (request, resolve, userId) => {
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === userId) {
            resolve.writeHead(200, {
                "Content-Type": "application/json"
            });
            return resolve.end(JSON.stringify(users[i]))
        } else {
            resolve.writeHead(404, {
                "Content-Type": "application/json"
            });
            return resolve.end("This is user doesn't exist!")
        }

    }

}