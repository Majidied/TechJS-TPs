# Rock Paper Scissors Game - JavaScript Functions TP

## Project Overview
This is a Rock Paper Scissors game implementation as part of a JavaScript Functions practical work (TP). The game features an interactive web interface where players can compete against a computer opponent using either mouse clicks or keyboard shortcuts.

## Files Structure
```
functions/
├── functions2-r-s-p.html    # HTML structure for the game
├── functions2-r-s-p.js      # Main JavaScript logic (this TP)
├── style.css               # Styling for the game interface
├── images/                 # Game assets folder
│   ├── paper-emoji.png
│   ├── rock-emoji.png
│   └── scissors-emoji.png
└── README.md              # This documentation
```

## Implemented Tasks (TP Requirements)

### Task 1: Game Result Calculation
**Implementation:**
- Implemented complete Rock Paper Scissors logic
- Handles all 9 possible game combinations:
  - **Rock vs Rock** → Tie
  - **Rock vs Paper** → Lose  
  - **Rock vs Scissors** → Win
  - **Paper vs Rock** → Win
  - **Paper vs Paper** → Tie
  - **Paper vs Scissors** → Lose
  - **Scissors vs Rock** → Lose
  - **Scissors vs Paper** → Win
  - **Scissors vs Scissors** → Tie

### Task 2: Score Management and Local Storage
**Implementation:**
- Score tracking system with three counters: wins, losses, ties
- Automatic score updates based on game results
- Persistent storage using `localStorage.setItem()`
- Score retrieval and initialization from localStorage on page load
- JSON serialization for complex data storage

```javascript
// Score updates
if (result === 'win.') {
  score.wins += 1;
} else if (result === 'lose.') {
  score.losses += 1;
} else if (result === 'Tie.') {
  score.ties += 1;
}

// localStorage persistence
localStorage.setItem('score', JSON.stringify(score));
```

### Task 3: Dynamic UI Updates

**Implementation:**
- **Score Display**: Dynamic score updates in the interface
- **Result Display**: Shows win/lose/tie status after each game
- **Move Visualization**: Displays both player and computer moves with emoji images
- **DOM Manipulation**: Uses `document.querySelector()` for all UI updates

```javascript
// Score display update
document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;

// Result display
document.querySelector('.js-result')
  .innerHTML = result;

// Move images display
document.querySelector('.js-moves')
  .innerHTML = `You
    <img src="images/${playerMove}-emoji.png" class="move-icon">
    <img src="images/${computerMove}-emoji.png" class="move-icon">
    Computer`;
```

### Task 4: Keyboard Event Listener Implementation

**Implementation:**
- Added a `keydown` event listener to the document body
- Mapped keyboard keys to game moves:
  - `r` key → Rock
  - `p` key → Paper  
  - `s` key → Scissors
- Each key press triggers the `playGame()` function with the corresponding move

```javascript
document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  }
});
```

## Key Features Implemented

### 1. **Interactive Controls**
- Click-based gameplay using buttons
- Keyboard shortcuts for quick play
- Responsive user interface

### 2. **Game Logic**
- Random computer move generation
- Fair 1/3 probability distribution for each move
- Accurate win/lose/tie determination

### 3. **Data Persistence**
- Automatic score saving to browser's localStorage
- Score restoration on page reload
- Handles missing/corrupted data gracefully

### 4. **Visual Feedback**
- Real-time score updates
- Game result notifications
- Visual representation of moves with emoji images

## Technical Implementation Details

### Event Handling
- Uses modern ES6 arrow functions for event listeners
- Efficient event delegation and key mapping
- Prevents multiple event listener registration

### Data Management
- JSON serialization for localStorage operations
- Fallback initialization for new users
- Structured score object with clear properties

### DOM Manipulation
- Strategic use of `document.querySelector()` for targeted updates
- Template literals for dynamic HTML generation
- Separation of concerns between logic and presentation

### Random Number Generation
- `Math.random()` for computer move selection
- Equal probability distribution (33.33% each move)
- Reliable random seed generation

## How to Play
1. **Using Mouse**: Click on Rock, Paper, or Scissors buttons
2. **Using Keyboard**: Press `R` for Rock, `P` for Paper, or `S` for Scissors  
3. **View Results**: Check the score display and move visualization
4. **Persistent Scores**: Your wins/losses/ties are automatically saved

## Game Rules
- **Rock** beats **Scissors**
- **Scissors** beats **Paper**  
- **Paper** beats **Rock**
- Same moves result in a **Tie**

---
*This TP demonstrates practical JavaScript skills including event handling, DOM manipulation, data persistence, and game logic implementation.*
