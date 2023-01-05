import React, { useState } from 'react';
import Dropdown from './Dropdown/Dropdown';

import './Sidebar.css';

const algorithmDropdownContent = {
  name: 'Algorithm',
  selected: 'DIJKSTRA\'S',
  img_name: 'algo-dropdown-icon.png',
  weighted_options: ['DIJKSTRA\'S', 'A-STAR (A*)', 'BEST FIRST SEARCH'],
  unweighted_options: ['BREADTH FIRST SEARCH', 'DEPTH FIRST SEARCH'],
  qnt_options: 5
}

const patternDropdownContent = {
  name: 'Pattern',
  selected: 'NONE',
  img_name: 'pattern-dropdown-icon.png',
  weighted_options: ['RECURSIVE WEIGHTED DIVISION', 'RANDOM WEIGHTED'],
  unweighted_options: ['NONE', 'RECURSIVE DIVISION', 'RANDOM WALL'],
  qnt_options: 6
}

const insertDropdownContent = {
  name: 'Insert on Click',
  selected: 'WALL',
  img_name: 'insert-dropdown-icon.png',
  generalOptions: ['WALL', 'WEIGTH', 'INSERT', 'FINISH'],
  qnt_options: 4
}

const clearDropdownContent = {
  name: 'Clear',
  selected: 'ALL',
  img_name: 'clear-dropdown-icon.png',
  generalOptions: ['ALL', 'PATHS', 'WALLS', 'WEIGHTS'],
  qnt_options: 4
}

const Sidebar = () => {
  const [algorithmDropdownData, setAlgorithmDropdownData] = useState(algorithmDropdownContent);
  const [patternDropdownData, setPatternDropdownData] = useState(patternDropdownContent);
  const [insertDropdownData, setInsertDropdownData] = useState(insertDropdownContent);
  const [clearDropdownData, setClearDropdownData] = useState(clearDropdownContent);

  const [isOpen, setIsOpen] = useState(false);

  const handleOnSelectAlgoClick = (val) => {
    setAlgorithmDropdownData({...algorithmDropdownData, selected: val})
  }

  const handleOnSelectPatternClick = (val) => {
    setPatternDropdownData({...patternDropdownData, selected: val})
  }

  const handleOnSelectInsertClick = (val) => {
    setInsertDropdownData({...insertDropdownData, selected: val})
  }

  const handleOnSelectClearClick = (val) => {
    setClearDropdownData({...clearDropdownData, selected: val})
  }

  return (
    <div className={`sidebar ${!isOpen && 'sidebar-close'}`}>
      {isOpen && <h3>Pathfinding Visualizer</h3>}
      <i className={`fa-sharp fa-solid fa-angle-${isOpen ? 'left' : 'right'} switch-size-icon`} onClick={() => setIsOpen(!isOpen)}></i>
      <div className={`sidebar-header ${!isOpen && 'header-small'}`}>
        <i className="fa-sharp fa-solid fa-play"></i>
      </div>
      <div className='sidebar__dropdowns'>
        <div className={`sidebar-dropdowns-container ${!isOpen && 'dropdowns-container-small'}`}>
          <Dropdown 
            name={algorithmDropdownData.name}
            selected={algorithmDropdownData.selected}
            img_name={algorithmDropdownData.img_name}
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
            img_name={patternDropdownData.img_name}
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
            img_name={insertDropdownData.img_name}
            generalOptions={insertDropdownData.generalOptions}
            handleSelectClick={(val) => handleOnSelectInsertClick(val)}
            qntOptions={insertDropdownContent.qnt_options}
            isExpanded={isOpen}
            onBtnClick={() => setIsOpen(true)}
          />
          <Dropdown 
            name={clearDropdownData.name}
            selected={clearDropdownData.selected}
            img_name={clearDropdownData.img_name}
            generalOptions={clearDropdownData.generalOptions}
            handleSelectClick={(val) => handleOnSelectClearClick(val)}
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