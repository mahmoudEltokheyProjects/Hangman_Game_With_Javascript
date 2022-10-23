// +++++++++++++++ Letters +++++++++++++++
const letters = "abcdefghijklmnopqrstuvwxyz";
// Get Array From Letters : convert string to array
let lettersArray = Array.from(letters);
// select "letters container"
let lettersContainer = document.querySelector(".letters");
// Generate Letters 
lettersArray.forEach( letter => {
    // Create "span" element
    let span = document.createElement("span");
    // Create "Letter Text Node"
    let theLetter = document.createTextNode(letter);
    // Append "the letter" to "span"
    span.appendChild(theLetter);
    // Add "class" on "span"
    span.className = "letter-box";
    // Append "span" to the "lettersContainer"
    lettersContainer.appendChild(span);
} );
/* +++++++++++++++++ "Object" That Contains "Words" + "Categories" +++++++++++++++++ */
const words = 
{
    programming: [ "php" , "javascript" , "go" , "scala" , "fortran" , "r" , "mysql" , "python" ] ,
    movies: ["Prestige","Inception","Parasite","Interstellar","Whiplash","Memento","Coco","Up"] ,
    people: ["AlbertEinstein","Hitchcock","Alexander","Cleopatra","MahtmaGhandi"] ,
    countries: ["Egypt","Syria","Palestine","Yemen","Bahrain","Qatar"]
}
// +++++++++++++++++ Get Random Property From "Object" +++++++++++++++++ 
// ------- return "All keys" of "words" Object -------
let allkeys = Object.keys(words);
// @@@@@@@@@ Random Number Depend On Keys Length @@@@@@@@@
// "random properity number" from "allKeys" variable [ random number from "0" to "allkeys.length - 1" ]
let randomPropNumber = Math.floor( allkeys.length * Math.random() ) ;
// @@@@@@@@@ Category : return "random properity name" @@@@@@@@@
let randomPropName = allkeys[randomPropNumber];
// @@@@@@@@@ Category Words : return "random properity value" @@@@@@@@@
let randomPropValue = words[randomPropName] ;
// @@@@@@@@@ Random Number Depend On "Words" : return "random value number"  @@@@@@@@@
let randomValueNumber = Math.floor( Math.random() * randomPropValue.length ) ;
// --------- return "random properity value value" ---------
let randomPropValueValue = randomPropValue[ randomValueNumber ] ;
// +++++++++++++++++ Set "Category" Info +++++++++++++++++ 
document.querySelector(".game-info .category span").innerHTML = randomPropName ;
// select "Letters Guess Element"
let lettersGuessContainer =  document.querySelector(".letters-guess");
// Convert "Chosen Word" To "Array"
let lettersAndSpace = Array.from(randomPropValueValue);
// ++++++++++++++ Create "spans" Depend on "word" ++++++++++++++
lettersAndSpace.forEach( letter => {
    // Create "Empty Span"
    let emptySpan = document.createElement("span");
    // if the "selected letter" is "space"
    if( letter === ' ' )
    {
        // add "class" To The "span"
        emptySpan.className = "with-space";        
    }
    // Append "emptySpan" To the "Letters Guess Container"
    lettersGuessContainer.appendChild(emptySpan);
} );
// -------------- Select "Guess Spans" -------------- 
let guessSpans = document.querySelectorAll(".letters-guess  span") ;
// -------------------------- Set "Wrong Attempts" --------------------------
// Maximum Wrong Attempts is "8" attempt
let wrongAttempts = 0 ;
// Your Score 
let scoreVar = 0 ;
// --------------------- Select The "Draw Element" --------------------------
let theDraw = document.querySelector('.hangman-draw');
/* ------------------------ Handle Clicking On Letters ---------------------- 
    when user click on letter , 
    1- change letter color , 2- prevent click again on this letter 
*/
// +++++++++++++++++++++++++ "startGame" Function +++++++++++++++++++++++++
function startGame()
{
    document.addEventListener("click", e => {
        // -------------- Select "The Chosen Status" -------------- 
        let theStatus = false ;
        if( e.target.className === "letter-box" )
        {
            // Add class "clicked" to the "clicked letter"
            e.target.classList.add("clicked");
            // Get the "clicked letter" and convert it to "lowerCase"
            let theClickedLetter = e.target.innerHTML.toLowerCase() ;
            // convert "random chosen word" to "array" with "lowercase letter"
            let theChosenWord = Array.from(randomPropValueValue.toLowerCase() );
            // Store "letters of spans" in string "str" to compare with "randomPropValueValue"
             var myStr = "";
            /* 
                1- Make a loop on each letter in the "chosen word array" and 
                2- Compare it with the letter that user was pressed and 
                3- and see whether the letter that user was pressed is in this array or not 
            */
           
            theChosenWord.forEach( (wordLetter,wordIndex) => {
                // if the "clicked letter" equal to one of the "chosen word letter"
                if( theClickedLetter == wordLetter )
                {
                    // if the "user selected letter" in "word letter" , Set "Status" To Correct
                    theStatus = true ;
                    // icrease The "score" of "user"
                    scoreVar++ ;
                    console.log("Your score is : "+scoreVar+" From 8");
                    myStr += wordLetter;
                    /*  
                        I want to put "user clicked letter"  in the correct place in the "empty spans" 
                        1- I will loop on all "letters-guess spans" and when reach the place of "selected letter"
                    */
                    guessSpans.forEach( (span , spanIndex) => {
                        // if the "index of cliked letter" === "the index of 'span' of 'guess-span' "
                        if( wordIndex === spanIndex )
                        {
                            // put the "cliked letter" on 'span of guess-span'
                            span.innerHTML = theClickedLetter;   
                        }
                    } );
                    /* ++++++++++++++++++++++++++++++++++++++++++ Win The Game ++++++++++++++++++++++++++++++++++++++++++ */
                    if( scoreVar === randomPropValueValue.length )
                    {
                        // call "endGame" function
                        endGame( `Congratulation , Your Score Is : ${scoreVar}`);
                        // call "celebrationWin" function
                        celebrationWin(); 
                        var happyImg = document.querySelector(".happyImg");
                        // appear "Crying image"
                        happyImg.classList.remove("hideImg");
                    }
                } 
                console.log(myStr);
           });
           // +++++++++++++++++ Outside Loop +++++++++++++++++
           // If "the user select Letter" Is Wrong
           if( theStatus !== true )
           {
                // increase "wrong" attempts
                wrongAttempts++ ;
                // add class "wrong" On "The Draw Element"
                theDraw.classList.add(`wrong-${wrongAttempts}`);
                // Play "Fail" sound
                document.getElementById("fail").play();
                /* ++++++++++++++++++++++++++++++++++++++++++ Lose The Game ++++++++++++++++++++++++++++++++++++++++++ */
                // When User Make " 8 Wrong Attempts " , Finished The Game
                if( wrongAttempts === 8 )
                {
                    var cryImg = document.querySelector(".cryingImg");
                    // appear "Crying image"
                    cryImg.classList.remove("hideImg");
                    // Play "Fail" sound
                    document.getElementById("failure").play();
                    // Call "endGame()"
                    endGame( `Game Over , The Correct Word Is : ${randomPropValueValue}`); 
                    // Prevent User from Clicking on Any Letter , Add class "finished" to "letters Container"
                    lettersContainer.classList.add("finished");
                    wrongAttempts = 0 ;
                }
           } 
           else
           {
                // Play "Fail" sound
                document.getElementById("success").play();
           }
        }
    });
}

// +++++++++++++++++++++++++ "endGame" Function +++++++++++++++++++++++++
function endGame(paragaphPara)
{
    // Get "Popup" Div
    let div = document.querySelector(".popup");
    // Appear Popup
    div.classList.remove("hide");
    let paragaph = document.querySelector(".popup p");
    //  Create Text
    paragaph.innerHTML = paragaphPara ;
    //  create "restart" button
    let btnVar = document.querySelector(".restart-btn");
    // +++++++++++++++++++++++++ When click on "restart button" , hide popup +++++++++++++++++++++++++
     btnVar.addEventListener("click",function(){
        window.location.reload();
        startGame();
    });
}
 /* ++++++++++++++++++++++++++++++++++ Celebration ++++++++++++++++++++++++++++++++++ */
 function celebrationWin()
 {
    // Play "Win" sound
    document.getElementById("win").play();
    // creates HTML Canvas element and adds it to page, so call it only once!
    const jsConfetti = new JSConfetti();
    // Initialize instance of JSConfetti class and call addConfetti method
    jsConfetti.addConfetti();
    // Use emojis as confetti:
    jsConfetti.addConfetti({
         emojis: ['🎁','🎈','🎉'],
     });
     // Customize confetti number and radius
     jsConfetti.addConfetti({
         confettiRadius: 3,
         confettiNumber: 800,
     });
 }   
/* ++++++++++++++++++++++++++ Swtich Between "startGame()" and "endGame()" ++++++++++++++++++++++++++ */
if( wrongAttempts < 8 )
{
    startGame();
}
else
{
    endGame();
}
