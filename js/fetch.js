async function fetchGame() {
  const response = await fetch("http://cors-anywhere.herokuapp.com/https://www.nytimes.com/puzzles/letter-boxed");
  console.log(response);
}

async function fetchDict() {
  const response = await fetch("dictionary.json");
  const jsonDict = await response.json();
  return jsonDict;
}
