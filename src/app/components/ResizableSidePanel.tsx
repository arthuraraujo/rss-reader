import React, { useState, useEffect, useCallback } from 'react';
import Draggable from 'react-draggable';
import { createUseStyles } from 'react-jss';

const INIT_WIDTH = 273;
const MIN_WIDTH = 200;
const MAX_WIDTH = 400;

const useStyles = createUseStyles({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
  },
  dragAbleBar: {
    position: 'absolute',
    right: 0,
    width: 6,
    height: '100%',
    background: 'transparent',
    '&:hover': {
      cursor: 'col-resize',
    },
    flex: 'none',
  },
  listContent: {
    flex: 1,
    width: '100%',
  },
});

export default function ResizableSidePanel(props: any) {
  const classes = useStyles();
  const [width, setWidth] = useState(INIT_WIDTH);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const handleDrag = useCallback(
    (_, ui) => {
      const newWidth = width + ui.deltaX;
      if (newWidth < MIN_WIDTH || newWidth > MAX_WIDTH) {
        return false;
      }
      setWidth(newWidth);
      setPosition({ x: 0, y: 0 });
    },
    [width],
  );

  const handleStop = useCallback(() => {
    console.log('stop with width', width);
  }, [width]);

  return (
    <div className={classes.container} style={{ width }}>
      <div className={classes.listContent} style={{ width }}>
        {props.children}
      </div>
      <Draggable
        onDrag={handleDrag}
        axis="x"
        position={position}
        onStop={handleStop}
      >
        <div className={classes.dragAbleBar} />
      </Draggable>
    </div>
  );
}
