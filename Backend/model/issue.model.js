const mongoose = require ('mongoose')

let issueSchema  = new mongoose.Schema({

    
    name: {type: String},
    emailid: {type: String},
    mobileno : {type: Number},
    issue : {type: String}

});

const IssueModel = mongoose.model('user_issues',issueSchema)

module.exports = IssueModel