export const visualizeRecursiveDivision = (grid, isWeighted) => {
    let wallsToAnimate = [];
    generateRecursiveDivision(grid, 0, grid.length - 2, 1, grid[0].length - 2, "horizontal", wallsToAnimate, isWeighted);
    animateRecursiveDivision(wallsToAnimate);
    return grid;
}

const generateRecursiveDivision = (grid, rowStart, rowEnd, colStart, colEnd, orientation, nodesList, isWeighted) => {
    if (rowEnd < rowStart || colEnd < colStart) return;

    if (orientation === 'horizontal') {
        let possibleRows = [];
        let possibleCols = [];
    
        for (let i = rowStart; i <= rowEnd; i += 2) {
            possibleRows.push(i);
        }
        for (let i = colStart - 1; i <= colEnd + 1; i += 2) {
            possibleCols.push(i);
        }
    
        let randomRowIndx = Math.floor(Math.random() * possibleRows.length);
        let randomColIndx = Math.floor(Math.random() * possibleCols.length);
    
        let currentRow = possibleRows[randomRowIndx];
        let currentCol = possibleCols[randomColIndx];
    
        for (let row of grid) {
            for (let node of row) {
                if (node.row === currentRow && node.col !== currentCol && node.col >= colStart - 1 && node.col <= colEnd + 1) {
    
                    if (node.isStart || node.isFinish) continue;
                    if (isWeighted) node.isWeight = true;
                    else node.isWall = true;
                    nodesList.push(node);
                }
            }
        }
    
        if (currentRow - 2 - rowStart > colEnd - colStart) {
            generateRecursiveDivision(grid, rowStart, currentRow - 2, colStart, colEnd, orientation, nodesList, isWeighted);
        } else {
            generateRecursiveDivision(grid, rowStart, currentRow - 2, colStart, colEnd, "vertical", nodesList, isWeighted);
        }
        if (rowEnd - (currentRow + 2) > colEnd - colStart) {
            generateRecursiveDivision(grid, currentRow + 2, rowEnd, colStart, colEnd, orientation, nodesList, isWeighted);
        } else {
            generateRecursiveDivision(grid, currentRow + 2, rowEnd, colStart, colEnd, "vertical", nodesList, isWeighted);
        }
    } else {
        let possibleRows = [];
        let possibleCols = [];
    
        for (let i = rowStart - 1; i <= rowEnd + 1; i += 2) {
            possibleRows.push(i);
        }
        for (let i = colStart; i <= colEnd + 1; i += 2) {
            possibleCols.push(i);
        }
    
        let randomRowIndx = Math.floor(Math.random() * possibleRows.length);
        let randomColIndx = Math.floor(Math.random() * possibleCols.length);
    
        let currentRow = possibleRows[randomRowIndx];
        let currentCol = possibleCols[randomColIndx];

        for (let row of grid) {
            for (let node of row) {
                if (node.col === currentCol && node.row !== currentRow && node.row >= rowStart - 1 && node.row <= rowEnd + 1) {
                    if (node.isStart || node.isFinish) continue;
                    if (isWeighted) node.isWeight = true;
                    else node.isWall = true;
                    nodesList.push(node);
                }
            }
        }
        if (rowEnd - rowStart > currentCol - 2 - colStart) {
            generateRecursiveDivision(grid, rowStart, rowEnd, colStart, currentCol - 2, "horizontal", nodesList, isWeighted);
        } else {
            generateRecursiveDivision(grid, rowStart, rowEnd, colStart, currentCol - 2, orientation, nodesList, isWeighted);
        }
        if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
            generateRecursiveDivision(grid, rowStart, rowEnd, currentCol + 2, colEnd, "horizontal", nodesList, isWeighted);
        } else {
            generateRecursiveDivision(grid, rowStart, rowEnd, currentCol + 2, colEnd, orientation, nodesList, isWeighted);
        }
    }   
}

const animateRecursiveDivision = (visitedNodesInOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
        setTimeout(() => {
            const node = visitedNodesInOrder[i];
            if (node) {
                if (node.isWall)
                    document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-wall';
                else
                    document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-weight';
            }
        }, 10 * i);
    }
}