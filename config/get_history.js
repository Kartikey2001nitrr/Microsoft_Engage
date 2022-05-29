/*This javascript contains a function which take user id of and person and return history 
  of that user*/
const alldatabase=require("./getalldatabase");
function gethistory(no)
{
    var func=alldatabase['get_usersdatabase'];
    var contactList=func();
    return contactList[no];
}
module.exports=gethistory;