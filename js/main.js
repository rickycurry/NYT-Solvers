let dictionary;

async function main() {
    dictionary = await fetchDict();
    fetchGame();
    attachToInput();
}

function attachToInput() {
    const submitLBButton = document.getElementById("submit-lb");
    const submitLBFunc = function () { processInputAndSolveLBInternal(dictionary); };
    submitLBButton.onclick = submitLBFunc;
    document.getElementById("lb-board")
        .addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                submitLBButton.click();
            }
        });
    const hintLBButton = document.getElementById("hint-lb");
    const hintLBFunc = function () { processInputAndSolveLBInternal(dictionary, true); };
    hintLBButton.onclick = hintLBFunc;

    const submitSBButton = document.getElementById("submit-sb");
    const submitSBFunc = function () { processInputAndSolveSBInternal(dictionary); };
    submitSBButton.onclick = submitSBFunc;
    const centerLetter = document.getElementById("sb-center");
    document.getElementById("sb-board")
        .addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                centerLetter.focus();
            }
        });
    centerLetter.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            submitSBButton.click();
        }
    });
}

main();