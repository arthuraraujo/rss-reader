import React, { useEffect, useState, useCallback } from 'react';
import { List, Spin, Icon } from 'antd';
import moment from 'moment';
import { createUseStyles } from 'react-jss';
import { observer } from 'mobx-react-lite';
import { Scrollbars } from 'react-custom-scrollbars';
import contentStore from '../stores/content-store';
import listSore, { NewsItem } from '../stores/list-store';

export const renderThumbVerticalCustom = (props: any) => (
  <div className="rcs-vertical-thumb" {...props} />
);

const useStyles = createUseStyles({
  loadingWrapper: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

function NewsItemComponent(props: {
  title: string;
  pubDate: string;
  guid: string;
  selectedGuid: string;
  content: string;
  thumbnail?: string;
  onSelected: Function;
}) {
  const {
    title,
    pubDate,
    guid,
    selectedGuid,
    onSelected,
    content,
    thumbnail,
  } = props;

  const hanldeClick = useCallback(() => {
    onSelected(guid);
    contentStore.setConetnt(title, content);
  }, [guid]);

  const isSeleted = selectedGuid === guid;

  return (
    <List.Item
      style={{
        cursor: 'pointer',
        padding: 12,
        background: isSeleted ? '#e8e8e8' : 'transparent',
      }}
      onClick={hanldeClick}
      extra={
        thumbnail && (
          <img
            style={{
              width: 80,
              marginLeft: 5,
              borderRadius: 4,
              height: '100%',
              flexGrow: 0,
            }}
            alt="logo"
            src={thumbnail}
          />
        )
      }
    >
      <List.Item.Meta title={title} description={moment(pubDate).fromNow()} />
    </List.Item>
  );
}

const NewsList = observer(() => {
  const [selectedGuid, setSelectedGuid] = useState('');
  const classes = useStyles();

  useEffect(() => {
    listSore.loadData();
  }, [listSore.source]);

  const onItemSelect = useCallback(guid => {
    setSelectedGuid(guid);
  }, []);

  const loading = listSore.data.length === 0;

  return (
    <Scrollbars
      autoHide
      autoHideDuration={200}
      hideTracksWhenNotNeeded
      renderThumbVertical={renderThumbVerticalCustom}
    >
      {loading && (
        <div className={classes.loadingWrapper}>
          <Spin indicator={antIcon} />
        </div>
      )}
      {!loading && (
        <List
          itemLayout="horizontal"
          dataSource={listSore.data}
          renderItem={(item: NewsItem) => (
            <NewsItemComponent
              title={item.title}
              pubDate={item.pubDate}
              guid={item.guid}
              content={item.content}
              thumbnail={item.thumbnail}
              selectedGuid={selectedGuid}
              onSelected={onItemSelect}
            />
          )}
        />
      )}
    </Scrollbars>
  );
});

export default NewsList;
