import React from 'react';
import { createUseStyles } from 'react-jss';
import useMaximumWindowToggle from '../utils/useMaximumWindowToggle';

const useStyles = createUseStyles({
  dragAreaMac: {
    position: 'fixed',
    zIndex: 999,
    height: 18,
    width: '100%',
    WebkitAppRegion: 'drag',
  },
});

export default function DragAreaMac() {
  const classes = useStyles();
  const [_, toggleMaximized] = useMaximumWindowToggle();

  return (
    <div className={classes.dragAreaMac} onDoubleClick={toggleMaximized} />
  );
}
