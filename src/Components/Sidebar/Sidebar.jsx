import React, { useState } from 'react';
import Dropdown from './Dropdown/Dropdown';

import './Sidebar.css';

const algorithmDropdownContent = {
  name: 'Algorithm',
  selected: 'DIJKSTRA\'S',
  icon_name: 'fa-minimize',
  weighted_options: ['DIJKSTRA\'S', 'A-STAR (A*)', 'BEST FIRST SEARCH'],
  unweighted_options: ['BREADTH FIRST SEARCH', 'DEPTH FIRST SEARCH'],
  qnt_options: 5
}

const patternDropdownContent = {
  name: 'Pattern',
  selected: 'NONE',
  icon_name: 'fa-shekel-sign',
  weighted_options: ['RECURSIVE WEIGHTED DIVISION', 'RANDOM WEIGHTED'],
  unweighted_options: ['NONE', 'RECURSIVE DIVISION', 'RANDOM WALL'],
  qnt_options: 6
}

const insertDropdownContent = {
  name: 'Insert on Click',
  selected: 'WALL',
  icon_name: 'fa-arrow-pointer',
  generalOptions: ['WALL', 'WEIGHT', 'START', 'FINISH'],
  qnt_options: 4
}

const clearDropdownContent = {
  name: 'Clear',
  selected: '',
  icon_name: 'fa-trash-can',
  generalOptions: ['ALL', 'WALLS', 'WEIGHTS'],
  qnt_options: 4
}

const Sidebar = ({ onStartClick, onSelectPattern, onSelectClear, onSelectInsert, grid, isAnimationRunning }) => {
  const [algorithmDropdownData, setAlgorithmDropdownData] = useState(algorithmDropdownContent);
  const [patternDropdownData, setPatternDropdownData] = useState(patternDropdownContent);
  const [insertDropdownData, setInsertDropdownData] = useState(insertDropdownContent);
  const [clearDropdownData, setClearDropdownData] = useState(clearDropdownContent);

  const [isOpen, setIsOpen] = useState(true);
  const [isStarted, setIsStarted] = useState(false); 

  const handleOnSelectAlgoClick = (val) => {
    setAlgorithmDropdownData({...algorithmDropdownData, selected: val});
    handleWeightedAndUnweightedConflic(val);
  }

  const handleOnSelectPatternClick = (val) => {
    if (isAnimationRunning) return;
    setPatternDropdownData({...patternDropdownData, selected: val});
    onSelectPattern(val);
    setIsOpen(false);
  }

  const handleStartClick = () => {
    onStartClick(algorithmDropdownData.selected);
    setIsStarted(!isStarted);
    setIsOpen(false);
  }

  const handleClearClick = (val) => {
    handleInsertClick('WALL');
    onSelectClear(val);
    setPatternDropdownData({...patternDropdownContent, selected: 'NONE'})
    setIsStarted(false);
  }

  const handleInsertClick = (val) => {
    setInsertDropdownData({...insertDropdownData, selected: val})
    onSelectInsert(val);
  }

  const handleWeightedAndUnweightedConflic = (val) => {
    if (gridContainsWeight(grid) && algorithmDropdownData.unweighted_options.includes(val)) {
          handleClearClick("ALL");
        } 
  }

  const gridContainsWeight = (grid) => {
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col].isWeight) return true;
        }
    }
    return false;
}

  return (
    <div className={`sidebar ${!isOpen && 'sidebar-close'}`}>
      <i className="fa-solid fa-left-right" onClick={() => setIsOpen(!isOpen)}></i>
      {isOpen && <h3>Pathfinding Visualizer</h3>}
      <div className={`sidebar-header ${!isOpen && 'header-small'}`}>
        <i className={`fa-solid ${isStarted ? 'fa-rotate-left' : 'fa-play'} startIcon`} onClick={() => handleStartClick()}></i>
      </div>
      <div className='sidebar__dropdowns'>
        <div className={`sidebar-dropdowns-container ${!isOpen && 'dropdowns-container-small'}`}>
          <Dropdown 
            name={algorithmDropdownData.name}
            selected={algorithmDropdownData.selected}
            icon_name={algorithmDropdownData.icon_name}
            weighted_options={algorithmDropdownData.weighted_options}
            unweighted_options={algorithmDropdownData.unweighted_options}
            handleSelectClick={(val) => handleOnSelectAlgoClick(val)}
            qntOptions={algorithmDropdownContent.qnt_options}
            isExpanded={isOpen}
            onBtnClick={() => setIsOpen(true)}
          />
          <Dropdown 
            name={patternDropdownData.name}
            selected={patternDropdownData.selected}
            icon_name={patternDropdownData.icon_name}
            weighted_options={patternDropdownData.weighted_options}
            unweighted_options={patternDropdownData.unweighted_options}
            handleSelectClick={(val) => handleOnSelectPatternClick(val)}
            qntOptions={patternDropdownContent.qnt_options}
            isExpanded={isOpen}
            onBtnClick={() => setIsOpen(true)}
          />
          <Dropdown 
            name={insertDropdownData.name}
            selected={insertDropdownData.selected}
            icon_name={insertDropdownData.icon_name}
            generalOptions={insertDropdownData.generalOptions}
            handleSelectClick={(val) => handleInsertClick(val)}
            qntOptions={insertDropdownContent.qnt_options}
            isExpanded={isOpen}
            onBtnClick={() => setIsOpen(true)}
            deactivateItem={algorithmDropdownData.unweighted_options.includes(algorithmDropdownData.selected)}
          />
          <Dropdown 
            name={clearDropdownData.name}
            selected={clearDropdownData.selected}
            icon_name={clearDropdownData.icon_name}
            generalOptions={clearDropdownData.generalOptions}
            handleSelectClick={(val) => handleClearClick(val)}
            qntOptions={clearDropdownData.qnt_options}
            isExpanded={isOpen}
            onBtnClick={() => setIsOpen(true)}
          />
        </div>
      </div>
      <div className={`sidebar-footer ${!isOpen && 'footer-small'}`}>
        <a href="https://github.com/g-sillva" target="_blank"><i className="fa-brands fa-github"></i></a>
        {isOpen && <i className="fa-solid fa-moon"></i>}
      </div>
    </div>
  )
}

export default Sidebar