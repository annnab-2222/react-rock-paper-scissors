import { useState, useEffect } from 'react';

const App = () => {
  const [gameState, setGameState] = useState('setup');
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [roundNumber, setRoundNumber] = useState(1);
  const [player1Choice, setPlayer1Choice] = useState(null);
  const [player2Choice, setPlayer2Choice] = useState(null);
  const [result, setResult] = useState(null);

  const choices = ["rock", "paper", "scissors"];
  const choiceEmojis = {
    rock: "🪨",
    paper: "📄",
    scissors: "✂️"
  };

  const startGame = () => {
    const p1Name = player1Name.trim() || "Player 1";
    const p2Name = player2Name.trim() || "Player 2";
    
    setPlayer1Name(p1Name);
    setPlayer2Name(p2Name);
    setGameState("playing");
  };

  const makeChoice = (choice) => {
    if (gameState !== "playing") return;

    if (currentPlayer === 1) {
      setPlayer1Choice(choice);
      setCurrentPlayer(2);
      setGameState("waiting");
      
      // Auto-transition to player 2 after 2 seconds
      setTimeout(() => {
        setGameState("playing");
      }, 2000);
    } else {
      setPlayer2Choice(choice);
      setGameState("results");
    }
  };

  const determineWinner = (choice1, choice2) => {
    if (choice1 === choice2) return "tie";
    
    const winningCombinations = {
      rock: "scissors",
      paper: "rock",
      scissors: "paper"
    };
    
    return winningCombinations[choice1] === choice2 ? "player1" : "player2";
  };

  const nextRound = () => {
    setRoundNumber(prev => prev + 1);
    setPlayer1Choice(null);
    setPlayer2Choice(null);
    setCurrentPlayer(1);
    setGameState("playing");
    setResult(null);
  };

  const resetGame = () => {
    setPlayer1Score(0);
    setPlayer2Score(0);
    setRoundNumber(1);
    setCurrentPlayer(1);
    setPlayer1Choice(null);
    setPlayer2Choice(null);
    setGameState("setup");
    setResult(null);
    setPlayer1Name('');
    setPlayer2Name('');
  };

  // Effect to handle results calculation
  useEffect(() => {
    if (gameState === "results" && player1Choice && player2Choice) {
      const winner = determineWinner(player1Choice, player2Choice);
      
      if (winner === "player1") {
        setPlayer1Score(prev => prev + 1);
      } else if (winner === "player2") {
        setPlayer2Score(prev => prev + 1);
      }
      
      let resultText, resultClass;
      if (winner === "player1") {
        resultText = `🎉 ${player1Name} wins! ${player1Choice} beats ${player2Choice}`;
        resultClass = "win";
      } else if (winner === "player2") {
        resultText = `🎉 ${player2Name} wins! ${player2Choice} beats ${player1Choice}`;
        resultClass = "win";
      } else {
        resultText = `🤝 It's a tie! Both chose ${player1Choice}`;
        resultClass = "tie";
      }
      
      setResult({ text: resultText, class: resultClass });
    }
  }, [gameState, player1Choice, player2Choice, player1Name, player2Name]);

  // Handle Enter key for starting game
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && gameState === 'setup') {
        startGame();
      }
    };
    
    document.addEventListener('keypress', handleKeyPress);
    return () => document.removeEventListener('keypress', handleKeyPress);
  }, [gameState, player1Name, player2Name]);

  const styles = {
    body: {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      fontFamily: "'Arial', sans-serif",
      background: 'linear-gradient(135deg, #ea9966 0%, #118aaf 100%)',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white'
    },
    gameContainer: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      padding: '30px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      textAlign: 'center',
      maxWidth: '800px',
      width: '90%'
    },
    title: {
      fontSize: '2.5em',
      marginBottom: '20px',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
    },
    usernameSetup: {
      background: 'rgba(0, 0, 0, 0.2)',
      borderRadius: '15px',
      padding: '30px',
      margin: '20px 0'
    },
    inputGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      width: '100%',
      maxWidth: '300px',
      margin: '15px auto'
    },
    label: {
      minWidth: '80px',
      textAlign: 'right',
      fontWeight: 'bold'
    },
    input: {
      flex: 1,
      padding: '10px',
      border: 'none',
      borderRadius: '8px',
      background: 'rgba(255, 255, 255, 0.9)',
      color: '#333',
      fontSize: '16px'
    },
    startBtn: {
      background: 'rgba(76, 175, 80, 0.8)',
      border: 'none',
      color: 'white',
      padding: '15px 30px',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '1.2em',
      marginTop: '20px',
      transition: 'all 0.3s ease'
    },
    scoreBoard: {
      display: 'flex',
      justifyContent: 'space-around',
      margin: '20px 0',
      background: 'rgba(0, 0, 0, 0.2)',
      borderRadius: '15px',
      padding: '15px'
    },
    scoreItem: {
      textAlign: 'center'
    },
    playerName: {
      fontSize: '1.2em',
      marginBottom: '5px',
      fontWeight: 'bold'
    },
    scoreNumber: {
      fontSize: '2em',
      fontWeight: 'bold',
      color: '#ffd700'
    },
    roundCounter: {
      fontSize: '1.2em',
      margin: '10px 0',
      color: '#ffd700'
    },
    currentPlayer: {
      background: 'rgba(255, 193, 7, 0.3)',
      border: '2px solid #ffc107',
      borderRadius: '10px',
      padding: '20px',
      margin: '20px 0'
    },
    choices: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      margin: '30px 0',
      flexWrap: 'wrap'
    },
    choiceBtn: {
      background: 'rgba(255, 255, 255, 0.2)',
      border: 'none',
      borderRadius: '50%',
      width: '100px',
      height: '100px',
      fontSize: '2.5em',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    waitingScreen: {
      background: 'rgba(255, 193, 7, 0.2)',
      borderRadius: '15px',
      padding: '30px',
      margin: '20px 0'
    },
    battleArea: {
      background: 'rgba(0, 0, 0, 0.2)',
      borderRadius: '15px',
      padding: '20px',
      margin: '20px 0',
      minHeight: '150px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    battleDisplay: {
      display: 'flex',
      alignItems: 'center',
      gap: '30px',
      fontSize: '1.2em'
    },
    playerChoice: {
      textAlign: 'center'
    },
    choiceEmoji: {
      fontSize: '3em',
      margin: '10px 0'
    },
    vs: {
      fontSize: '2em',
      fontWeight: 'bold',
      color: '#ffd700'
    },
    result: {
      margin: '20px 0',
      fontSize: '1.3em',
      fontWeight: 'bold',
      padding: '15px',
      borderRadius: '10px',
      background: 'rgba(255, 255, 255, 0.1)'
    },
    win: {
      background: 'rgba(76, 175, 80, 0.3)',
      color: '#4caf50'
    },
    tie: {
      background: 'rgba(255, 193, 7, 0.3)',
      color: '#ffc107'
    },
    gameBtn: {
      background: 'rgba(33, 150, 243, 0.8)',
      border: 'none',
      color: 'white',
      padding: '12px 25px',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '1em',
      margin: '10px',
      transition: 'all 0.3s ease'
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.gameContainer}>
        {gameState === 'setup' && (
          <div>
            <h1 style={styles.title}>🎮 Rock Paper Scissors</h1>
            <h2>Two Player Mode</h2>
            
            <div style={styles.usernameSetup}>
              <h3>Enter Player Names</h3>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Player 1:</label>
                <input
                  type="text"
                  value={player1Name}
                  onChange={(e) => setPlayer1Name(e.target.value)}
                  placeholder="Enter name"
                  maxLength="15"
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Player 2:</label>
                <input
                  type="text"
                  value={player2Name}
                  onChange={(e) => setPlayer2Name(e.target.value)}
                  placeholder="Enter name"
                  maxLength="15"
                  style={styles.input}
                />
              </div>
              <button 
                onClick={startGame}
                style={styles.startBtn}
                onMouseOver={(e) => {
                  e.target.style.background = 'rgba(76, 175, 80, 1)';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'rgba(76, 175, 80, 0.8)';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                Start Game
              </button>
            </div>
          </div>
        )}

        {gameState !== 'setup' && (
          <div>
            <h1 style={styles.title}>🎮 Rock Paper Scissors</h1>
            
            <div style={styles.scoreBoard}>
              <div style={styles.scoreItem}>
                <div style={styles.playerName}>{player1Name}</div>
                <div style={styles.scoreNumber}>{player1Score}</div>
              </div>
              <div style={styles.scoreItem}>
                <div style={styles.roundCounter}>Round {roundNumber}</div>
              </div>
              <div style={styles.scoreItem}>
                <div style={styles.playerName}>{player2Name}</div>
                <div style={styles.scoreNumber}>{player2Score}</div>
              </div>
            </div>

            {gameState === 'waiting' && (
              <div style={styles.waitingScreen}>
                <h3>{player2Name}, it's your turn!</h3>
                <p>{player1Name} has made their choice. Choose your weapon!</p>
              </div>
            )}

            {(gameState === 'playing' || gameState === 'waiting') && (
              <div>
                <div style={styles.currentPlayer}>
                  <h3>{gameState === 'playing' ? (currentPlayer === 1 ? player1Name : player2Name) : player2Name}</h3>
                  <p>Choose your weapon!</p>
                </div>

                <div style={styles.choices}>
                  {choices.map((choice) => (
                    <button
                      key={choice}
                      onClick={() => makeChoice(choice)}
                      style={styles.choiceBtn}
                      title={choice.charAt(0).toUpperCase() + choice.slice(1)}
                      onMouseOver={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                        e.target.style.transform = 'scale(1.1)';
                        e.target.style.boxShadow = '0 4px 20px rgba(255, 255, 255, 0.3)';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      {choiceEmojis[choice]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div style={styles.battleArea}>
              {gameState === 'results' && player1Choice && player2Choice ? (
                <div style={styles.battleDisplay}>
                  <div style={styles.playerChoice}>
                    <div>{player1Name}</div>
                    <div style={styles.choiceEmoji}>{choiceEmojis[player1Choice]}</div>
                    <div>{player1Choice}</div>
                  </div>
                  <div style={styles.vs}>VS</div>
                  <div style={styles.playerChoice}>
                    <div>{player2Name}</div>
                    <div style={styles.choiceEmoji}>{choiceEmojis[player2Choice]}</div>
                    <div>{player2Choice}</div>
                  </div>
                </div>
              ) : (
                <p>{gameState === 'results' ? 'Battle in progress...' : 'Choose your weapons!'}</p>
              )}
            </div>

            {result && (
              <div style={{...styles.result, ...styles[result.class]}}>
                {result.text}
              </div>
            )}

            {gameState === 'results' && (
              <div>
                <button 
                  onClick={nextRound}
                  style={styles.gameBtn}
                  onMouseOver={(e) => {
                    e.target.style.background = 'rgba(33, 150, 243, 1)';
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'rgba(33, 150, 243, 0.8)';
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  Next Round
                </button>
                <button 
                  onClick={resetGame}
                  style={styles.gameBtn}
                  onMouseOver={(e) => {
                    e.target.style.background = 'rgba(33, 150, 243, 1)';
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'rgba(33, 150, 243, 0.8)';
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  New Game
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;