module.exports = {
    check (request) {
        return new Promise((resolve) => {
            let headerVersion = request.headers['api-version']
            let queryVersion = request.query.version

            if (headerVersion) {
                resolve(headerVersion)
            } else if (queryVersion) {
                resolve(queryVersion)
            } else {
                resolve(null)
            }
        })
    }
}

