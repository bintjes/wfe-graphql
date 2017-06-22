'use strict'

const SQL = require('../../connectors/mysql')
const { TranscodingFactory } = require('../../connectors/mysql').models
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
    }
}
