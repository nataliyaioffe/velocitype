// Doc Ready
$(function() {
  init();
});

const app = {};

time = 100;
let currentLevel = "easy"
let score = 0;
let isPlaying;
app.wordList = [];


const getWords = {
  easy: function() {
    $.ajax({
      method: "GET",
      url: `https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=noun%2C%20adjective%2C%20verb&minCorpusCount=20000&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=8&limit=500&api_key=8a9b0d06fcbe4c1a3600007d0db03272061a9e7fe1453fe4a`,
      dataType: "json"
    }).then(res => {
      console.log("API call--EASY");
      res.map(wordObject => {
        app.wordList.push(wordObject.word);
      });
      showWord();
    });
  },
  medium: function() {
    $.ajax({
      method: "GET",
      url: `https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=8000&maxCorpusCount=-1&minDictionaryCount=50&maxDictionaryCount=-1&minLength=8&maxLength=-1&limit=500&api_key=8a9b0d06fcbe4c1a3600007d0db03272061a9e7fe1453fe4a`,
      dataType: "json"
    }).then(res => {
      console.log("API call--MEDIUM");
      res.map(wordObject => {
        app.wordList.push(wordObject.word);
      });
      showWord();
    });
  },
  hard: function() {
    $.ajax({
      method: "GET",
      url: `https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=amily-name%2C%20given-name%2C%20noun%2C%20proper-noun%20&minCorpusCount=-1&maxCorpusCount=8000&minDictionaryCount=1&maxDictionaryCount=-1&minLength=6&maxLength=-1&limit=500&api_key=8a9b0d06fcbe4c1a3600007d0db03272061a9e7fe1453fe4a`,
      dataType: "json"
    }).then(res => {
      console.log("API call--HARD");
      res.map(wordObject => {
        app.wordList.push(wordObject.word);
      });
      showWord();
    });
  }
};



// Initialize Game
function init() {
  $("#time").html(time);

  // currentLevel = "easy"

  $("input[name='level']").on("click", function() {
    currentLevel = this.value;
  });

  $("#start").on("click", function() {
    getWords[currentLevel]();
    $(".modal").addClass("swipe");
  })


  $("#word-input").on("keypress", function() {
    startMatch();
  })

  setInterval(countdown, 1000);
  setInterval(checkStatus, 50);

  $("#menu").on("click", function () {
    $(".modal").removeClass("swipe");
  })
}


// Start match
function startMatch() {
  isPlaying = true;

  $(".timer").addClass("active");

  if (matchWords()) {
    showWord();
    $("#word-input").val("");
    score++;
  }

  if (score === -1) {
    $("#score").html(0);
  } else {
    $("#score").html(score);
  }
}

// // pick & show random word
function showWord() {
  const randIndex = Math.floor(Math.random() * app.wordList.length);
  app.newWord = app.wordList[randIndex];
  $("#current-word").html(app.newWord);
}

// match currentWord to wordInput
function matchWords() {
  if ($("#word-input").val() === $("#current-word").html()) {
    return true;
  } else {
    $("#message").html("");
    return false;
  }
}

// Countdown timer
function countdown() {
  if (time > 0 && isPlaying) {
    time--;
  } else if (time === 0) {
    isPlaying = false;
  }
  $("#time").html(time);
}

// check game status
function checkStatus() {
  if (isPlaying == false && time === 0) {
    $("#message").html("GAME OVERRRRRR!!!");
    score = -1;
  }
}

// function doAxios() {
//   $.ajax({
//     method: "GET",
//     url: `https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&excludePartOfSpeech=article%2C%20abbreviation%2C%20family-name%2C%20given-name%2C%20proper-noun%2C%20proper-noun-plural%2C%20proper-noun-posessive&minCorpusCount=5000&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=350&api_key=8a9b0d06fcbe4c1a3600007d0db03272061a9e7fe1453fe4a`,
//     dataType: "json"
//   }).then(res => {
//     app.wordList = res;
//     console.log("API call--EASY");
//     showWord();
//   });
// }
