const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote-text");
const authorText = document.getElementById("author-text");
const twitterButton = document.getElementById("twitter-button");
const newQuoteButton = document.getElementById("new-quote-button");

let apiQuotes = [];

function showNewQuote() {
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  if (!quote.author) authorText.textContent = "Unknown";

  authorText.textContent = quote.author;
  quoteText.textContent = quote.text;

  if (quote.text.length > 100) quoteText.classList.add("long-quote");
  else quoteText.classList.remove("long-quote");
}

// Get quotes from the API
async function getQuotes() {
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    showNewQuote();
  } catch (error) {
    alert(error);
  }
}

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;

  window.open(twitterUrl, "_blank");
}

// Event listeners
newQuoteButton.addEventListener("click", showNewQuote);
twitterButton.addEventListener("click", tweetQuote);

// On Load
getQuotes();
