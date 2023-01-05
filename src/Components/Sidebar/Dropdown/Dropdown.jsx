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
                    img_name,
                    weighted_options,
                    unweighted_options,
                    generalOptions,
                    handleSelectClick,
                    isExpanded,
                    onBtnClick}
                  ) => {
  const [isContentOpen, setIsContentOpen] = useState(name === 'Algorithm');

  useEffect(() => {
    setIsContentOpen(false);
  }, []);

  const handleBtnClick = () => {
    setIsContentOpen(!isContentOpen);
    onBtnClick();
  }

  return (
    <div className='dropdown'>
      <div className='dropdown-btn' onClick={() => handleBtnClick()}>
        <div className='btn-name'>
          <img src={require('./../../../assets/sidebar/' + img_name)} alt="a" />
          {isExpanded && 
            <>
              <h4>{name}</h4>
              <p className='selected'>{abbreviateSelectedLabel(selected)}</p>
            </>
          }
        </div>
        {isExpanded && <i className={`fa-solid fa-angle-${isContentOpen ? "up" : "down"}`}></i>}
      </div>
      {isExpanded && <div className={`dropdown-content ${isContentOpen && 'show'}`}>
        <span className={`line ${isContentOpen && 'show'}`}></span>
        {generalOptions ? 
          <div className='dropdown-content-container'>
            <ul>
              {generalOptions.map((x, i) => (
                <li 
                  className={selected === x ? 'selected' : ''}
                  key={i}
                  onClick={() => {handleSelectClick(x); setIsContentOpen(false)}}
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
                  onClick={() => {handleSelectClick(x); setIsContentOpen(false)}}>{x}</li>
              ))}
            </ul>
            <p>Unweighted</p>
            <ul>
              {unweighted_options.map((x, i) => (
                <li 
                  className={selected === x ? 'selected' : ''} 
                  key={i}
                  onClick={() => {handleSelectClick(x); setIsContentOpen(false)}}>{x}</li>
              ))}
            </ul>
          </div>}
      </div>}
    </div>
  )
}

export default Dropdown