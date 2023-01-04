import React from 'react';

import './Modal.css';

const Modal = () => {
  return (
    <>
        <div className='modal-bg'></div>
        <div className='modal'>
            <p className='modal-title'>Choose the algorithm for the search!</p>

            <div className='modal-weighted-col'>
                <p>Weighted</p>
                <div className='modal-card'>
                    <div className='modal-card-img-wrapper'>
                        <img src="" alt="" />
                    </div>
                    <div className='modal-card-texts'>
                        <h3>DIJKSTRA'S</h3>
                        <p className='modal-card-description'></p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Modal