'use strict'

const { Workflow } = require('../../connectors/mysql').models
const { computePagination } = require('./helpers/pagination')
const { prepareOptions } = require('./helpers/sequelize')
module.exports = {
    WfeQuery : {
        workflow(_, { id }) {
            return Workflow.findById(id)
        },
        workflows : (_,{options}) => {
            const paginate = computePagination(options)
            const query = Object.assign({}, prepareOptions(options))

            return Workflow.findAndCountAll(query)
                .then(paginate)
        },
    },
    Workflow :{
        workflowGroup : (workflowModel) => {
            if (workflowModel.workflowGroup) {
                return workflowModel.workflowGroup
            }
            return workflowModel.getWorkflowGroup()
        },
        workflowTasks: (workflowModel) => {
            if (workflowModel.workflowTasks) {
                return workflowModel.workflowTasks
            }
            return workflowModel.getWorkflowTasks()
        },
        workflowLangs: (workflowModel) => {
            if (workflowModel.workflowLangs) {
                return workflowModel.workflowLangs
            }
            return workflowModel.getWorkflowLangs()
        },
        workflowHn: (workflowModel) => {
            if (workflowModel.workflowHns) {
                return workflowModel.workflowHns
            }
            return workflowModel.getWorkflowHns()
        },
        workflowRules: (workflowModel) => {
            if (workflowModel.workflowRuless) {
                return workflowModel.workflowRules
            }
            return workflowModel.getWorkflowRules()
        }
    }

  
}
