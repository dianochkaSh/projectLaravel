export default {
    passwordNew: {
        presence: {
            message: 'must not be empty',
            allowEmpty: false
        },
        length: {
            minimum: 6,
            message: 'must be at least 6 characters'
        }
    },
    passwordConfirm: {
        presence: { message: 'must not be empty' },
        equality: {
            attribute: 'passwordNew',
            message: 'The password do not swap',
        },
    },
};
