async function test() {
    const dictionary = await fetchDict();

    const testSolution = solveSB(new Set(['l','o','v','t','r','a','y']), 'l', dictionary);
    // console.log(testSolution);

    const letterBoxedBoard = [
        ['n', 'k', 'a'],
        ['d', 'i', 'x'],
        ['e', 'c', 'r'],
        ['h', 'o', 'l']
    ];
    const testSolutionLB = solveLB(letterBoxedBoard, dictionary);
    console.log(testSolutionLB);
}

test();