// "Hit Me" and "Stand" buttons
const   hitMeBtn = document.getElementById("hit-me"),
        standBtn = document.getElementById("stand"),
        newBtn = document.getElementById("new-round"),
        runningCountEl = document.getElementById("running-count"),
        remainingCardsEl = document.getElementById("cards-rem"),
        remainingDecksEl = document.getElementById("decks-rem"),
        dealerArea = document.getElementById("dealer-area"),
        playerArea = document.getElementById("player-area");

// Deck, player, and dealer arrays starts empty
let deck = [],
    player = [],
    dealer = [],
    runningCount = 0,
    decksInPlay = 1;

// Clear play areas
clearHands();

// Update the count
function updateCount(card) {
    switch (card) {
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
            runningCount ++;
            console.log("Count + 1");
            break;
        case '10':
        case 'J':
        case 'Q':
        case 'K':
        case 'A':
            runningCount --;
            console.log("Count - 1");
            break;
        default:
            break;
    }

}

// Share the count
function shareCurrentCount() {
    runningCountEl.textContent = runningCount;
}

// Shuffle the deck array
function shuffleDeck(array, decks) {
    // Inform player the deck is being shuffled
    console.log("Shuffling deck");

    // Reset the number of cards in the deck
    array = resetCards(array, decks);

    // Perform the shuffle
    array = shuffleCards(array);

    // Reset the count
    runningCount = 0;

    return array;
}

// Next hand
function nextHand() {
    console.log("Dealing the next hand...");

    // Clear both hands
    clearHands();

    // Deal new hands
    dealCards(shuffled);
}

function clearHands() {
    player = [],
    dealer = [],
    dealerArea.innerHTML = "",
    playerArea.innerHTML = "";
}

// Reset the cards in the deck
function resetCards(array,decks) {
    // array = ["AH", "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "10H", "JH", "QH", "KH",
    //     "AD", "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "10D", "JD", "QD", "KD",
    //     "AC", "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "10C", "JC", "QC", "KC",
    //     "AS", "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "10S", "JS", "QS", "KS"];

    const oneDeck = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K",
        "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K",
        "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K",
        "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

    const decksInPlay = decks;

    array = [];

    // Now working with more than one deck
    for (let i = 0; i < decksInPlay; i++) {
        for (let j = 0; j < oneDeck.length; j++) {
            array.push(oneDeck[j]);
        }
    }

    return array;
}

// Show the number of remaining cards in the deck
function remainingCards(deck) {
    remainingCardsEl.textContent = deck.length;
}

// Show the number of remaining decks in play
function remainingDecks(deck) {
    remainingDecksEl.textContent = (Math.floor((deck.length) / 52) + 1);
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
    // Pull card from the deck array
    const card = deck.pop();
    console.log(card + " drawn");

    // Update the game count
    updateCount(card);

    // Send card out
    return card;
}

// Initial card deal among both players (currently only works for two)
function dealCards(deck) {
    player.push(getCard(deck));
    dealer.push(getCard(deck));
    player.push(getCard(deck));
    dealer.push(getCard(deck));
    
    // Send array values to UI
    updatePlayArea();
}

function updatePlayArea() {
    dealerArea.innerHTML = "",
    playerArea.innerHTML = "";
    for (let i = 0; i < player.length; i++) {
        playerArea.innerHTML += 
            `<div class="playing-card">
                <p>${player[i]}</p>
            </div>`
    }
    for (let i = 0; i < dealer.length; i++) {
        dealerArea.innerHTML += 
            `<div class="playing-card">
                <p>${dealer[i]}</p>
            </div>`
    }
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

function announcePlayerHand() {
    console.log("Player cards:");
    console.log(player);
    console.log(countHand(player));
    remainingCards(shuffled);
    remainingDecks(shuffled);
    checkBlackjack();
    shareCurrentCount();
}

function announceDealerHand() {
    console.log("Dealer cards:");
    console.log(dealer);
    console.log(countHand(dealer));
}

function checkBlackjack() {
    if (countHand(player) === 21 && countHand(dealer) === 21) {
        console.log("Both you and the dealer have Blackjack");
    } else if (countHand(dealer) === 21) {
        console.log("Dealer has Blackjack");
    } else if (countHand(player) === 21) {
        console.log("You have Blackjack!");
    }
}


// Function calls below

console.log(deck);

// shuffled is the variable holding the shuffled deck while game is in play
let shuffled = shuffleDeck(deck,decksInPlay);

// testing shuffle
console.log("Cards are shuffled:");
console.log(shuffled);

// testing dealCards
console.log("Dealing cards for start of game...");
dealCards(shuffled);
announceDealerHand();
announcePlayerHand();

// "Hit Me" button event listener
hitMeBtn.addEventListener("click", function() {
    hitMe(shuffled);
});

// Function for the "Hit Me" button
function hitMe(deck) {
    // Ensure player does not have 21 or more cards, then carry on
    if (countHand(player) > 21) {
        console.log("Cannot deal you a card, you busted!");
    } else if (countHand(player) === 21) {
        console.log("Cannot deal you a card, you have Blackjack!");
    } else {
        // Inform player that another card is being dealt
        console.log("Dealing a card!");

        // Deal player a card
        player.push(getCard(deck));

        // Send array values to UI
        updatePlayArea();

        // Display dealer cards and count
        announceDealerHand();

        // Display player cards and count
        announcePlayerHand();
    }

    // Announce if player has Blackjack or bust
    if (countHand(player) > 21) {
        console.log("You busted!");
    } else if (countHand(player === 21)) {
        console.logI("You have Blackjack!");
    }
}

// "Stand" button event listener
standBtn.addEventListener("click", function() {
    stand(shuffled);
});

// Function for the "Stand" button
function stand(deck) {
    console.log("You choose to stand");
// Ensure player does not have 21 or more cards, then carry on
    if (countHand(player) > 21) {
        console.log("You busted!");
    } else if (countHand(player) === 21) {
        if (countHand(dealer) === 21) {
            console.log("Both you and the dealer have Blackjack!");
        } else {
            console.log("Congratulations! You win this hand!");
        }
    } else {
        var dealInterval = setInterval(function() {
            if (countHand(dealer) <= countHand(player)) {
                // Deal a card to the dealer
                console.log("Dealer is dealt a card...");
                dealer.push(getCard(shuffled));
                announceDealerHand();
                announcePlayerHand();
                // Send array values to UI
                updatePlayArea();
            } else {
                lessThan = false;
                if (countHand(dealer) > 21) {
                    console.log("Dealer busted! You win this hand!");
                } else if (countHand(dealer) === 21) {
                    console.log("You lose...");
                } else {
                    console.log("Dealer wins this hand.");
                }

                clearInterval(dealInterval);
            }
        }, 1000);
        }


}

function checkDeck(deck) {
    if (deck.length <= 10) {
        deck = resetCards(deck, decksInPlay);
        deck = shuffleDeck(deck, decksInPlay);
    }
    return deck;
}

// "New" button event listener
newBtn.addEventListener("click", function() {
    newHand();
})

// Function for the "New" button
function newHand() {
    // Checks whether enough cards remain in the deck
    shuffled = checkDeck(shuffled);

    // Deals new hands without shuffling
    nextHand();

    // Announce both hands
    announceDealerHand();
    announcePlayerHand();
    
    // Send array values to UI
    updatePlayArea();
}