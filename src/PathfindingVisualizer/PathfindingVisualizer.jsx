import React, { useEffect, useState } from 'react';

import Node from './Node/Node';
import Header from './../Components/Header/Header';
import Sidebar from './../Components/Sidebar/Sidebar';

import './PathfindingVisualizer.css';
import { visualizeDijkastra } from './Algorithms/weighted/dijkstra';
import { visualizeDepthFirstSearch } from './Algorithms/unweighted/depth_first_search';
import { visualizeBreadthFirstSearch } from './Algorithms/unweighted/breadth_first_search';

const PathfindingVisualizer = () => {
    const [grid, setGrid] = useState([]);
    const [isVisualizationRunning, setIsVisualizationRunning] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [mouseIsPressed, setMouseIsPressed] = useState(false);

    const [startNodePos, setStartNodePos] = useState({});
    const [finishNodePos, setFinishNodePos] = useState({});
    
    const [insertType, setInsertType] = useState('WALL');
    
    useEffect(() => {
        const newGrid = getInitialGrid();

        let numRows = Math.floor((window.innerHeight - 225) / 25);
        let numCols = Math.floor((window.innerWidth - 75) / 25);
        setStartNodePos({row: (numRows / 2) >> 0, col: (numCols / 4) >> 0});
        setFinishNodePos({row: (numRows / 2) >> 0, col: (numCols - (numCols / 4)) >> 0});


        newGrid[(numRows / 2) >> 0][(numCols / 4) >> 0].isStart  = true;
        newGrid[(numRows / 2) >> 0][(numCols - (numCols / 4)) >> 0].isFinish  = true;
        setGrid(newGrid);

        document.addEventListener('mouseup', () => setMouseIsPressed(false))
    }, []);

    const handleMouseDown = (grid, row, col) => {
        if (isVisualizationRunning) return;
        const newGrid = grid.slice();

        let node = newGrid[row][col];
        if (node.isStart || node.isFinish) return;

        if (insertType === 'WALL') {
            node.isWall = !node.isWall;
            setMouseIsPressed(true);
        } else if (insertType === 'START') {
            node.isWall = false;
            node.isStart = true;
            newGrid[startNodePos.row][startNodePos.col].isStart = false;
            setStartNodePos({row, col});
        } else if (insertType === 'FINISH') {
            node.isWall = false;
            node.isFinish = true;
            newGrid[finishNodePos.row][finishNodePos.col].isFinish = false;
            setFinishNodePos({row, col});
        }

        setGrid(newGrid)
    }

    const handleMouseEnter = (grid, row, col) => {
        if (isVisualizationRunning) return;
        if (mouseIsPressed && insertType === 'WALL') {
            const newGrid = grid.slice();
            let node = newGrid[row][col];

            if (node.isStart || node.isFinish) return;
            node.isWall = !node.isWall;
            setGrid(newGrid)
        }
    }

    const handleMouseUp = () => {
        setMouseIsPressed(false);
    }

    const handleVisualizationStart = (algorithm) => {
        setIsVisualizationRunning(true);
        if (algorithm === 'DIJKSTRA') {
            visualizeDijkastra(grid, startNodePos.row, startNodePos.col, finishNodePos.row, finishNodePos.col);
        } else if (algorithm === 'DEPTH FIRST SEARCH') {
            visualizeDepthFirstSearch(grid, startNodePos.row, startNodePos.col, finishNodePos.row, finishNodePos.col);
        } else if (algorithm === 'BREADTH FIRST SEARCH') {
            visualizeBreadthFirstSearch(grid, startNodePos.row, startNodePos.col, finishNodePos.row, finishNodePos.col);
        }
    }

    const handleClearGrid = (grid) => {
        const domGrid = document.getElementsByClassName("grid")[0].childNodes;
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[row].length; col++) {
                removeNodeClass(domGrid, row, col);

                if (grid[row][col].isWall) {
                    grid[row][col].isWall = false;
                }
            }
        }
        setGrid(getInitialGrid());
        setIsVisualizationRunning(false);
        clearAnimations();
    }

    const handleResetGrid = (grid) => {
        const domGrid = document.getElementsByClassName("grid")[0].childNodes;

        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[row].length; col++) {
                removeNodeClass(domGrid, row, col);
            }
        }
        setGrid(getInitialGrid());
        setIsVisualizationRunning(false);
        clearAnimations();
    }

    const clearAnimations = () => {
        let lastTimeoutId = setTimeout(';');
        for (let i = 0; i < lastTimeoutId; i++) {
            clearTimeout(i);
        }
    }

    const removeNodeClass = (domGrid, row, col) => {
        let domNode = domGrid[row].childNodes[col];
        domNode.classList.remove('node-visited');
        domNode.classList.remove('node-shortest-path');
    }

    const getInitialGrid = () => {
        let numRows = Math.floor((window.innerHeight - 225) / 25);
        let numCols = Math.floor((window.innerWidth - 75) / 25);
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
            isStart: row === startNodePos.row && col === startNodePos.col,
            isFinish: row === finishNodePos.row && col === finishNodePos.col,
            distance: Infinity,
            isVisited: false,
            isWall: grid.length === 0 ? false : grid[row][col].isWall,
            previousNode: null
        }
    }

    return (
        <>
            <Header 
                onMainButtonClick={(algorithm) => handleVisualizationStart(algorithm)}
                onResetGrid={() => handleResetGrid(grid, 0, 0)}
                onSelectInsert={(type) => setInsertType(type)}
                onClickClear={() => handleClearGrid(grid)}
                isAnimationRunning={isVisualizationRunning}
                onClickInfo={() => setIsSidebarOpen(!isSidebarOpen)}
                >
            </Header>

            {isSidebarOpen && <Sidebar onCloseClick={() => setIsSidebarOpen(false)}></Sidebar>}

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

export default PathfindingVisualizer