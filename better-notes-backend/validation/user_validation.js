const userValidationSchema = {
    email: {
        isEmail: true,
        errorMessage: 'Invalid email format',
    },
    password: {
        isString: true,
        isLength: {
            options: { min: 8 },
            errorMessage: 'Password should be at least 8 chars',
        },
    },
}

export default userValidationSchema;