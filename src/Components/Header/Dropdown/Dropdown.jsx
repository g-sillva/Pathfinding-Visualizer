import React from 'react';

import './Dropdown.css';

const Dropdown = ({ name, weightedOptions, unweightedOptions, dropDownOptions, onMouseEnterQuestion, onMouseLeaveQuestion, onDropdownClick, onSelectOption, isDescOpen, isDropDownOpen, description, selected, isWeightDeactivate = false }) => {
  return (
    <div className='header-dropdown'>
        <div className='input'>
            <p>{name}</p>
            <span 
                className='input-question'
                onMouseEnter={() => onMouseEnterQuestion()}
                onMouseLeave={() => onMouseLeaveQuestion()}
                >
            ?</span>
        </div>

        {isDescOpen && <p className='input-question-description'>{description}</p>}

        <div className='header-dropdown-btn' onClick={() => onDropdownClick()}>
            <p>{selected}</p>
            <i className={`fa-solid fa-angle-down ${isDropDownOpen && 'dropdown-icon-rotate'}`}></i>
        </div>

        {isDropDownOpen && 
        <div className='header-dropdown-content'>
            {dropDownOptions ?
                <>
                        {dropDownOptions.map((val, valIdx) => (
                            <div 
                                className={`header-dropdown-item ${isWeightDeactivate && val === 'WEIGHT' && 'dropdown-item-deactivate'}`}
                                key={valIdx}
                                onClick={(e) => onSelectOption(val)}
                                >
                            {val}</div>
                    ))}
                </>
            : 
            <>
                <p className='dropdown-content-title'>WEIGHTED</p>
                {weightedOptions.map((val, valIdx) => (
                <div 
                    className={`header-dropdown-item ${isWeightDeactivate && val === 'WEIGHT' && 'dropdown-item-deactivate'}`}
                    key={valIdx}
                    onClick={(e) => onSelectOption(val)}
                >
                    {val}</div>
                ))}
                <p className='dropdown-content-title'>UNWEIGHTED</p>
                {unweightedOptions.map((val, valIdx) => (
                <div 
                    className={`header-dropdown-item ${isWeightDeactivate && val === 'WEIGHT' && 'dropdown-item-deactivate'}`}
                    key={valIdx}
                    onClick={(e) => onSelectOption(val)}
                >
                    {val}</div>
                ))}
            </>
            }
        </div>
        }
  </div>
  )
}

export default Dropdown