// "Hit Me" and "Stand" buttons
const   hitMeBtn = document.getElementById("hit-me"),
        standBtn = document.getElementById("stand"),
        newBtn = document.getElementById("new-round"),
        dealBtn = document.getElementById("deal"),
        resetBetBtn = document.getElementById("reset-bet"),
        runningCountEl = document.getElementById("running-count"),
        runningCountPEl = document.getElementById("running-count-p"),
        remainingCardsEl = document.getElementById("cards-rem"),
        remainingDecksEl = document.getElementById("decks-rem"),
        dealerArea = document.getElementById("dealer-area"),
        dealerCardsArea = document.getElementById("dealer-cards-area"),
        playerArea = document.getElementById("player-area"),
        playerCardsArea = document.getElementById("player-cards-area"),
        announceEl = document.getElementById("announce"),
        chipsRowEl = document.getElementById("chips-row"),
        bet1El = document.getElementById("bet1"),
        bet5El = document.getElementById("bet5"),
        bet25El = document.getElementById("bet25"),
        bet100El = document.getElementById("bet100"),
        playerBetEl = document.getElementById("player-bet-amt"),
        playerBankEl = document.getElementById("player-bank-amt"),
        dealerValueCountEl = document.getElementById("dealer-count"),
        dealerValueEl = document.getElementById("dealer-hand-value"),
        dealerCountEl = document.getElementById("dealer-hand-count"),
        playerValueCountEl = document.getElementById("player-count"),
        playerValueEl = document.getElementById("player-hand-value"),
        playerCountEl = document.getElementById("player-hand-count"),
        infoSection = document.getElementById("info-section"),
        infoEl = document.getElementById("info"),
        notInfoEl = document.getElementById("not-info");

// Deck, player, and dealer arrays starts empty
let deck = [],
    shuffled,
    remainCards,
    remainDecks,
    player = [],
    dealer = [],
    runningCount = 0,
    decksInPlay = 1,
    message,
    playerBet = 0,
    playerBank = 100,
    dealerValue,
    dealerCount = 0,
    playerValue,
    playerCount = 0
    infoSectionActive = false,
    playerStands = false;

playerBetUpdate();
playerBankUpdate();

infoSection.style = "display: none";

// Clear play areas
clearHands();

// Update the count
function updateCount(card) {
    let count = 0;
    switch (card) {
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
            count ++;
            console.log("Count + 1");
            break;
        case '10':
        case 'J':
        case 'Q':
        case 'K':
        case 'A':
            count --;
            console.log("Count - 1");
            break;
        default:
            break;
    }

    return count;
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
    dealerCardsArea.innerHTML = "",
    playerCardsArea.innerHTML = "";
}

// Reset the cards in the deck
function resetCards(array,decks) {
    // array = ["AH", "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "10H", "JH", "QH", "KH",
    //     "AD", "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "10D", "JD", "QD", "KD",
    //     "AC", "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "10C", "JC", "QC", "KC",
    //     "AS", "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "10S", "JS", "QS", "KS"];

    const oneDeck = [
        "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K",
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
    remainCards = deck.length;
    remainingCardsEl.textContent = remainCards;
}

// Show the number of remaining decks in play
function remainingDecks(deck) {
    remainDecks = (Math.floor((deck.length) / 52))
    remainingDecksEl.textContent = remainDecks;
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
    runningCount += updateCount(card);

    // Send card out
    return card;
}

// Initial card deal among both players (currently only works for two)
function dealCards(deck) {
    announceEl.style = "display: none";
    newBtn.style = "display: block;";
    hitMeBtn.style = "display: block;";
    standBtn.style = "display: block;";
    dealBtn.style = "display: none;";
    resetBetBtn.style = "display: none;";

    player.push(getCard(deck));
    dealer.push(getCard(deck));
    player.push(getCard(deck));
    dealer.push(getCard(deck));
    
    // Send array values to UI
    updatePlayArea();

    // Check if someone has Blackjack
    checkBlackjack();
}

function updatePlayArea() {
    dealerCardsArea.innerHTML = "",
    playerCardsArea.innerHTML = "";
    for (let i = 0; i < player.length; i++) {
        playerCardsArea.innerHTML += 
            `<div class="playing-card">
                <p>${player[i]}</p>
            </div>`
    }
    for (let i = 0; i < dealer.length; i++) { 
            if (i === 0) {
                dealerCardsArea.innerHTML += `<div class="playing-card">
                    <p>?</p>
                </div>`
            } else {
                dealerCardsArea.innerHTML += `<div class="playing-card">
                <p>${dealer[i]}</p>
                </div>`
            }
    }
}

function updatePlayAreaStand() {
    playerStands = true;
    
    if (infoSectionActive) {
        dealerValueCountEl.style = "display: block";
        runningCountPEl.style = "display: inline";
    }

    dealerCardsArea.innerHTML = "",
    playerCardsArea.innerHTML = "";
    for (let i = 0; i < player.length; i++) {
        playerCardsArea.innerHTML += 
            `<div class="playing-card">
                <p>${player[i]}</p>
            </div>`
    }
    for (let i = 0; i < dealer.length; i++) {
        dealerCardsArea.innerHTML += 
            `<div class="playing-card">
                <p>${dealer[i]}</p>
            </div>`
    }
}

function valueHand(hand) {
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

function countHand(hand) {
    let count = 0;

    for (let i = 0; i < hand.length; i++) {
        count += updateCount(hand[i]);
    }

    return count;
}

function countEachHand() {
    dealerCount = countHand(dealer);
    dealerCountEl.innerText = dealerCount;

    playerCount = countHand(player);
    playerCountEl.innerText = playerCount;
}

function announcePlayerHand() {
    console.log("Player cards:");
    console.log(player);
    playerValue = valueHand(player);
    console.log(playerValue);
    playerValueEl.innerText = playerValue;
    remainingCards(shuffled);
    remainingDecks(shuffled);
    shareCurrentCount();
    countEachHand();
}

function announceDealerHand() {
    console.log("Dealer cards:");
    console.log(dealer);
    dealerValue = valueHand(dealer);
    console.log(dealerValue);
    dealerValueEl.innerText = dealerValue;
}

function checkBlackjack() {
    if (valueHand(player) === 21 && valueHand(dealer) === 21) {
        updatePlayAreaStand();
        announce("Both you and the dealer have Blackjack");
    } else if (valueHand(dealer) === 21) {
        updatePlayAreaStand();
        lostBet();
        announce("Dealer has Blackjack");
    } else if (valueHand(player) === 21) {
        updatePlayAreaStand();
        wonBet();
        announce("You have Blackjack!");
    }
}

function check21() {
    if (valueHand(dealer) === 21) {
        announce("Dealer has 21");
    } else if (valueHand(player) === 21) {
        announce("You have 21!");
    }
}

function newGame() {
    
deck = [],
player = [],
dealer = [],
remainCards = 0,
remainDecks = 0,
runningCount = 0,
decksInPlay = 1,
message,
playerBet = 0,
playerBank = 100,
dealerValue,
dealerCount = 0,
playerValue,
playerCount = 0,
playerStands = false;

playerBetUpdate();
playerBankUpdate();

// Clear play areas
clearHands();

// Verify deck is empty
console.log(deck);

// shuffled is the variable holding the shuffled deck while game is in play
shuffled = shuffleDeck(deck,decksInPlay);
infoSection.style = "display: block";

// testing shuffle
console.log("Cards are shuffled:");
console.log(shuffled);

newBtn.style = "display: none;";
hitMeBtn.style = "display: none;";
standBtn.style = "display: none;";
dealBtn.style = "display: block;";

}

newGame();

dealBtn.addEventListener("click", function() {
    if (playerBet === 0) {
        alert("You must place a bet");
    } else {
        playerStands = false;

        if (infoSectionActive) {
            dealerValueCountEl.style = "display: none";
            runningCountPEl.style = "display: none";
        }
        chipsRowEl.style = "display: none";
        clearHands();
        shuffled = checkDeck(shuffled);
        dealCards(shuffled);
        countEachHand();
        announcePlayerHand();
        announceDealerHand();
    }
});

// // testing dealCards
// console.log("Dealing cards");
// dealCards(shuffled);
// announceDealerHand();
// announcePlayerHand();

// "Hit Me" button event listener
hitMeBtn.addEventListener("click", function() {
    hitMe(shuffled);
});

// Function for the "Hit Me" button
function hitMe(deck) {
    // Ensure player does not have 21 or more cards, then carry on
    if (valueHand(player) > 21) {
        announce("Cannot deal you a card, you busted!");
    } else if (valueHand(player) === 21) {
        announce("Cannot deal you a card, you have 21!");
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

        check21();
    }

    // Announce if player has 21 or bust
    if (valueHand(player) > 21) {
        lostBet();
        announce("You busted!");
    } else if (valueHand(player === 21)) {
        wonBet();
        announce("You have 21!");
    }
}

// If the player lost the bet
function lostBet() {
    playerBet = 0;
    playerBetUpdate();
}

// If the player won the bet
function wonBet() {
    playerBank += 2 * playerBet;
    playerBet = 0;
    playerBetUpdate();
    playerBankUpdate();
}

function pushBet() {
    playerBank += playerBet;
    playerBet = 0;
    playerBetUpdate();
    playerBankUpdate();
}

// "Stand" button event listener
standBtn.addEventListener("click", function() {
    stand(shuffled);
});

// Function for the "Stand" button
function stand(deck) {
    console.log("You choose to stand");
    updatePlayAreaStand();
// Ensure player does not have 21 or more cards, then carry on
    if (valueHand(player) > 21) {
        lostBet();
        announce("You busted!");
    } else if (valueHand(player) === 21) {
        if (valueHand(dealer) === 21) {
            pushBet();
            announce("Both you and the dealer have 21!");
        } else if (valueHand(player) === valueHand(dealer)) {
            pushBet();
            announce("Push");
        } else {
            wonBet();
            announce("You win this hand!");
        }
    } else {
        var dealInterval = setInterval(function() {
            if (valueHand(dealer) < valueHand(player)) {
                // Deal a card to the dealer
                console.log("Dealer is dealt a card...");
                dealer.push(getCard(shuffled));
                announceDealerHand();
                announcePlayerHand();
                // Send array values to UI
                updatePlayAreaStand();
            } else {
                lessThan = false;
                if (valueHand(dealer) > 21) {
                    wonBet();
                    announce("Dealer busted!");
                } else if (valueHand(dealer) === 21) {
                    lostBet();
                    announce("You lose...");
                } else if (valueHand(dealer) === valueHand(player)) {
                    pushBet();
                    announce("Push");
                } else {
                    lostBet();
                    announce("Dealer wins this hand.");
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
        alert("Deck is shuffled");
    }
    return deck;
}

// "New" button event listener
newBtn.addEventListener("click", function() {
    newGame();
})

// Function for the "New" button
// This is the old function
// Leaving this here for now
function newHand() {
    // Reset each hand count
    dealerCount = 0,
    playerCount = 0;

    // Restore Hit/Stand buttons
    restoreHitStand();

    // Hide announcement
    announceEl.style = "display: none";

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

function alert(message) {
    console.log(message);
    announceEl.textContent = message;
    announceEl.style = "display: block";
}

// Announce function
function announce(message) {

    updatePlayAreaStand();

    if (playerBank <= 0) {
        showGameOver(message);
    } else {
        console.log(message);
        announceEl.textContent = message;
        announceEl.style = "display: block";
        chipsRowEl.style = "display: flex";
        updateChips();
        hideHitStand();
    }
}

// Prevent Hit or Stand from being used
function hideHitStand() {
    hitMeBtn.style = "display: none;";
    standBtn.style = "display: none;";
    dealBtn.style = "display: block;";
    newBtn.style = "display: none;";
}

// Restore the Hit and Stand buttons
function restoreHitStand() {
    hitMeBtn.style = "display: block;";
    standBtn.style = "display: block;";
    newBtn.style = "display: block;";
}

// Chips functions
function bet1() {
    playerBet ++;
    playerBank --;
    playerBetUpdate();
    playerBankUpdate();
}

function bet5() {
    playerBet += 5;
    playerBank -= 5;
    playerBetUpdate();
    playerBankUpdate();
}

function bet25() {
    playerBet += 25;
    playerBank -= 25;
    playerBetUpdate();
    playerBankUpdate();
}

function bet100() {
    playerBet += 100;
    playerBank -= 100;
    playerBetUpdate();
    playerBankUpdate();
}

// Chips event listeners
bet1El.addEventListener("click", function() {
    bet1();
    updateChips();
});

bet5El.addEventListener("click", function() {
    bet5();
    updateChips();
});

bet25El.addEventListener("click", function() {
    bet25();
    updateChips();
});

bet100El.addEventListener("click", function() {
    bet100();
    updateChips();
});

resetBetBtn.addEventListener("click", function() {
    playerBank += playerBet;
    playerBet = 0;
    updateChips();
    playerBetUpdate();
    playerBankUpdate();
});

// Player bet UI update
function playerBetUpdate() {
    playerBetEl.textContent = playerBet;
}

// Player bank UI update
function playerBankUpdate() {
    playerBankEl.textContent = playerBank;
}

// Update chips based on bank
function updateChips() {
    if (playerBank >= 100) {
        bet1El.style = "display: flex;";
        bet5El.style = "display: flex;";
        bet25El.style = "display: flex;";
        bet100El.style = "display: flex;";
    } else if (playerBank >= 25) {
        bet1El.style = "display: flex;";
        bet5El.style = "display: flex;";
        bet25El.style = "display: flex;";
        bet100El.style = "display: none;";
    } else if (playerBank >= 5) {
        bet1El.style = "display: flex;";
        bet5El.style = "display: flex;";
        bet100El.style = "display: none;";
        bet25El.style = "display: none;";
    } else if (playerBank >= 1) {
        bet1El.style = "display: flex;";
        bet100El.style = "display: none;";
        bet25El.style = "display: none;";
        bet5El.style = "display: none;";
    } else {
        bet100El.style = "display: none;";
        bet25El.style = "display: none;";
        bet5El.style = "display: none;";
        bet1El.style = "display: none;";
    }
}

// Info sections toggle
infoSection.addEventListener("click", function() {
    if (infoSectionActive) {
        infoSectionActive = !infoSectionActive;
        infoEl.style = "display: none;";
        notInfoEl.style = "display: block;";
        dealerValueCountEl.style = "display: none";
        playerValueCountEl.style = "display: none";
    } else {
        infoSectionActive = !infoSectionActive;
        remainingCards(shuffled);
        remainingDecks(shuffled);
        countEachHand();
        announcePlayerHand();
        announceDealerHand();
        infoEl.style = "display: flex;";
        notInfoEl.style = "display: none;";
        playerValueCountEl.style = "display: block";
        if (playerStands) {
            dealerValueCountEl.style = "display: block";
            runningCountPEl.style = "display: inline";
        } else {
            dealerValueCountEl.style = "display: none";
            runningCountPEl.style = "display: none";
        }
    }
})

// Hide announcement when clicked
announceEl.addEventListener("click", function() {
    announceEl.style = "display: none";
})

function showGameOver(message) {
    message += " Game Over";
    console.log(message);
    announceEl.textContent = message;
    announceEl.style = "display: block";
    hitMeBtn.style = "display: none";
    standBtn.style = "display: none";
    newBtn.textContent = "New Game";
}

function checkShuffle() {

}