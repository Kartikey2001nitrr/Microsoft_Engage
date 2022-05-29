/**
 * this js file return all song database to user
 */

const alldatabase=require("./getalldatabase");
var func=alldatabase['get_allplaylist'];
var songnames=func();

function songnamesfunc()
{
    return songnames;
}
module.exports=songnamesfunc;

// module.exports=songnames;