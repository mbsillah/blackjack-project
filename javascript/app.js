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
            "ace",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "jack",
            "queen",
            "king"
        ];
        const suits = ["club", "diamond", "heart", "spade"];

        for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < ranks.length; j++) {
                newDeck[i * ranks.length + j] = makeCard(ranks[j], suits[i]);
            }
        }
        for (let k = 0; k < newDeck.length; k++) {
            if (newDeck[k].rank === "ace") {
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
            } else if (newDeck[k].rank === "jack") {
                newDeck[k].value = 10;
            } else if (newDeck[k].rank === "queen") {
                newDeck[k].value = 10;
            } else if (newDeck[k].rank === "king") {
                newDeck[k].value = 10;
            }
        }
        return newDeck;
    }

    function reset() {
        const playerHand = [];
        const dealerHand = [];
        let playerTotal = 0;
        let dealerTotal = 0;
        let isRunning = false;
    }

    function deal() {
        if (isRunning === false) {
            isRunning = true;
            for (let i = 0; i < 2; i++) {
                playerHand.push(mainDeck[Math.floor(Math.random() * (mainDeck.length - 0)) + 0]);
                $("#yourHand").append("<img src='card/" + playerHand[i].suit + "_" + playerHand[i].rank + ".png'>");
                dealerHand.push(mainDeck[Math.floor(Math.random() * (mainDeck.length - 0)) + 0]);
            }
            console.log("Here's your hand: " + JSON.stringify(playerHand));
            console.log("Dealer's hand: " + JSON.stringify(dealerHand));
            $("#dealerHand").append("<img src='card/" + dealerHand[0].suit + "_" + dealerHand[0].rank + ".png'>");
            $("#dealerHand").append('<img src="card/b2fv.png">');
        }
    }



    function hit() {
        if (isRunning === true) {
            playerHand.push(mainDeck[Math.floor(Math.random() * (mainDeck.length - 0)) + 0]);
            $("#yourHand").append("<img src='card/" + playerHand[playerHand.length - 1].suit + "_" + playerHand[playerHand.length - 1].rank + ".png'>")
            console.log("Current hand: " + JSON.stringify(playerHand))
        }
    }


    function totalPlayerScores() {
        if (isRunning === true) {
            playerTotal = playerHand.reduce(function (sum, apple) {
                return sum + apple.value
            }, 0);
            console.log("Player's Score: " + playerTotal);
        }
    }

    function totalDealerScores() {
        if (isRunning === true) {
            dealerTotal = dealerHand.reduce(function (pear, orange) {
                return pear + orange.value
            }, 0);
            console.log("Dealer's Score: " + dealerTotal);
        }
        return dealerTotal;
    }

    function stand() {
        if (isRunning === true) {
            dealerHand.push(mainDeck[Math.floor(Math.random() * (mainDeck.length - 0)) + 0]);
            console.log("Dealer's hand: " + JSON.stringify(dealerHand));
            console.log("Dealer's Score: " + dealerTotal);
        }
    }



    function compare() {
        if (playerTotal === 21 && dealerTotal < 21) {
            console.log("You got Blackjack, you win");
            reset();
        } else if (dealerTotal === 21 && playerTotal < 21) {
            console.log("Dealer hit Blackjack. You lose");
            reset();
        } else if (playerTotal > 21) {
            console.log("BUSTED!");
            reset();
        } else if (dealerTotal > 21) {
            console.log("The dealer BUSTED. You win!");
            reset();
        }
    }

    function compareTwo() {
        if (playerTotal < dealerTotal && dealerTotal < 21) {
            console.log("The dealer has won");
            reset();
        } else if (playerTotal > dealerTotal) {
            console.log("The player has won this round");
            reset();
        } else if (playerTotal === dealerTotal) {
            console.log("DRAW GAME");
            reset();
        }
    }


    function DeployGame() {
        $("#deal").on("click", function () {
            console.log("Dealing now");
            deal();
            totalPlayerScores();
            totalDealerScores();
        });
        $("#hit").on("click", function () {
            console.log("I draw")
            hit();
            totalPlayerScores();
            compare();

        });
        $("#stand").on("click", function () {
            console.log("I end my turn");
            if (isRunning === true) {
            while (playerTotal >= dealerTotal && playerTotal <= 21) {
                stand();
                totalDealerScores();
                if (dealerTotal > playerTotal) {
                    break;
                }
            }
            totalDealerScores();
            totalPlayerScores();
            compare();
            compareTwo();
        } 
        });
    }

    DeployGame();
});
