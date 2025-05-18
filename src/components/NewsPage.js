import React from 'react';

const NewsPage = () => {
  return (
    <div style={{ height: '100vh' }}>
      <iframe
        src="http://localhost:5001"
        title="News App"
        width="100%"
        height="100%"
        style={{ border: 'none' }}
      />
    </div>
  );
};

export default NewsPage;
