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



for (let i = 0; i < 11; i++) {
    console.log(getCard());
}