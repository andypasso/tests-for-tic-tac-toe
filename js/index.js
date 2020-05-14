const Player = (name, symbol, color) => {
  const array = [];
  const win = false;
  const score = 0;

  return {
    name,
    array,
    symbol,
    win,
    score,
    color,
  };
};

const gameFlow = () => {
  const reset = () => {
    document.getElementById(1).innerHTML = '';
    document.getElementById(2).innerHTML = '';
    document.getElementById(3).innerHTML = '';
    document.getElementById(4).innerHTML = '';
    document.getElementById(5).innerHTML = '';
    document.getElementById(6).innerHTML = '';
    document.getElementById(7).innerHTML = '';
    document.getElementById(8).innerHTML = '';
    document.getElementById(9).innerHTML = '';
  };
  reset();

  const checkWinner = () => {
    const winingCompositions = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
    ];
    for (const x in winingCompositions) {
      if (
        currentPlayer.array.includes(winingCompositions[x][0])
        && currentPlayer.array.includes(winingCompositions[x][1])
        && currentPlayer.array.includes(winingCompositions[x][2])
      ) {
        currentPlayer.win = true;
      }
    }
  };

  let moves = 0;

  const getMark = (event) => {
    currentPlayer.array.push(parseInt(event.target.id, 10));
    document.getElementById(
      event.target.id,
    ).innerHTML = `<div style=color:${currentPlayer.color}>${currentPlayer.symbol}</div>`;
    document
      .getElementById(event.target.id)
      .removeEventListener('click', getMark);
    checkWinner();
    if (currentPlayer.win) {
      document.getElementById(
        'gameText',
      ).innerHTML = `<div style=color:${currentPlayer.color}>${currentPlayer.name} WINS!</div>`;

      for (const x of document.getElementsByClassName('cell')) {
        x.removeEventListener('click', getMark);
      }
      player1.array = [];
      player2.array = [];
      moves = 0;
    }

    playerSwitch();
    if (!player1.win && !player2.win) {
      document.getElementById(
        'gameText',
      ).innerHTML = `<div style=color:${currentPlayer.color}>It's ${currentPlayer.name} ' s turn</div>`;
    }
    if (moves > 8) {
      document.getElementById('gameText').innerHTML = "It's a DRAW";
      moves = 0;
    }
  };

  for (const x of document.getElementsByClassName('cell')) {
    x.addEventListener('click', getMark);
  }

  const name1 = document.getElementById('player1Name').value;
  const name2 = document.getElementById('player2Name').value;
  const player1 = Player(name1, 'X', '#add8e6');
  const player2 = Player(name2, 'O', '#ffa07a');

  let currentPlayer = player1;
  document.getElementById(
    'gameText',
  ).innerHTML = `<div style=color:${currentPlayer.color}>${currentPlayer.name} goes first</div>`;

  let playerSwitch = () => {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
    moves += 1;
  };
};

document.getElementById('startGame').addEventListener('click', gameFlow);
