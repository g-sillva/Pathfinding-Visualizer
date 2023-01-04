import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import Dropdown from './Dropdown/Dropdown';

import './Header.css';

const Header = ({ 
    onMainButtonClick,
    onResetGrid,
    onSelectInsert,
    onSelectAlgorithm,
    onSelectPattern,
    onClickClear,
    onClickInfo 
  }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [mainButtonClicked, setMainButtonClicked] = useState(false);

  const [algorithmDropDown, setAlgorithmDropDown] = useState({
    isDropDownOpen: false,
    isDescOpen: false,
    selected: 'DIJKSTRA',
    weightedOptions: ['DIJKSTRA', 'A-STAR (A*)', 'BEST FIRST SEARCH'],
    unweightedOptions: ['DEPTH FIRST SEARCH', 'BREADTH FIRST SEARCH'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut accusamus itaque quibusdam iure. Repellendus aliquid, voluptas non vero ipsam explicabo.'
  });

  const [patternDropDown, setPatternDropDown] = useState({
    isDropDownOpen: false,
    isDescOpen: false,
    selected: 'NONE',
    weightedOptions: ['RANDOM WEIGHTED MAZE', 'RECURSIVE WEIGHTED DIVISION'],
    unweightedOptions: ['NONE', 'RECURSIVE DIVISION', 'RANDOM WALL MAZE'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut accusamus itaque quibusdam iure. Repellendus aliquid, voluptas non vero ipsam explicabo.'
  });

  const [insertDropDown, setInsertDropDown] = useState({
    isDropDownOpen: false,
    isDescOpen: false,
    selected: 'WALL',
    insertOptions: ['WALL', 'WEIGHT', 'START', 'FINISH'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut accusamus itaque quibusdam iure. Repellendus aliquid, voluptas non vero ipsam explicabo.'
  });

  const handleMainButtonClick = () => {
    if (!mainButtonClicked) {
      onMainButtonClick(algorithmDropDown.selected);
    } else {
      onResetGrid();
    }
    setMainButtonClicked(!mainButtonClicked)
  }

  const handleClearClick = () => {
    setMainButtonClicked(false);

    setPatternDropDown({...patternDropDown, selected: patternDropDown.unweightedOptions[0], isDropDownOpen: false});
    setAlgorithmDropDown({...algorithmDropDown, isDropDownOpen: false});
    setInsertDropDown({...insertDropDown, isDropDownOpen: false});

    onClickClear();
  }

  const handleAlgorithmSelection = (val) => {
    setAlgorithmDropDown({...algorithmDropDown, selected: val, isDropDownOpen: false});
    setInsertDropDown({...insertDropDown, selected: insertDropDown.insertOptions[0], isDropDownOpen: false});
    setPatternDropDown({...patternDropDown, isDropDownOpen: false});

    setMainButtonClicked(false);

    if (!algorithmDropDown.weightedOptions.includes(val) &&
        patternDropDown.weightedOptions.includes(patternDropDown.selected)) {
        handleClearClick();
    }

    onSelectAlgorithm(algorithmDropDown.unweightedOptions, val);
    onSelectInsert('WALL');
  }

  const handlePatternSelection = (val) => {
    if (patternDropDown.weightedOptions.includes(val) &&
        !algorithmDropDown.weightedOptions.includes(algorithmDropDown.selected)) {
          setAlgorithmDropDown({...algorithmDropDown, selected: algorithmDropDown.weightedOptions[0], isDropDownOpen: false});
    }

    setPatternDropDown({...patternDropDown, selected: val, isDropDownOpen: false});
    setInsertDropDown({...insertDropDown, isDropDownOpen: false});

    onClickClear();
    setMainButtonClicked(false);
    onSelectPattern(val);
  }

  const handleInsertSelection = (val) => {
    if (algorithmDropDown.unweightedOptions.includes(algorithmDropDown.selected) && val === 'WEIGHT') return;
    setAlgorithmDropDown({...algorithmDropDown, isDropDownOpen: false});
    setInsertDropDown({...insertDropDown, isDropDownOpen: false});
    setPatternDropDown({...patternDropDown, isDropDownOpen: false});
    onSelectInsert(val);
  }

  return (
    <header>
      <div className='header-top'>
        <h1>Pathfinding Visualizer</h1>
        <div className='header-themes-container' onClick={() => setIsDarkTheme(!isDarkTheme)}>
          <p className='themes-label'>Dark</p>
          <span className='themes-circle-container'>
            <span className={`themes-circle ${isDarkTheme ? 'selected-theme-dark' : 'selected-theme-light'}`}></span>
          </span>
          <p className='themes-label'>Light</p>
        </div>
        <i className="fa-regular fa-circle-question" onClick={() => onClickInfo()}></i>
      </div>

      <div className='header-bottom'>
        <div className='header-input-container'>

          <p onClick={() => setAlgorithmDropDown({...algorithmDropDown, isDropDownOpen: !algorithmDropDown.isDropDownOpen})}>ALGORITHM</p>
          {algorithmDropDown.isDropDownOpen && <Modal/>}
          {/* <Dropdown
            name='ALGORITHM'
            weightedOptions={algorithmDropDown.weightedOptions}
            unweightedOptions={algorithmDropDown.unweightedOptions}
            onMouseEnterQuestion={() => setAlgorithmDropDown({...algorithmDropDown, isDescOpen: true})}
            onMouseLeaveQuestion={() => setAlgorithmDropDown({...algorithmDropDown, isDescOpen: false})}
            onDropdownClick={() => setAlgorithmDropDown({...algorithmDropDown, isDropDownOpen: !algorithmDropDown.isDropDownOpen})}
            onSelectOption={(val) => handleAlgorithmSelection(val)}
            isDescOpen={algorithmDropDown.isDescOpen}
            isDropDownOpen={algorithmDropDown.isDropDownOpen}
            description={algorithmDropDown.description}
            selected={algorithmDropDown.selected}
          ></Dropdown> */}

          <Dropdown
            name='PATTERN'
            weightedOptions={patternDropDown.weightedOptions}
            unweightedOptions={patternDropDown.unweightedOptions}
            onMouseEnterQuestion={() => setPatternDropDown({...patternDropDown, isDescOpen: true})}
            onMouseLeaveQuestion={() => setPatternDropDown({...patternDropDown, isDescOpen: false})}
            onDropdownClick={() => setPatternDropDown({...patternDropDown, isDropDownOpen: !patternDropDown.isDropDownOpen})}
            onSelectOption={(val) => handlePatternSelection(val)}
            isDescOpen={patternDropDown.isDescOpen}
            isDropDownOpen={patternDropDown.isDropDownOpen}
            description={patternDropDown.description}
            selected={patternDropDown.selected}
          ></Dropdown>

          <div className='header-action-btn' onClick={() => handleMainButtonClick()}>
              <p>{mainButtonClicked ? 'RESTART' : 'START'}</p>
              <i className={`fa-solid ${mainButtonClicked ? 'fa-rotate-left' : 'fa-play'}`}></i>
          </div>

          <Dropdown
            dropdwon_id='insert_dropdown'
            name='INSERT ON CLICK'
            dropDownOptions={insertDropDown.insertOptions}
            onMouseEnterQuestion={() => setInsertDropDown({...insertDropDown, isDescOpen: true})}
            onMouseLeaveQuestion={() => setInsertDropDown({...insertDropDown, isDescOpen: false})}
            onDropdownClick={() => setInsertDropDown({...insertDropDown, isDropDownOpen: !insertDropDown.isDropDownOpen})}
            onSelectOption={(val) => handleInsertSelection(val)}
            isDescOpen={insertDropDown.isDescOpen}
            isDropDownOpen={insertDropDown.isDropDownOpen}
            description={insertDropDown.description}
            selected={insertDropDown.selected}
            isWeightDeactivate={algorithmDropDown.unweightedOptions.includes(algorithmDropDown.selected)}
          ></Dropdown>

          <div className='header-dropdown-clear'>
            <p onClick={() => handleClearClick()}>CLEAR</p>
          </div>

        </div>
      </div>
    </header>
  )
}

export default Header