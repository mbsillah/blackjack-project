$(() => {
    const mainDeck = deck();
    const playerHand = [];
    const dealerHand = [];
    let playerTotal = 0;
    let dealerTotal = 0;
    let isRunning = false;

    function makeCard(rank, suit) {
        this.rank = rank;
        this.suit = suit;

        let Card = {
            rank: rank,
            suit: suit
        };
        return Card;
    }

    function deck() {
        let newDeck = [];
        const ranks = [
            "Ace",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "Jack",
            "Queen",
            "King"
        ];
        const suits = ["Clubs", "Diamonds", "Hearts", "Spades"];

        for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < ranks.length; j++) {
                newDeck[i * ranks.length + j] = makeCard(ranks[j], suits[i]);
            }
        }
        for (let k = 0; k < newDeck.length; k++) {
            if (newDeck[k].rank === "Ace") {
                newDeck[k].value = 1;
            } else if (newDeck[k].rank === "2") {
                newDeck[k].value = 2;
            } else if (newDeck[k].rank === "3") {
                newDeck[k].value = 3;
            } else if (newDeck[k].rank === "4") {
                newDeck[k].value = 4;
            } else if (newDeck[k].rank === "5") {
                newDeck[k].value = 5;
            } else if (newDeck[k].rank === "6") {
                newDeck[k].value = 6;
            } else if (newDeck[k].rank === "7") {
                newDeck[k].value = 7;
            } else if (newDeck[k].rank === "8") {
                newDeck[k].value = 8;
            } else if (newDeck[k].rank === "9") {
                newDeck[k].value = 9;
            } else if (newDeck[k].rank === "10") {
                newDeck[k].value = 10;
            } else if (newDeck[k].rank === "Jack") {
                newDeck[k].value = 10;
            } else if (newDeck[k].rank === "Queen") {
                newDeck[k].value = 10;
            } else if (newDeck[k].rank === "King") {
                newDeck[k].value = 10;
            }
        }
        return newDeck;
    }
    function deal() {
        if (isRunning === false) {
            isRunning = true;
            for (let i = 0; i < 2; i++) {
                playerHand.push(mainDeck[Math.floor(Math.random() * (mainDeck.length - 0)) + 0]);
                dealerHand.push(mainDeck[Math.floor(Math.random() * (mainDeck.length - 0)) + 0]);
            }
            console.log("Here's your hand: " + JSON.stringify(playerHand));
            console.log("Dealer's total: " + JSON.stringify(dealerHand));
        }
    }



    function hit() {
        if (isRunning === true) {
            playerHand.push(mainDeck[Math.floor(Math.random() * (mainDeck.length - 0)) + 0]);
            console.log("Current hand: " + JSON.stringify(playerHand))
        }
    }

    function stand() {
        if (isRunning === true) {
            isRunning = false;
        }
        if (dealerTotal <= 17) {
            dealerHand.push(mainDeck[Math.floor(Math.random() * (mainDeck.length - 0)) + 0]);
            totalScores();
        }
    }

    function totalScores() {
        if (isRunning === true) {
            playerTotal = playerHand.reduce(function (sum, apple) {
                return sum + apple.value
            }, 0);
            console.log("Player's Score: " + playerTotal);
            dealerTotal = dealerHand.reduce(function (pear, orange) {
                return pear + orange.value
            }, 0);
            console.log("Dealer's Score: " + dealerTotal);
        }
    }

    function compare() {
        if (playerTotal === 21 && dealerTotal < 21) {
            console.log("You got Blackjack, you win");
        } else if (dealerTotal === 21 && playerTotal < 21) {
            console.log("Dealer hit Blackjack. You lose");
        } else if (playerTotal > 21) {
            console.log("BUSTED!");
        } else if (dealerTotal > 21) {
            console.log("The dealer BUSTED. You win!");
        }
    }

    function compareTwo() {
        if (playerTotal < dealerTotal) {
            console.log("The dealer has won");
        } else if (playerTotal > dealerTotal) {
            console.log("The player has won this round");
        } else if (playerTotal === dealerTotal) {
            console.log("DRAW GAME");
        }
    }


    function DeployGame() {
        $("#deal").on("click", function () {
            console.log("Dealing now");
            deal();
            totalScores();
            compare();
        });
        $("#hit").on("click", function () {
            console.log("I need a card")
            hit();
            totalScores();
            compare();

        });
        $("#stand").on("click", function () {
            console.log('End this now')
            stand();
            compare();
            compareTwo();
        });

    }

    DeployGame();

});
