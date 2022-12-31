function bestFirstSearch(grid, startNode, finishNode) {
    let visitedNodesInOrder = [];
    startNode.isVisited = true;
    let queue = [startNode];

    while (queue.length > 0) {
        let currentNode = getNodeWithMinDist(queue);
        queue = queue.filter(x => x !== currentNode);

        currentNode.isVisited = true;
        visitedNodesInOrder.push(currentNode);

        if (currentNode === finishNode) return visitedNodesInOrder;

        updateUnvisitedNeighbors(currentNode, finishNode, grid, queue);
    }
    return [];
}

function updateUnvisitedNeighbors(node, finishNode, grid, queue) {
    for (let n of getUnvisitedNeighbors(node, grid)) {
        if (n.isWall) continue;

        if (n.isWeight) {
            n.f += 10;
        } else {
            n.f += 1;
        }
        n.isVisited = true;
        n.previousNode = node;
        n.f += getHeuristicDistance(n, finishNode);
        queue.push(n);
    }
}

// Manhattam distance
function getHeuristicDistance(startNode, finishNode) {
    let d1 = Math.abs(finishNode.col - startNode.col);
    let d2 = Math.abs(finishNode.row - startNode.row);
  
    return d1 + d2;
}

function getNodeWithMinDist(nodes) {
    let lowestIndex = 0;
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].f < nodes[lowestIndex].f) lowestIndex = i;
    }

    return nodes[lowestIndex];
}

export const visualizeBestFirstSearch = (grid, start_node_row, start_node_col, finish_node_row, finish_node_col) => {
    const startNode = grid[start_node_row][start_node_col];
    const finishNode = grid[finish_node_row][finish_node_col];
    const visitedNodesInOrder = bestFirstSearch(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateBestFirstSearch(visitedNodesInOrder, nodesInShortestPathOrder);
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

const animateBestFirstSearch = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    if (visitedNodesInOrder.length === 0) return;
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
            } else if (node.isWeight) {
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-weight node-visited';
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
        } else if (node.isWeight) {
            document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-weight node-shortest-path';
        } else {
            document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path';
        }
      }, 50 * i);
    }
}