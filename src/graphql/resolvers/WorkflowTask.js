'use strict'

const SQL = require('../../connectors/mysql')
const { WorkflowTask } = require('../../connectors/mysql').models
module.exports = {
    WfeQuery : {
        workflowTask(_, { id }) {
            return WorkflowTask.findByPrimary(id)
        },
        workflowTasks(){
            return WorkflowTask.findAll()
        },
    },
    WorkflowTask :{
        workflow : (workflowTaskModel) => {
            if (workflowTaskModel.workflow) {
                return workflowTaskModel.workflow
            }
            return workflowTaskModel.getWorkflow()
        },
        task: (workflowTaskModel) => {
            if (workflowTaskModel.task) {
                return workflowTaskModel.task
            }
            return workflowTaskModel.getTask()
        }

    }
  
}
