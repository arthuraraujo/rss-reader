import { remote } from 'electron';
import { useState, useCallback, useMemo, useEffect } from 'react';

export default function useMaximumWindowToggle(): [boolean, () => void] {
  const win = useMemo(() => remote.getCurrentWindow(), []);

  const [isMaximized, setIsMaximized] = useState(() => win.isMaximized());

  const handleMaximize = useCallback(() => {
    setIsMaximized(true);
  }, [setIsMaximized]);

  const handleUnMaximize = useCallback(() => {
    setIsMaximized(false);
  }, [setIsMaximized]);

  const toggle = useCallback(() => {
    if (isMaximized) {
      handleUnMaximize();
      win.unmaximize();
    } else {
      handleMaximize();
      win.maximize();
    }
  }, [isMaximized, setIsMaximized]);

  useEffect(() => {
    win.on('maximize', handleMaximize);
    win.on('unmaximize', handleUnMaximize);

    return () => {
      win.removeListener('maximize', handleMaximize);
      win.removeListener('unmaximize', handleUnMaximize);
    };
  }, []);

  return [isMaximized, toggle];
}
