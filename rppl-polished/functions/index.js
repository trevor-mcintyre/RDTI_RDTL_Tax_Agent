const functions = require("firebase-functions");
const { exportAdminUsersCSV } = require("./exportAdminUsersCSVCloudFunction");

exports.exportAdminUsersCSV = exportAdminUsersCSV;