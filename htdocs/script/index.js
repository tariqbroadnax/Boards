function getUrlParameter(sParam) 
{
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}

function initNetvotes() 
{
    var x = document.getElementsByClassName("numVotes");

    // console.log("numVotes elements: " + x.length);
    var i;
    for (i = 0; i < x.length; i++) {
        var votes = x[i].getElementsByClassName("votes")[0];

        var upvotesStr = votes.getElementsByClassName("upvotes")[0].childNodes[0].nodeValue,
            downvotesStr = votes.getElementsByClassName("downvotes")[0].childNodes[0].nodeValue;

        // console.log("upvotes str: " + upvotesStr);
        // console.log("downvotes str: " + downvotesStr);

        var upvotes = Number(upvotesStr),
            downvotes = Number(downvotesStr);

        // console.log("upvotes: " + upvotes);
        // console.log("downvotes: " + downvotes);

        if(isNaN(upvotes) || isNaN(downvotes))
            continue;
        else {
            var netvotes = upvotes - downvotes;

            x[i].getElementsByClassName("netVotes")[0].childNodes[0].nodeValue = netvotes;
        }
    }
}

offset = 0;
limit = 30;

function showMorePosts()
{    
    // console.log("offset: " + offset + " limit: " + limit);
   
    _showMorePosts(offset, limit);
}

function _showMorePosts(offset, limit) 
{
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            var myObj = JSON.parse(this.responseText);

            var i;
            for(i = 0; i < myObj.length; i++)
                addPost(myObj[i]);
            
            initNetvotes();
        }
    }
    
    var sortby = getUrlParameter("sortby");
    
    if(sortby == null)
        sortby = "hot";

    xmlhttp.open("GET", "get_posts.php/?offset="+offset+"&limit="+limit+"&sortby="+sortby, true);
    
    console.log("get_posts.php/?offset="+offset+"&limit="+limit+"&sortby="+sortby);
    
    xmlhttp.send();
}

function addPost(post)
{
    if (!String.prototype.format) {
        String.prototype.format = function() {
            var args = arguments;
            return this.replace(/{(\d+)}/g, function(match, number) { 
                return typeof args[number] != 'undefined'
                    ? args[number]
                : match
                ;
            });
        };
    }
    
    var date = new Date(post.creationDate);

    var html = '<div class="row bg-info" id="row" style="cursor: pointer;" onclick="window.location=\'#\';"><div class="col-sm-1 voteCol"><span class="numVotes"><span class="netVotes">[netVotes]</span><span class="votes"><span class="upvotes">{0}</span> | <span class="downvotes">{1}</span></span></span><br>votes</div><div class="col-sm-7"><h4 class="title">{2}</h4><footer>by <a>{3}</a> {4}</footer></div><div class="col-sm-2 commentCol">{5}<br>Comments</div><div class="col-sm-2 viewCol">{6}<br>Views</div></div>';

    html = html.format(post.upvotes, post.downvotes, post.title, post.posterUsername, getDateString(date), post.comments, post.views);
    
    // console.log("date: " + post.creationDate);
    // console.log("date: " + date);
    // console.log("date: " + getDateString(date));

    var col = document.getElementById("column main");

    col.innerHTML += html;
    
    offset++;
}

function getDateString(date)
{
    var now = Date.now;
    
    var years = years_between(date, now);
    
    if(years == 0)
    {
        var months = months_between(date, now);
        
        if(months == 0)
        {
            var days = days_between(date, now);
            
            if(days == 0)
            {
                var hours = hours_between(date, now);
                
                if(hours == 0)
                {
                    var minutes = minutes_between(date, now);
                    
                    if(minutes == 1)
                        return "about a minute ago";
                    else
                        return "about " + minutes + " minutes ago";
                }
                else if(hours == 1)
                {
                    return "about an hour ago";
                }
                else
                    return "about " + hours + " hours ago";
            }
            else if(days == 1)
            {
                return "about a day ago";
            }
            else
                return "about " + days + " days ago";
            
        }
        else if(months == 1)
        {
            return "about a month ago";
        }
        else
        {
            return "about " + months + " months ago";
        }
    }
    else if(years == 1)
    {
        return "about a year ago";
    }
    else
    {
        return "about " + years + " years ago";   
    }
}

function minutes_between(date1, date2)
{
    var diff = Math.abs(date2 - date1);
    
    var minutes = Math.floor((diff/1000)/60);
    
    return minutes;

}

function hours_between(date1, date2)
{
    var hours = Math.abs(date2 - date1) / 36e5;
    
    return hours;
}

function days_between(date1, date2) 
{
    // The number of milliseconds in one day
    var ONE_DAY = 1000 * 60 * 60 * 24

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime()
    var date2_ms = date2.getTime()

    // Calculate the difference in milliseconds
    var difference_ms = Math.abs(date1_ms - date2_ms)

    // Convert back to days and return
    return Math.round(difference_ms/ONE_DAY)

}

function months_between(date1, date2) 
{
    var months;
    months = (date2.getFullYear() - date1.getFullYear()) * 12;
    months -= date1.getMonth() + 1;
    months += date2.getMonth();
    return months <= 0 ? 0 : months;
}

function years_between(date1, date2) 
{ 
    // birthday is a date
   var ageDifMs = date2 - date1.getTime();
   var ageDate = new Date(ageDifMs); // miliseconds from epoch
   return Math.abs(ageDate.getUTCFullYear() - 1970);
 }


initNetvotes();
showMorePosts();