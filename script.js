async function searchWord(word) {
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  const response = await fetch(url);
  const data = await response.json();

  const wordl = data[0].word;
  const phonetics = data[0].phonetics[0].text;
  const definition = data[0].meanings[0].definitions[0].definition;
  const audioUrl = data[0].phonetics[1].audio[0];

  console.log("Word:", word);
  console.log("Text:", phonetics);
  console.log("Définition:", definition);
  console.log("Audio:", audioUrl);

  displayWord(definition);
}

function displayWord(definition) {
  let wordElement = document.querySelector("#displayedWord");
  wordElement.innerHTML = definition;
}
searchWord("dog");
