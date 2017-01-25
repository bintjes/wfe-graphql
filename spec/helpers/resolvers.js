/* eslint-disable no-invalid-this */
const ensureExistence = (property) => {
    expect(property).toBeDefined()
}

const ensureType = (property) => {
    expect(property instanceof Function).toBe(true)
}

beforeAll(function () {
    this.exportsMethod = function (method) {
        ensureType(method)
        ensureExistence(method)
    }
})
/* eslint-enable no-invalid-this */
