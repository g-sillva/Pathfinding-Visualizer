import React from 'react';

import './Node.css';

const Node = (
  { 
    isStart,
    isFinish,
    isWall,
    col,
    row,
    onMouseDown,
    onMouseEnter,
    onMouseUp
  }) => {
  const nodeClassName = isStart ? 'node-start' : isFinish ? 'node-finish' : isWall ? 'node-wall' : '';

  return (
    <div 
      id={`node-${row}-${col}`}
      className={`node ${nodeClassName}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
    ></div>
  )
}
export default Node