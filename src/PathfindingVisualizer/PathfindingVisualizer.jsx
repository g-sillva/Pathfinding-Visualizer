import React, { useEffect, useState } from 'react';

import Node from './Node/Node';
import Header from './../Components/Header/Header';
import Sidebar from './../Components/Sidebar/Sidebar';

import './PathfindingVisualizer.css';
import { visualizeDijkastra } from './Algorithms/weighted/dijkstra';
import { visualizeAStar } from './Algorithms/weighted/astar';
import { visualizeBestFirstSearch } from './Algorithms/weighted/best_first_search';
import { visualizeDepthFirstSearch } from './Algorithms/unweighted/depth_first_search';
import { visualizeBreadthFirstSearch } from './Algorithms/unweighted/breadth_first_search';

import { visualizeRandomWallMaze } from './Algorithms/Patterns/random_wall_maze';
import { visualizeRandomWeightedMaze } from './Algorithms/Patterns/random_weighted_maze';
import { visualizeRecursiveDivision } from './Algorithms/Patterns/recursive_division_wall_maze';

const PathfindingVisualizer = () => {
    const [grid, setGrid] = useState([]);
    const [isVisualizationRunning, setIsVisualizationRunning] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

        window.addEventListener('mouseup', () => setMouseIsPressed(false));
    }, []);

    const handleMouseDown = (grid, row, col) => {
        if (isVisualizationRunning) return;
        const newGrid = grid.slice();

        let node = newGrid[row][col];
        if (node.isStart || node.isFinish) return;

        if (insertType === 'WALL') {
            node.isWall = !node.isWall;
            node.isWeight = false;
            setMouseIsPressed(true);
        } else if (insertType === 'WEIGHT') {
            node.isWall = false;
            node.isWeight = !node.isWeight;
            setMouseIsPressed(true);
        } else if (insertType === 'START') {
            node.isWall = false;
            node.isWeight = false;
            node.isStart = true;
            newGrid[startNodePos.row][startNodePos.col].isStart = false;
            setStartNodePos({row, col});
        } else if (insertType === 'FINISH') {
            node.isWall = false;
            node.isWeight = false;
            node.isFinish = true;
            newGrid[finishNodePos.row][finishNodePos.col].isFinish = false;
            setFinishNodePos({row, col});
        }

        setGrid(newGrid)
    }

    const handleMouseEnter = (grid, row, col) => {
        if (isVisualizationRunning) return;

        const domGrid = document.getElementsByClassName("grid")[0].childNodes;
        let domNode = domGrid[row].childNodes[col];
        let node = grid[row][col];

        if (mouseIsPressed) {
            if (node.isStart || node.isFinish) return;
            if (insertType === 'WALL') {
                if (domNode.classList.contains('node-wall')) {
                    domNode.classList.remove('node-wall');
                } else {
                    domNode.classList.add('node-wall');
                }
                node.isWall = !node.isWall;
                node.isWeight = false;
            } else if (insertType === 'WEIGHT') {
                if (domNode.classList.contains('node-weight')) {
                    domNode.classList.remove('node-weight');
                } else {
                    domNode.classList.add('node-weight');
                }
                node.isWall = false;
                node.isWeight = !node.isWeight;
            }
        }
    }

    const handleMouseUp = () => {
        setMouseIsPressed(false);
    }

    const handleVisualizationStart = (algorithm) => {
        setIsVisualizationRunning(true);
        if (algorithm === 'DIJKSTRA') {
            visualizeDijkastra(grid, startNodePos.row, startNodePos.col, finishNodePos.row, finishNodePos.col);
        } else if (algorithm === 'A-STAR (A*)') {
            visualizeAStar(grid, startNodePos.row, startNodePos.col, finishNodePos.row, finishNodePos.col);
        } else if (algorithm === 'DEPTH FIRST SEARCH') {
            visualizeDepthFirstSearch(grid, startNodePos.row, startNodePos.col, finishNodePos.row, finishNodePos.col);
        } else if (algorithm === 'BREADTH FIRST SEARCH') {
            visualizeBreadthFirstSearch(grid, startNodePos.row, startNodePos.col, finishNodePos.row, finishNodePos.col);
        } else if (algorithm === 'BEST FIRST SEARCH') {
            visualizeBestFirstSearch(grid, startNodePos.row, startNodePos.col, finishNodePos.row, finishNodePos.col);
        }
    }

    const handleAlgorithmSelect = (grid, unweightedList, name) => {
        if (unweightedList.includes(name) && gridContainsWeight(grid)) {
            handleClearGrid(grid)
        }
    }

    const handlePatternSelect = (name) => {
        if (name === 'RANDOM WALL MAZE') {
            setGrid(visualizeRandomWallMaze(grid));
        } else if (name === 'RANDOM WEIGHTED MAZE') {
            setGrid(visualizeRandomWeightedMaze(grid));
        } else if (name === 'RECURSIVE DIVISION') {
            setGrid(visualizeRecursiveDivision(grid, false));
        } else if (name === 'RECURSIVE WEIGHTED DIVISION') {
            setGrid(visualizeRecursiveDivision(grid, true));
        }
    }

    const handleClearGrid = (grid) => {
        const domGrid = document.getElementsByClassName("grid")[0].childNodes;
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[row].length; col++) {
                removeAllNodeClasses(domGrid, row, col);

                if (grid[row][col]) {
                    grid[row][col].isWall = false;
                    grid[row][col].isWeight = false;
                }
            }
        }
        setGrid(getInitialGrid());
        setIsVisualizationRunning(false);
        clearAnimations();
    }

    const gridContainsWeight = (grid) => {
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[row].length; col++) {
                if (grid[row][col].isWeight) return true;
            }
        }
        return false;
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
        if (domNode) {
            domNode.classList.remove('node-visited');
            domNode.classList.remove('node-shortest-path');
        }
    }

    const removeAllNodeClasses = (domGrid, row, col) => {
        let domNode = domGrid[row].childNodes[col];
        if (domNode) {
            domNode.classList.remove('node-visited');
            domNode.classList.remove('node-shortest-path');
            domNode.classList.remove('node-wall');
            domNode.classList.remove('node-weight');
        }
    }

    const getInitialGrid = () => {
        let numRows = Math.floor((window.innerHeight) / 25);
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
            isWeight: grid.length === 0 ? false : grid[row][col].isWeight,
            f: 0,
            g: 0,
            h: 0,
            previousNode: null
        }
    }

    return (
        <>
            {/* <Header 
                onMainButtonClick={(algorithm) => handleVisualizationStart(algorithm)}
                onResetGrid={() => handleResetGrid(grid, 0, 0)}
                onSelectInsert={(type) => setInsertType(type)}
                onClickClear={() => handleClearGrid(grid)}
                onSelectAlgorithm={(unweightedList, name) => handleAlgorithmSelect(grid, unweightedList, name)}
                onSelectPattern={(name) => handlePatternSelect(name)}
                isAnimationRunning={isVisualizationRunning}
                onClickInfo={() => setIsSidebarOpen(!isSidebarOpen)}
                >
            </Header> */}

            <Sidebar />

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
                                isWeight={node.isWeight}
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