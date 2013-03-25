//Title of the blog
  var TITLE = "WVBS Web App";
//RSS url
  var RSS = "http://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20xml%20WHERE%20url%3D%27http%3A//www.wvbs.org/mobile/wvbs-app.rss%27";
  var infoRSS = "http://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20xml%20WHERE%20url='http://www.wvbs.org/mobile/wvbs-app.rss'&format=json"
//  var vimeoInfo = "http://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20xml%20WHERE%20url%3D%27http%3A//vimeo.com/api/v2/wvbs/info.xml%27";

//Stores entries
  var entries = [];
  var selectedEntry = "";
  var entriesFBnotes = [];
  var selectedFBnotesEntry = "";
  var entriesFBpage = [];
  var selectedFBpageEntry = "";
  var entriesWeb = [];
  var selectedWebEntry = "";
  var entriesWVBS = [];
  var selectedWVBSEntry = "";
  var entriesVideo = [];
  var selectedVideoEntry = "";
  var entriesAlbum = [];
  var selectedAlbumEntry = "";
  var moreRSSurl = "";
  var currentEntries = 0;
  var json = "";
  var readEntry = "Read More";

function showLoader() {
  $.mobile.showPageLoadingMsg("a","Loading...");
}
/*
//Listen for main page
  $("#mainPage").live("pageinit", function() {
	  //Set the title
	  $("h1", this).text(TITLE);
	  $.ajax({
		  url:RSS,
		  success:function(res,code) {
			  entriesWeb = [];
			  var xmlWeb = $(res);
			  var itemsWeb = xmlWeb.find("item");
			  $.each(itemsWeb, function(i, v) {
				  entry = { 
					  title:$(v).find("title").text(), 
					  link:$(v).find("link").text(), 
					  description:$.trim($(v).find("description").text()),
					  //thumbnail:$(v).find("thumbnail").text()
				  };
				  entriesWeb.push(entry);
			  });
			  //store entries
			  localStorage["entriesWeb"] = JSON.stringify(entriesWeb);
			  renderWebEntries(entriesWeb);
		  },
		  error:function(jqXHR,status,error) {
			  //try to use cache
			  if(localStorage["entriesWeb"]) {
				  $("#status").html("Using cached version...");
				  entriesWeb = JSON.parse(localStorage["entriesWeb"])
				  renderWebEntries(entriesWeb);				
			  } else {
				  $("#status").html("Sorry, we are unable to get the RSS and there is no cache.");
			  }
		  }
	  });
*/
/*
	  $.ajax({
		  url:vimeoInfo,
		  success:function(res,code) {
			  var xmlVimeoInfo = $(res);
			  var entry = { 
					  count:xmlVimeoInfo.users.user.total_videos_uploaded, 
					  albums:xmlVimeoInfo.users.user.total_albums,
					  description:xmlVimeoInfo.users.user.bio,
				  };
				  //entriesWeb.push(entry);
			  });
			  //store entries
			  //localStorage["entriesWeb"] = JSON.stringify(entriesWeb);
			  renderWebEntries(entriesWeb);
		  },
		  error:function(jqXHR,status,error) {
			  //try to use cache
			  if(localStorage["entriesWeb"]) {
				  $("#status").html("Using cached version...");
				  entriesWeb = JSON.parse(localStorage["entriesWeb"])
				  renderWebEntries(entriesWeb);				
			  } else {
				  $("#status").html("Sorry, we are unable to get the RSS and there is no cache.");
			  }
		  }
	  });
*/
/*
function renderWebEntries(entriesWeb) {
    entries = entriesWeb;
    var s = '';
	s += '<li data-role="list-divider">Specific Video Websites</li>';
    $.each(entriesWeb, function(i, v) {
        s += '<li><a href="' + v.link + '" class="contentLink" data-entryid="'+i+'">' + v.title + '</a></li>';
       //s += '<li><a href="#WVBS-Feed" class="contentLink" data-entryid="'+i+'"><img src="' + v.thumbnail + '" width="50" height="50" />' + v.title + '</a></li>';
    });
    $("#weblinksList").prepend(s);
    $("#weblinksList").listview("refresh");
    $.mobile.hidePageLoadingMsg();    
}
*/
$.ajaxSetup({
    timeout: 5000, // milliseconds
	error: function(request, status, maybe_an_exception_object) {
        if(status == 'timeout')
            alert("connection timed-out, try again when an internet connection is available.");
    }
});
function appUpdated(incomingDate) {
  //$.mobile.showPageLoadingMsg("e","Updating...");
  console.log(incomingDate);
  var serviceDate = new Date(incomingDate);
  console.log(serviceDate);
  var accessDate = new Date(localStorage.previousAccess);
  if (serviceDate.getTime() <= accessDate.getTime())
  {
	  return(true);
  }
  else { return (false); }
}

function wvbsNews(renderNewsEntries) //use to be webSites()
{
	  $.ajax({
		  type: "GET",
		  url:RSS,
		  timeout: 5000, // milliseconds
		  success:function(res,code) {
			  entriesNews = [];
			  var xmlWeb = $(res);
			  var itemsWeb = xmlWeb.find("news");
			  $.each(itemsWeb, function(i, v) {
				  entry = { 
					  description:$(v).find("description").text(),
				  };
				  entriesNews.push(entry);
			  });
			  //store entries
			  localStorage["entriesNews"] = JSON.stringify(entriesNews);
			  //
			  if (renderNewsEntries && typeof(renderNewsEntries) === "function") {
				  renderNewsEntries(entriesNews);
			  }
		  },
		  error:function(jqXHR,status,error) {
			if(status == 'timeout')
				alert("connection timed-out, try again or check your internet connection.");
			//try to use cache
			  if(localStorage["entriesNews"]) {
				  //$("#webSitesArchiveStatus").html("Using cached version...");
				  //$("#webSitesArchiveStatus").style.visibility = "visible";
				  entriesNews = JSON.parse(localStorage["entriesNews"])
				  if (renderNewsEntries && typeof(renderNewsEntries) === "function") {
					  renderNewsEntries(entriesNews);
				  }				
			  } else {
				  $("#webSitesArchiveStatus").html("Sorry, we are unable to get the website list and there is no cache.");
			  }
		  }
	  }); 
}
function renderNewsEntries(entriesNews) {
    entries = entriesNews;
    var s = '';
    $.each(entries, function(i, v) {
        s += '<div data-entryid="'+i+'">' + v.description + '</div>';
		//console.log(entriesNews[i].description);
    });
    $('#newsMessages').append(s);
	$("#newsDIV").css('display','block');
}

function webSites(renderWebEntries) //use to be webSites()
{
  if (renderWebEntries && typeof(renderWebEntries) === "function") {
	  $.mobile.showPageLoadingMsg("a","Loading...");
  }
	  //Set the title
	  $("h1", this).text(TITLE);
	  $.ajax({
		  url:RSS,
		  timeout: 5000, // milliseconds
		  success:function(res,code) {
			  entriesWeb = [];
			  json = $(res);
			  var xmlWeb = $(res);
			  var itemsWeb = xmlWeb.find("item");
			  $.each(itemsWeb, function(i, v) {
				  entry = { 
					  title:$(v).find("title").text(), 
					  link:$(v).find("link").text(), 
					  description:$.trim($(v).find("description").text()),
					  thumbnail:$(v).find("thumbnail").text(),
				  };
				  entriesWeb.push(entry);
			  });
			  //store entries
			  localStorage["entriesWeb"] = JSON.stringify(entriesWeb);
			  //
			  if (renderWebEntries && typeof(renderWebEntries) === "function") {
				  renderWebEntries(entriesWeb);
			  }
			  else
			  {
				  var webUpdated = xmlWeb.find("channel").find("updated").text();
				  var isNewer = appUpdated(webUpdated);
				  if (isNewer){ }
				  else { $('#webSiteListLink').prepend('<span class="new-badge"></span>'); }
			  }
		  },
		  error:function(jqXHR,status,error) {
			if(status == 'timeout')
				alert("connection timed-out, try again or check your internet connection.");
			//try to use cache
			  if(localStorage["entriesWeb"]) {
				  $("#webSitesArchiveStatus").html("Using cached version...");
				  //$("#webSitesArchiveStatus").style.visibility = "visible";
				  entriesWeb = JSON.parse(localStorage["entriesWeb"])
				  if (renderWebEntries && typeof(renderWebEntries) === "function") {
					  renderWebEntries(entriesWeb);
				  }				
			  } else {
				  $("#webSitesArchiveStatus").html("Sorry, we are unable to get the website list and there is no cache.");
			  }
		  }
	  }); 
}
function renderWebEntries(entriesWeb) {
    entries = entriesWeb;
    var s = '';
	s += '<li data-role="list-divider" data-theme="b">Specific Video Websites</li>';
    $.each(entriesWeb, function(i, v) {
        s += '<li><a href="' + v.link + '" class="contentLink" data-entryid="'+i+'"><img src="' + v.thumbnail + '" width="100" style="padding: 10px 0px;" /><h3>' + v.title + '</h3><p style="text-decoration:underline;"><strong>' + v.link + '</strong></p></a></li>';
       //s += '<li><a href="#WVBS-Feed" class="contentLink" data-entryid="'+i+'"><img src="' + v.thumbnail + '" width="50" height="50" />' + v.title + '</a></li>';
    });
    $("#webSitesArchiveList").html(s);
	window.location.hash = '#webSitesArchive';
    $("#webSitesArchiveList").listview("refresh");
    $.mobile.hidePageLoadingMsg();    
}
function facebookJSON(fbPageRSSurl,renderFBpageEntries) {
	if (renderFBpageEntries && typeof(renderFBpageEntries) === "function")
	{
		$.mobile.showPageLoadingMsg("a","Loading...");
	}
	//if (typeof numEntries == 'undefined' ) numEntries = 10;
	moreRSSurl = fbPageRSSurl;
	localStorage["moreRSSurl"] = JSON.stringify(moreRSSurl);
	var currentEntries;
	//var fbNotesRSSurl = fbPageRSSurl.replace("page.php","notes.php");
	  $.ajax({
		  type: "GET",
		  url: fbPageRSSurl,
		  dataType: "jsonp",
          contentType: "application/json",
		  beforeSend: function() { },		  
          success: function(data) {
			currentEntries = parseInt(data.query.count);
			var activeFBtag;
			if (fbPageRSSurl.search('273296449735') > 0){
				var wvbsFBCount = data.query.count;
				activeFBtag = '#wvbsFBListLink';
			}
			else if (fbPageRSSurl.search('273848047478') > 0){
				var sftFBCount = data.query.count;
				activeFBtag = '#sftFBListLink';
			}
			else if (fbPageRSSurl.search('312760610126') > 0){
				var boundFBCount = data.query.count;
				activeFBtag = '#boundFBListLink';
			}
  			  entriesFBpage = [];
			  var pubdate = new Date();
			  $.each(data.query.results.item, function(i, item) {
				  if (i <= currentEntries) {
					  if (item.title == " ") {
					  }
					  else {
						pubdate = new Date(item.pubDate);
						entry = { 
						title:item.title, 
						link:item.link, 
						description:$.trim(item.description),
						dateString: pubdate.toLocaleDateString(),
						dateCode: pubdate.getTime(),
						};
					  entriesFBpage.push(entry);
					  }
					++i;
				  }
			  });
			  entriesFBpage = sortByKey(entriesFBpage,'dateCode');
			  //store entries
			  localStorage["entriesFBpage"] = JSON.stringify(entriesFBpage);
			  if (renderFBpageEntries && typeof(renderFBpageEntries) === "function") {
				  renderFBpageEntries(entriesFBpage);
				  $("#FacebookFeedStatus").html("");
			  }
			  else
			  {
				  var webUpdated = new Date(entriesFBpage[0].dateString);
				  var isNewer = appUpdated(webUpdated.toLocaleDateString());
				  if (isNewer){ }
				  else { $(activeFBtag).prepend('<span class="new-badge"></span>'); }
			  }
		  },
		  error:function(jqXHR,status,error) {
			  //try to use cache
			  if(localStorage["entriesFBpage"]) {
				  $("#FacebookFeedStatus").html("Using cached version...");
				  entriesFBpage = JSON.parse(localStorage["entriesFBpage"])
				  if (renderFBpageEntries && typeof(renderFBpageEntries) === "function") {
					  renderFBpageEntries(entriesFBpage);
					  $("#FacebookFeedStatus").html("");
				  }
			  } else {
				  $("#FacebookFeedStatus").html("Sorry, we are unable to get the Facebook Feed and there is no cache.");
			  }
		  },
	  });
}
function renderFBpageEntries(entriesFBpage) {
    //entries = entriesFBpage;
	var s = '';
    $.each(entriesFBpage, function(i, v) {
        s += '<li><a href="#contentPage" class="fbPageLink" data-entryid="'+i+'" onClick="setSelectedEntry('+i+')" ;><h3>' + v.title + '</h3><p>posted: <strong>' + v.dateString + '</strong></p></a></li>';
    });
    $("#linksFBpageList").html(s);
	window.location.hash = '#FacebookFeed';
    $("#linksFBnotesList").listview("refresh");
    $("#linksFBpageList").listview("refresh");
	readEntry = "Read on Facebook";
    $.mobile.hidePageLoadingMsg();
}
$(".fbPageLink").live("click", function() {
	entries = entriesFBpage;
	selectedEntry = $(this).data("entryid");
	//console.log($(this).data("entryid"));
	localStorage["entries"] = JSON.stringify(entries);
	localStorage["selectedEntry"] = JSON.stringify(selectedEntry);
});
function setSelectedEntry(e){
	selectedEntry = parseInt(e);
	console.log(selectedEntry);
	//entries = entriesFBpage;
	//selectedEntry = $(this).data("entryid");
	//localStorage["entries"] = JSON.stringify(entries);
	//localStorage["selectedEntry"] = JSON.stringify(selectedEntry);
}
function FacebookFeedTitle(title) {
	$("h1", "#FacebookFeed").text(title);
}
function wvbsJSON(wvbsRSSurl,numEntries,renderWVBSEntries) {
  if (renderWVBSEntries && typeof(renderWVBSEntries) === "function") {
	  $.mobile.showPageLoadingMsg("a","Loading...");
  }
	if (typeof numEntries == 'undefined' ) numEntries = 9;
	moreRSSurl = wvbsRSSurl;
	localStorage["moreRSSurl"] = JSON.stringify(wvbsRSSurl);
	//Set the title
	var TITLE = "WVBS Feed";
	$("h1", this).text(TITLE);
	$.ajax({
		type: "GET",
		url: wvbsRSSurl,
		dataType: "jsonp",
		contentType: "application/json",
		success: function(data) {
			if (wvbsRSSurl.search('special') > 0){
				var wvbsSpecialCount = data.query.count;
			}
			else if (wvbsRSSurl.search('new') > 0){
				var wvbsNewCount = data.query.count;
			}
			entriesWVBS = [];
			$.each(data.query.results.item, function(i, item) {
				if (i <= numEntries) {
				//var dateFull = item.pubDate;
				//var dateComponents = dateFull.split(" ");
				//var dateString = dateComponents[2] + dateComponents[1] + dateComponents[3];
				entry = { 
					title:item.title,
					//date:dateString,
 					link:item.link, 
					description:$.trim(item.description),
					//thumbnail:$(v).find("thumbnail").text()
				};
				entriesWVBS.push(entry);
				++i;
				}
			});
			currentEntries = entriesWVBS.length;
			//store entries
			localStorage["entriesWVBS"] = JSON.stringify(entriesWVBS);
			localStorage["currentEntries"] = JSON.stringify(currentEntries);
			  if (renderWVBSEntries && typeof(renderWVBSEntries) === "function") {
				  renderWVBSEntries(entriesWVBS);
				  $("#WVBS-FeedStatus").html("");
			  }
			  else
			  {
				  if (wvbsSpecialCount > 0){
					  if (wvbsSpecialCount == localStorage["wvbsSpecialCount"]){
						  
					  }
					  else { 
						$('#wvbsSpecialProductListLink').prepend('<span class="new-badge"></span>');
						localStorage["wvbsSpecialCount"] = wvbsSpecialCount;
					  }
				  }
				  else if (wvbsNewCount > 0){
					  if (wvbsNewCount == localStorage["wvbsNewCount"]){
					  }
					  else {
						$('#wvbsNewProductListLink').prepend('<span class="new-badge"></span>'); 
						localStorage["wvbsNewCount"] = wvbsNewCount;
					  }
				  }

			  }
			//renderWVBSEntries(entriesWVBS);
			//$("#WVBS-FeedStatus").html("");
		},
		error:function(jqXHR,status,error) {
			//try to use cache
			if(localStorage["entriesWVBS"]) {
				$("#WVBS-FeedStatus").html("Using cached version...");
				entriesWVBS = JSON.parse(localStorage["entriesWVBS"])
			  if (renderWVBSEntries && typeof(renderWVBSEntries) === "function") {
				  renderWVBSEntries(entriesWVBS);
			  }
			} else {
				$("#WVBS-FeedStatus").html("Sorry, we are unable to get the Item List and there is no cache.");
			}
		}
	});
}
function renderWVBSEntries(entriesWVBS) {
    entries = entriesWVBS;
	localStorage["entries"] = JSON.stringify(entries);
	$("#wvbsMoreFeed .ui-btn-text").text("More ...");	
    var s = '';
    $.each(entriesWVBS, function(i, v) {
        s += '<li><a href="#contentPage" class="contentLink" data-entryid="'+i+'">' + v.title + '</a></li>';
    });
    $("#wvbslinksList").html(s);
	window.location.hash = '#WVBS-Feed';
    $("#wvbslinksList").listview("refresh");
	readEntry = "Read/Order on WVBS.org";
	$.mobile.hidePageLoadingMsg();
}
function moreWVBSEntries(addEntries) {
	currentEntries = JSON.parse(localStorage["currentEntries"]);
	moreRSSurl = JSON.parse(localStorage["moreRSSurl"]);
	var mod = currentEntries % 10;
	if (mod == 0) {
		totalEntries = parseInt(currentEntries) + parseInt(addEntries);
		console.log(parseInt(addEntries));
		wvbsJSON(moreRSSurl,totalEntries,renderWVBSEntries);
	}
	else {
		$("#wvbsMoreFeed .ui-btn-text").text("That's All.");
	}
}
function vimeoAlbumJSON(vimeoXMLurl,numEntries,renderVimeoAlbumEntries) {
  if (renderVimeoAlbumEntries && typeof(renderVimeoAlbumEntries) === "function") {
	  $.mobile.showPageLoadingMsg("a","Loading...");
  }
	if (typeof numEntries == 'undefined' ) numEntries = 6;
	moreRSSurl = vimeoXMLurl;
	localStorage["moreRSSurl"] = JSON.stringify(moreRSSurl);
	currentEntries = numEntries;
	//Set the title
	var TITLE = "WVBS Online Video Albums";
	//$("h1", this).text(TITLE);
	$.ajax({
		type: "GET",
		url: vimeoXMLurl,
		dataType: "jsonp",
		contentType: "application/json",
		success: function(data) {
			entriesAlbum = [];
			$.each(data.query.results.albums.album, function(i, album) {
				if (i <= numEntries) {
				var dateFull = album.last_modified;
				var dateComponents = dateFull.split(" ");
				entry = { 
					id:album.id,
					title:album.title, 
					count:album.total_videos,
					date:dateComponents[0],
					link:album.link, 
					description:$.trim(album.description),
					//thumbnail:$(v).find("thumbnail").text()
				};
				entriesAlbum.push(entry);
				++i;
				}
			});
			entriesAlbum = sortByKey(entriesAlbum,'date');
			//store entries
			localStorage["entriesAlbum"] = JSON.stringify(entriesAlbum);
			  if (renderVimeoAlbumEntries && typeof(renderVimeoAlbumEntries) === "function") {
				  renderVimeoAlbumEntries(entriesAlbum);
				  $("#albumArchiveStatus").html("");
			  }
			  else
			  {
				  var webUpdated = new Date(entriesAlbum[0].date);
				  var isNewer = appUpdated(webUpdated.toLocaleDateString());
				  if (isNewer){ }
				  else { $('#vimeoAlbumListLink').prepend('<span class="new-badge"></span>'); }
			  }
			
			//renderVimeoAlbumEntries(entriesAlbum);
			//$("#albumArchiveStatus").html("");
		},
		error:function(jqXHR,status,error) {
			//try to use cache
			if(localStorage["entriesAlbum"]) {
				$("#albumArchiveStatus").html("Using cached version...");
				entriesAlbum = JSON.parse(localStorage["entriesAlbum"])
				//renderVimeoAlbumEntries(entriesAlbum);
				if (renderVimeoAlbumEntries && typeof(renderVimeoAlbumEntries) === "function") {
					renderVimeoAlbumEntries(entriesAlbum);
				}
			} else {
				$("#albumArchiveStatus").html("Sorry, we are unable to get the Video Album List and there is no cache.");
			}
		}
	});
}
function renderVimeoAlbumEntries(entriesAlbum) {
    //entries = entriesAlbum;
    var s = '';
    $.each(entriesAlbum, function(i, v) {
        s += '<li><a class="albumLink" href="#" onclick="javascript:vimeoVideoJSON(\'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D\\\'http%3A%2F%2Fvimeo.com%2Fapi%2Fv2%2Falbum%2F' + v.id + '%2Fvideos.xml\\\'&format=json\',\'50\'); return false;" class="contentLink" data-entryid="' + i + '"><h3>' + v.title + '</h3><p>updated: <strong>' + v.date + '</strong></p><p class="ui-li-count">' + v.count + ' videos</p></a></li>';
    });
    $("#archiveAlbumsList").html(s);
	window.location.hash = '#albumArchive';
    $("#archiveAlbumsList").listview("refresh");
	$.mobile.hidePageLoadingMsg();
}
$(".albumLink").live("click", function() {
	entries = entriesAlbum;
	selectedEntry = $(this).data("entryid");
	selectedAlbumEntry = $(this).data("entryid");
});
/******************YOUTUBE DATA***************/
function youtubeAlbumJSON(youtubeJSONurl,renderYTAlbumEntries) {
  if (renderYTAlbumEntries && typeof(renderYTAlbumEntries) === "function")
  {
	  $.mobile.showPageLoadingMsg("a","Loading...");
  }
	if (typeof numEntries == 'undefined' ) numEntries = 6;
	moreRSSurl = youtubeJSONurl;
	localStorage["moreRSSurl"] = youtubeJSONurl;
	currentEntries = numEntries;
	//Set the title
	var TITLE = "WorldVBS YouTube Playlists";
	//$("h1", this).text(TITLE);
	$.ajax({
		type: "GET",
		url: youtubeJSONurl,
		dataType: "jsonp",
		contentType: "application/json",
		success: function(data) {
			entriesAlbum = [];
			$.each(data.data.items, function(i, album) {
			  if (i <= numEntries) {
				var dateFull = album.updated;
				var dateComponents = dateFull.split("T");
				entry = { 
					id:album.id,
					title:album.title, 
					count:album.size,
					date:dateComponents[0],
					//link:album.link, 
					description:$.trim(album.description),
					//thumbnail:$(v).find("thumbnail").text()
				};
				entriesAlbum.push(entry);
				++i;
			  }
			});
			entriesAlbum = sortByKey(entriesAlbum,'date');
			//store entries
			localStorage["entriesAlbum"] = JSON.stringify(entriesAlbum);
			  if (renderYTAlbumEntries && typeof(renderYTAlbumEntries) === "function") {
				  renderYTAlbumEntries(entriesAlbum);
				  $("#albumArchiveStatus").html("");
			  }
			  else
			  {
				  var webUpdated = new Date(entriesAlbum[0].date);
				  var isNewer = appUpdated(webUpdated.toLocaleDateString());
				  if (isNewer){ }
				  else { $('#ytAlbumListLink').prepend('<span class="new-badge"></span>'); }
			  }
			//renderYTAlbumEntries(entriesAlbum);
			//$("#albumArchiveStatus").html("");
		},
		error:function(jqXHR,status,error) {
			//try to use cache
			if(localStorage["entriesAlbum"]) {
				$("#albumArchiveStatus").html("Using cached version...");
				entriesAlbum = JSON.parse(localStorage["entriesAlbum"])
				//renderYTAlbumEntries(entriesAlbum);				
			  if (renderYTAlbumEntries && typeof(renderYTAlbumEntries) === "function") {
				  renderYTAlbumEntries(entriesAlbum);
				  $("#albumArchiveStatus").html("");
			  }
			} else {
				$("#albumArchiveStatus").html("Sorry, we are unable to get the Video Album List and there is no cache.");
			}
		}
	});
}
function renderYTAlbumEntries(entriesAlbum) {
    entries = entriesAlbum;
	console.log("renderYTAlbumEntries entered");
    var s = '';
    $.each(entriesAlbum, function(i, v) {
        s += '<li><a class="albumLink" href="#" onclick="javascript:youtubeVideoJSON(\'https://gdata.youtube.com/feeds/api/playlists/' + v.id + '?v=2&alt=jsonc&max-results=50\'); return false;" class="contentLink" data-entryid="' + i + '"><h3>' + v.title + '</h3><p>updated: <strong>' + v.date + '</strong></p><p class="ui-li-count">' + v.count + ' videos</p></a></li>';
    });
    $("#archiveAlbumsList").html(s);
	window.location.hash = '#albumArchive';
    $("#archiveAlbumsList").listview("refresh");
	$.mobile.hidePageLoadingMsg();
}
function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
}
function youtubeVideoJSON(youtubeJSONurl) {
	$.mobile.showPageLoadingMsg("a","Loading...");

	moreRSSurl = youtubeJSONurl;
	//Set the title
	var TITLE = "WorldVBS YouTube Playlist Videos";
	//$("h1", this).text(TITLE);
	$.ajax({
		type: "GET",
		url: youtubeJSONurl,
		dataType: "jsonp",
		contentType: "application/json",
		success: function(objdata) {
			//console.log("youtubeVideoJSON.success");
			entriesVideo = [];
			$.each(objdata.data.items, function(i, videos) {
				  var dateFull = videos.video.updated;
				  var dateComponents = dateFull.split("T");
				  var duration = Math.floor(videos.video.duration/60);
				  entry = { 
					  id:videos.video.id,
					  title:videos.video.title, 
					  date:dateComponents[0],
					  duration:duration,
					  //link:video.link, 
					  description:$.trim(videos.video.description),
				  };
				  entriesVideo.push(entry);
				  ++i;
			});
			if (entriesVideo.length == 0) {
				json = objdata.data.items.video;
				dateFull = json.updated;
				dateComponents = dateFull.split("T");
				duration = Math.floor(json.duration/60);
				entry = { 
					  id:json.id,
					  title:json.title, 
					  date:dateComponents[0],
					  duration:duration,
					  //link:json.link, 
					  description:$.trim(json.description),
				};
			  entriesVideo[0] = entry;
			}
			//store entries
			entriesVideo = sortByKey(entriesVideo,'date');
			localStorage["entriesVideo"] = JSON.stringify(entriesVideo);
			renderYTEntries(entriesVideo);
			$("#videoArchiveStatus").html("");
		},
		error:function(jqXHR,status,error) {
			//try to use cache
			//console.log(entriesAlbum);
			if(localStorage["entriesVideo"]) {
				$("#videoArchiveStatus").html("Using cached version...");
				entriesVideo = JSON.parse(localStorage["entriesVideo"])
				renderYTEntries(entriesVideo);				
			} else {
				$("#videoArchiveStatus").html("Sorry, we are unable to get the Video Archive List and there is no cache.");
			}
		}
	});
}
function renderYTEntries(entriesVideo) {
    //entries = entriesVideo;
    var s = '';
    $.each(entriesVideo, function(i, v) {
        s += '<li><a class="videoLink" href="http://www.wvbs.org/video/player.php?yt=' + v.id + '" class="contentLink" data-entryid="'+i+'" target="_blank"><h3>' + v.title + '</h3><p style="margin-right:10px;">uploaded: <strong>' + v.date + '</strong></p><p class="ui-li-count">' + v.duration + ' min</p></a></li>';
    });
    $("#archiveVideosList").html(s);
	window.location.hash = '#videoArchive';
    $("#archiveVideosList").listview("refresh");
	$.mobile.hidePageLoadingMsg();
}

function vimeoVideoJSON(vimeoRSSurl,numEntries) {
	$.mobile.showPageLoadingMsg("a","Loading...");

	if (typeof numEntries == 'undefined' ) numEntries = 6;
	moreRSSurl = vimeoRSSurl;
	currentEntries = parseInt(numEntries);
	//Set the title
	var TITLE = "WVBS Online Video Collection";
	$.mobile.showPageLoadingMsg("a","Loading...");
	$("h1", this).text(TITLE);
	$.ajax({
		type: "GET",
		url: vimeoRSSurl,
		dataType: "jsonp",
		contentType: "application/json",
		success: function(data) {
			entriesVideo = [];
			i = 0;
			$.each(data.query.results.videos.video, function(i, video) {
				if (i <= numEntries) {
				  var dateFull = video.upload_date;
				  var dateComponents = dateFull.split(" ");
				  //var duractionSeconds = album.duration;
				  var duration = Math.floor(video.duration/60);
				  entry = { 
					  id:video.id,
					  title:video.title, 
					  date:dateComponents[0],
					  duration:duration,
					  link:video.link, 
					  description:$.trim(video.description),
				  };
				  entriesVideo.push(entry);
				  ++i;
				}
			});
			if (entriesVideo.length == 0) {
				json = data.query.results.videos.video;
				dateFull = json.upload_date;
				dateComponents = dateFull.split(" ");
				duration = Math.floor(json.duration/60);
				entry = { 
					  id:json.id,
					  title:json.title, 
					  date:dateComponents[0],
					  duration:duration,
					  link:json.link, 
					  description:$.trim(json.description),
				};
			  entriesVideo[0] = entry;
			}
			//store entries
			localStorage["entriesVideo"] = JSON.stringify(entriesVideo);
			renderVimeoEntries(entriesVideo);
			$("#videoArchiveStatus").html("");
		},
		error:function(jqXHR,status,error) {
			//try to use cache
			if(localStorage["entriesVideo"]) {
				$("#videoArchiveStatus").html("Using cached version...");
				entriesVideo = JSON.parse(localStorage["entriesVideo"])
				renderVimeoEntries(entriesVideo);				
			} else {
				$("#videoArchiveStatus").html("Sorry, we are unable to get the Video Archive List and there is no cache.");
			}
		}
	});
}
function renderVimeoEntries(entriesVideo) {
    //entries = entriesVideo;
    var s = '';
    $.each(entriesVideo, function(i, v) {
        s += '<li><a class="videoLink" href="http://www.wvbs.org/video/player.php?v=' + v.id + '" class="contentLink" data-entryid="'+i+'" target="_blank"><h3>' + v.title + '</h3><p style="margin-right:10px;">uploaded: <strong>' + v.date + '</strong></p><p class="ui-li-count">' + v.duration + ' min</p></a></li>';
    });
    $("#archiveVideosList").html(s);
	window.location.hash = '#videoArchive';
    $("#archiveVideosList").listview("refresh");
	$.mobile.hidePageLoadingMsg();
}
/*############## Original Working Code for In-App Player##########
function renderVimeoEntries(entriesVideo) {
    var s = '';
    $.each(entriesVideo, function(i, v) {
        s += '<li><a class="videoLink" href="#" onclick="javascript:renderVideoPage(' + v.id + '); return false;" class="contentLink" data-entryid="'+i+'"><h3>' + v.title + '</h3><p style="margin-right:10px;">uploaded: <strong>' + v.date + '</strong></p><p class="ui-li-count">' + v.duration + ' min</p></a></li>';
    });
    $("#archiveVideosList").html(s);
	window.location.hash = '#videoArchive';
    $("#archiveVideosList").listview("refresh");
	$.mobile.hidePageLoadingMsg();
}
function renderVideoPage(vimeoID) {
    var video = '<iframe id="videoPlayer" src="http://player.vimeo.com/video/' + vimeoID + '?title=0&amp;byline=0&amp;portrait=0" width="960" height="540" frameborder="0" webkitAllowFullScreen allowFullScreen ></iframe>';
	var disclaimer = 'In versions of Android prior to 3.1, the video player will load but may not play. <br>If you are having trouble playing the video above, then you can still watch the video <a id="videoPlayerLink" href="http://wvbs.org/video/player.php?v=' + vimeoID + '" >HERE</a>.';
    $("#videoWrapper").html(video);
	$("#videoDisclaimer").html(disclaimer);
	window.location.hash = '#videoPlayerPage';
	$.mobile.hidePageLoadingMsg();
}
################################################################
*/
$(".videoLink").live("click", function() {
	entries = entriesVideo;
	selectedEntry = $(this).data("entryid");
});


function moreFBEntries(addEntries) {
	var mod = currentEntries % 10;
	if (mod == 0) {
		totalEntries = currentEntries + addEntries;
		facebookJSON(moreRSSurl,totalEntries);
	}
	else {
		$("#fbMoreFeed .ui-btn-text").text("That's All.");
	}
}

function renderEntries(entries) {
    var s = '';
    $.each(entries, function(i, v) {
        s += '<li><a href="#contentPage" class="contentLink" data-entryid="'+i+'">' + v.title + '</a></li>';
        //s += '<li><a href="#contentPage" class="contentLink" data-entryid="'+i+'"><img src="' + v.thumbnail + '" width="50" height="50" />' + v.title + '</a></li>';
    });
    $("#linksList").html(s);
    $("#linksList").listview("refresh");
    $.mobile.hidePageLoadingMsg();
}

$("#mainPage").on("pagebeforeshow", function(event,data) {
	if(data.prevPage.length) {
		$("h1", data.prevPage).text("");
		$("#entryText", data.prevPage).html("");
	};
});

//listen for detail links
  $(".contentLink").live("click", function() {
	  selectedEntry = $(this).data("entryid");
	  selectedFBEntry = $(this).data("entryid");
	  selectedWebEntry = $(this).data("entryid");
	  selectedWVBSEntry = $(this).data("entryid");
	  selectedVideoEntry = $(this).data("entryid");
	  localStorage["selectedEntry"] = JSON.stringify(selectedEntry);
  });
/*//Listen for the content page to load
$("#contentPage").live("pageshow", function(prepage) {
	//Set the title
	$("h1", this).text(entriesFB[selectedFBEntry].title);
	var contentHTML = "";
	contentHTML += entriesFB[selectedFBEntry].description;
	contentHTML += '<p/><a href="'+entriesFB[selectedFBEntry].link + '" id="externalEntryButton" data-role="button">Read Entry on Site</a>';
	$("#entryText",this).html(contentHTML).trigger("create");
});
*/
$("#contentPage").live("pageshow", function(prepage) {
	$.mobile.showPageLoadingMsg("a","Loading...");	
	if(localStorage["entries"]) {
		//$("#videoArchiveStatus").html("Using cached version...");
		entries = JSON.parse(localStorage["entries"]);
		selectedEntry = JSON.parse(localStorage["selectedEntry"]);
	} else {
		$("#contentPageStatus").html("Sorry, we are unable to get the Item Information and there is no cache.");
	}

	//Set the title
	var tempEntryTitle = entries[selectedEntry].title.replace(/(\r\n\r\n|\n\n|\r\r)/gm," ").replace(/(\r\n|\n|\r)/gm," ").replace(/^([ ])/,"");
	var entryTitle = $("<div/>").html(tempEntryTitle).text();
	$("h1", this).text(entryTitle);
	//Set the main content
	var contentHTML = "";
	var contentDescription = entries[selectedEntry].description.replace(/\/l.php\?u=/g,'');
	contentDescription = contentDescription.replace('<a ','<a target="_blank"');
	contentHTML += contentDescription;
	//Set the external site button link
	contentHTML += '<p/><a target="_blank" href="'+entries[selectedEntry].link + '" id="externalEntryButton" data-role="button">'+readEntry+'</a>';
	contentHTML = contentHTML.replace('cache/1/thumbnail/75x75/9df78eab33525d08d6e5fb8d27136e95/','');
	contentHTML = contentHTML.replace('height="75"','height="150"');
	contentHTML = contentHTML.replace('width="75"','width="150" style="padding:0px 20px 20px 0px;"');



	//Set the email link information
	var emailLink = 'mailto:?subject=Checkout this material from WVBS &body='+ entryTitle + '%3A ' + entries[selectedEntry].link;
	var emailText =  'Email: ' + entryTitle;
	$("#emailContainer").find("a").attr('href',emailLink);
	$("#emailContainer").find("a span span").text(emailText);
	//$("#entryText",this).html(contentHTML).trigger("create");

	var twitterLink = 'https://twitter.com/intent/tweet?text='+ entryTitle + '&url=' + entries[selectedEntry].link;
	$("#twitterContainer").find("a").attr('href',twitterLink);
	//$("#emailContainer").find("a span span").text(emailText);
	
	var facebookLink = 'http://www.facebook.com/sharer.php?u=' + entries[selectedEntry].link;
	$("#facebookContainer").find("a").attr('href',facebookLink);
	//$("#emailContainer").find("a span span").text(emailText);


	$("#entryText",this).html(contentHTML).trigger("create");
	$('a').removeAttr('onmouseover');
	$('a').removeAttr('onclick');

	//Replace HTML Table elements with DIVs to fix width issues
	var ps = document.getElementsByTagName('table');
	while (ps.length) {
		var p = ps[0];
		while (p.firstChild) {
			p.parentNode.insertBefore(p.firstChild, p);
		}
		p.parentNode.insertBefore(document.createElement('div'), p);
		p.parentNode.removeChild(p);
	}
	ps = document.getElementsByTagName('tbody');
	while (ps.length) {
		var p = ps[0];
		while (p.firstChild) {
			p.parentNode.insertBefore(p.firstChild, p);
		}
		p.parentNode.insertBefore(document.createElement('div'), p);
		p.parentNode.removeChild(p);
	}
	ps = document.getElementsByTagName('tr');
	while (ps.length) {
		var p = ps[0];
		while (p.firstChild) {
			p.parentNode.insertBefore(p.firstChild, p);
		}
		p.parentNode.insertBefore(document.createElement('div'), p);
		p.parentNode.removeChild(p);
	}
	ps = document.getElementsByTagName('td');
	while (ps.length) {
		var p = ps[0];
		while (p.firstChild) {
			p.parentNode.insertBefore(p.firstChild, p);
		}
		p.parentNode.insertBefore(document.createElement('div'), p);
		p.parentNode.removeChild(p);
	}
    $.mobile.hidePageLoadingMsg();	
});
$("#videoArchive").live("pageshow", function(prepage) {
	//Set the title
	$("h1", this).text(entriesAlbum[selectedAlbumEntry].title);
});
$("#videoPlayerPage").live("pageshow", function(prepage) {
	//Set the title
	$("h1", this).text(entries[selectedEntry].title);
});
$("#webSitesArchive").live("pageshow", function(prepage) {
	webSites(renderWebEntries);
});

function getCurrentDate() {
  var currentDate = new Date();
  var dd = currentDate.getDate();
  var mm = currentDate.getMonth()+1; //January is 0!
  var yyyy = currentDate.getFullYear();
  if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} currentDate = mm+'/'+dd+'/'+yyyy;
  return currentDate;
}