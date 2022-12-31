function aStar(grid, startNode, finishNode) {
    startNode.distance = 0;
    let openList = [startNode];
    let closedList = [];

    while (openList.length > 0) {
        let lowestIndex = 0;

        for (let i = 0; i < openList.length; i++) {
            if (openList[i].f < openList[lowestIndex].f) lowestIndex = i;
        }

        let currentNode = openList[lowestIndex];
        currentNode.isVisited = true;

        if (currentNode.row === finishNode.row && currentNode.col === finishNode.col) {
            return closedList;
        }

        closedList.push(currentNode);
        openList = openList.filter(x => x !== currentNode);

        let neighbors = getUnvisitedNeighbors(currentNode, grid);

        for (let n of neighbors) {
            if (closedList.includes(n) || n.isWall) continue;

            let gScoreBest = false;
            let gScore = currentNode.g;
            gScore += n.isWeight ? 10 : 1;

            if (!openList.includes(n)) {
                gScoreBest = true;
                n.h = getHeuristicDistance(n, finishNode);
                openList.push(n);
            } else if (gScore < n.g) {
                gScoreBest = true;
            }

            if (gScoreBest) {
                n.previousNode = currentNode;
                n.g = gScore;
                n.f = n.g + n.h;
            }
        }
    }
    return [];

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

// Manhattam distance
function getHeuristicDistance(startNode, finishNode) {
    let d1 = Math.abs(finishNode.col - startNode.col);
    let d2 = Math.abs(finishNode.row - startNode.row);
  
    return d1 + d2;
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

export const visualizeAStar = (grid, start_node_row, start_node_col, finish_node_row, finish_node_col) => {
    const startNode = grid[start_node_row][start_node_col];
    const finishNode = grid[finish_node_row][finish_node_col];
    const visitedNodesInOrder = aStar(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateAStar(visitedNodesInOrder, nodesInShortestPathOrder);
}

const animateAStar = (visitedNodesInOrder, nodesInShortestPathOrder) => {
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