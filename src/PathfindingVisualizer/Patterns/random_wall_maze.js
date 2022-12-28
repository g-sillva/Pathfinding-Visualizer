export const visualizeRandomWallMaze = (grid) => {
    const wallNodes = generateRandomWallMaze(grid);
    animateGeneration(wallNodes);
    return grid;
}

const generateRandomWallMaze = (grid) => {
    let wallNodes = []
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            let currentNode = grid[row][col];
            if (currentNode.isStart || currentNode.isFinish) continue;

            if (Math.random() > 0.8) {
                currentNode.isWall = true;
                wallNodes.push(currentNode);
            }
        }
    }
    return wallNodes;
}

const animateGeneration = (wallNodes) => {
    for (let i = 0; i < wallNodes.length; i++) {
        setTimeout(() => {
            const node = wallNodes[i];
            document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-wall';
        }, 10 * i);
    }

}