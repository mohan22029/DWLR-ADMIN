// AnomalyFeature.js
import React from 'react';

const AnomalyFeature = () => {
  return (
    <div style={{ padding: '20px', height: '100%', overflow: 'auto' }}>
      <iframe
        src="https://frontend-anomaly-7el4.vercel.app"
        style={{ width: '100%', height: '80vh', border: 'none', borderRadius: '8px' }}
        title="Anomaly Feature"
      />
    </div>
  );
};

export default AnomalyFeature;
