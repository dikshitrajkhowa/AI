from collections import deque

from search.set1.utilities import get_neighbors


def bfs(start, target):
    queue = deque([(start, 0)])
    visited = set()

    while queue:
        current, steps = queue.popleft()
        if current == target:
            return steps
        visited.add(tuple(map(tuple, current)))

        for neighbor in get_neighbors(current):
            if tuple(map(tuple, neighbor)) not in visited:
                queue.append((neighbor, steps + 1))

    return -1  # Target not reachable