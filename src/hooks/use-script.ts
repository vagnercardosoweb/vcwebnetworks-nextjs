import { useEffect, useState } from 'react';

const useScript = (url: string) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!document.querySelector(`script[src="${url}"]`)) {
      const script = document.createElement('script');
      script.src = url;
      script.async = true;

      script.onload = () => {
        setLoading(false);
      };

      script.onerror = () => {
        setError(true);
      };

      document.body.appendChild(script);
    }

    return () => {
      document.querySelector(`script[src="${url}"]`)?.remove();
    };
  }, [url]);

  return { error, loading };
};

export default useScript;
