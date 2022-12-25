import React, { useEffect, useState } from 'react';

import Node from './Node/Node';
import Header from './../Components/Header/Header';


import './PathfindingVisualizer.css';
import { visualizeDijkastra } from './Algorithms/dijkstra';

var START_NODE_ROW = 10;
var START_NODE_COL = 15;
var FINISH_NODE_ROW = 20;
var FINISH_NODE_COL = 20;

const PathfindingVisualizer = () => {
    const [grid, setGrid] = useState([]);
    const [visualizationStarted, setVisualizationStarted] = useState(false);
    const [mouseIsPressed, setMouseIsPressed] = useState(false);
    
    useEffect(() => {
        setGrid(getInitialGrid())
    }, []);

    const handleMouseDown = (grid, row, col) => {
        if (visualizationStarted) return;

        const newGrid = grid.slice();
        let node = newGrid[row][col];

        if (node.isStart || node.isFinish) return;

        node.isWall = !node.isWall;
        setGrid(newGrid)
        setMouseIsPressed(true);
    }

    const handleMouseEnter = (grid, row, col) => {
        if (visualizationStarted) return;
        if (mouseIsPressed) {
            const newGrid = grid.slice();
            newGrid[row][col].isWall = !newGrid[row][col].isWall;
            setGrid(newGrid)
        }
    }

    const handleMouseUp = () => {
        setMouseIsPressed(false);
    }

    const handleVisualizationStart = (algorithm) => {
        setVisualizationStarted(true);
        if (algorithm === 'DIJKSTRA') {
            visualizeDijkastra(grid, START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW, FINISH_NODE_COL);
        }
    }

    const handleResetGrid = (grid) => {
        setVisualizationStarted(false);
        const testGrid = document.getElementsByClassName("grid")[0].childNodes;

        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[row].length; col++) {
                let domNode = testGrid[row].childNodes[col];
                domNode.classList.remove('node-visited');
                domNode.classList.remove('node-shortest-path');
            }
        }
        setGrid(getInitialGrid())
    }

    return (
        <>

            <Header 
                onMainButtonClick={(algorithm) => handleVisualizationStart(algorithm)}
                resetGrid={() => handleResetGrid(grid, 0, 0)}
                >
            </Header>

            <div className='grid'>
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
        </>
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