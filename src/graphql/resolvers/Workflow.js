'use strict'

const SQL = require('../../connectors/mysql')
const { Workflow } = require('../../connectors/mysql').models
module.exports = {
    WfeQuery : {
        workflow(_, { id }) {
            return Workflow.findOne({
                where : {
                    workflow_id : id
                }
            })
        },

        workflowTemplates(){
            return Workflow.findAll()
        },
    }

  
}
