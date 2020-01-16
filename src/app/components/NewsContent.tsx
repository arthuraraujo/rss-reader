import React, { useRef, useLayoutEffect, useCallback } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { observer } from 'mobx-react-lite';
import { createUseStyles } from 'react-jss';
import { Icon } from 'antd';
import { shell } from 'electron';
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
      textRendering: 'optimizeLegibility',
    },
    '& h1': {
      fontSize: '2rem',
      textRendering: 'optimizeLegibility',
    },
  },
  fixedContent: {
    marginBottom: '1.5rem',
    padding: '2rem',
    maxWidth: 980,
    width: '100%',
  },
  topBar: {
    height: 51,
    background: '#ffffff',
    borderBottom: '1px solid #efefef',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    WebkitAppRegion: 'drag',
    '& i': {
      WebkitAppRegion: 'no-drag',
      opacity: 0.54,
      padding: '0 15px',
    },
  },
  wrapper: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
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

  const openInBrwoser = useCallback(() => {
    shell.openExternal(contentStore.link);
  }, [contentStore.link]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.topBar}>
        <Icon type="heart" />
        <Icon type="share-alt" />
        <Icon type="qrcode" />
        <Icon onClick={openInBrwoser} type="compass" />
        <Icon type="more" />
      </div>

      <Scrollbars
        ref={scroller}
        renderThumbVertical={renderThumbVerticalCustom}
      >
        <div id="rss-content" className={classes.content}>
          <div className={classes.fixedContent}>
            <h1>{contentStore.title}</h1>
            <div
              dangerouslySetInnerHTML={{
                __html: contentStore.content,
              }}
            />
          </div>
        </div>
      </Scrollbars>
    </div>
  );
});

export default NewsContent;
