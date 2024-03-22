const MIN_WORD_LENGTH_LB = 3;

/**
 * Solves the board described by sides. First identifies all valid
 * words, then attempts to find a two-word solution using those words.
 * @param {Array<String>} sides // Four three-letter Strings
 * @param {Object} dictionary 
 * @returns {Array<String>} // Either two Strings (success) or empty Array (failure)
 */
const solveLB = function solveLetterBoxed(sides, dictionary) {
    /** @type {Array<String>} */
    const allPossibleWords = [];

    /**
     * Identifies all valid words on the board by recursion.
     * @param {String} currentWord 
     * @param {Number} currentSide 
     * @param {Object} dictionary 
     */
    const findWordsRecursive = function findAllPossibleWordsRecursive(currentWord, currentSide, dictionary) {
        if (dictionary.hasOwnProperty('val') && currentWord.length >= MIN_WORD_LENGTH_LB) {
            allPossibleWords.push(currentWord);
        }
        for (const [i, side] of sides.entries()) {
            if (i === currentSide) {
                continue;
            }

            for (const letter of side) {
                if (dictionary.hasOwnProperty(letter)) {
                    findWordsRecursive(currentWord.concat(letter), i, dictionary[letter]);
                }
            }
        }
    };

    /**
     * Populates the allPossibleWords array by calling the recursive solver.
     * @param {Object} dictionary 
     */
    const allWords = function findAllPossibleWords(dictionary) {
        for (const [i, side] of sides.entries()) {
            for (const letter of side) {
                findWordsRecursive(letter, i, dictionary[letter]);
            }
        }
    };

    allWords(dictionary);
    // console.log(allPossibleWords);

    for (const word of allPossibleWords) {
        const firstLetters = new Set([...word]);
        const lastLetter = word[word.length - 1];
        const viableSecondWords = allPossibleWords.filter(w => w[0] === lastLetter);
        for (const secondWord of viableSecondWords) {
            const secondLetters = new Set([...secondWord]);
            const union = firstLetters.union(secondLetters);
            if (union.size === 12) {
                return [word, secondWord];
            }
        }
    } 
    return [];
}

/**
 * Solves the Letter Boxed game described by the relevant HTML elements.
 * The solution is appended to the document so the user can see it.
 * @param {Object} dictionary 
 */
function processInputAndSolveLBInternal(dictionary) {
    /** @type {String} */
    const boardInput = document.getElementById("lb-board").value.toLowerCase();
    if (boardInput.length !== 12) {
        console.log("Board needs to be exactly 12 letters");
        return;
    }
    /** @type {Array<String>} */
    const board = [];
    const letters = [...boardInput];
    board.push(letters.slice(0, 3));
    board.push(letters.slice(3, 6));
    board.push(letters.slice(6, 9));
    board.push(letters.slice(9, 12));

    const solution = solveLB(board, dictionary);
    const solutionHTML = document.getElementById("lb-solution");
    if (solution.length === 0) {
        solutionHTML.innerText = `Unfortunately we could not generate a two-word solution 
            to this puzzle. This is most likely due to discrepancies between the NYT 
            reference dictionary and our (inferior) dictionary. Sorry about that. 
            Just in case, double check that you typed your board input correctly.
            Alternatively, you may be using a browser that doesn't support the JS
            Set.prototype.union method. Recent versions of Chrome, Edge, and Safari
            do support this method, so try one of those browsers.`;
    } else {
        solutionHTML.innerText = `Our solution: ${solution}`;
    }
}