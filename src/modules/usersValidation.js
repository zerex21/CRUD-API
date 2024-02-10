export const validateUser = (user) => {
    if (!user.username || user.age === undefined || !user.hobbies) {
        return 'Missing required fields';
    }

    if (typeof user.username !== 'string') {
        return 'Username must be a string';
    }

    if (typeof user.age !== 'number') {
        return 'Age must be a number';
    }

    if (!Array.isArray(user.hobbies) || !user.hobbies.every(hobby => typeof hobby === 'string')) {
        return 'Hobbies must be an array of strings';
    }

    return null;
}

export const validateUpdateUser = (user) => {
    if (user.username !== undefined && typeof user.username !== 'string') {
        return 'Username must be a string';
    }

    if (!user.username || user.age === undefined || !user.hobbies) {
        return 'Missing required fields';;
    }

    if (user.age !== undefined && typeof user.age !== 'number') {
        return 'Age must be a number';
    }

    if (user.hobbies !== undefined && (!Array.isArray(user.hobbies) || !user.hobbies.every(hobby => typeof hobby === 'string'))) {
        return 'Hobbies must be an array of strings';
    }

    return null;
}