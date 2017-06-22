'use strict'

const SQL = require('../../connectors/mysql')
const { WorkflowRule } = require('../../connectors/mysql').models
module.exports = {
    WfeQuery : {
        workflowRule(_, { id }) {
            return WorkflowRule.findByPrimary(id)
        },
        workflowRules(){
            return WorkflowRule.findAll()
        },
    },
    WorkflowRule: {
        rule: (workflowRuleModel) => {
            if(workflowRuleModel.rule){
                return workflowRuleModel.rule
            }
            return workflowRuleModel.getRule()
        },
        workflow: (workflowRuleModel) => {
            if(workflowRuleModel.workflow){
                return workflowRuleModel.workflow

            }
            return workflowRuleModel.getWorkflow()

        }
    }
  
}
