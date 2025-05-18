// AnomalyFeature.js
import React from 'react';

const news = () => {
  return (
    <div style={{ padding: '20px', height: '100%', overflow: 'auto' }}>
      <iframe
        src="https://news-um7u.onrender.com/"
        style={{ width: '100%', height: '100%', border: 'none', borderRadius: '8px' }}
        title="Anomaly Feature"
      />
    </div>
  );
};

export default news;
