'use strict'

const SQL = require('../../connectors/mysql')
const { WorkflowGroup } = require('../../connectors/mysql').models
module.exports = {
    WfeQuery : {
        workflowGroup(_, { id }) {
            return WorkflowGroup.findByPrimary(id)
        },
        workflowGroups(){
            return WorkflowGroup.findAll()
        },
    },
    WorkflowGroup : {
        workflows : (workflowGroupModel) => {
                return workflowGroupModel.getWorkflows()
        }
    }
  
}
