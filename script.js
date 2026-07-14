const output = document.getElementById("output");

const langMap = {
    hi: "hi-IN",
    te: "te-IN",
    fr: "fr-FR",
    es: "es-ES",
    de: "de-DE",
    ja: "ja-JP"
};

async function translateText() {

    const text = document.getElementById("inputText").value.trim();
    const targetLang = document.getElementById("language").value;

    if(text === ""){
        alert("Please enter some text");
        return;
    }

    const demoTranslations = {
        hello:{
            hi:"नमस्ते",
            te:"హలో",
            fr:"Bonjour",
            es:"Hola",
            de:"Hallo",
            ja:"こんにちは"
        }
    };

    const lower = text.toLowerCase();

    if(demoTranslations[lower] && demoTranslations[lower][targetLang]){
        output.innerText = demoTranslations[lower][targetLang];
    }else{
        output.innerText = text;
    }
}

function copyText(){
    navigator.clipboard.writeText(output.innerText);
    alert("Copied Successfully!");
}

function speakText(){

    const text = output.innerText.trim();

    if(text === "" || text === "Translation appears here..."){
        alert("Please translate text first.");
        return;
    }

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = langMap[document.getElementById("language").value] || "en-US";

    let voices = speechSynthesis.getVoices();

    if(voices.length > 0){
        utterance.voice = voices.find(v => v.lang === utterance.lang) || voices[0];
    }

    speechSynthesis.speak(utterance);
}

speechSynthesis.onvoiceschanged = function(){
    speechSynthesis.getVoices();
};