import React, { useRef, useLayoutEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { observer } from 'mobx-react-lite';
import { createUseStyles } from 'react-jss';
import contentStore from '../stores/content-store';

const pangu = require('pangu');

export const renderThumbVerticalCustom = (props: any) => (
  <div className="rcs-vertical-thumb" {...props} />
);

const useStyles = createUseStyles({
  content: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#fff',
    '& img': {
      maxWidth: '100%',
      height: 'auto',
      margin: '0 auto',
      marginBottom: 12,
      display: 'block',
    },
    '& iframe': {
      width: '100%',
    },
    '& p': {
      lineHeight: 2,
    },
  },
  fixedContent: {
    marginBottom: '1.5rem',
    padding: '2rem',
    maxWidth: 980,
    width: '100%',
  },
});

const NewsContent = observer(() => {
  const classes = useStyles();
  const scroller = useRef<Scrollbars>(null);

  useLayoutEffect(() => {
    if (scroller && scroller.current) {
      scroller.current.scrollTop(0);
    }

    pangu.spacingElementById('rss-content');
    pangu.autoSpacingPage();
  }, [contentStore.title]);

  return (
    <Scrollbars ref={scroller} renderThumbVertical={renderThumbVerticalCustom}>
      <div id="rss-content" className={classes.content}>
        <div className={classes.fixedContent}>
          <h2>{contentStore.title}</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: contentStore.content,
            }}
          />
        </div>
      </div>
    </Scrollbars>
  );
});

export default NewsContent;
