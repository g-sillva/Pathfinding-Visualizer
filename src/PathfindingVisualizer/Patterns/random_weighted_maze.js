export const visualizeRandomWeightedMaze = (grid) => {
    const weightedNodes = generateRandomWeightedMaze(grid);
    animateGeneration(weightedNodes);
    return grid;
}

const generateRandomWeightedMaze = (grid) => {
    let weightedNodes = []
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            let currentNode = grid[row][col];
            if (currentNode.isStart || currentNode.isFinish) continue;

            if (Math.random() > 0.8) {
                currentNode.isWeight = true;
                weightedNodes.push(currentNode);
            }
        }
    }
    return weightedNodes;
}

const animateGeneration = (weightedNodes) => {
    for (let i = 0; i < weightedNodes.length; i++) {
        setTimeout(() => {
            const node = weightedNodes[i];
            document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-weight';
        }, 10 * i);
    }

}