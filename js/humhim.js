$.ajax({
        dataType: 'jsonp',
        url:'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=30&output=json&q=http://www.reddit.com/r/humanitarianIM/.rss',
        success: function(data){
            console.log(data);
            constructFeed(data.responseData.feed.entries);
        },
        error: function(error){
            console.log(error);
        }
});

function constructFeed(entries){
    var html ="";
    entries.forEach(function(e){
        var img = extractThumbnail(e.content);
        console.log(img);
        html = html + '<div class="col-sm-4"><div class="tile"><h4><a href="'+e.link+'" target="_blank">' + e.title + '</a></h4><a href="'+e.link+'" target="_blank">' + img + '</a></div></div>';
    });
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