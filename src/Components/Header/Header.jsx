import React, { useState } from 'react';

import './Header.css';

const Header = ({ onMainButtonClick, resetGrid, onSelectInsert, isAnimationRunning, onClickClear }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [mainButtonClicked, setMainButtonClicked] = useState(false);

  const [algorithmDropDown, setAlgorithmDropDown] = useState({
    isDropDownOpen: false,
    isDescOpen: false,
    selected: 'DIJKSTRA',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut accusamus itaque quibusdam iure. Repellendus aliquid, voluptas non vero ipsam explicabo.'
  });

  const [pattermDropDown, setPatternDropDown] = useState({
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

  const algoDropDownOptions = ['DIJKSTRA', 'BREADTH FIRST', 'TESTE 2', 'TESTE 3'];
  const patternDropDownOptions = ['NONE', 'MAZE'];
  const insertDropDownOptions = ['WALL', 'START', 'FINISH'];

  const handleMainButtonClick = () => {
    if (!mainButtonClicked) {
      onMainButtonClick(algorithmDropDown.selected);
    } else {
      resetGrid();
    }
    setMainButtonClicked(!mainButtonClicked)
  }

  const handleClearClick = () => {
    setMainButtonClicked(false);
    onClickClear();
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
                  onClick={(e) => setAlgorithmDropDown({...algorithmDropDown, selected: val, isDropDownOpen: false})}
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
              onMouseEnter={() => setPatternDropDown({...pattermDropDown, isDescOpen: true})}
              onMouseLeave={() => setPatternDropDown({...pattermDropDown, isDescOpen: false})}
            >?</span>
            </label>

            {pattermDropDown.isDescOpen && <p className='input-question-description'>{pattermDropDown.description}</p>}

            <div className='header-dropdown-btn'
                onClick={() => setPatternDropDown({...pattermDropDown, isDropDownOpen: !pattermDropDown.isDropDownOpen})}
                >
              {pattermDropDown.selected}
              <i className={`fa-solid fa-angle-down ${pattermDropDown.isDropDownOpen && 'DropDown-icon-rotate'}`}
              ></i>
            </div>
            {
            pattermDropDown.isDropDownOpen && 
              <div className='header-dropdown-content'>
                {patternDropDownOptions.map((val, valIdx) => (
                  <div 
                  className='header-dropdown-item'
                  key={valIdx}
                  onClick={(e) => setPatternDropDown({...pattermDropDown, selected: val, isDropDownOpen: false})}
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
                  className='header-dropdown-item'
                  key={valIdx}
                  onClick={(e) => {
                    setInsertDropDown({...insertDropDown, selected: val, isDropDownOpen: false});
                    onSelectInsert(val);
                  }}
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