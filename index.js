//Starting of Project

//declaration

const express = require('express');
const { normalize } = require('path');
const path = require('path');
const port = 8000;                  //port for our localhost

const app = express();

//Defining Variables
var contactListfunc = require("./config/names");   //function to get lists of all user 
var gethistory = require("./config/get_history");    //function to get history of user
var songListfunc = require("./config/songname");     //function to get all song list
var SortList = require("./config/getlist");         //function to sort song on basics of views,likes and dislikes
var Userdatabase = require("./config/getalldatabase");    //functions to update all the databases
var related_song=require("./config/relatedsongs");      //function to get all songs that user might like 
var Users_most_listen_Songs=require("./config/Users_most_listen_Songs");    //function to get userss favourite song
var recommendations=require("./config/recommendation");      //function to get song recommendation for user
var userid;
let cate;



const { Console } = require('console');
const { reset } = require('nodemon');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('assests'));            // setting views and their assests




app.get('/', function(req, res){                    //for sending starting page with user details
    var contactList=contactListfunc();
    return res.render('index',{
        title: "Contact List",
        contact_list: contactList
    });   
})

app.get(['/home/:userid','/home'], function(req, res){           //for sending home page and their components
    if(req.params.userid!=undefined)
       userid=req.params.userid;
    var allhistory1=gethistory(userid);
    var Sort_list1=SortList('All');
    var Sort_list2=SortList('Hits');
    var Sort_list3=SortList('Romance');
    var Sort_list4=SortList('Energy');
    var Sort_list5=SortList('Party');
    var Sort_list6=SortList('Sad');
    var umls=Users_most_listen_Songs(userid);
    var songList=songListfunc();
    var recom=recommendations(userid);
    return res.render('home',{
        song_list:songList,
        Resents: allhistory1,
        Sort_list1:Sort_list1,
        Sort_list2:Sort_list2,
        Sort_list3:Sort_list3,
        Sort_list4:Sort_list4,
        Sort_list5:Sort_list5,
        Sort_list6:Sort_list6,
        Umls:umls,
        recommendation:recom
    });   
})


app.get(['/Categories/:cate','/Categories'], function(req, res){       //for sending categories page and their components
    cate=req.params.cate;
    var Sort_list1=SortList(cate);
    return res.render('Categories',{
        Cate_name: cate,
        Sort_list1:Sort_list1
    });
      
})

var recent=undefined,present=undefined;
app.get(['/moviepage/:no','/moviepage'], function(req, res){          //for sending moviepage and there components
    var no=req.params.no;  
    if(no!=present)
    {
        recent=present;
        present=no;
    }
    if(present!=undefined && recent!=undefined)
    {
        var func1=Userdatabase['update_graphlist'];
        func1(recent,present);
    }
    var songList=songListfunc();
    var func1=Userdatabase['update_usersdatabase'];
    func1(no,userid);
    var func2=Userdatabase['increase_views'];
    func2(no);
    var func3=Userdatabase['update_most_heard_song'];
    func3(no,userid);
    var recom=recommendations(userid);
    return res.render('moviepage',{
        song:songList[no],
        song_list:songList,
        recom: recom
    });   
})

app.get(['/like_dislike/:no'], function(req,res){                  //for updateing likes and dislikes
    var no=req.params.no;
    var songList=songListfunc();
    var func=Userdatabase['like_or_dislike'];
    func(no);
    return res.redirect('/moviepage/'+(no%1000));
})


app.listen(port, function(err){                              //to handle errors
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})