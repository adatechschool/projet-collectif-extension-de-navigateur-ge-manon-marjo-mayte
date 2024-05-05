async function searchWord(word) {
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  const response = await fetch(url);
  const data = await response.json();

  // const wordl = data[0].word;
  // const phonetics = data[0].phonetics[0].text;
  const definition = data[0].meanings[0].definitions[0].definition;
  // const audioUrl = data[0].phonetics[1].audio[0];

  // console.log("Word:", word);
  // console.log("Text:", phonetics);
  console.log("Définition:", definition);
  // console.log("Audio:", audioUrl);

  displayWord(word, definition);
}

function displayWord(word, definition) {
  // let wordElement = document.querySelector("#searchWord");
  // wordElement.innerHTML = definition;
  // selectedWord(definition);
  alert(`Définition de ${word} : ${definition}`);
}

document.addEventListener("mouseup", function () {
  var selectedText = window.getSelection().toString();
  if (selectedText !== "") {
    searchWord(selectedText);
  }
});
searchWord("dog");

// Function creating a link between a selected word from a page and its definition from our API fetch
