const hitMe = document.getElementById("hit-me");

hitMe.addEventListener("click", function () {
    console.log("clicky!");
})

// Deck array starts empty
let deck = [],
    player = [],
    dealer = [];

// Shuffle the deck array
function shuffleDeck(array) {
    // Inform player the deck is being shuffled
    console.log("Shuffling deck");

    // Reset the number of cards in the deck
    array = resetCards(array);

    // Perform the shuffle
    array = shuffleCards(array);

    return array;
}

// Reset the cards in the deck
function resetCards(array) {
    // array = ["AH", "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "10H", "JH", "QH", "KH",
    //     "AD", "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "10D", "JD", "QD", "KD",
    //     "AC", "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "10C", "JC", "QC", "KC",
    //     "AS", "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "10S", "JS", "QS", "KS"];

    array = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K",
        "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K",
        "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K",
        "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

    return array;
}

// Fisher-Yates Shuffle
// https://bost.ocks.org/mike/shuffle/
function shuffleCards(array) {
    let m = array.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
}

// Deal a card
function getCard(deck) {
    const card = deck.pop();
    return card;
}

// Initial card deal among both players (currently only works for two)
function dealCards(deck) {
    player.push(getCard(deck));
    dealer.push(getCard(deck));
    player.push(getCard(deck));
    dealer.push(getCard(deck));
}

function countHand(hand) {
    // Since Aces can be counted as a 1 or 11, they require a different method
    // I could set hasAce to boolean, but it's possible to have more than one Ace
    let hasAce = 0
        handCount = 0;

    // Initial hand count, noting aces
    for (let i = 0; i < hand.length ; i++) {
        if (hand[i] === "A") {
            handCount += 11;
            hasAce++;
        } else if (hand[i] === "J" || hand[i] === "Q" || hand[i] === "K") {
            handCount += 10;
        } else {
            handCount += parseInt(hand[i]);
        }
    }

    // If the count is over 21, and an ace is still holding the value of 11, change its value to 1
    while (hasAce > 0 && handCount > 21) {
        handCount -= 10;
        hasAce --;
    }

    return handCount;
}


// Function calls below

console.log(deck);

// shuffled is the variable holding the shuffled deck while game is in play
let shuffled = shuffleDeck(deck);

// testing shuffle
console.log("Cards are shuffled:");
console.log(shuffled);

// testing card deal
console.log("Dealing a card...");
let card;
card = getCard(shuffled);
console.log(card);
console.log(shuffled);

// testing dealCards
console.log("Dealing cards for start of game...");
dealCards(shuffled);
console.log("Dealer cards:");
console.log(dealer);
console.log(countHand(dealer));
console.log("Player cards:");
console.log(player);
console.log(countHand(player));