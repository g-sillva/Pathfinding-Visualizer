import React from 'react';

import './Node.css';

const Node = (
  { 
    isStart,
    isFinish,
    isWall,
    isWeight,
    col,
    row,
    onMouseDown,
    onMouseEnter,
    onMouseUp
  }) => {
  const nodeClassName = 
    isStart ?
    'node-start' :
    isFinish ?
    'node-finish' :
    isWall ?
    'node-wall' :
    isWeight ?
    'node-weight' :
    '';

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