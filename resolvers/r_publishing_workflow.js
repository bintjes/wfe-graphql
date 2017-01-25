const SQL = require('../connectors/mysql')

module.exports = {
    WfeQuery : {
        workflow(_, { id }) {
            return SQL.models.r_publishing_workflow.findOne({
                where : {
                    workflow_id : id
                }
            })
        },

        workflows(){
            return SQL.models.r_publishing_workflow.findAll()
        },
    }

  
}
