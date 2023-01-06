# Pathfinding Visualizer
This is a website whose purpose is to show the operation of some algorithms that find the way between two points. You can access it through this link: <a href='https://bit.ly/3imf0dW' target='_blank'>https://bit.ly/3imf0dW</a>

![chrome_f1sYtvUmG0](https://user-images.githubusercontent.com/111749181/210976055-72f6c3d9-510e-4e03-9488-ed447f78a17d.gif)

## Algorithms

### Weighted
- Dijkstra's: A basic algorithm that explores all neighbors cells taking their weights into account, ensuring the shorthest path.
- A-STRAR (A*): A more sofisticated algorithm that chooses the next cell to explorer basead on the heuristic distance and cost. It guarantees the shorthest path.
- Best First Search: This algorithm is a simpler and greedier version than the A-STAR (A*), it does not gaurantees the shortest path.

### Unweighted
- Breadth First Search (BFS): Just like Dijkstra's, it's an algorithm that explores all neighbors cells, not taking into the account the weight, ensuring the shorthest path.
- Depth First Search (DFS): A algorithm that explores the cells as far as possible before backtracking, not ensuring the shorthest path.
