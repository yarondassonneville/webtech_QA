$(document).ready(function(){
    var socket = io.connect('http://localhost:3000');

    $("#btnCreateSubmit").click(function (e) {
        var test = "test123";
        socket.emit('chat message', test);
        
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
