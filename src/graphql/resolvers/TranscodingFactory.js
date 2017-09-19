'use strict'

const Sequelize = require('../../connectors/mysql')
const { TranscodingFactory } = Sequelize.models
module.exports = {
    WfeQuery : {
        transcodingFactory(_, { id }) {
            return TranscodingFactory.findByPrimary(id)
        },
        transcodingFactories(){
            return TranscodingFactory.findAll()
        },
    },
    TranscodingFactory : {
        transcodingMachine : (transcodingFactoryModel) => {
            if (transcodingFactoryModel.transcodingMachine) {
                return transcodingFactoryModel.transcodingMachine
            }
            return transcodingFactoryModel.getTranscodingMachine()
        }
    },
    WfeMutation: {
        upsertTranscodingFactory : (_, { factory })=> {
            return Sequelize.transaction((transaction) => {
                const { id, slug, name, description, machine_id, rename_mask, option_rename, extension, default_schedule  } = factory
                const options = { transaction }
                return TranscodingFactory.upsertAndFetch({id, slug, name, description, machine_id, rename_mask, option_rename, extension, default_schedule }, options)
                    .then((transcodingFactoryModel)=> transcodingFactoryModel)
            })
        }


    }
}
