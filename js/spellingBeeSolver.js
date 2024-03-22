const MIN_WORD_LENGTH = 4;

/** 
 * Solves the given board. Returns the available words, sorted by length descending.
 * @param {Set<String>} letters
 * @param {String} centerLetter
 * @param {Object} dictionary
 * @returns {String[]}
 */
const solveSB = function solveSpellingBee(letters, centerLetter, dictionary) {
    /** @type {Array<String>} */
    const available = [];

    /**
     * Recursively traverses the dictionary to identify valid words.
     * Note that dictionary is a sub-dictionary of the outer-scoped dictionary,
     * i.e. we pass in the sub-dictionary that corresponds to currentWord.
     * @param {Object} dictionary 
     * @param {String} currentWord 
     * @param {Number} wordLength 
     */
    const dictTraverse = function (dictionary, currentWord, wordLength) {
        if (dictionary.hasOwnProperty('val') && wordLength >= MIN_WORD_LENGTH && currentWord.includes(centerLetter)) {
            available.push(currentWord);
        }
        for (const [letter, subdict] of Object.entries(dictionary)) {
            if (letter === 'val' || !letters.has(letter)) {
                continue;
            }
            dictTraverse(subdict, currentWord.concat(letter), wordLength + 1);
        }
    }
    dictTraverse(dictionary, "", 0);
    const sorted = available.sort((a, b) => b.length - a.length);
    return sorted;
}

/**
 * Solves the Spelling Bee game described by the relevant HTML elements.
 * The solution is appended to the document so the user can see it.
 * @param {Object} dictionary 
 */
function processInputAndSolveSBInternal(dictionary) {
    /** @type {String} */
    const boardInput = document.getElementById("sb-board").value.toLowerCase();
    /** @type {String} */
    const centerLetter = document.getElementById("sb-center").value.toLowerCase();
    if (boardInput.length !== 7 || centerLetter.length !== 1) {
        console.log("Board needs to be exactly 7 letters");
        return;
    }

    const solution = solveSB(new Set([...boardInput]), centerLetter, dictionary);
    document.getElementById("sb-solution-header").innerText = "Our word list:";
    const wordListHTML = document.getElementById("sb-solution");
    wordListHTML.innerHTML = "";
    solution.forEach(word => {
        const li = document.createElement("li");
        li.appendChild(document.createTextNode(word));
        wordListHTML.appendChild(li);
    });
}
