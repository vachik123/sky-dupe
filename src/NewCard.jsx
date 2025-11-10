import React, { useState, useEffect } from 'react';
import './NewCard.css';
import { FiX, FiZap } from 'react-icons/fi';

// --- Sub-components for clarity ---

const NewCardHeader = ({ promptText, onClose }) => (
  <div className="new-card-header">
    <span className="new-card-header-prompt">
      <FiZap size={16} style={{ color: '#666' }} /> {promptText}
    </span>
    <button onClick={onClose} className="close-button">
      <FiX size={20} />
    </button>
  </div>
);

const NewCardBody = ({ content: ContentComponent }) => (
  <div className="new-card-body">
    {ContentComponent ? <ContentComponent /> : null}
  </div>
);

const NewCardFooter = () => (
  <div className="new-card-footer">
    <button className="footer-button">More Actions</button>
    <button className="footer-button primary">Done</button>
  </div>
);

const LoadingIndicator = () => (
    <div className="loading-indicator">
        <div className="spinner"></div>
        <p>Thinking...</p>
    </div>
);

// --- Main NewCard Component ---

const NewCard = ({ isVisible, onClose, promptText, title, contentType, componentsMap }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const ContentComponent = componentsMap[contentType];

  useEffect(() => {
    if (isVisible) {
      setIsLoading(true);
      setShowContent(false);
      // Simulate loading content
      const timer = setTimeout(() => {
        setIsLoading(false);
        // Start content fade-in slightly after loading is false
        const contentTimer = setTimeout(() => setShowContent(true), 50);
        return () => clearTimeout(contentTimer);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Reset state when hiding
      setShowContent(false);
      setIsLoading(true);
    }
  }, [isVisible, contentType]);

  const cardClasses = `new-card ${!isLoading && showContent ? 'content' : ''} ${isLoading ? 'loading' : ''}`;

  return (
    <div className={`new-card-container ${isVisible ? 'visible' : ''}`}>
        <div className={cardClasses}>
            <NewCardHeader promptText={promptText} onClose={onClose} />

            {isLoading ? (
                <LoadingIndicator />
            ) : (
                <div className="folder-wrapper">
                    <div className="folder-tab">{title}</div>
                    <div className="folder-content">
                        <NewCardBody content={ContentComponent} />
                        <NewCardFooter />
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default NewCard;
