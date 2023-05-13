const mongoose = require('mongoose');

const auditSchema = mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
    },
    changeDate: {
        type: String,
        required: true,
    },
    changeTime: {
        type: String,
        required: true,
    },
    tableName: {
        type: String,
        required: true,
    },
    operationType: {
        type: String,
        required: true,
    },
    entityChanged: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Audit', auditSchema);
