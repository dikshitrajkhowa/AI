import random


def get_neighbors(grid):
    i, j = get_blank_position(grid)
    neighbors = []

    # Up
    if i > 0:
        new_grid = [row[:] for row in grid]
        new_grid[i][j], new_grid[i-1][j] = new_grid[i-1][j], new_grid[i][j]
        neighbors.append(new_grid)

    # Down
    if i < 2:
        new_grid = [row[:] for row in grid]
        new_grid[i][j], new_grid[i+1][j] = new_grid[i+1][j], new_grid[i][j]
        neighbors.append(new_grid)

    # Left
    if j > 0:
        new_grid = [row[:] for row in grid]
        new_grid[i][j], new_grid[i][j-1] = new_grid[i][j-1], new_grid[i][j]
        neighbors.append(new_grid)

    # Right
    if j < 2:
        new_grid = [row[:] for row in grid]
        new_grid[i][j], new_grid[i][j+1] = new_grid[i][j+1], new_grid[i][j]
        neighbors.append(new_grid)

    return neighbors

def get_blank_position(grid):
    for i in range(3):
        for j in range(3):
            if grid[i][j] == 'B':
                return i, j
            
def generate_random_grid():
    numbers = list(range(1, 9))  # Numbers from 1 to 8
    numbers.append('B')  # Blank space
    random.shuffle(numbers)  # Shuffle the numbers
    
    grid = [numbers[i:i+3] for i in range(0, 9, 3)]  # Create 3x3 grid
    return grid

def generate_target_grid():
    grid = [[1, 2, 3],
            [4, 5, 6],
            [7, 8, 'B']]  # Target grid organized from 1 to 8
    return grid

def print_grid(grid):
    for row in grid:
        print(" | ".join(map(str, row)))
        print("-" * 9)