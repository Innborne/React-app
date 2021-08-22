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

    const DelayLoading = () => {
      return (
        <div className={pageStyle}>
          <div
            className={componentStyle}
            style={{ boxShadow: 'none', backgroundColor: 'transparent' }}
          >
            <div className="loading" />
          </div>
        </div>
      );
    };

    return !loading ? <Component {...props} /> : DelayLoading();
  };
}

export default WithLoadingDelay;
