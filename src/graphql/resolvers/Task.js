'use strict'

const Sequelize = require('../../connectors/mysql')
const { Task } = Sequelize.models
module.exports = {
    WfeQuery : {
        task(_, { id }) {
            return Task.findById(id)
        },
        tasks(){
            return Task.findAll()
        },
    },
    WfeMutation: {
        upsertTask : (_, { task })=> {
            return Sequelize.transaction((transaction) => {
                const { id, default_service_url, name, description } = task
                const options = { transaction }
                return Task.upsertAndFetch({id, default_service_url, name, description }, options)
                    .then((taskModel)=>taskModel)
            })
        }

    }
}
