/* eslint-disable no-invalid-this */
const Schema = require('../../schema')
const { mockServer } = require('graphql-tools')

beforeAll(function () {
    this.mockServer = mockServer(Schema)

    this.checkErrors = function (result) {
        if (result.errors) {
            throw result.errors.pop()
        }

        return result
    }
})
/* eslint-enable no-invalid-this */
