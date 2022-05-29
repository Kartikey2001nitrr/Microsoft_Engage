/**
 * this js file takes history of user,graph of song,user favourite song and search the song user may like from the database
 */


 var gethistory = require("./get_history");
 var SortList = require("./getlist");
 var Related_songlist = require("./relatedsongs");
 var Umls=require("./Users_most_listen_Songs");
 var alldatabase=require("./getalldatabase");
const { set } = require("express/lib/application");
 
 
 function recommendations(userid)
 {
     var mainArray=new Set();
 
     var history=gethistory(userid);
 
     var Array1=Object.values(history);
  
     for(var i=7;i<17;i++)
     {
         if(Array1[i]==(-1))
         {
             continue;
         }        
         var Array2=Related_songlist(Array1[i]);
         for(var j=0;j<Array2.length;j++)
         {
             mainArray.add(Array2[j][0]);
         }
     }
 
 
     //line  17 to 39 feteh user history and commend song according to it
 
     var mostviewed=Umls(userid);
     for(var i=0;i<mostviewed.length;i++)
     {
         mainArray.add(parseInt(mostviewed[i]));
     }
 
     //line 43 to 48 reccond song which user likes most
 
     var fun1=alldatabase['get_usersdatabase'];
     var usersdatabase=fun1();
     var user=usersdatabase[userid];
     var sum=user['Hits']+user['Romance']+user['Energy']+user['Party']+user['Sad'];
     var num=16-mainArray.size;
     var Sort_list2=SortList('Hits');
     var Sort_list3=SortList('Romance');
     var Sort_list4=SortList('Energy');
     var Sort_list5=SortList('Party');
     var Sort_list6=SortList('Sad');
     var Array3=new Array();
     var Array4=new Array();
     var Array5=new Array();
     var Array6=new Array();
     var Array7=new Array();
     var Array8=new Array();
     var Array9=new Array();
 
     Array4.push(parseFloat(num*user['Hits']/sum));
     Array4.push(Sort_list2);
     Array3.push(Array4);
     Array5.push(parseFloat((user['Romance']/sum)*num));
     Array5.push(Sort_list3);
     Array3.push(Array5);
     Array6.push(parseFloat(num*user['Energy']/sum));
     Array6.push(Sort_list2);
     Array3.push(Array6);
     Array7.push(parseFloat(num*user['Party']/sum));
     Array7.push(Sort_list4);
     Array3.push(Array7);
     Array8.push(parseFloat(num*user['Sad']/sum));
     Array8.push(Sort_list5);
     Array3.push(Array8);
     Array3.sort(function(a,b){
         return b[0]-a[0];
     });
 
     for(var i=0;i<5;i++)
     {
         Array9=Array3[i];
         for(var j=0;j<Math.ceil(Array9[0]);j++)
         {
 
             mainArray.add(Array9[1][j]['Serial_No']);
         }
     }
 
     //line 51 to 98 recommend song according to users taste
     return mainArray;    
 }
 module.exports=recommendations;