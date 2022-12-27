import React from 'react';

import './Sidebar.css';

const items = [
    {name: 'Unvisited Node', class: 'square'},
    {name: 'Visited Node', class: 'square square-visited'},
    {name: 'Path Node', class: 'square square-path'},
    {name: 'Wall Node', class: 'square square-wall'},
    {name: 'Weighted Node', class: 'weighted-node'},
    {name: 'Start position', class: 'start-pos'},
    {name: 'Finish position', class: 'finish-pos'},
]

const Sidebar = ({ onCloseClick }) => {
  return (
    <div className='sidebar'>
        <i className="fa-solid fa-xmark" onClick={() => onCloseClick()}></i>
        <header className='sidebar-header'>
            <h2 className='sidebar-title'>Description</h2>
            <span className='sidebar-line'></span>
        </header>
        <ul className='sidebar-items'>
            {items.map((v, i) => (
                <li key={i} className='sidebar-item'>
                    <span className={v.class}></span>
                    <p>{v.name}</p>
                </li>
            ))}
        </ul>
        <footer className='sidebar-footer'>
            <a href="https://github.com/g-sillva" target='_blank'>
                <i className="fa-brands fa-github"></i>
            </a>
            <p className='sidebar-footer-text'>Pathfinding visualizer</p>
        </footer>
    </div>
  )
}

export default Sidebar