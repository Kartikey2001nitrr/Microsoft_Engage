/**
 * this js file return all users which user hears most
 */

const alldatabase=require("./getalldatabase");
function user_mostlisten_song(userid)
{
    var func=alldatabase['get_User_Songlist'];
    var Usersfavlist=func();
    var Userfavsong = Usersfavlist[userid];
    var songArray=new Array();
    var Array1=Object.keys(Userfavsong);
    var Array2=Object.values(Userfavsong);
    for(var i=0;i<200;i++)
    {
         if(Array2[i]!=0)
         {
             var Array3=new Array();
             Array3.push(Array1[i]);
             Array3.push(Array2[i]);
             songArray.push(Array3);
         }
    }
    songArray.sort(function(a,b){
        return b[1]-a[1];
    });
    return songArray;
}
module.exports=user_mostlisten_song;