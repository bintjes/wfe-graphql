'use strict'

const MAX_LIMIT = 100
/**
 * @description Computes and ensures default values for pagination
 * @param {Object} pagination  { limit : Number, offset: Number }
 * @return {Object} A safe pagination object
 */
function mergePaginationWithDefaults({ limit = MAX_LIMIT, offset = 0 }) {
    if (limit < 0) {
        throw new RangeError(`pagination parameter 'limit' can't be negative. Given value is: ${limit}`)
    }

    if (offset < 0) {
        throw new RangeError(`pagination parameter 'offset' can't be negative. Given value is: ${limit}`)
    }

    return {
        limit : Math.min(limit, MAX_LIMIT),
        offset : Math.max(0, offset)
    }
}

/**
 * @description Computes and formats the order parameters according to what sequelize expects
 * @param {Object} order { key, direction }
 * @return {Array} An array with a unique array entry, according to the sequelize spec
 * see : http://docs.sequelizejs.com/en/v3/docs/querying/#ordering
 */
function computeOrder(order) {
    if (!order) {
        return []
    }

    const { key, direction } = order

    if (key === undefined || direction === undefined) {
        throw new TypeError(`order needs to have both key and direction defined. Received key: ${key}, direction: ${direction}`)
    }

    return [
        [key, direction]
    ]
}

/**
 * Compute the order parameter for manual SQL queries.
 * @param {Array} order The given order to compute
 * @param {String} key The default key to give to our order
 * @param {String} direction The default direction to order by
 * @return {Array} [key, direction]
 */
function computeManualOrder(order, key, direction) {
    if (!key || !direction) {
        throw new TypeError('default values for key and direction are mandatory')
    }

    const value = order.slice(0, 1).pop()
    if (Array.isArray(value) && value.length) {
        [key, direction] = value
    }

    return [key, direction]
}


/**
 * @description Computes and prepares the options to be passed to sequelize
 * @param {Object} options { pagination, where, order }
 * @return {Object} sequelize compliant options
 */
function prepareOptions (options = {}) {
    const {
        pagination = {},
        order
    } = options
    const { limit, offset } = mergePaginationWithDefaults(pagination)

    return {
        limit,
        offset,
        order : computeOrder(order)
    }
}

module.exports = {
    prepareOptions,
    computeManualOrder
}
