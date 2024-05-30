const letterContainer = document.getElementById ('letter-container');
const optionsContainer = document.getElementById ('options-container');
const userInputSection = document.getElementById ('user-input-section');
const newGameContainer = document.getElementById ('new-game-container');
const newGameButton = document.getElementById ('new-game-button');
const canvas = document.getElementById ('canvas');
const resultText = document.getElementById ('result-text');
const leaderboardContainer = document.getElementById ('leaderboard-container');
const leaderboard = document
  .getElementById ('leaderboard')
  .querySelector ('tbody');

let options = {
  fruits: [
    'Redcherry',
    'Blueberry',
    'Mandarin',
    'Pineapple',
    'Pomegranate',
    'Watermelon',
    'Pineapple',
    'Strawberry',
    'Raspberry',
  ],
  animals: [
    'Tiger',
    'Elephant',
    'Squirrel',
    'Panther',
    'Redpanda',
    'Zebra',
    'Armadillo',
    'Donkey',
    'Giraffe',
    'Kangaroo',
    'Orangutan',
  ],
  names: [
    'Tikey',
    'Tauke',
    'Raute',
    'Murra',
    'Aandey',
    'Sebastian',
    'Xavier',
    'Zachary',
    'Yvonne',
    'Wendy',
    'Victoria',
    'Ursula',
    'Tiffany',
    'Samantha',
    'Quincy',
    'Pamela',
    'Olivia',
    'Natalie',
    'Morgan',
    'Lorelei',
    'Katherine',
    'Jasmine',
    'Isabella',
    'Hannah',
    'Gabrielle',
    'Fiona',
    'Eleanor',
    'Danielle',
    'Cassandra',
    'Brianna',
    'Alyssa',
    'Alexandra',
    'Zoe',
    'Yvette',
    'Xena',
    'Wanda',
    'Violet',
    'Uma',
    'Tara',
    'Sara',
    'Rita',
    'Quinn',
    'Piper',
    'Olive',
    'Nora',
    'Molly',
    'Lila',
    'Kylie',
    'Jenna',
    'Ivy',
    'Holly',
    'Grace',
    'Felicity',
    'Ella',
    'Daisy',
    'Cora',
    'Bella',
    'Ava',
    'Zara',
    'Yara',
    'Xara',
    'Willa',
    'Vera',
    'Ursa',
    'Tina',
    'Sasha',
    'Rosa',
    'Quincy',
    'Penny',
    'Olive',
    'Nina',
    'Mia',
    'Lily',
    'Kara',
    'Jade',
    'Iris',
    'Hazel',
    'Gwen',
    'Faye',
    'Eve',
    'Dawn',
    'Cleo',
    'Bree',
    'Aria',
    'Zara',
    'Yara',
    'Xara',
    'Willa',
    'Vera',
    'Ursa',
    'Tina',
    'Sasha',
    'Rosa',
    'Quincy',
    'Penny',
    'Olive',
    'Nina',
    'Mia',
    'Lily',
    'Kara',
    'Jade',
    'Iris',
    'Hazel',
    'Gwen',
    'Faye',
    'Eve',
    'Dawn',
    'Cleo',
    'Bree',
    'Aria',
    'Zara',
    'Yara',
    'Xara',
    'Willa',
    'Vera',
    'Ursa',
    'Tina',
    'Sasha',
    'Rosa',
    'Quincy',
    'Penny',
    'Olive',
    'Nina',
    'Mia',
    'Lily',
    'Kara',
    'Jade',
    'Iris',
    'Hazel',
  ],
  countries: [
    'Nepal',
    'Hungary',
    'Scotland',
    'Switzerland',
    'Zimbabwe',
    'Kazakasthan',
    'Kyrgyzstan',
    'Uzbekistan',
    'Turkmenistan',
    'Netherlands',
  ],
};

let winCount = 0;
let count = 0;
let chosenWord = '';

let leaderboardData = [];
const displayOptions = () => {
  optionsContainer.innerHTML += `<h2>Select An Option</h2>`;
  let buttonCon = document.createElement ('div');
  for (let value in options) {
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }
  optionsContainer.appendChild (buttonCon);
};

const blocker = () => {
  let optionsButtons = document.querySelectorAll ('.options');
  let letterButtons = document.querySelectorAll ('.letters');

  optionsButtons.forEach (button => {
    button.disabled = true;
  });

  letterButtons.forEach (button => {
    button.disabled = true;
  });
  newGameContainer.classList.remove ('hide');
};

const generateWord = optionValue => {
  let optionsButtons = document.querySelectorAll ('.options');
  optionsButtons.forEach (button => {
    if (button.innerText.toLowerCase () === optionValue) {
      button.classList.add ('active');
    }
    button.disabled = true;
  });

  letterContainer.classList.remove ('hide');
  userInputSection.innerText = '';

  let optionArray = options[optionValue];
  chosenWord = optionArray[Math.floor (Math.random () * optionArray.length)];
  chosenWord = chosenWord.toUpperCase ();
  let displayItem = chosenWord.replace (/./g, '<span class="dashes">_</span>');
  userInputSection.innerHTML = displayItem;
};

const initializer = () => {
  winCount = 0;
  count = 0;
  userInputSection.innerHTML = '';
  optionsContainer.innerHTML = '';
  letterContainer.classList.add ('hide');
  newGameContainer.classList.add ('hide');
  letterContainer.innerHTML = '';

  for (let i = 65; i < 91; i++) {
    let button = document.createElement ('button');
    button.classList.add ('letters');
    button.innerText = String.fromCharCode (i);
    button.addEventListener ('click', () => {
      let charArray = chosenWord.split ('');
      let dashes = document.getElementsByClassName ('dashes');
      if (charArray.includes (button.innerText)) {
        charArray.forEach ((char, index) => {
          if (char === button.innerText) {
            dashes[index].innerText = char;
            winCount += 1;
            if (winCount == charArray.length) {
              resultText.innerHTML = `<h2 class='win-msg'>You Win!!</h2><p>The word was <span><strong>${chosenWord}</strong></span></p>`;
              blocker ();
              updateLeaderboard (true);
            }
          }
        });
        button.style.backgroundColor = '#39d78d'; // Green background
      } else {
        count += 1;
        drawMan (count);
        if (count == 6) {
          resultText.innerHTML = `<h2 class='lose-msg'>You Lose!!</h2><p>The word was <span><strong>${chosenWord}</strong></span></p>`;
          blocker ();
          updateLeaderboard (false);
        }
        button.style.backgroundColor = '#fe5152'; // Red background
      }
      button.disabled = true;
    });
    letterContainer.append (button);
  }
  displayOptions ();
  let {initialDrawing} = canvasCreator ();
  initialDrawing ();
};

const canvasCreator = () => {
  let context = canvas.getContext ('2d');
  context.beginPath ();
  context.strokeStyle = '#000';
  context.lineWidth = 2;
  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo (fromX, fromY);
    context.lineTo (toX, toY);
    context.stroke ();
  };
  const head = () => {
    context.beginPath ();
    context.arc (70, 30, 10, 0, Math.PI * 2, true);
    context.stroke ();
  };
  const body = () => {
    drawLine (70, 40, 70, 80);
  };
  const leftArm = () => {
    drawLine (70, 50, 50, 70);
  };
  const rightArm = () => {
    drawLine (70, 50, 90, 70);
  };
  const leftLeg = () => {
    drawLine (70, 80, 50, 110);
  };
  const rightLeg = () => {
    drawLine (70, 80, 90, 110);
  };
  const initialDrawing = () => {
    context.clearRect (0, 0, context.canvas.width, context.canvas.height);
    drawLine (10, 130, 130, 130);
    drawLine (10, 10, 10, 131);
    drawLine (10, 10, 70, 10);
    drawLine (70, 10, 70, 20);
  };
  return {initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg};
};

const drawMan = count => {
  let {head, body, leftArm, rightArm, leftLeg, rightLeg} = canvasCreator ();
  switch (count) {
    case 1:
      head ();
      break;
    case 2:
      body ();
      break;
    case 3:
      leftArm ();
      break;
    case 4:
      rightArm ();
      break;
    case 5:
      leftLeg ();
      break;
    case 6:
      rightLeg;
      break;
    default:
      break;
  }
};

const updateLeaderboard = isWin => {
  const name = prompt ('Enter your name:');
  if (name) {
    const result = isWin ? count : 'lose';
    leaderboardData.push ({name, result});
    leaderboardData.sort ((a, b) => {
      if (a.result === 'lose' && b.result === 'lose') return 0;
      if (a.result === 'lose') return 1;
      if (b.result === 'lose') return -1;
      return a.result - b.result;
    });
    displayLeaderboard ();
  }
};

const displayLeaderboard = () => {
  leaderboard.innerHTML = '';
  leaderboardData.forEach ((entry, index) => {
    const row = leaderboard.insertRow (index);
    const rankCell = row.insertCell (0);
    const nameCell = row.insertCell (1);
    const resultCell = row.insertCell (2);
    rankCell.innerText = index + 1;
    nameCell.innerHTML = `${entry.name} ${entry.result === 0 ? '🏆' : ''}${entry.result === 'lose' ? '☠️' : ''}`;
    resultCell.innerText = entry.result === 'lose'
      ? 'Lost'
      : `Mistakes: ${entry.result}`;
  });
};

const audio = document.getElementById ('background-audio');
const audioControlButton = document.getElementById ('audio-control');
const audioIcon = audioControlButton.querySelector ('i');
audio.muted = true;
audioControlButton.addEventListener ('click', () => {
  if (audio.muted) {
    audio.muted = false;
    audio.play ();
    audioIcon.classList.remove ('fa-volume-mute');
    audioIcon.classList.add ('fa-volume-up');
  } else {
    audio.muted = true;
    audio.pause ();
    audioIcon.classList.remove ('fa-volume-up');
    audioIcon.classList.add ('fa-volume-mute');
  }
});
audioIcon.classList.add ('fa-volume-mute');

newGameButton.addEventListener ('click', initializer);
window.onload = initializer;
