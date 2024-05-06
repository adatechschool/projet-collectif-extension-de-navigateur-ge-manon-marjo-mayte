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
        console.log("Définition non disponible pour", word);
        alert(`Définition non disponible pour ${word}`);
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
    console.log("Audio:", audioUrl);

    displayWord(word, definition, synonym, definition2, audioUrl);
}

function displayWord(word, definition, synonym, definition2, audioUrl) {
    let newWin = window.open("about:blank", "popUpName", "width=400,height=400");
    // Écriture du contenu de la définition dans la fenêtre pop-up
    newWin.document.write(`<strong>First definition of ${word} :</strong><br> ${definition}<br>`);
    // Écriture du contenu des synonymes dans la fenêtre pop-up
    if (synonym == undefined) {
        newWin.document.write(`<br><strong>no synonym of ${word}</strong><br>`);
    }
    else {
        newWin.document.write(`<br><strong>Synonyms of ${word} :</strong><br> ${synonym}<br>`);
    }

    // Création d'un bouton pour avoir une deuxième définition
    let buttonDef2 = newWin.document.createElement('button');
    buttonDef2.textContent = 'Definition 2';
    buttonDef2.addEventListener('click', function () {
        newWin.document.write(`<br><br><strong> Second definition of ${word} :</strong><br> ${definition2} <br>`);
    });

    // Ajout du bouton de la deuxième définition au document de la fenêtre popup
    newWin.document.body.appendChild(buttonDef2);


    // Création d'un bouton pour écouter la prononciation
    //let button = newWin.document.createElement('button');
    //button.textContent = 'Listen to the pronunciation';
    //button.addEventListener('click', function () {
    // Création de l'élément audio
    //let audio = newWin.document.createElement('audio');
    //audio.src = audioUrl;
    //audio.controls = true; // Ajoute les contrôles de lecture
    //newWin.document.body.appendChild(audio);
    //});

    // Ajout du bouton au document de la fenêtre pop-up
    //newWin.document.body.appendChild(button);
    //
}

document.addEventListener("mouseup", function () {
    var selectedText = window.getSelection().toString();
    if (selectedText !== "") {
        searchWord(selectedText);
    }
});
