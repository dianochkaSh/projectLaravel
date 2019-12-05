export default {
    name: {
        presence: { message: 'must not be empty' },
    },
    email: {
        presence: { message: 'must not be empty' },
        email: { message: 'is not correct' },
    },
};