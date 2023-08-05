{   //RULES OPENING
    const rulesModal = document.getElementById("rules-modal")

    document.getElementById("rules-button").addEventListener("click", () => {
        rulesModal.classList.add("open")
    })
    document.getElementById("rules-modal-close").addEventListener("click", () => {
        rulesModal.classList.remove("open")
    })
    document.getElementById("rules-modal").addEventListener("click", (e) => {
        if (e.target.id === "rules-modal")
            rulesModal.classList.remove("open")
    })
}

{   //GAME LOGIC + ANIMATIONS
    /***
     * "transition" | "awaitingChoice" | "showingResults"
     */
    let gameState = "awaitingChoice"
    let score = 0
    const itemArray = [
        "rock",
        "paper",
        "scissors"
    ]


    /***
     * @returns 1 if pick1 wins, 0 if draw, -1 if pick2 wins
     */
    function evaluateRound(pick1, pick2) {
        const v1 = itemArray.indexOf(pick1)
        const v2 = itemArray.indexOf(pick2)
        const r = v1 - v2
        return Math.abs(r) === 2 ? r * -0.5 : r
    }

    function getResultText(result) {
        return result === 1 ? "YOU WON" :
            result === 0 ? "DRAW" :
                "YOU LOST"
    }

    function pickItem(item) {
        if (gameState !== "awaitingChoice")
            return
        gameState = "transition"

        animatePickTransition(item)

        const opponentsItem = getRandomPick()
        setTimeout(() => {
            pickForAi(opponentsItem)
        }, 1000);

        setTimeout(() => {
            const result = evaluateRound(item, opponentsItem)
            if (result !== 0) {
                score += result
                const scoreElement = document.getElementById("score-number")
                scoreElement.classList.add("rolling")
                setTimeout(() => {
                    scoreElement.innerText = score
                    scoreElement.classList.remove("rolling")
                }, 250)
            }
            const resultText = result === 1 ? "YOU WON" :
                result === 0 ? "DRAW" :
                    "YOU LOST"
            const matchResultBox = document.getElementById("match-result")
            if (result > 0) {
                document.getElementById("player-1-icon").classList.add("victory-glow")
            }
            else if (result < 0) {
                document.getElementById("player-2-icon").classList.add("victory-glow")
            }
            matchResultBox.innerHTML = resultText
            gameState = "showingResults"
        }, 1600);

        return
    }

    function pickForAi(item) {
        const pickedItemElement = document.getElementById(item).parentElement
        const clonedElement = pickedItemElement.cloneNode(true)
        const aiIconBox = document.getElementById("player-2-icon")
        aiIconBox.replaceChildren(clonedElement)
    }

    const resultBox = document.getElementById("game-result")
    const controllButtonsBox = document.getElementById("game-buttons-box")
    function animatePickTransition(pick1) {
        const pick1Box = document.getElementById("player-1-icon")
        const pick1BoxAnimation = document.getElementById("player-1-icon-animation")
        const clickedElement = document.getElementById(pick1).parentElement
        const pick1Element = clickedElement.cloneNode(true)
        const pick1ElementAnimation = clickedElement.cloneNode(true)

        setTimeout(() => {
            pick1ElementAnimation.style.visibility = "visible"
            pick1ElementAnimation.style.top = pick1Element.getBoundingClientRect().top + "px"
            pick1ElementAnimation.style.setProperty("--from-top", clickedElement.getBoundingClientRect().top + "px")
            pick1ElementAnimation.style.setProperty("--to-top", pick1Element.getBoundingClientRect().top + "px")
            pick1ElementAnimation.style.left = pick1Element.getBoundingClientRect().left + "px"
            pick1ElementAnimation.style.setProperty("--from-left", clickedElement.getBoundingClientRect().left + "px")
            pick1ElementAnimation.style.setProperty("--to-left", pick1Element.getBoundingClientRect().left + "px")
            pick1BoxAnimation.replaceChildren(pick1ElementAnimation)
        }, 200)

        pick1Element.style.visibility = "hidden"
        pick1Box.replaceChildren(pick1Element)
        setTimeout(() => {
            pick1Element.style.visibility = "visible"
            setTimeout(() => {
                pick1ElementAnimation.style.visibility = "hidden"
            }, 300);
        }, 1000)

        resultBox.classList.add("active")
        resultBox.classList.remove("display-none")
        controllButtonsBox.classList.remove("active")
        setTimeout(() => {
            resultBox.classList.remove("display-none")
            controllButtonsBox.classList.add("display-none")
        }, 1000)
        document.getElementById("player-1-icon").classList.remove("victory-glow")
        document.getElementById("player-2-icon").classList.remove("victory-glow")
    }

    function animateBackTransition() {
        if (gameState !== "showingResults")
            return
        gameState = "transition"
        controllButtonsBox.classList.add("active")
        controllButtonsBox.classList.remove("display-none")
        resultBox.classList.remove("active")
        document.getElementById("player-2-icon").replaceChildren()
        setTimeout(() => {
            controllButtonsBox.classList.remove("display-none")
            resultBox.classList.add("display-none")
            gameState = "awaitingChoice"
        }, 900)
    }

    function getRandomPick() {
        const r = Math.floor(Math.random(0) * 3)
        return itemArray[r]
    }

    const controlButtons = document.getElementsByClassName("game-button")

    Array.from(controlButtons).forEach((element) => {
        const picked = element.id
        element.addEventListener("click", () => pickItem(picked))
    })

    document.getElementById("play-again-button").addEventListener("click", animateBackTransition)
}