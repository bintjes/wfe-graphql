'use strict'

const SQL = require('../../connectors/mysql')
const { Publication } = require('../../connectors/mysql').models
module.exports = {
    WfeQuery : {
        publication(_, { id }) {
            return Publication.findById(id)
        },
        publications(){
            return Publication.findAll()
        },
    },
    Publication : {
        workflow : (publicationModel) => {
            if(publicationModel.workflow){
                return publicationModel.workflow
            }
            return publicationModel.getWorkflow()
        },
        publicationTasks : (publicationModel) => {
            if(publicationModel.publicationTasks){
                return publicationModel.publicationTasks
            }
            return publicationModel.getPublicationTasks()

        },
        publicationStatus : (publicationModel) => {
            if(publicationModel.publicationStatus){
                return publicationModel.publicationStatus
            }
            return publicationModel.getPublicationStatus()
        },
        user: (publicationModel) => {
            if(publicationModel.user){
                return publicationModel.user
            }
            return publicationModel.getUser()
        },
        language:(publicationModel) => {
            if(publicationModel.language){
                return publicationModel.language
            }
            return publicationModel.getLanguage()
        }
    }
}
