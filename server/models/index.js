exports.connection = require("./db");
exports.User = require("./User.model");
exports.ChabotEvent = require("./ChatbotEvent.model");
exports.DemandeCommunication = require("./DemandeCommunication.model");
exports.AdminChatList = require("./AdminChatList.model");
exports.RoomEvent = require("./RoomEvent.model");


// exports.User.hasMany(exports.Post);
// exports.Post.belongsTo(exports.User);