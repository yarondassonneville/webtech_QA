$(document).ready(function(){
    var socket = io.connect('http://localhost:3000');


    // CLIENT SOCKET CONTROLLERS

    // NEW DISCUSSION

    $("#btnCreateSubmit").click(function (e) {
        var data = {
            newDiscussion: $('#newDiscussion').val(),
            locLat: $('#locLat').val(),
            locLng: $('#locLng').val()
        };
        socket.emit('client_addDiscussion', data);
        return false;
    });

    socket.on('server_newDiscussion', function(newDiscussion){
        console.log(newDiscussion.topic);
        var discussion = document.createElement( "a" );
        discussion.setAttribute("href", newDiscussion._id);
        discussion.text = newDiscussion.topic;
        $('#allDiscussions').append(discussion);
    });


    // ADD QUESTION

    $("#btnQuestion").click(function (e) {
        var data = {
            newQuestion: $('#addQuestion').val()
        };
        socket.emit('client_addQuestion', data);
        return false;
    });

    socket.on('server_newQuestion', function(newQuestion){
        console.log('client: ' + newQuestion.question);
        var question = "<h2 class='question' id='"+ newQuestion._id +"'>"+ newQuestion.question +"</h2>"

        // TODO: Die add answer inputvelden enzo moeten hier ook nog geprint worden

        $('.questions').append(question);
    });


    // ADD ANSWER

    $(" .submit__answer").click(function (e) {
        console.log("answerklik");
        var qID = $(this).attr("data-button-questionID");
        console.log(qID);
        var data = {
            questionID: qID,
            newAnswer: $("input[data-answer-questionID='"+ qID +"']").val()
        };
        console.log(data);
        socket.emit('client_addAnswer', data);
        return false;
    });

    socket.on('server_newAnswer', function(newAnswer){
        console.log('client: ' + newAnswer.answer + 'qid: ' + newAnswer.qID);
        var answer = "<h3 class='answer'>"+newAnswer.answer+"</h3>";
        var id = '"'+newAnswer.qID+'"';
        $("ul[data-answers-questionID='"+ id +"']").append(answer);
    });

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    function showPosition(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        $("#locLat").val(position.coords.latitude);
        $("#locLng").val(position.coords.longitude);
    }

    getLocation();

});
