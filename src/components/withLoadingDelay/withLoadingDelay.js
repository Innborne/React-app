import { useState, useEffect } from "react";
import "./withLoadingDelay.css";

function WithLoadingDelay(Component, StyledContainer) {
  return function ComponentWithLoading(props) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }, []);

    const DelayLoading = () => {
      return (
        <StyledContainer>
          <div className="loading-container">
            <div className="loading" />
          </div>
        </StyledContainer>
      );
    };

    return !loading ? <Component {...props} /> : DelayLoading();
  };
}

export default WithLoadingDelay;
