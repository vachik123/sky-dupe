import React from 'react';
import './NewCard.css';

const NewCard = ({ isVisible, onClose }) => {
  return (
    <div className={`new-card-container ${isVisible ? 'visible' : ''}`}>
      <div className="new-card">
        <div className="new-card-header">
            <div className="new-card-header-buttons">
                <button className="action-button active">Action 1</button>
                <button className="action-button">Action 2</button>
            </div>
        </div>
        <div className="new-card-body">
          <div className="new-card-content">
            <h3>Placeholder Title</h3>
            <p>This is where the main content of the card will go.</p>
            <p>It can be anything you want it to be.</p>
          </div>
          <div className="new-card-sidebar">
            {/* Placeholder for a sidebar, like the timeline */}
          </div>
        </div>
        <div className="new-card-footer">
          <button className="footer-button" onClick={onClose}>Cancel</button>
          <button className="footer-button primary">Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default NewCard;
