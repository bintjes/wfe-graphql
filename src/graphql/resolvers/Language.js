'use strict'
const Sequelize = require('../../connectors/mysql')
const { Language } = Sequelize.models
const { computePagination } = require('./helpers/pagination')
const { prepareOptions } = require('./helpers/sequelize')

module.exports = {
    WfeQuery : {
        language(_, { id }) {
            return Language.findById(id)
        },

        languages(){
            return Language.findAll()
        },

    },
    WfeMutation: {
        upsertLanguage : (_, { lang })=> {
            return Sequelize.transaction((transaction) => {
                const { id, alias, fullname, rtl, collate_locale, lng_dalet, mixnews_iid, lng_iso, lng_dalet_long, dalet_station_id } = lang
                const options = { transaction }
                return Language.upsertAndFetch({ id, alias, fullname, rtl, collate_locale, lng_dalet, mixnews_iid, lng_iso, lng_dalet_long, dalet_station_id }, options)
                    .then((langModel)=>langModel)
            })
        }

    }


}
