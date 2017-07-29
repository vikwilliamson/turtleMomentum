$(document).ready(function() {
    clockInterval = setInterval(updateTime, 1000);
})

// weather retrieval function, run once

// time incrementing function, place in a set interval
function updateTime(){
    date = new Date();
    hours = date.getHours();
    minutes = (date.getMinutes()<10 ? '0':'') + date.getMinutes();
    seconds = (date.getSeconds()<10 ? '0':'') + date.getSeconds();
    $("#time-block").text(hours + ":" + minutes + ":" + seconds);
    }
// function that cycles the greeting message, run each 10 seconds

// function that takes the text input and adds it to the greeting message

// function that calls the quote api and print the message, run each minute