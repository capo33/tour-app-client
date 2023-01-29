import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    // create an interval to decrement count every second
    const interval = setInterval(() => {
      // decrement count by 1 every second
      setCount((currentCount) => --currentCount);
    }, 1000);
    // redirect once count is equal to 0
    count === 0 && navigate("/login");
    // cleanup
    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <div style={{ marginTop: "100px " }}>
      <h5>Redirecting you in {count} seconds</h5>
    </div>
  );
};

export default LoadingToRedirect;
