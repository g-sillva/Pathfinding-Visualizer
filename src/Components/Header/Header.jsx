import React, { useState } from 'react';

import './Header.css';

const Header = ({ 
    onMainButtonClick,
    onResetGrid,
    onSelectInsert,
    onSelectAlgorithm,
    onSelectPattern,
    isAnimationRunning,
    onClickClear,
    onClickInfo 
  }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [mainButtonClicked, setMainButtonClicked] = useState(false);

  const [algorithmDropDown, setAlgorithmDropDown] = useState({
    isDropDownOpen: false,
    isDescOpen: false,
    selected: 'DIJKSTRA',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut accusamus itaque quibusdam iure. Repellendus aliquid, voluptas non vero ipsam explicabo.'
  });

  const [patternDropDown, setPatternDropDown] = useState({
    isDropDownOpen: false,
    isDescOpen: false,
    selected: 'NONE',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut accusamus itaque quibusdam iure. Repellendus aliquid, voluptas non vero ipsam explicabo.'
  });

  const [insertDropDown, setInsertDropDown] = useState({
    isDropDownOpen: false,
    isDescOpen: false,
    selected: 'WALL',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut accusamus itaque quibusdam iure. Repellendus aliquid, voluptas non vero ipsam explicabo.'
  });

  const weightedAlgoDropOptions = ['DIJKSTRA'];
  const unweightedAlgoDropOptions = ['DEPTH FIRST SEARCH', 'BREADTH FIRST SEARCH'];
  const algoDropDownOptions = weightedAlgoDropOptions.concat(unweightedAlgoDropOptions);

  const weightedPatternDropOptions = ['WEIGHTED MAZE'];
  const unweightedPatternDropOptions = ['NONE', 'WALL MAZE'];
  const patternDropDownOptions = unweightedPatternDropOptions.concat(weightedPatternDropOptions);

  const insertDropDownOptions = ['WALL', 'WEIGHT', 'START', 'FINISH'];

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
    setPatternDropDown({...patternDropDown, selected: unweightedPatternDropOptions[0], isDropDownOpen: false});
    onClickClear();
  }

  const handleAlgorithmSelection = (val) => {
    setAlgorithmDropDown({...algorithmDropDown, selected: val, isDropDownOpen: false});
    setInsertDropDown({...insertDropDown, selected: insertDropDownOptions[0], isDropDownOpen: false});
    setMainButtonClicked(false);

    if (!weightedAlgoDropOptions.includes(val) &&
        weightedPatternDropOptions.includes(patternDropDown.selected)) {
        handleClearClick();
    }

    onSelectAlgorithm(unweightedAlgoDropOptions, val);
    onSelectInsert('WALL');
  }

  const handlePatternSelection = (val) => {
    if (weightedPatternDropOptions.includes(val) &&
        !weightedAlgoDropOptions.includes(algorithmDropDown.selected)) {
          setAlgorithmDropDown({...algorithmDropDown, selected: weightedAlgoDropOptions[0], isDropDownOpen: false});
    }

    setPatternDropDown({...patternDropDown, selected: val, isDropDownOpen: false});
    onClickClear();
    setMainButtonClicked(false);
    onSelectPattern(val);
  }

  const handleInsertSelection = (val) => {
    if (unweightedAlgoDropOptions.includes(algorithmDropDown.selected) && val === 'WEIGHT') return;
    setInsertDropDown({...insertDropDown, selected: val, isDropDownOpen: false});
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

          <div className='header-dropdown'>
            <label htmlFor="algorithm">
              ALGORITHM
            <span 
              className='input-question'
              onMouseEnter={() => setAlgorithmDropDown({...algorithmDropDown, isDescOpen: true})}
              onMouseLeave={() => setAlgorithmDropDown({...algorithmDropDown, isDescOpen: false})}
            >?</span>
            </label>

            {algorithmDropDown.isDescOpen && <p className='input-question-description'>{algorithmDropDown.description}</p>}

            <div className='header-dropdown-btn'
                onClick={() => setAlgorithmDropDown({...algorithmDropDown, isDropDownOpen: !algorithmDropDown.isDropDownOpen})}
                >
              {algorithmDropDown.selected}
              <i className={`fa-solid fa-angle-down ${algorithmDropDown.isDropDownOpen && 'dropdown-icon-rotate'}`}
              ></i>
            </div>
            {
            algorithmDropDown.isDropDownOpen && 
              <div className='header-dropdown-content'>
                {algoDropDownOptions.map((val, valIdx) => (
                  <div 
                  className='header-dropdown-item'
                  key={valIdx}
                  onClick={(e) => handleAlgorithmSelection(val)}
                  >{val}</div>
                ))}
              </div>
            }
          </div>

          {/* PATTERN DROPDOWN */}

          <div className='header-dropdown'>
            <label htmlFor="algorithm">
              PATTERN
            <span 
              className='input-question'
              onMouseEnter={() => setPatternDropDown({...patternDropDown, isDescOpen: true})}
              onMouseLeave={() => setPatternDropDown({...patternDropDown, isDescOpen: false})}
            >?</span>
            </label>

            {patternDropDown.isDescOpen && <p className='input-question-description'>{patternDropDown.description}</p>}

            <div className='header-dropdown-btn'
                onClick={() => setPatternDropDown({...patternDropDown, isDropDownOpen: !patternDropDown.isDropDownOpen})}
                >
              {patternDropDown.selected}
              <i className={`fa-solid fa-angle-down ${patternDropDown.isDropDownOpen && 'DropDown-icon-rotate'}`}
              ></i>
            </div>
            {
            patternDropDown.isDropDownOpen && 
              <div className='header-dropdown-content'>
                {patternDropDownOptions.map((val, valIdx) => (
                  <div 
                  className='header-dropdown-item'
                  key={valIdx}
                  onClick={(e) => handlePatternSelection(val)}
                  >{val}</div>
                ))}
              </div>
            }
          </div>

        {/* ACTION BUTTON */}

        <div className='header-action-btn'
             onClick={() => handleMainButtonClick()}>
            <p>{mainButtonClicked ? 'RESTART' : 'START'}</p>
            <i className={`fa-solid ${mainButtonClicked ? 'fa-rotate-left' : 'fa-play'}`}></i>
        </div>

          {/* INSERT DROPDOWN */}

          <div className='header-dropdown'>
            <label htmlFor="algorithm">
              INSERT ON CLICK
            <span 
              className='input-question'
              onMouseEnter={() => setInsertDropDown({...insertDropDown, isDescOpen: true})}
              onMouseLeave={() => setInsertDropDown({...insertDropDown, isDescOpen: false})}
            >?</span>
            </label>

            {insertDropDown.isDescOpen && <p className='input-question-description'>{insertDropDown.description}</p>}

            <div className='header-dropdown-btn'
                onClick={() => setInsertDropDown({...insertDropDown, isDropDownOpen: !insertDropDown.isDropDownOpen})}
                >
              {insertDropDown.selected}
              <i className={`fa-solid fa-angle-down ${insertDropDown.isDropDownOpen && 'DropDown-icon-rotate'}`}
              ></i>
            </div>
            {
            insertDropDown.isDropDownOpen && 
              <div className='header-dropdown-content'>
                {insertDropDownOptions.map((val, valIdx) => (
                  <div 
                  className={`header-dropdown-item 
                  ${(unweightedAlgoDropOptions.includes(algorithmDropDown.selected) && val === 'WEIGHT') && 'dropdown-item-deactivate'}`}
                  key={valIdx}
                  onClick={(e) => handleInsertSelection(val)}
                  >{val}</div>
                ))}
              </div>
            }
          </div>

          {/* CLEAR DROPDOWN */}

          <div className='header-dropdown-clear'>
            <p onClick={() => handleClearClick()}>
              CLEAR
            </p>
          </div>


        </div>
      </div>
    </header>
  )
}

export default Header