'use strict'

function computeNext({ limit, offset }, total) {
    const hasResults = Boolean(total)
    let pagination = {
        limit,
        offset : offset + limit
    }

    if (!hasResults || pagination.offset >= total) {
        pagination = null
    }

    return pagination
}

function computePrevious({ limit, offset }, total) {
    const hasResults = Boolean(total)

    let pagination = {
        limit,
        offset : offset - limit
    }

    if (!hasResults || pagination.offset < 0) {
        pagination = null
    }

    return pagination
}

module.exports = {
    computePagination(paginationParams = {}) {
        return (results) => {
            return {
                results : results.rows,
                pagination : {
                    total : results.count,
                    count : results.rows.length,
                    next : computeNext(paginationParams, results.count),
                    previous : computePrevious(paginationParams, results.count)
                }
            }
        }
    }
}
