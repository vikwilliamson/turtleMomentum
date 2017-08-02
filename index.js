$(document).ready(function() {
    //set the clock, greeting, and joke intervals
    clockInterval = setInterval(updateTime, 1000);
    messageInterval = setInterval(updateMessage, 20000);
    greetingInterval = setInterval(updateGreeting, 10000);

    //set the event listener for the todo list to be triggered by the enter key
    $("#todo-input").keyup(function(e){
        if(e.which === 13){
            addTodo();
        }
    })

    //TODO: Call the weather API
})
var greetingArray = ["my bromide.", "you stunner.", "you rockstar.", "master.", "your grace.", "mon capitan!"];
var todoArray = ["Type in more things to do!"];
var timeDescriptor;
var timeToDisplayGreeting = true;
// TODO: weather retrieval function, run once


// time incrementing function, place in a set interval
function updateTime(){
    var date = new Date();
    var hours = date.getHours();
    //change the time descriptor based on the hour.
    switch(hours){
        case 0: case 1: case 2: case 3: case 4: case 5:
            timeDescriptor = "Maybe you should get some sleep, "
            break;
        case 6: case 7: case 8: case 9: case 10: case 11:
            timeDescriptor = "Good morning, "
            break;
        case 12: case 13: case 14: case 15: case 16: case 17:
            timeDescriptor = "Good afternoon, "
            break;
        case 18: case 19: case 20: case 21: case 22: case 23:
            timeDescriptor = "Good evening, "
            break;
        default:
            timeDescriptor = "Good morrow, "
            break;
    }
    var minutes = (date.getMinutes()<10 ? '0':'') + date.getMinutes();
    var seconds = (date.getSeconds()<10 ? '0':'') + date.getSeconds();
    $("#time-block").text(hours + ":" + minutes + ":" + seconds);
}


// function that cycles the greeting message, run each 10 seconds
function updateGreeting(){
    
     $("#greeting-block").animate({opacity: '0'});   //fade out the greeting-block
    setTimeout(function(){                           //make sure nothing displays until the animation is complete by setting timeout
    if (timeToDisplayGreeting){                     //if the boolean says to display the greeting...

                                                    //select a random member of the greeting array, place into the greeting descriptor
        var i = Math.floor(Math.random() * greetingArray.length);
        $("#time-descriptor").text(timeDescriptor);
        $("#greeting-descriptor").text(greetingArray[i]);
    } else {                                         //if the boolean says not to display the greeting...
                                                    //select a member of the todo array, and display it.
        var i = Math.floor(Math.random() * todoArray.length)
        $("#time-descriptor").text("TODO: ");
        $("#greeting-descriptor").text(todoArray[i]);
    }
    //after it's over, fade in the div, flip the boolean value
    timeToDisplayGreeting = !timeToDisplayGreeting;
    $("#greeting-block").animate({opacity: '1'});
    }, 1000)
}


// function that takes the text input and adds it to the greeting message
// this will trigger on enter key up, set by an event listener.
function addTodo(){                                 //get the value in the input block, clear the input, and push the input you got into the todo array.
    $("#greeting-block").animate({opacity: '0'});
                                                    //remember to put something in if the user forgets to type something but presses enter anyway
    var input = ($("#todo-input").val() !== "") ? $("#todo-input").val() : "Start remembering to type something before submitting!";
    $("#todo-input").val("");
    todoArray.push(input);
    setTimeout(function(){                          //display the todo that was just entered
        $("#time-descriptor").text("TODO: ");
        $("#greeting-descriptor").text(todoArray[todoArray.length-1]);
        timeToDisplayGreeting = true;
        //TODO: Consider resetting the updateGreeting interval at this point?
        $("#greeting-block").animate({opacity: '1'}); 
    }, 1000)
}


// function that calls the quote api and print the message, run each minute
function updateMessage(){
    $("#quote-block").animate({opacity: '0'});                                               //fade out the current message
    var quoteURL = "http://api.icndb.com/jokes/random?firstName=CHUCK&lastName=NORRIS";     //get the JSON from the quote API
    setTimeout(function(){                                                                  //make sure the message doesn't appear until the fadeout is complete
        $.getJSON(quoteURL).done(function(data){                                            //extract the value
        console.log(data.value.joke);
        var joke = data.value.joke;
        joke = joke.replace(/&quot;/g, "\'");  //replace those silly &quot; things
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