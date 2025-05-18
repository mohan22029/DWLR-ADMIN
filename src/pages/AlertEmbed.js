import React from 'react';

const AlertEmbed = () => {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <iframe
        src="http://localhost:5000/"
        title="Alert Page"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
      />
    </div>
  );
};

export default AlertEmbed;
