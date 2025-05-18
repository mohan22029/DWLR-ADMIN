// components/TwilioAlert.jsx
import React from 'react';

const TwilioAlert = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">AquaAssistant Alerts</h2>
      <iframe
        src="http://localhost:5000"
        width="100%"
        height="600"
        style={{ border: 'none', borderRadius: '10px' }}
        title="Twilio Alert"
      ></iframe>
    </div>
  );
};

export default TwilioAlert;
