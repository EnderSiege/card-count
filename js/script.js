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

// Test a few getCard calls
// for (let i = 0; i < 11; i++) {
//     console.log(getCard());
// }


function shuffleDeck() {
    // Inform player the deck is being shuffled
    console.log("Shuffling deck");

    // Reset the number of cards in the deck
    resetCards();

    // Perform the shuffle

}

function resetCards() {
    // Reset the number of cards in the deck
    let 
        aces = 4,
        ones = 4,
        twos = 4,
        threes = 4,
        fours = 4,
        fives = 4,
        sixes = 4,
        sevens = 4,
        eights = 4,
        nines = 4,
        tens = 4,
        jacks = 4,
        queens = 4,
        kings = 4;
}

function shuffleCards() {
    // Set deck array to empty
    let deck = [];

    // Establish a shuffled deck by placing all card values in the deck array
    for (let i = 0; i < 52; i++) {
        let card =  Math.floor( ( Math.random() *  14 ) );
        
    }
}