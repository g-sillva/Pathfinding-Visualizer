function breadthFirst(grid, startNode, finishNode) {
    let visitedNodesInOrder = [];
    let queue = [];
    startNode.isVisited = true;
    visitedNodesInOrder.push(startNode);

    queue.push(startNode);

    while (queue.length > 0) {
        let currentNode = queue.pop();
        let unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);
        
        for (let neighbor of unvisitedNeighbors) {
            if (neighbor.isWall) continue;
            
            neighbor.isVisited = true;
            neighbor.previousNode = currentNode;
            visitedNodesInOrder.push(neighbor);

            if (neighbor === finishNode) return visitedNodesInOrder;
            queue.push(neighbor);
        }
    }
    return visitedNodesInOrder;
}

export const visualizeBreadthFirst = (grid, start_node_row, start_node_col, finish_node_row, finish_node_col) => {
    const startNode = grid[start_node_row][start_node_col];
    const finishNode = grid[finish_node_row][finish_node_col];
    const visitedNodesInOrder = breadthFirst(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateBreadthFirst(visitedNodesInOrder, nodesInShortestPathOrder);
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { row, col } = node;

    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(n => !n.isVisited);
}

function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}

const animateBreadthFirst = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
        if (i === visitedNodesInOrder.length) {
            setTimeout(() => {
                animateShortestPath(nodesInShortestPathOrder);
            }, 10 * i);
            return;
        }
        setTimeout(() => {
            const node = visitedNodesInOrder[i];
            if (node.isStart) {
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-start node-visited';
            } else if (node.isFinish) {
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-finish node-visited';
            } else {
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
            }
        }, 10 * i);
    }
}

const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        if (node.isStart) {
            document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-start node-shortest-path';
        } else if (node.isFinish) {
            document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-finish node-shortest-path';
        } else {
            document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path';
        }
      }, 50 * i);
    }
}