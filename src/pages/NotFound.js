import React from "react";
import error from "../images/404.jpg";

const NotFound = () => {
  return (
    <div>
      <img
        src={error}
        alt='not found'
        style={{
          maxWidth: "100%",
          height: "100vh",
          objectFit: "cover",
        }}
      />
    </div>
  );
};

export default NotFound;
