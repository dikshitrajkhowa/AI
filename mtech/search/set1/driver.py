from search.set1.bfs import bfs
from search.set1.dfs import dfs_iterative
from search.set1.utilities import generate_random_grid, generate_target_grid, print_grid


if __name__ == "__main__":
    target_grid = generate_target_grid()

    random_grid = generate_random_grid()
    
    #print("\nInitial State ")
    #print_grid(random_grid)
    
    #print("\nTarget State")
    #print_grid(target_grid)

    # Initialize variables to store results
    bfs_steps = -1
    dfs_steps = -1
    
    # Number of attempts allowed
    max_attempts = 100

    # Attempt until both algorithms find the target grid
for attempt in range(1, max_attempts + 1):
        print(f"Attempt #{attempt}:")
        print("\nInitial State ")
        random_grid = generate_random_grid()
        
        print("Initial State:")
        print_grid(random_grid)
        
        print("\nTarget State")
        print_grid(target_grid)
        
        # Initialize variables to store results
        bfs_steps = bfs(random_grid, target_grid)
        dfs_steps = dfs_iterative(random_grid, target_grid)

        # Check if both BFS and DFS found the target grid
        if bfs_steps != -1 and dfs_steps != -1:
            # Print the results
            print("\nBFS Steps:", bfs_steps)
            print("DFS Steps:", dfs_steps)

            # Determine which algorithm is better
            if bfs_steps < dfs_steps:
                print("BFS is better: It found the target with fewer steps.")
            elif dfs_steps < bfs_steps:
                print("DFS is better: It found the target with fewer steps.")
            else:
                print("Both BFS and DFS found the target with the same number of steps.")
            
            break  # Exit the loop if target is reached
    
else:
        print("Target not reached within the maximum number of attempts.")