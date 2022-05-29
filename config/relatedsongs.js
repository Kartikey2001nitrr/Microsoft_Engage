/**
 * this js file search for what next song user must like
 */

const alldatabase=require("./getalldatabase");
function related_song(no)
{
    var func=alldatabase['get_graphlist'];
    graphlist=func();
    var relatedsong = graphlist[no];
    var songArray=new Array();
    var Array1=Object.keys(relatedsong);
    var Array2=Object.values(relatedsong);
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
module.exports=related_song;