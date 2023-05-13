const asyncHandler = require('express-async-handler')
const Material = require('../models/material')
const Audit = require('../models/audit')
require('dotenv').config()

async function auditAdd(auditEmail, tableName, operationType, entityChanged) {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const date = dd + '-' + mm + '-' + yyyy;

    const time = today.toLocaleTimeString('en-US', {
        hour12: true,
        hour: "numeric", minute: "numeric", second: "numeric"
    });


    const audit = await Audit.create({
        userEmail: auditEmail,
        changeDate: date,
        changeTime: time,
        tableName: tableName,
        operationType: operationType,
        entityChanged: entityChanged
    })
    if (audit) {
        return true
    } else {
        return false
    }
}

const addMaterial = asyncHandler(async (req, res) => {

    const auditEmail = req.header("email");
    const {
        material,
        materialName,
        materialType,
        courses
    } = req.body;

    if (!material || !materialName || !materialType || !courses) {
        res.status(400).json({
            status: 400,
            message: "Please fill all fields"
        });
        return;
    }

    const materialObj = await Material.create({
        materialName,
        materialType,
        material,
        courseTitles: courses
    })


    if (materialObj) {
        auditAdd(auditEmail, "Material", "Add", materialName);
        res.status(200).json({
            status: 200,
            _id: material._id
        });
        return;
    } else {
        res.status(400).json({
            status: 400,
            message: "Material not Added"
        });
        return;
    }
});

module.exports = {
    addMaterial
}