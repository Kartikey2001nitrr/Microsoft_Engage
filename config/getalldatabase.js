/* This js file fetch data from Book1.xlsx and change sheet to JSON object and contains getters function and updating functions */

const XLSX= require("xlsx");
const workbook = XLSX.readFile("./config/Book1.xlsx");
// const workbook = XLSX.readFile("./Book1.xlsx");

const usersworksheet=workbook.Sheets.Users;         //geting users sheet form book1.xlsx
var usersdatabase = XLSX.utils.sheet_to_json(usersworksheet);     //changing it to JSON file

// userdatabase contains all data of all users such as there taste,history,name etc.


const allsongworksheet=workbook.Sheets.AllPlaylist;
var allsongdatabase = XLSX.utils.sheet_to_json(allsongworksheet);

//songworksheet contains all songs properties and there likes,dislike and views


const hitssongworksheet=workbook.Sheets.HitsPlaylist;
var hitssongdatabase = XLSX.utils.sheet_to_json(hitssongworksheet);

//hitssongdatabase contains hits songs properties and there likes,dislike and views


const romancesongworksheet=workbook.Sheets.RomancePlaylist;
var romancesongdatabase = XLSX.utils.sheet_to_json(romancesongworksheet);

//romancesongdatabase contains hits songs properties and there likes,dislike and views


const Energysongworksheet=workbook.Sheets.EnergyPlaylist;
var Energysongdatabase = XLSX.utils.sheet_to_json(Energysongworksheet);

//Energysongdatabase contains hits songs properties and there likes,dislike and views


const Partysongworksheet=workbook.Sheets.PartyPlaylist;
var Partysongdatabase = XLSX.utils.sheet_to_json(Partysongworksheet);

//Partysongdatabase contains hits songs properties and there likes,dislike and views


const Sadsongworksheet=workbook.Sheets.SadPlaylist;
var Sadsongdatabase = XLSX.utils.sheet_to_json(Sadsongworksheet);

//Sadsongdatabase contains hits songs properties and there likes,dislike and views


const Graphsheet=workbook.Sheets.Graph;
var Graphdatabase = XLSX.utils.sheet_to_json(Graphsheet);

//Graphdatabase contains graph of songs (from which song user jump from present song  Ex song1->song3->song100)


const User_Songsheet=workbook.Sheets.User_Song_Link;
var User_Songdatabase = XLSX.utils.sheet_to_json(User_Songsheet);

//User_Songdatabase contains users fav. songs list


function update_alldatabase()                              //function to update all databases
{
    var usersworksheet1 = XLSX.utils.json_to_sheet(usersdatabase);
    var allsongworksheet1 = XLSX.utils.json_to_sheet(allsongdatabase);
    var hitssongworksheet1 = XLSX.utils.json_to_sheet(hitssongdatabase);
    var romanceworksheet1 = XLSX.utils.json_to_sheet(romancesongdatabase);
    var Energysongworksheet1 = XLSX.utils.json_to_sheet(Energysongdatabase);
    var Partysongworksheet1 = XLSX.utils.json_to_sheet(Partysongdatabase);
    var Sadsongworksheet1 = XLSX.utils.json_to_sheet(Sadsongdatabase);
    var Graphsheet1 = XLSX.utils.json_to_sheet(Graphdatabase);
    var User_songsheet1 = XLSX.utils.json_to_sheet(User_Songdatabase);

    var newWorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(newWorkBook,usersworksheet1,'Users');
    XLSX.utils.book_append_sheet(newWorkBook,allsongworksheet1,'AllPlaylist');
    XLSX.utils.book_append_sheet(newWorkBook,hitssongworksheet1,'HitsPlaylist');
    XLSX.utils.book_append_sheet(newWorkBook,romanceworksheet1,'RomancePlaylist');
    XLSX.utils.book_append_sheet(newWorkBook,Energysongworksheet1,'EnergyPlaylist');
    XLSX.utils.book_append_sheet(newWorkBook,Partysongworksheet1,'PartyPlaylist');
    XLSX.utils.book_append_sheet(newWorkBook,Sadsongworksheet1,'SadPlaylist');
    XLSX.utils.book_append_sheet(newWorkBook,Graphsheet1,'Graph');
    XLSX.utils.book_append_sheet(newWorkBook,User_songsheet1,'User_Song_Link');

    // XLSX.writeFile(newWorkBook,"./config/Book1.xlsx");              
    //line to update all BOOK1.xlsx workbook
}

function get_usersdatabase()     //getter function to return usersdatabase
{
    return usersdatabase;
}
function get_allplaylist()     //getter function to return allsongdatabase
{
    return allsongdatabase;
}
function get_hitsplaylist()    //getter function to return hitssongdatabase
{
    return hitssongdatabase;
}
function get_romanceplaylist()      //getter function to return romancesongdatabase
{
    return romancesongdatabase;
}
function get_energyplaylist()      //getter function to return Energysongdatabase
{
    return Energysongdatabase;
}
function get_partyplaylist()      //getter function to return Partysongdatabase
{
    return Partysongdatabase;
}
function get_sadplaylist()       //getter function to return Partysongdatabase
{
    return Sadsongdatabase;
}
function get_graphlist()       //getter function to return Sadsongdatabase
{
    return Graphdatabase;
}

function get_User_Songlist()    //getter function to return User_Songdatabase
{
    return User_Songdatabase;
}


function update_usersdatabase(no,userid)    //function to update history of any user and their taste about song
{
    var user=usersdatabase[userid]
    var resentarray=Object.values(user);
    var check=-1;
    for(var i=7;i<17;i++)
    {
        if(resentarray[i]===no)
        {
            check=i;
            break;
        }
    }
    if(check===(-1))
    {
        for(var i=16;i>7;i--)
        {
            resentarray[i]=resentarray[i-1];
        }
        resentarray[7]=no;
    }
    else
    {
        for(var i=check;i>7;i--)
        {
            resentarray[i]=resentarray[i-1];
        }
        resentarray[7]=no;
    }
    for(var i=7;i<17;i++)
    {
        var r="Resent"+(i-7);
        user[r]=resentarray[i];
    }
    if(no<41)
    {
        user['Hits']++;
    }
    else if(no>40 && no<81)
    {
        user['Romance']++;
    }
    else if(no>80 && no<121)
    {
        user['Energy']++;
    }
    else if(no>120 && no<161)
    {
        user['Party']++;
    }
    else
    {
        user['Sad']++;
    }
    usersdatabase[userid]=user;
    update_alldatabase();            //calling update function and updata data permanently
}

function increase_views(no)      //function to increses views in songs 
{
    var song=allsongdatabase[no];
    song['Plays']=song['Plays']+1;
    allsongdatabase[no]=song;
    if(no<=40)
    {
        var song=hitssongdatabase[no];
        song['Plays']=song['Plays']+1;
        hitssongdatabase[no]=song;
    }
    else if(no>40 && no<=80)
    {
        no1=no-41;
        var song=romancesongdatabase[no1];
        song['Plays']=song['Plays']+1;
        romancesongdatabase[no1]=song;
    }
    else if(no>80 && no<=120)
    {
        no1=no-81;
        var song=Energysongdatabase[no1];
        song['Plays']=song['Plays']+1;
        Energysongdatabase[no1]=song;
    }
    else if(no>120 && no<=160)
    {
        no1=no-121;
        var song=Partysongdatabase[no1];
        song['Plays']=song['Plays']+1;
        Partysongdatabase[no1]=song;
    }
    else
    {
        var no1=no-161;
        var song=Sadsongdatabase[no1];
        song['Plays']=song['Plays']+1;
        Sadsongdatabase[no1]=song;
    }
    update_alldatabase();
}

function like_or_dislike(no)  //function to increses likes and dislikes in song
{
    var a;
    if(no>=1000 && no<2000)
    {
        a='Likes'; 
    }
    else
    {
        a='Dislikes';
    }
    no=no%1000;
    var song=allsongdatabase[no];
    song[a]=song[a]+1;
    allsongdatabase[no]=song;
    if(no<=40)
    {
        var song=hitssongdatabase[no];
        song[a]=song[a]+1;
        hitssongdatabase[no]=song;
    }
    else if(no>40 && no<=80)
    {
        no1=no-41;
        var song=romancesongdatabase[no1];
        song[a]=song[a]+1;
        romancesongdatabase[no1]=song;
    }
    else if(no>80 && no<=120)
    {
        no1=no-81;
        var song=Energysongdatabase[no1];
        song[a]=song[a]+1;
        Energysongdatabase[no1]=song;
    }
    else if(no>120 && no<=160)
    {
        no1=no-121;
        var song=Partysongdatabase[no1];
        song[a]=song[a]+1;
        Partysongdatabase[no1]=song;
    }
    else
    {
        no1=no-161;
        var song=Sadsongdatabase[no1];
        song[a]=song[a]+1;
        Sadsongdatabase[no1]=song;
    }
    update_alldatabase();
}
function update_graphlist(resent,present)        //function to update graph
{
    var data1=Graphdatabase[resent];
    data1[present]++;
    Graphdatabase[resent]=data1;
    update_alldatabase();
}
function update_most_heard_song(songno,userid)      //function to update  taste of user
{
    var data1=User_Songdatabase[userid];
    data1[songno]++;
    User_Songdatabase[userid]=data1;
    update_alldatabase();
}


module.exports = {           //exporting all functions
    get_usersdatabase,
    get_allplaylist,
    get_hitsplaylist,
    get_romanceplaylist,
    get_energyplaylist,
    get_partyplaylist,
    get_sadplaylist,
    get_graphlist,
    get_User_Songlist,
    update_usersdatabase,
    increase_views,
    like_or_dislike,
    update_graphlist,
    update_most_heard_song   
}