console.log("Ari Quote Generator");

// Declaring all variables
const container = document.getElementById("quote-container");
const quote = document.getElementById("quote");
const author = document.getElementById("author");
const whatsappIcon = document.getElementById("whatsapp");
const twitterIcon = document.getElementById("twitter");
const generateButton = document.getElementById("generate");
const loader = document.getElementById("loader");
let quoteArray = [],randomQuote;


function loading(){         // loader visible
    loader.hidden=false;
    container.hidden = true;
}
function complete(){        // loading complete quote visible
    if(!loader.hidden){
        container.hidden=false;
        loader.hidden=true;
    }
}


function generateRandomQuote(){             // generating random quote
    randomQuote = quoteArray[ Math.floor(Math.random()*quoteArray.length) ];
    quote.textContent = randomQuote.text;
    author.textContent = "- "+randomQuote.author;
    if(!randomQuote.author){
        author.textContent = "- Unknown";
    }
}


function tweetQuote(){      // tweet quote
    const twitterUrl = `https://twitter.com/intent/tweet?text="${randomQuote.text}" - ${randomQuote.author}`;
    window.open(twitterUrl);
}


function sendInWhatsApp(){      // send quote in whatsapp
    const wpUrl = `whatsapp://send?text="${randomQuote.text}" - ${randomQuote.author}`;
    window.open(wpUrl);
}


async function fetchQuotes(){       // fetching quotes from api
    loading();
    const url="https://type.fit/api/quotes";
    try{
        const response = await fetch(url);
        quoteArray = await response.json();
    }catch(error){
        console.log(error);
    }
    complete();
}

generateButton.addEventListener("click",generateRandomQuote);
twitterIcon.addEventListener("click",tweetQuote);
whatsappIcon.addEventListener("click",sendInWhatsApp);


// loading();
fetchQuotes();