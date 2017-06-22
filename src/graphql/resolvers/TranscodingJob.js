'use strict'

const SQL = require('../../connectors/mysql')
const { TranscodingJob } = require('../../connectors/mysql').models
module.exports = {
    WfeQuery : {
        transcodingJob(_, { id }) {
            return TranscodingJob.findById(id)
        },
        transcodingJobs(){
            return TranscodingJob.findAll()
        },
    },
    TranscodingJob : {
        transcodingFactory : (transcodingJobModel) => {
            if(transcodingJobModel.transcodingFactory){
                return transcodingJobModel.transcodingFactory
            }
            return transcodingJobModel.getTranscodingFactory()
        },
        transcodingStatus : (transcodingJobModel) => {
            if(transcodingJobModel.transcodingStatus){
                return transcodingJobModel.transcodingStatus
            }
            return transcodingJobModel.getTranscodingStatus()
        }
    }
}
