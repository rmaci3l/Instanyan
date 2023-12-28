import React, { useEffect, useState } from 'react';

function InlineAlert({alert}) {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    // Fade in on render.
    const fadeOutTimeout = setTimeout(() => {
      setVisible(false);
    }, 33000);

      return () => {
        clearTimeout(fadeOutTimeout);
    };
  }, []);


  return (
    <div className={`transition-opacity ease-in-out duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <span className="text-[12px] font-medium text-red-500">{alert}</span>
    </div>
  );
}

export default InlineAlert