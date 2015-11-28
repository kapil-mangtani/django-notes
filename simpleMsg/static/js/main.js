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
    var title = 
    var msg = 
    var tags = 
    var csrftoken = getCookie('csrftoken');
    $.ajax({
        type: "POST",
        url: writeUrl,
        beforeSend: function(xhr) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        },
        context: document.body
        }).done(function() {
            $( this ).addClass( "done" );
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
        context: document.body
        }).done(function() {
            $( this ).addClass( "done" );
    });
}

function createTag() {
    
  <div class="chip">
    Tag
    <i class="material-icons">close</i>
  </div>
        
}

function toggleCard() { 


}

$( document ).ready(function() {
    $( "#viewAll" ).on( "click", function() {
        console.log( $( this ).text() );
    });
    
    $( "#add" ).on( "click", function() {
        console.log( $( this ).text() );
    });
});