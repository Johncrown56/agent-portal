$(document).on('ready', function () {
    // $(document).ready(function () {
    // $(window).on("load", function() {    
    var $pagination = $("#pagination"),
        totalRecords = 0,
        records = [],
        recPerPage = 0,
        nextPageToken = "",
        totalPages = 0;
    var API_KEY = "AIzaSyDInlfSmH9gwbpZ769vrw-GnvYrfCKZrJQ";
    var ChannelId = 'UCZKlshRTh3H4pRXa4N6458A';
    var duration = "any";
    var order = "relevance";
    var maxResults = 10;
    var search = $("#search").val();
    //e.preventDefault();
    var url = "https://www.googleapis.com/youtube/v3/search?key=" + API_KEY + "&part=snippet&q=" + search + "&maxResults=" + maxResults + "&order=" + order + "&channelId=" + ChannelId + "&videoDuration=" + duration + "&type=video";
    $.ajax({
        method: "GET",
        url: url,
        beforeSend: function () {
            $("#results").empty();
        },
        success: function (data) {
            console.log(data);
            displayVideos(data);
        },
        error: function(err){
            console.log(err);
            displayError(err);
        },
    });

    function apply_pagination() {
        $pagination.twbsPagination({
            totalPages: totalPages,
            visiblePages: 6,
            onPageClick: function (event, page) {
                console.log(event);
                displayRecordsIndex = Math.max(page - 1, 0) * recPerPage;
                endRec = displayRecordsIndex + recPerPage;
                console.log(displayRecordsIndex + " ssssssssss " + endRec);
                displayRecords = records.slice(displayRecordsIndex, endRec);
                generateRecords(recPerPage, nextPageToken);
            },
        });
    }

    function generateRecords(recPerPage, nextPageToken) {
        var url2 = "https://www.googleapis.com/youtube/v3/search?key=" + API_KEY + "&part=snippet&q=" + search + "&maxResults=" + maxResults + "&pageToken=" + nextPageToken + "&order=" + order + "&channelId=" + ChannelId + "&videoDuration=" + duration + "&type=video";

        $.ajax({
            method: "GET",
            url: url2,
            beforeSend: function () {
                $("#results").empty();
            },
            success: function (data) {
                console.log(data);
                displayVideos(data);
            },
            error: function(err){
                console.log(err);
                displayError(err);
            },
        });
    }

    function displayVideos(data) {
        recPerPage = data.pageInfo.resultsPerPage;
        nextPageToken = data.nextPageToken;
        console.log(records);
        totalRecords = data.pageInfo.totalResults;
        totalPages = Math.ceil(totalRecords / recPerPage);
        apply_pagination();
        $("#search").val("");

        var videoData = "";
        var count = 0;
        data.items.forEach((item) => {
            var co = ++count;
            var thumbnail = item.snippet.thumbnails.high.url ? item.snippet.thumbnails.high.url : './assets/svg/logos/mtn_logo.svg';
            var vidPlayer = `data-hs-video-player-options='{
        "videoId": "${item.id.videoId}",
        "parentSelector": "#youtubePlayerSearch${co}",
        "targetSelector": "#youtubeIframeSearch${co}",
        "isAutoplay": true,
        "classMap": {
        "toggle": "video-player-played"
        }
        }`;
            var vidPlayer2 = JSON5.stringify(vidPlayer);
            videoData2 = `
        <div class="text-left mb-2">
        <span class="text-dark font-size-40">${item.snippet.title}</span>
        </div>
        <div class="mb-2 mb-sm-3">
        <div id="youtubePlayerSearch${co}" class="video-player bg-dark d-none d-md-block rounded-lg">
            <img class="img-fluid video-player-preview rounded-lg " id="hideElement" src="${thumbnail}" alt="Image">
            <a class="js-inline-video-player video-player-btn video-player-centered" href="javascript:;" ${vidPlayer2} '>
                <span class="video-player-icon" id="hideElement">
                    <i class="fas fa-play"></i>
                </span>
            </a>
            <div class="embed-responsive embed-responsive-16by9 rounded-lg">
                <div id="youtubeIframeSearch${co}"></div>
            </div>
        </div>
        </div>
        `;

            var key = "data-hs-video-player-options";
            var value2 = '\'{"videoId": "' + item.id.videoId + '", "parentSelector": "#youTubeVideoPlayerSearch' + co + '",' +
                '"targetSelector": "#youTubeVideoIframeSearch' + co + '",' +
                '"isAutoplay": true,' +
                '"classMap": {' +
                '"toggle": "video-player-played"' +
                '}' +
                '}\'';


            var fixJson = function (string) {
                return String(string).replace(/"{/g, "'{").replace(/}"/g, "}'");
            };
            var value = fixJson(value2);
            // console.log(value);
            var res = $('#yTube').attr(key, value);

            var options = JSON5.stringify('{ ' +
                '"videoId": "' + item.id.videoId + '",' +
                '"parentSelector": "#youtubePlayerSearch' + co + '",' +
                '"targetSelector": "#youtubeIframeSearch' + co + '",' +
                '"isAutoplay": true,' +
                '"classMap": {' +
                '"toggle": "video-player-played"' +
                '}' +
                '}');

            var embed = '<div id="youtubePlayerSearch' + co + '" class="video-player bg-dark d-none d-md-block rounded-lg">' +
                '<img class="img-fluid video-player-preview rounded-lg hideEle'+item.id.videoId+'" src="' + thumbnail + '" alt="Image">' +
                '<a class="js-inline-video-player2 video-player-btn video-player-centered hideElement" id="yTube2" href="javascript:;" data-hs-video-player-options=' + options + '>' +
                '<span class="video-player-icon">' +
                '<i class="fas fa-play"></i>' +
                '</span>' +
                '</a>' +
                '<div class="embed-responsive embed-responsive-16by9 rounded-lg">' +
                '<div id="youtubeIframeSearch' + co + '"></div>' +
                '</div>' +
                '</div>';

            videoData = '<div class="text-left mb-2">' +
                '<span class="text-dark font-size-40">' + item.snippet.title + '</span>' +
                '</div>' +
                '<div class="mb-2 mb-sm-3">' +
                embed +
                // '<div class="embed-responsive embed-responsive-16by9 rounded-lg">'+            
                // '<iframe width="640" height="360" src="https://www.youtube.com/embed/'+item.id.videoId+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'+
                //   '</div>'+
                '</div>';
            $("#results").append(videoData);
            
        });
        $('.js-inline-video-player2').each(function () {
            var videoPlayer = new HSVideoPlayer($(this)).init();
        });
        $('.hideElement').on('click', function () {
                $(this).css("display", "none");
                //$(this).hide();
                $(".hideEle"+item.id.videoId+'').css("display", "none");
            });
        
    }

    function displayError(err){
        err.responseJSON.error.errors.forEach((item) => {
            var html = '<div class="text-align">'+
            '<p> Error: '+item.message+'</p>'+
            '</div>';
            $("#results").append(html);
        });
        
    }

});