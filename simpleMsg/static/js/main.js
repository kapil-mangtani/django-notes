function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function writeMsg() { 
    var msg = $("#textarea1").val();
    if (!msg.trim()) {
        alert("Empty messages are not allowed");
        return;
    }
    var title = $("#title").val();
    var chips = document.getElementsByClassName("tag-identifier");
    var tags = [];
    for (var i=0; i<chips.length; i++) { 
        tags.push($(chips[i]).data("tag"));
    }
    var csrftoken = getCookie('csrftoken');
    data = {title: title, msg: msg, tags: tags}
    $.ajax({
        type: "POST",
        url: writeUrl,
        beforeSend: function(xhr) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        },
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(data)
        }).done(function(data) {
            $("form").trigger("reset");
            $("#chips").empty();
            $("#newMessageCard").hide();
		    alert( "Your message has been saved");
		    if (data > 9) { 
		      $("#viewAllIcon").html("filter_9+");    
		    } else { 
		      $("#viewAllIcon").html("filter_" + data);    
		    }
		}).fail(function() {
		    alert( "There was an error saving your message.Please try again later" );
		});

}

function readAllMsg() { 
    var csrftoken = getCookie('csrftoken');
    $.ajax({
        type: "GET",
        url: readUrl,
        beforeSend: function(xhr) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        },
        }).done(function(data) {
            var messages = JSON.parse(data);
            console.log(data);
            for (var i=0; i<messages.length; i++) {
                var message = messages[i];
                var tags = message.tags;
                var tagsHtml = [];
                for (var j=0; j<tags.length; j++) {
                    console.log(tags[j]);
                    var tagHtml = '<div class="chip">' + tags[j] + '</div>';
                    tagsHtml += tagHtml;
                }
                var messageHtml = '<li class="collection-item avatar">' +
				                        '<i class="material-icons circle">email</i>' + 
				                        '<span class="title">' + message.title + '</span><br>' + 
				                        '<p>' + tagsHtml + '</p><br>' +
				                        '<p>' + message.body + '</p>' +
				                        '<a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>' +
				                    '</li>';
                $(".collection").append(messageHtml);
            }
        }).fail(function() {
            alert( "There was an error retrieving your messages.Please try again later" );
        });
}

function searchForMsg() { 
}

function createTag(tag) {
    var chipHtml  = '<div class="chip tag-identifier" data-tag=' + tag + '>' + tag + '<i class="material-icons">close</i></div>'
    $("#chips").append(chipHtml);  
}

function toggleCard(elementId) { 
    if (elementId=="add") { 
        $("#allMessagesCard").hide();
        $("#newMessageCard").show();
    } else if (elementId=="viewAll") {
        $("#newMessageCard").hide();
        $(".collection").empty();
        readAllMsg();
        $("#allMessagesCard").show();
    } else if (elementId=="search") {
        searchForMsg();
        //show search results
    { else {   
        $("#newMessageCard").hide();
    }

}

$( document ).ready(function() {
    $("#tags").keypress(function(e) {
	   if (e.which == 0 || e.which == 32) {
	       var tag = $("#tags").val();
	       if (tag.trim()) {
		       $("#tags").val("");
		       createTag(tag);
	       }
	   }
	});

});