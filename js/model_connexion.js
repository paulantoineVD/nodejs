var events = require('events');
var eventEmitter = new events.EventEmitter();
//Les fonctions des evenements

var user_info = {}

user_info.id = "";
user_info.pass = "";

user_info.login = function connection()
{
    console.log("connexion de " + user_info.id);
}

user_info.logoff = function logoff()
{
    console.log("deconnexion de " + user_info.id);
}

eventEmitter.on('login', user_info.login);

module.exports.user_info = user_info;
console.log(user_info.id);
eventEmitter.emit('login');

user_info.id = "Paul-Antoine Van Driessche";
console.log(user_info.id);
eventEmitter.emit('login');

