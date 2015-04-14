$.ajax({
        dataType: 'jsonp',
        url:'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=30&output=json&q=http://www.reddit.com/r/humanitarianIM/new/.rss',
        success: function(data){
            console.log(data);
            constructFeed(data.responseData.feed.entries);
        },
        error: function(error){
            console.log(error);
        }
});

function constructFeed(entries){
    var html = '<div class="timetitle">This week</div><div class="row">';
    var lastWeekFlag = false;
    var beforeFlag = false;
    var today = new Date();
    entries.forEach(function(e){
        if(!lastWeekFlag){
            if(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)>new Date(e.publishedDate)){
                lastWeekFlag = true;
                html = html + '</div><div class="timetitle">Last Week</div><div class="row">';
            }
        }
        if(!beforeFlag){
            if(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 14)>new Date(e.publishedDate)){
                beforeFlag = true;
                html = html + '</div><div class="timetitle">Before that</div><div class="row">';
            }
        }        
        var img = extractThumbnail(e.content);
        var link = extractLink(e.content);
        html = html + '<div class="col-sm-4"><div class="tile"><h4><a href="'+link+'" target="_blank">' + e.title + '</a></h4><a href="'+link+'" target="_blank">' + img + '</a></div></div>';
    });
    html = html +'</div>';
    $('#redditfeed').html(html);
}

function extractThumbnail(html){
    var src = html.match(/<img.*?src="([^">]*\/([^">]*?))".*?>/g);
    if(src===null){
        return '<img src="images/placeholder.png" alt="placeholder" />';
    } else {
        return src[0];
    }    
}

function extractLink(html){
    var src = html.match(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig);
    return src[src.length-2];
}