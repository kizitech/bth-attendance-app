import React, { useState } from 'react';

function CalenderBackgroundChanger() {
  const [backgroundColor, setBackgroundColor] = useState('initial'); // Initial background color

  // Function to change the background color of elements with a specific class name
  const changeBackgroundColor = (className, newColor) => {
    const elements = document.querySelectorAll(`.${className}`);
    elements.forEach(element => {
      element.style.backgroundColor = newColor;
    });
  };

  return (
    <div className="CalenderBackgroundChanger">
      <button
        onClick={() => {
          changeBackgroundColor('my-class-name', 'blue'); // Change background color to blue
          setBackgroundColor('blue'); // Update the state to reflect the new color
        }}
      >
        Change Background Color to Blue
      </button>
      <button
        onClick={() => {
          changeBackgroundColor('my-class-name', 'red'); // Change background color to red
          setBackgroundColor('red'); // Update the state to reflect the new color
        }}
      >
        Change Background Color to Red
      </button>
      <div className="my-class-name" style={{ backgroundColor }}>
        This is a div with the class name "my-class-name"
      </div>
    </div>
  );
}

export default CalenderBackgroundChanger;
