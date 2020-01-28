export default {
    username: {
        presence: {
            message: 'must not be empty',
            allowEmpty: false
        },
    },
    email: {
        presence: { message: 'must not be empty' },
        email: { message: 'is not correct' },
    },
};
