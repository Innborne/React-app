import { useState, useEffect } from 'react';
import './withLoadingDelay.css';

function WithLoadingDelay(Component, componentStyle, pageStyle) {
  return function ComponentWithLoading(props) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }, []);

    const componentWithDelay = () => {
      return (
        <div
          className={componentStyle}
          style={{
            boxShadow: 'none',
            backgroundColor: 'transparent',
            justifyContent: 'center',
          }}
        >
          <div>
            <div className="loading" />
          </div>
        </div>
      );
    };

    const DelayLoading = () => {
      return pageStyle ? (
        <div className={pageStyle}>{componentWithDelay()}</div>
      ) : (
        componentWithDelay()
      );
    };

    return !loading ? <Component {...props} /> : DelayLoading();
  };
}

export default WithLoadingDelay;
