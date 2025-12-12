import React, { useState, useEffect } from 'react';
import './StaffBookingContent.css';
import { FiCheckCircle } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';

const vendors = [
  {
    id: 1,
    name: 'Dr. Evelyn Reed',
    title: 'AI in the Modern Classroom',
    videoUrl: 'evelyn.mp4',    
    rating: 0,
    reviews: 0,
  },
  {
    id: 2,
    name: 'Javier Reyes',
    title: 'Gamifying Learning with AI',
    videoUrl: 'javier.mp4',
    rating: 0,
    reviews: 0,
  },
  {
    id: 3,
    name: 'Dr. Marcus Bennett',
    title: 'The Ethics of AI in Education',
    videoUrl: 'marcus.mp4',
    rating: 0,
    reviews: 0,
  }
];

const FAKE_WORKFLOW_STEPS = [
  { 
    status: 'Checking budget availability...', 
    delay: 2500,
    type: 'budget'
  },
  { 
    status: 'Generating Purchase Order...', 
    delay: 2500,
    type: 'po'
  },
  { 
    status: 'Blocking calendars...', 
    delay: 2500,
    type: 'calendar'
  },
];

const StaffBookingContent = ({ onWorkflowComplete, onContentReady }) => {
  const [showVendors, setShowVendors] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [isBooking, setIsBooking] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepStatuses, setStepStatuses] = useState({});
  const [isStepLoading, setIsStepLoading] = useState(false);
  const [showStepContent, setShowStepContent] = useState(false);
  const activeStepRef = React.useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
        setShowVendors(true);
        // Tell NewCard that content is ready to show footer
        if (onContentReady) {
          onContentReady();
        }
    }, 3000);
    return () => clearTimeout(timer);
  }, [onContentReady]);

  useEffect(() => {
    // Auto-scroll to active step
    if (activeStepRef.current) {
      activeStepRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentStepIndex]);

  // Load step with delay when currentStepIndex changes
  useEffect(() => {
    if (isBooking && currentStepIndex < FAKE_WORKFLOW_STEPS.length) {
      setIsStepLoading(true);
      setShowStepContent(false);
      
      const currentStep = FAKE_WORKFLOW_STEPS[currentStepIndex];
      const loadTimer = setTimeout(() => {
        setIsStepLoading(false);
        // Small delay before showing content for smooth transition
        setTimeout(() => {
          setShowStepContent(true);
        }, 100);
      }, currentStep.delay);

      return () => clearTimeout(loadTimer);
    }
  }, [currentStepIndex, isBooking]);

  // Also call onContentReady when step content is ready
  useEffect(() => {
    if (showStepContent && onContentReady) {
      onContentReady();
    }
  }, [showStepContent, onContentReady]);

  const handleAcceptStep = () => {
    setStepStatuses({
      ...stepStatuses,
      [currentStepIndex]: 'complete'
    });

    if (currentStepIndex < FAKE_WORKFLOW_STEPS.length - 1) {
      setTimeout(() => {
        setCurrentStepIndex(currentStepIndex + 1);
      }, 300);
    } else {
      // This is the last step - trigger the workflow complete callback
      setTimeout(() => {
        setIsBooking(false);
        setIsDone(true);
        // Call the parent's callback to mark the NewCard as done
        if (onWorkflowComplete) {
          onWorkflowComplete();
        }
      }, 500);
    }
  };

  const handleSelect = (vendor) => {
    setSelectedVendor(vendor);
    setIsBooking(true);
    setCurrentStepIndex(0);
    setStepStatuses({});
    setIsStepLoading(true);
    setShowStepContent(false);
  };

  const handleVideoClick = (e) => {
    const video = e.target;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    }
  };

  const renderStepContent = (stepType) => {
    switch(stepType) {
      
      case 'budget':
        return (
          <div className="step-details">
            <div className="budget-chart">
              <div className="budget-bar">
                <div className="budget-label">Q4 PD Budget</div>
                <div className="budget-visual">
                  <div className="budget-used" style={{ width: '65%' }}>$6,500</div>
                  <div className="budget-remaining">$3,500 remaining</div>
                </div>
              </div>
              <div className="budget-info">Session cost: $450 ✓ Approved</div>
            </div>
          </div>
        );
      
      case 'po':
        return (
          <div className="step-details">
            <div className="po-preview">
              <div className="po-header">Purchase Order #PO-2025-1847</div>
              <div className="po-details">
                <div className="po-line">Vendor: {selectedVendor?.name}</div>
                <div className="po-line">Service: Professional Development Session</div>
                <div className="po-line">Amount: $450.00</div>
              </div>
              <button className="po-button">View Purchase Order</button>
            </div>
          </div>
        );
      
      case 'calendar':
        return (
          <div className="step-details">
            <div className="calendar-preview">
              <div className="calendar-header">December 12, 2024</div>
              <div className="calendar-event">
                <div className="event-time">2:00 PM - 4:00 PM</div>
                <div className="event-title">PD: {selectedVendor?.title}</div>
                <div className="event-attendees">3rd Grade Teachers (12 attendees)</div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  if (isBooking) {
    return (
      <div className="booking-workflow-container">
        <div className="workflow-list">
          {FAKE_WORKFLOW_STEPS.map((step, index) => {
            const isComplete = stepStatuses[index] === 'complete';
            const isActive = index === currentStepIndex;
            const isPending = index > currentStepIndex;
            
            return (
              <div 
                key={index} 
                ref={isActive ? activeStepRef : null}
                className={`workflow-step ${isComplete ? 'complete' : ''} ${isActive ? 'active' : ''} ${isPending ? 'pending' : ''}`}
              >
                <div className="step-header">
                  <div className="step-icon">
                    {isComplete && <FiCheckCircle />}
                    {isActive && !isStepLoading && <div className="active-dot"></div>}
                    {(isPending || (isActive && isStepLoading)) && <div className="pending-dot"></div>}
                  </div>
                  <div className="step-title">{step.status}</div>
                </div>
                {isActive && showStepContent && !isStepLoading && (
                  <div className="step-content">
                    {renderStepContent(step.type)}
                    <div className="step-actions">
                      <button className="edit-button" disabled>
                        Edit
                      </button>
                      <button className="accept-button-workflow" onClick={handleAcceptStep}>
                        Accept & Continue
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (isDone) {
    return null;
  }  

  return (
    <div className={`staff-booking-container ${showVendors ? 'visible' : ''}`}>
      <div className="vendor-grid">
        {vendors.map(vendor => (
          <div key={vendor.id} className="vendor-card">
            <div className="video-container">
              <video 
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster={vendor.thumbnailUrl}
                onClick={handleVideoClick}
                style={{ cursor: 'pointer' }}
              >
                <source src={`${vendor.videoUrl}#t=0.5`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="vendor-info">
              <h3>{vendor.name}</h3>
              <div className="vendor-bottom">
                <div className="vendor-rating">
                    <FaStar color="#FFD700" />
                    <span>{vendor.rating} ({vendor.reviews} reviews)</span>
                </div>
                <button onClick={() => handleSelect(vendor)} className="accept-button">
                    Accept
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffBookingContent;