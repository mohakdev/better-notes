const noteValidationSchema = {
    title: {
        isString: true,
        isLength: {
            options: { min: 1 },
            errorMessage: 'Title should be at least 1 character',
        },
    },
    content: {
        isString: true,
        isLength: {
            options: { min: 1 },
            errorMessage: 'Content should be at least 1 character',
        },
    },
}

export default noteValidationSchema;