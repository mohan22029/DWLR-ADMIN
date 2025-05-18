// AnomalyFeature.js
import React from 'react';

const Prediciton = () => {
  return (
    <div style={{ padding: '20px', height: '100%', overflow: 'auto' }}>
      <iframe
        src="https://irrigation-monitoring-35fc0.web.app/"
        style={{ width: '100%', height: '100%', border: 'none', borderRadius: '8px' }}
        title="Water Level Prediction"
      />
    </div>
  );
};

export default Prediciton;
