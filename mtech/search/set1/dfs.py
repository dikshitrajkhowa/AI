from search.set1.utilities import get_neighbors


def dfs_iterative(start, target):
    stack = [(start, 0)]
    visited = set()

    while stack:
        current, steps = stack.pop()
        if current == target:
            return steps
        visited.add(tuple(map(tuple, current)))

        for neighbor in get_neighbors(current):
            if tuple(map(tuple, neighbor)) not in visited:
                stack.append((neighbor, steps + 1))

    return -1  # Target not reachable