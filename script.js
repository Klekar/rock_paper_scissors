let t


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

{   //GAME LOGIC
    let score = 0
    const itemArray = [
        "rock",
        "paper",
        "scissors"
    ]
    const paperElement = document.fin

    const scoreNumber = document.getElementById("score-number")

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
        const opponentsItem = getRandomPick()
        pickForAi(opponentsItem)
        const result = evaluateRound(item, opponentsItem)
        score += result
        scoreNumber.innerText = score
        const resultText = result === 1 ? "YOU WON" :
                           result === 0 ? "DRAW" :
                                          "YOU LOST"
        const matchResultBox = document.getElementById("match-result")
        matchResultBox.innerHTML = resultText
        //alert(`You picked ${item}\nOpponent picked ${opponentsItem}\n${resultText}`)
        animatePickTransition(item)
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

        pick1ElementAnimation.style.top = clickedElement.getBoundingClientRect().top + "px"
        pick1ElementAnimation.style.left = clickedElement.getBoundingClientRect().left + "px"
        
        pick1Box.replaceChildren(pick1Element)

        resultBox.classList.add("active")
        controllButtonsBox.classList.remove("active")
        // setTimeout(() => {
        //     resultBox.classList.add("active")
        // }, 200)
        // setTimeout(() => {
        //     controllButtonsBox.classList.remove("active")
        // }, 180)
    }

    function animateBackTransition() {
        controllButtonsBox.classList.add("active")
        resultBox.classList.remove("active")
        // setTimeout(() => {
        //     resultBox.classList.remove("active")
        // }, 200)
        // setTimeout(() => {
        //     controllButtonsBox.classList.add("active")
        // }, 180)
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