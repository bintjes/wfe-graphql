'use strict'

const SQL = require('../../connectors/mysql')
const { TranscodingMachine } = require('../../connectors/mysql').models
module.exports = {
    WfeQuery : {
        transcodingMachine(_, { id }) {
            return TranscodingMachine.findByPrimary(id)
        },
        transcodingMachines(){
            return TranscodingMachine.findAll()
        },
    },
    TranscodingMachine : {
        transcodingFactories : (transcodingMachineModel) => {
            if (transcodingMachineModel.transcodingFactories) {
                return transcodingMachineModel.transcodingFactories
            }
            return transcodingMachineModel.getTranscodingFactories()
        }
    }
}
