/**
 * this js file sorts all song databases in bases of views , likes and dislikes
 */

const alldatabase=require("./getalldatabase");
class QElement {
    constructor(element,priority)
    {
        this.element=element;
        this.priority=priority;
    }
}

class PriorityQueue {
    constructor()
    {
        this.item = [];
    }
    enqueue(element,priority) {
        var qElement = new QElement(element,priority);
        var contain = false;
        for(var i=0;i<this.item.length;i++)
        {
            if(this.item[i].priority < qElement.priority)
            {
                this.item.splice(i,0,qElement);
                contain = true;
                break;
            }
        }
        if(!contain)
        {
            this.item.push(qElement);
        }
    }
    getlist()
    {
        var box=new Array();
        for(var i=0;i<this.item.length;i++)
        {
            var qElement=this.item[i];
            box.push(qElement['element']);
        }
        return box;
    }
}


function typeoflist(type)
{
    var songnames;

    if(type==='Hits')
    {
        var func=alldatabase['get_hitsplaylist'];
        var songnames=func();
    }
    else if(type==='Romance')
    {
        var func=alldatabase['get_romanceplaylist'];
        var songnames=func();
    }
    else if(type==='Energy')
    {
        var func=alldatabase['get_energyplaylist'];
        var songnames=func();
    }
    else if(type==='Party')
    {
        var func=alldatabase['get_partyplaylist'];
        var songnames=func();
    }
    else if(type==='Sad')
    {
        var func=alldatabase['get_sadplaylist'];
        var songnames=func();
    }
    else
    {
        var func=alldatabase['get_allplaylist'];
        var songnames=func();
    }
    var priorityqueue = new PriorityQueue();
    for(var i=0;i<songnames.length;i++)
    {
        var priority=(2*(songnames[i]['Likes'])+(songnames[i]['Plays'])-(2*(songnames[i]['Dislikes'])));
        priorityqueue.enqueue(songnames[i],priority);
    }
    var sortlist=priorityqueue.getlist();

    return sortlist;
    
}
module.exports=typeoflist;

