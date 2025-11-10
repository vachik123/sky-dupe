import React from 'react';
import './Initialized.css';

const Initialized = () => {
  return (
    <div className="initialized-container">
      <p>This will create a new feature based on your description.</p>
      <div className="form-group">
        <label htmlFor="feature-name">Feature Name</label>
        <input type="text" id="feature-name" placeholder="e.g., User Authentication" />
      </div>
      <div className="form-group">
        <label htmlFor="feature-description">Description</label>
        <textarea id="feature-description" rows="3" placeholder="Describe the feature you want to build..."></textarea>
      </div>
    </div>
  );
};

export default Initialized;
