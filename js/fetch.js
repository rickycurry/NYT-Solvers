async function fetchGame() {
  const response = await fetch("https://www.nytimes.com/puzzles/letter-boxed", {mode: 'cors'});
  const text = await response.text();
  console.log(text);
}

async function fetchDict() {
  const response = await fetch("dictionary.json");
  const jsonDict = await response.json();
  return jsonDict;
}
