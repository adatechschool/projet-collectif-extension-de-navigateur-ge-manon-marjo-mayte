async function searchWord(word) {
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  const response = await fetch(url);
  const data = await response.json();

  // const wordl = data[0].word;
  // const phonetics = data[0].phonetics[0].text;
  let definition;
  if (
    data[0].meanings[0].definitions.length >= 1 &&
    data[0].meanings[0].definitions[0].definition
  ) {
    definition = data[0].meanings[0].definitions[0].definition;
  } else {
    console.log("Definition not available for ", word);
    alert(`Definition not available for  ${word}`);
  }

  let synonym;
  if (data[0].meanings.length >= 1 && data[0].meanings[0].synonyms[0]) {
    synonym = data[0].meanings[0].synonyms[0];
  } else {
    console.log("Synonym not available for ", word);
    alert(`Synonym not available for  ${word}`);
  }

  let definition2;
  if (
    data[0].meanings[0].definitions.length >= 2 &&
    data[0].meanings[0].definitions[1].definition
  ) {
    definition2 = data[0].meanings[0].definitions[1].definition;
  } else {
    console.log("Second definition not available for ", word);
    alert(`Second definition not available for ${word}`);
  }

  let audioUrl;
  if (data[0].phonetics.length >= 1 && data[0].phonetics[0].audio) {
    audioUrl = data[0].phonetics[0].audio;
  } else {
    console.log("Audio not available for ", word);
    alert(`Audio not available for  ${word}`);
  }

  console.log("Word:", word);
  // console.log("Text:", phonetics);
  console.log("Définition:", definition);
  console.log("Synonyme : ", synonym);
  console.log("Définition 2 : ", definition2);
  console.log("Audio:", audioUrl);

  displayWord(word, definition, synonym, definition2, audioUrl);
}

function displayWord(word, definition, synonym, definition2, audioUrl) {
  let newWin = window.open("about:blank", "popUpName", "width=400,height=400");
  newWin.document.write(`<style>
    body {
        background: #FCEDF2;
    }
    strong, em {
        font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
        "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    }
    strong {
        color: #885df1;
        font-size: 20px;
        font-weight: 700;
        line-height: 1.5em;
        transition: all 150 ease;
        text-decoration: underline;
    }
    strong:hover {
        opacity: 0,7;
        color: #ec4f81;
        font-size: 20px;
    }
    em {
        color: #272144;
        text-align: center;
        line-height: 1.5em;
        margin-bottom: 15px;
        margin-top: 30px;
        margin-left: 3px;
    }

    button {
        color: #FFF;
        display: block;
        font-size: 16px; 
        padding: 10px 14px; 
        border: 1px solid #694AED;
        border-radius: 25px 25px 25px 25px;
        box-shadow: 4px 4px 4px #DCB5FE;
        background: #885df1;
        pointer: cursor;
        transition: all 150 ease-in-out;
        margin: 0 auto;
        margin-top: 20px;
        margin-bottom: 10px;
    }
    button:hover {
        background: #FFF;
        color: #885df1;
    }

  </style>`);

  // Écriture du contenu de la définition dans la fenêtre pop-up
  newWin.document.write(
    `<strong>First definition of ${word} :</strong><br> <em>${definition}</em><br>`
  );
  // Écriture du contenu des synonymes dans la fenêtre pop-up
  if (synonym == undefined) {
    newWin.document.write(
      `<br><strong>No synonym of <em>${word}</em></strong><br>`
    );
  } else {
    newWin.document.write(
      `<br><strong>Synonyms of ${word} :</strong><br> <em>${synonym}</em><br>`
    );
  }

  // Création d'un bouton pour avoir une deuxième définition
  let buttonDef2 = newWin.document.createElement("button");
  buttonDef2.textContent = "Definition 2";
  buttonDef2.addEventListener("click", function () {
    newWin.document.write(
      `<br><br><strong> Second definition of ${word} :</strong><br> <em>${definition2}</em><br>`
    );
  });

  // Ajout du bouton de la deuxième définition au document de la fenêtre popup
  newWin.document.body.appendChild(buttonDef2);

  // Création d'un bouton pour écouter la prononciation
  let button = newWin.document.createElement("button");
  button.textContent = "Listen to the pronunciation";
  button.addEventListener("click", function () {
    // Création de l'élément audio
    let audio = newWin.document.createElement("audio");
    audio.src = audioUrl;
    audio.controls = true; // Ajoute les contrôles de lecture
    newWin.document.body.appendChild(audio);
  });

  // Ajout du bouton au document de la fenêtre pop-up
  newWin.document.body.appendChild(button);
}

document.addEventListener("mouseup", function () {
  var selectedText = window.getSelection().toString();
  if (selectedText !== "") {
    searchWord(selectedText);
  }
});
