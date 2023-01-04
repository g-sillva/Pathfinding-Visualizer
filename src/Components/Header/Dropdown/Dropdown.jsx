import React from 'react';

import './Dropdown.css';

const Dropdown = ({ name, weightedOptions, unweightedOptions, dropDownOptions, onMouseEnterQuestion, onMouseLeaveQuestion, onDropdownClick, onSelectOption, isDescOpen, isDropDownOpen, description, selected, isWeightDeactivate = false }) => {
  return (
    <div className='header-dropdown'>

        <div className='header-dropdown-btn' onClick={() => onDropdownClick()}>
            <p>{name}</p>
        </div>

        <p className='selected'>{selected}</p>

        {isDropDownOpen && 
        <div className='header-dropdown-content'>
            {dropDownOptions ?
            <>
                        {dropDownOptions.map((val, valIdx) => (
                            <div className='header-dropdown-card'>
                                    <div className='illustration'></div>
                                    <div 
                                        className={`header-dropdown-item ${isWeightDeactivate && val === 'WEIGHT' && 'dropdown-item-deactivate'}`}
                                        key={valIdx}
                                        onClick={(e) => onSelectOption(val)}
                                        >
                                    {val}</div>
                            </div>

                    ))}
                </>
            : 
            <>
                <p className='dropdown-content-title'>WEIGHTED</p>
                {weightedOptions.map((val, valIdx) => (
                    <div className='header-dropdown-card'>
                        <div 
                            className={`header-dropdown-item ${isWeightDeactivate && val === 'WEIGHT' && 'dropdown-item-deactivate'}`}
                            key={valIdx}
                            onClick={(e) => onSelectOption(val)}
                        >
                        {val}</div>
                    </div>
                ))}
                <p className='dropdown-content-title'>UNWEIGHTED</p>
                {unweightedOptions.map((val, valIdx) => (
                    <div className='header-dropdown-card'>
                        <div 
                            className={`header-dropdown-item ${isWeightDeactivate && val === 'WEIGHT' && 'dropdown-item-deactivate'}`}
                            key={valIdx}
                            onClick={(e) => onSelectOption(val)}
                        >
                            {val}</div>
                    </div>
                ))}
            </>
            }
        </div>
        }
  </div>
  )
}

export default Dropdown