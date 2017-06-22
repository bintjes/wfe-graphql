'use strict'

//const SQL = require('../../connectors/mysql')
const { WorkflowLang } = require('../../connectors/mysql').models
module.exports = {
    WfeQuery : {
        workflowLang(_, { id }) {
            return WorkflowLang.findById(id)
        },
        workflowLangs(){
            return WorkflowLang.findAll()
        },
    }
    ,
    WorkflowLang :{
        workflow : (workflowLangModel) => {
            if (workflowLangModel.workflow) {
                return workflowLangModel.workflow
            }
            return workflowLangModel.getWorkflow()
        },
        language: (workflowLangModel) => {
            if (workflowLangModel.language) {
                return workflowLangModel.language
            }
            return workflowLangModel.getLanguage()
        }
    }

}
