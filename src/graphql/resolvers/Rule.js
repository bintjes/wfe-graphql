'use strict'
const Sequelize = require('../../connectors/mysql')
const { Rule } = Sequelize.models

module.exports = {
    WfeQuery : {
        rule(_, { id }) {
            return Rule.findById(id)
        },
        rules(){
            return Rule.findAll()
        },
    },
    WfeMutation : {
        upsertRule : (_, { rule })=> {
            return Sequelize.transaction((transaction) => {
                const { id, description, service_url } = rule
                const options = { transaction }
                return Rule.upsertAndFetch({ id , description, service_url}, options)
                    .then((ruleModel) => ruleModel)
            })
        }
    }
}
