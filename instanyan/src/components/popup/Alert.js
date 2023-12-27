import React, { useEffect, useState } from 'react';
import { Alert } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';

function AlertPopup({error}) {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    setVisible(true);
    // Fade in on render.
    const fadeOutTimeout = setTimeout(() => {
      setVisible(false);
    }, 3000);

      return () => {
        clearTimeout(fadeOutTimeout);
    };
  }, [error]);


  return (
    <div className={`flex absolute inset-x-0 bottom-0 text-xs justify-center 
      transition-opacity ease-in-out duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="w-2/3 m-8">
        <Alert color="failure" icon={HiInformationCircle}>
          <span>{error}</span>
        </Alert>
      </div>
    </div>
  );
}

export default AlertPopup