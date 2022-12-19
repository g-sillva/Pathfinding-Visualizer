import React, { useEffect, useState } from 'react'

import Node from './Node/Node';

import './PathfindingVisualizer.css';

const PathfindingVisualizer = () => {
    const [nodes, setNodes] = useState([]);

    let numRows = Math.floor(window.innerHeight / 30);
    let numCols = Math.floor(window.innerWidth / 30);
    
    const nodesTemp = [];
    for (let row = 0; row < numRows; row++) {
        const currentRow = [];
        for (let col = 0; col < numCols; col++) {
            currentRow.push([]);
        }
        nodesTemp.push(currentRow);
    }

    useEffect(() => {
        setNodes(nodesTemp)
    }, [])

    return (
    <div className='grid'>
        {nodes.map((row, rowI) => (
            <div key={rowI} className="row">
                {row.map((node, nodeI) => <Node key={nodeI}></Node>)}
            </div>
        ))}
    </div>
  )
}

export default PathfindingVisualizer