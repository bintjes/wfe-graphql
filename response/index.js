class PluginResponse {
    static ok(data, contentType='application/json') {
        return new PluginResponse(data, 200, contentType)
    }

    static created(data, contentType='application/json') {
        return new PluginResponse(data, 201, contentType)
    }

    static empty(data, contentType='text/html') {
        return new PluginResponse(data, 204, contentType)
    }

    constructor(data, statusCode, contentType) {
        this.data = data
        this.statusCode = statusCode
        this.contentType = contentType
    }
}
module.exports = PluginResponse
