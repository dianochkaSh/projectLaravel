export default {
    email: {
        presence: { message: 'must not be empty' },
        email: { message: 'is not correct' },
    },
    password: {
        presence: {
            message: 'must not be empty',
            allowEmpty: false
        },
        length: {
            minimum: 6,
            message: 'must be at least 6 characters'
        }
    },
};
