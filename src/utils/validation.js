function validation(fieldName, field, length) {
    if (!field) {
        return `${fieldName} is required`
    }

    if (field.length < length) {
        return `${fieldName} must be at least ${length}`
    }
}

module.exports = validation