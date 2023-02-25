import React, { useState, useEffect } from 'react';
import Help from './Help';

// function to show and hide the help for the help button click
function Hide() {
    const [isShown, setIsShown] = useState(false);

    const handleClick = event => {
      
      setIsShown(current => !current);

    };
  
    return (
      <div>
        <button onClick={handleClick} className="helpButton">Help</button>
  
        {/* display elements on click */}
        {isShown && (
          <div>
            < Help />
          </div>
        )}
      </div>
    );
  }

export default Hide;