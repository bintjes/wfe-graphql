'use strict'

const { Publication } = require('../../connectors/mysql').models
const { computePagination } = require('./helpers/pagination')
const { prepareOptions } = require('./helpers/sequelize')

module.exports = {
    WfeQuery : {
        publication(_, { id }) {
            return Publication.findById(id)
        },
        publications : (_,{options}) => {
            const paginate = computePagination(options)
            const query = Object.assign({}, prepareOptions(options))
            return Publication.findAndCountAll(query)
                .then(paginate)
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
