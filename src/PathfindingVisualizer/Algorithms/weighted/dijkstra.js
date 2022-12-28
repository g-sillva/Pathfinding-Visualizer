function dijkstra(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);

    while (unvisitedNodes.length > 0) {
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();

        if (closestNode.isWall) continue;
        if (closestNode.distance == Infinity) return visitedNodesInOrder;

        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);

        if (closestNode === finishNode) return visitedNodesInOrder;
        updateUnvisitedNeighbors(closestNode, grid);
    }
}

function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (let n of unvisitedNeighbors) {
        if (n.isWeight) {
            n.distance = node.distance + 10;
        } else {
            n.distance = node.distance + 1;
        }
        n.previousNode = node;
    }
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

function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function getAllNodes(grid) {
    const nodes = [];
    for (let row of grid)
        for (let node of row)
            nodes.push(node);
    return nodes;
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

export const visualizeDijkastra = (grid, start_node_row, start_node_col, finish_node_row, finish_node_col) => {
    const startNode = grid[start_node_row][start_node_col];
    const finishNode = grid[finish_node_row][finish_node_col];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
}

const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
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