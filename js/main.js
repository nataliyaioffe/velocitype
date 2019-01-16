// Doc Ready
$(function() {
  init();
});

// global variables

// Available levels
const levels = {
  easy: 5,
  medium: 3,
  hard: 2
};

// to change level
// const currentLevel = levels.easy
// let currentLevel = levels[$("input[type='radio']:checked").val()];
let currentLevel = levels[$("input[name='level']:checked").val()];
let time = currentLevel;
let score = 0;
let isPlaying;

$("#seconds").html(currentLevel);
$("#time").html(time);

const words = [
  "Lorem",
  "ipsum",
  "dolor sit amet",
  "consectetur",
  "adipisicing elit",
  "provident",
  "quae",
  "eaque",
  "iste omnis",
  "molestias",
  "reprehenderit",
  "expedita",
  "voluptas",
  "quisquam",
  "consectetur",
  "pariatur",
  "cumque",
  "laudantium",
  "voluptatibus",
  "voluptatum",
  "quasi"
];

// Initialize Game
function init() {
  $("input[name='level']").on("click", function() {
    currentLevel = levels[this.value];
    time = currentLevel;
    $("#seconds").html(currentLevel);
    $("#time").html(time);
  });

  $(".button").on("click", function() {
    doAxios();
  });

  showWord(words);
  $("#word-input").on("change", startMatch);
  // Call countdown every second
  setInterval(countdown, 1000);
  // Check game status
  setInterval(checkStatus, 50);
}

// Start match
function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
    $("#word-input").val("");
    score++;
  }
  // if score is -1, display 0
  if (score === -1) {
    $("#score").html(0);
  } else {
    $("#score").html(score);
  }
}

// match currentWord to wordInput
function matchWords() {
  if ($("#word-input").val() === $("#current-word").html()) {
    return true;
  } else {
    $("#message").html("FALSE!!!");
    return false;
  }
}

// pick & show random word
function showWord(words) {
  // Generate random array index
  const randIndex = Math.floor(Math.random() * words.length);
  // Output random word
  $("#current-word").html(words[randIndex]);
}

// Countdown timer
function countdown() {
  if (time > 0 && isPlaying) {
    time--;
  } else if (time === 0) {
    isPlaying = false;
  }
  // Show time
  $("#time").html(time);
}

// check game status
function checkStatus() {
  if (isPlaying == false && time === 0) {
    $("#message").html("GAME OVERRRRRR!!!");
    score = -1;
  }
}

function doAxios() {
  $.ajax({
    method: "GET",
    url: `https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=500&api_key=8a9b0d06fcbe4c1a3600007d0db03272061a9e7fe1453fe4a`,
    dataType: "json"
  }).then(res => {
    console.log(res);
  });
}