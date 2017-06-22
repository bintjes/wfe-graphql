'use strict'

const SQL = require('../../connectors/mysql')
const { PublicationTask } = require('../../connectors/mysql').models
module.exports = {
    WfeQuery : {
        publicationTask(_, { id }) {
            return PublicationTask.findById(id)
        },
        publicationTasks(){
            return PublicationTask.findAll()
        },
    },
    PublicationTask : {

        transcodingJob : (publicationTaskModel) => {
            if(publicationTaskModel.transcodingJob){
                return publicationTaskModel.transcodingJob
            }
            return publicationTaskModel.getTranscodingJob()
        }
        ,
        publicationTaskStatus : (publicationTaskModel) => {
            if(publicationTaskModel.publicationTaskStatus){
                return publicationTaskModel.publicationTaskStatus
            }
            return publicationTaskModel.getPublicationStatus()
        }

    }
}
