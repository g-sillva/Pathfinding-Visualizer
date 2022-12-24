import React, { useEffect, useState } from 'react'
import { visualizeDijkastra } from './Algorithms/dijkstra';

import Node from './Node/Node';

import './PathfindingVisualizer.css';

var START_NODE_ROW = 10;
var START_NODE_COL = 15;
var FINISH_NODE_ROW = 20;
var FINISH_NODE_COL = 20;

const PathfindingVisualizer = () => {
    const [grid, setGrid] = useState([]);
    const [mouseIsPressed, setMouseIsPressed] = useState(false);
    
    useEffect(() => {
        setGrid(getInitialGrid())
    }, []);

    const handleMouseDown = (grid, row, col) => {
        const newGrid = grid.slice();
        let node = newGrid[row][col];

        if (node.isStart || node.isFinish) return;

        node.isWall = true;
        setGrid(newGrid)
        setMouseIsPressed(true);
    }

    const handleMouseEnter = (grid, row, col) => {
        if (mouseIsPressed) {
            const newGrid = grid.slice();
            newGrid[row][col].isWall = true;
            setGrid(newGrid)
        }
    }

    const handleMouseUp = () => {
        setMouseIsPressed(false);
    }
    

    return (
    <div className='grid'>
        <button onClick=
        {
            () => visualizeDijkastra(grid, START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW, FINISH_NODE_COL)
        }
        >ATIVAR</button>
        {grid.map((row, rowI) => (
            <div key={rowI} className="row">
                {
                    row.map((node, nodeI) => 
                    <Node 
                        key={nodeI}
                        col={node.col}
                        row={node.row}
                        isStart={node.isStart}
                        isFinish={node.isFinish}
                        isWall={node.isWall}
                        onMouseDown={(row, col) => handleMouseDown(grid, row, col)}
                        onMouseEnter={(row, col) => handleMouseEnter(grid, row, col)}
                        onMouseUp={() => handleMouseUp()}
                    ></Node>)
                }
            </div>
        ))}
    </div>
  )
}

const getInitialGrid = () => {
    let numRows = Math.floor(window.innerHeight / 30);
    let numCols = Math.floor(window.innerWidth / 30);
    const grid = []

    for (let row = 0; row < numRows; row++) {
        const currentRow = [];
        for (let col = 0; col < numCols; col++) {
            currentRow.push(createNode(row, col));
        }
        grid.push(currentRow);
    }
    return grid;
}

const createNode = (row, col) => {
    return {
        row,
        col,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null
    }
}

export default PathfindingVisualizer