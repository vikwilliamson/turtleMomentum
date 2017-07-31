$(document).ready(function() {
    clockInterval = setInterval(updateTime, 1000);
    messageInterval = setInterval(updateMessage, 20000);
})


// weather retrieval function, run once


// time incrementing function, place in a set interval

function updateTime(){
    var date = new Date();
    var hours = date.getHours();
    var minutes = (date.getMinutes()<10 ? '0':'') + date.getMinutes();
    var seconds = (date.getSeconds()<10 ? '0':'') + date.getSeconds();
    $("#time-block").text(hours + ":" + minutes + ":" + seconds);
}


// function that cycles the greeting message, run each 10 seconds



// function that takes the text input and adds it to the greeting message



// function that calls the quote api and print the message, run each minute

function updateMessage(){
    //fade out the current message
    $("#quote-block").animate({opacity: '0'});
    //to replace the current message, get the JSON from the quote API
    var quoteURL = "http://api.icndb.com/jokes/random?firstName=CHUCK&lastName=NORRIS";
    //make sure the message doesn't appear until the fadeout is complete
    setTimeout(function(){
        $.getJSON(quoteURL).done(function(data){
        //extract the value
        console.log(data.value.joke);
        var joke = data.value.joke;
        //put it into the div
        $("#quote-block").text(joke);
        //fade the div back in
        $("#quote-block").animate({opacity: "1.0"});
        //if the API call fails, at least say something
    }).fail(function(){
        console.log("Joke API failed to retrieve a joke.  For shame!");
        $("#quote-block").text = "Chuck Norris broke our API with nothing but a stern look. Death tolls are in the thousands.";
    })
    }, 1000);
}