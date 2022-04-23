// Deck array starts empty
let deck = [];

// Get a card at random
// For now, it's working on an infinitely-sized deck
// 1 through 10 is the same as the card face
// 0 is an Ace
// 11 is a Jack
// 12 is a Queen
// 13 is a King
function getCard() {
    return Math.floor( ( Math.random() *  14 ) );
}

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
    var m = array.length, t, i;
  
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

console.log(deck);

let shuffled = shuffleDeck(deck);

console.log(shuffled);