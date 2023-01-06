import React, { useEffect, useState } from 'react';

import "./Dropdown.css";

const abbreviateSelectedLabel = (name) => {
  if (name.length <= 12) return name;
  if (name === 'BEST FIRST SEARCH') return 'BEST FS';
  
  let words = name.split(' ');
  let result = "";
  for (let word of words) {
    result += word[0];
  }
  return result;
}

const Dropdown = ({ name,
                    selected,
                    icon_name,
                    weighted_options,
                    unweighted_options,
                    generalOptions,
                    handleSelectClick,
                    isSidebarExpanded,
                    isDropdownExpanded,
                    onBtnClick,
                    deactivateItem}
                  ) => {

  const handleItemSelect = (val) => {
    if (deactivateItem && val === 'WEIGHT') return;
    handleSelectClick(val); 
  }

  return (
    <div className='dropdown'>
      <div className='dropdown-btn' onClick={() => onBtnClick()}>
        <div className='btn-name'>
          <i className={`fa-solid ${icon_name}`}></i>
          {isSidebarExpanded && 
            <>
              <h4>{name}</h4>
              <p className='selected'>{abbreviateSelectedLabel(selected)}</p>
            </>
          }
        </div>
        {isSidebarExpanded && <i className={`fa-solid fa-angle-${isDropdownExpanded ? "up" : "down"}`}></i>}
      </div>
      {isSidebarExpanded && <div className={`dropdown-content ${isDropdownExpanded && 'show'}`}>
        <span className={`line ${isDropdownExpanded && 'show'}`}></span>
        {generalOptions ? 
          <div className='dropdown-content-container'>
            <ul>
              {generalOptions.map((x, i) => (
                <li 
                  className={(selected === x ? 'selected' : '') + (deactivateItem && x == 'WEIGHT' ? 'deactivated-item' : '')}
                  key={i}
                  onClick={() => handleItemSelect(x)}
                  >{x}</li>
              ))}
            </ul>
          </div>
        : 
          <div className='dropdown-content-container'>
            <p>Weighted</p>
            <ul>
              {weighted_options.map((x, i) => (
                <li 
                  className={selected === x ? 'selected' : ''}
                  key={i}
                  onClick={() => handleItemSelect(x)}>{x}</li>
              ))}
            </ul>
            <p>Unweighted</p>
            <ul>
              {unweighted_options.map((x, i) => (
                <li 
                  className={selected === x ? 'selected' : ''} 
                  key={i}
                  onClick={() => handleItemSelect(x)}>{x}</li>
              ))}
            </ul>
          </div>}
      </div>}
    </div>
  )
}

export default Dropdown