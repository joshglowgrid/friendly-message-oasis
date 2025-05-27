
import React from 'react';

const RequestCallForm = () => {
  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
        <iframe 
          src="https://docs.google.com/forms/d/e/1FAIpQLSfPFsEeLSEUMIR6JBwFKXLw6jfScXSxq7afh64GE5-yy81mFA/viewform?embedded=true" 
          width="100%" 
          height="600" 
          frameBorder="0" 
          marginHeight={0} 
          marginWidth={0}
          className="rounded-lg"
        >
          Loading…
        </iframe>
      </div>
    </div>
  );
};

export default RequestCallForm;
