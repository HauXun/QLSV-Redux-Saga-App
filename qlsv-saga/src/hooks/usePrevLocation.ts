import { useEffect, useRef } from 'react';

export function usePreLocation(location: any) {
  const prevLocRef = useRef(location);

  useEffect(() => {
    prevLocRef.current = location;
  }, [location]);

  return prevLocRef.current;
}
