import { useEffect, useState } from 'react';
import getEnvEndpoints from '../config/endpoints';

const endpoints = getEnvEndpoints();

const useLoginWidget = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const esmScript = document.createElement('script');

    esmScript.src = endpoints.loginWidgetESM;
    esmScript.type = 'module';
    document.body.appendChild(esmScript);

    const widgetScript = document.createElement('script');
    widgetScript.src = endpoints.loginWidget;
    widgetScript.noModule = true;
    document.body.appendChild(widgetScript);

    setLoaded(true);

    return () => {
      document.body.removeChild(esmScript);
      document.body.removeChild(widgetScript);
    };
  }, []);

  return loaded;
};

export default useLoginWidget;
