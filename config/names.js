/**
 * this js file returns the name of all users
 */


var database = require("./getalldatabase");
var func = database['get_usersdatabase'];
var contactList = func();

function exportnames() {
    var nameofcontact = new Array();
    for (var i = 0; i < contactList.length; i++) {
        const name = { SNo: contactList[i]['S.No.'], Names: contactList[i]['Names'] };
        nameofcontact.push(name);
    }
    return nameofcontact;
}
module.exports=exportnames;