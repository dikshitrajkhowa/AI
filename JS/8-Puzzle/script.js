// Helper function to check if a puzzle configuration is solvable
function isSolvable(numbers) {
    let inversionCount = 0;
    for (let i = 0; i < 8; i++) {
        for (let j = i + 1; j < 8; j++) {
            if (numbers[j] && numbers[i] && numbers[i] > numbers[j]) {
                inversionCount++;
            }
        }
    }
    return inversionCount % 2 === 0;
}


// Function to generate a random permutation of numbers 1-8
function shuffleArray() {
    let array = [1, 2, 3, 4, 5, 6, 7, 8, 0]; // Including 0 for the blank cell
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to create the HTML structure for a puzzle grid
function createPuzzleGrid(numbers, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    numbers.forEach(num => {
        const cell = document.createElement('div');
        cell.textContent = num === 0 ? '' : num; // Use empty string for the blank cell
        container.appendChild(cell);
    });
}

// Function to generate and display initial and target puzzles
function generatePuzzles() {
    const initialNumbers = shuffleArray();
    createPuzzleGrid(initialNumbers, 'initial-state');

    // Set the target grid (always 1 to 8 with a blank cell)
    const targetNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    createPuzzleGrid(targetNumbers, 'target-state');
}


// Function to set the target grid based on selected radio button
function setTargetGrid() {
    const targetType = document.querySelector('input[name="targetType"]:checked').value;

    if (targetType === 'fixed') {
        // Fixed target grid: 1, 2, 3, 4, 5, 6, 7, 8, blank (represented by 0)
        createPuzzleGrid([1, 2, 3, 4, 5, 6, 7, 8, 0], 'target-state');
    } else if (targetType === 'random') {
        // Random target grid (ensure it's solvable)
        let targetNumbers;
        do {
            targetNumbers = shuffleArray();
        } while (!isSolvable(targetNumbers));

        createPuzzleGrid(targetNumbers, 'target-state');
    }
}

// Function to generate and display initial and target puzzles
function generatePuzzles() {
    const initialNumbers = shuffleArray();
    createPuzzleGrid(initialNumbers, 'initial-state');

    // Set the target grid based on selected radio button
    setTargetGrid();
}


// Function to solve the puzzle using Depth-First Search (DFS)
function solveDFS() {
    // Implement DFS solution here
    alert('Solving using DFS');
}

// Function to solve the puzzle using A* algorithm
function solveAStar() {
    // Implement A* algorithm solution here
    alert('Solving using A*');
}


// Function to check if two arrays representing puzzle states are equal
function arraysEqual(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
}

// Function to find the index of the blank (zero) tile in the puzzle state
function findBlankIndex(state) {
    return state.findIndex(num => num === 0);
}

// Function to display a puzzle state on the webpage
function displayState(state, title) {
    const stateContainer = document.createElement('div');
    stateContainer.classList.add('puzzle-grid');

    const stateTitle = document.createElement('h2');
    stateTitle.textContent = title;
    stateContainer.appendChild(stateTitle);

    state.forEach(num => {
        const cell = document.createElement('div');
        cell.textContent = num === 0 ? '' : num;
        stateContainer.appendChild(cell);
    });

    document.getElementById('solution-steps').appendChild(stateContainer);
}

//BFS

function solveBFS() {
    const initialNumbers = Array.from(document.getElementById('initial-state').children).map(cell => parseInt(cell.textContent) || 0);
    const targetNumbers = Array.from(document.getElementById('target-state').children).map(cell => parseInt(cell.textContent) || 0);

    const initialState = {
        state: initialNumbers,
        parent: null,
        move: null
    };

    const queue = [initialState];
    const visited = new Set();
    visited.add(JSON.stringify(initialNumbers));

    while (queue.length > 0) {
        const currentState = queue.shift();

        // Display current state
        displayState(currentState.state, 'Current State');

        if (arraysEqual(currentState.state, targetNumbers)) {
            alert('Puzzle Solved!');
            return reconstructPath(currentState);
        }

        const blankIndex = findBlankIndex(currentState.state);
        const possibleMoves = getPossibleMoves(blankIndex);

        for (const move of possibleMoves) {
            const nextState = getNextState(currentState.state, blankIndex, move);

            if (!visited.has(JSON.stringify(nextState))) {
                visited.add(JSON.stringify(nextState));
                queue.push({
                    state: nextState,
                    parent: currentState,
                    move: move
                });
            }
        }
    }

    alert('No solution found!');
}

// Function to get possible moves (up, down, left, right) for the blank tile
function getPossibleMoves(blankIndex) {
    const possibleMoves = [];

    if (blankIndex >= 3) possibleMoves.push('up'); // Can move up
    if (blankIndex < 6) possibleMoves.push('down'); // Can move down
    if (blankIndex % 3 > 0) possibleMoves.push('left'); // Can move left
    if (blankIndex % 3 < 2) possibleMoves.push('right'); // Can move right

    return possibleMoves;
}

// Function to get the next state by applying a move to the current state
function getNextState(state, blankIndex, move) {
    const nextState = state.slice(); // Create a copy of the current state
    const targetIndex = move === 'up' ? blankIndex - 3 :
                        move === 'down' ? blankIndex + 3 :
                        move === 'left' ? blankIndex - 1 :
                        move === 'right' ? blankIndex + 1 : -1;

    // Swap blank tile with the target tile
    [nextState[blankIndex], nextState[targetIndex]] = [nextState[targetIndex], nextState[blankIndex]];

    return nextState;
}

// Function to reconstruct and display the path to the solution
function reconstructPath(finalState) {
    const path = [];
    let currentState = finalState;

    while (currentState !== null) {
        path.unshift(currentState.state);
        currentState = currentState.parent;
    }

    // Display each state in the path
    path.forEach((state, index) => {
        displayState(state, `Step ${index + 1}`);
    });

    return path;
}

