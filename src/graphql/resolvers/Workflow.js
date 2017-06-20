'use strict'

const SQL = require('../../connectors/mysql')
const { Workflow } = require('../../connectors/mysql').models
module.exports = {
    WfeQuery : {
        workflow(_, { id }) {
            return Workflow.findById(id)
        },
        workflows(){
            return Workflow.findAll()
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
        }
    }

  
}
