import React, { useEffect, useState, useCallback } from 'react';
import { List, Spin, Icon } from 'antd';
import Parser from 'rss-parser';
import moment from 'moment';
import { createUseStyles } from 'react-jss';
import { Scrollbars } from 'react-custom-scrollbars';

export const renderThumbVerticalCustom = (props: any) => (
  <div className="rcs-vertical-thumb" {...props} />
);

interface NewsItem {
  title: string;
  contentSnippet: string;
  link: string;
  guid: string;
  pubDate: string;
}

const parser = new Parser();

const useStyles = createUseStyles({
  loadingWrapper: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

function NewsItem(props: {
  title: string;
  pubDate: string;
  guid: string;
  selectedGuid: string;
  onSelected: Function;
}) {
  const { title, pubDate, guid, selectedGuid, onSelected } = props;

  const hanldeClick = useCallback(() => {
    onSelected(guid);
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
        <img
          style={{
            width: 80,
            borderRadius: 4,
            height: '100%',
            flexGrow: 0,
          }}
          alt="logo"
          src="https://9to5mac.com/wp-content/uploads/sites/6/2019/12/Mac-Pro-Top-Features-slight-angle-jeff.jpg?quality=82&strip=all"
        />
      }
    >
      <List.Item.Meta title={title} description={moment(pubDate).fromNow()} />
    </List.Item>
  );
}

export default function NewsList() {
  const [data, setData] = useState([]);
  const [selectedGuid, setSelectedGuid] = useState('');
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    async function getData() {
      let feed = await parser.parseURL('https://rsshub.app/9to5/mac');
      console.log(feed.title);

      console.log(feed.items);

      setData(feed.items);

      setLoading(false);

      // feed.items?.forEach(item => {
      //   console.log(item.title + ':' + item.link);
      // });
    }
    getData();
  }, []);

  const onItemSelect = useCallback(guid => {
    setSelectedGuid(guid);
  }, []);

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
          dataSource={data}
          renderItem={(item: NewsItem) => (
            <NewsItem
              title={item.title}
              pubDate={item.pubDate}
              guid={item.guid}
              selectedGuid={selectedGuid}
              onSelected={onItemSelect}
            />
          )}
        />
      )}
    </Scrollbars>
  );
}
