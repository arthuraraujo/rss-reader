import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { observer } from 'mobx-react-lite';
import { createUseStyles } from 'react-jss';

import contentStore from '../stores/content-store';

export const renderThumbVerticalCustom = (props: any) => (
  <div className="rcs-vertical-thumb" {...props} />
);

const useStyles = createUseStyles({
  content: {
    padding: 24,
    paddingTop: 32,
    background: '#fff',
    '& img': {
      width: '100%',
      marginBottom: 12,
    },
  },
});

const NewsContent = observer(() => {
  const classes = useStyles();

  return (
    <Scrollbars renderThumbVertical={renderThumbVerticalCustom}>
      <div className={classes.content}>
        <h2>{contentStore.title}</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: contentStore.content,
          }}
        />
      </div>
    </Scrollbars>
  );
});

export default NewsContent;
