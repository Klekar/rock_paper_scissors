window.isMobileOrTablet = function () {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

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
        clonedElement.classList.remove("display-none")
        const aiIconBox = document.getElementById("player-2-icon")
        aiIconBox.replaceChildren(clonedElement)
    }

    function constructMoveAnimationElement(clickedElement, pick1Element) {
        const pick1ElementAnimation = clickedElement.cloneNode(true)
        pick1ElementAnimation.style.setProperty("--from-top", clickedElement.getBoundingClientRect().top + "px")
        pick1ElementAnimation.style.setProperty("--to-top", pick1Element.getBoundingClientRect().top + "px")
        pick1ElementAnimation.style.setProperty("--from-left", clickedElement.getBoundingClientRect().left + "px")
        pick1ElementAnimation.style.setProperty("--to-left", pick1Element.getBoundingClientRect().left + "px")
        return pick1ElementAnimation
    }

    function clickedElementMoveAnimation(pick1) {
        const clickedElement = document.getElementById(pick1).parentElement
        const pick1BoxAnimation = document.getElementById("player-1-icon-animation")
        const pick1Element = clickedElement.cloneNode(true)

        setTimeout(() => {
            pick1BoxAnimation.classList.remove("display-none")
            pick1BoxAnimation.replaceChildren(constructMoveAnimationElement(clickedElement, pick1Element))
            clickedElement.classList.add("display-none")
            setTimeout(() => {
                pick1BoxAnimation.classList.add("display-none")
                clickedElement.classList.remove("display-none")
            }, 1100);
        }, 200)

        const pick1Box = document.getElementById("player-1-icon")
        pick1Element.style.visibility = "hidden"
        pick1Box.replaceChildren(pick1Element)
        setTimeout(() => {
            pick1Element.style.visibility = "visible"
        }, 1000)
    }

    function animatePickTransition(pick1) {

        clickedElementMoveAnimation(pick1)

        const resultBox = document.getElementById("game-result")
        const controllButtonsBox = document.getElementById("game-buttons-box")
        resultBox.classList.add("active")
        resultBox.classList.remove("display-none")
        controllButtonsBox.classList.remove("active")
        setTimeout(() => {
            resultBox.classList.remove("display-none")
            controllButtonsBox.classList.add("display-none")
        }, 1000)
    }

    function animateBackTransition() {
        console.log("anibackcalled");
        if (gameState !== "showingResults")
            return
        gameState = "transition"

        const resultBox = document.getElementById("game-result")
        const controllButtonsBox = document.getElementById("game-buttons-box")
        controllButtonsBox.classList.add("active")
        controllButtonsBox.classList.remove("display-none")
        resultBox.classList.remove("active")
        setTimeout(() => {
            controllButtonsBox.classList.remove("display-none")
            resultBox.classList.add("display-none")
            document.getElementById("player-1-icon").classList.remove("victory-glow")
            document.getElementById("player-2-icon").classList.remove("victory-glow")
            document.getElementById("player-2-icon").replaceChildren()
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
        if (window.isMobileOrTablet())
            element.addEventListener("touchend", () => pickItem(picked))
        else
            element.addEventListener("click", () => pickItem(picked))
    })

    if (window.isMobileOrTablet())
        document.getElementById("play-again-button").addEventListener("touchend", animateBackTransition)
    else
        document.getElementById("play-again-button").addEventListener("click", animateBackTransition)
}