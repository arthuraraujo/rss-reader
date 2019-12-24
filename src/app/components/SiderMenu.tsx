import React, { useCallback } from 'react';
import { Menu, Icon } from 'antd';
import { createUseStyles } from 'react-jss';
import listStore from '../stores/list-store';

const { SubMenu } = Menu;

const useStyles = createUseStyles({
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badge: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.65)',
  },
});

interface DataSource {
  key: string;
  title: string;
  url: string;
}

const DATA_SOURCES: DataSource[] = [
  {
    key: '9to5',
    title: '9to5#mac',
    url: 'http://rsshub.app/9to5/mac',
  },
  {
    key: 'dgtle',
    title: '数字尾巴',
    url: 'http://rsshub.app/dgtle',
  },
  {
    key: '36kr',
    title: '36kr',
    url: 'http://rsshub.app/36kr/newsflashes',
  },
  {
    key: 'infoq',
    title: 'InfoQ 推荐',
    url: 'http://rsshub.app/infoq/recommend',
  },
  {
    key: 'ifanr-app',
    title: '爱范儿#App',
    url: 'http://rsshub.app/ifanr/app',
  },
  {
    key: 'ifanr-coolbuy',
    title: '爱范儿#玩物志',
    url: 'http://rsshub.app/ifanr/coolbuy',
  },
  {
    key: 'iDownloadBlog',
    title: 'iDownloadBlog',
    url: 'https://rsshub.app/iDownloadBlog',
  },
  {
    key: 'juejin-frontend',
    title: '掘金#前端',
    url: 'https://rsshub.app/juejin/category/frontend',
  },
];

export default function SiderMenu() {
  const classes = useStyles();

  const handleSelect = useCallback(parms => {
    const { key } = parms;

    const item = DATA_SOURCES.find(item => item.key === key);
    if (item) {
      listStore.setNewSource(item.key, item.url);
    } else {
      console.error('cannot find data-sources with key', key);
    }
  }, []);

  return (
    <Menu
      onSelect={handleSelect}
      theme="dark"
      defaultSelectedKeys={['9to5']}
      mode="inline"
    >
      {DATA_SOURCES.map(item => (
        <Menu.Item key={item.key}>
          <div className={classes.menuItem}>
            <div>
              <Icon type="desktop" />
              <span>{item.title}</span>
            </div>
            {/* <div className={classes.badge}>12</div> */}
          </div>
        </Menu.Item>
      ))}
      <SubMenu
        key="sub1"
        title={
          <span>
            <Icon type="user" />
            <span>User</span>
          </span>
        }
      >
        <Menu.Item key="3">Tom</Menu.Item>
        <Menu.Item key="4">Bill</Menu.Item>
        <Menu.Item key="5">Alex</Menu.Item>
      </SubMenu>
      <SubMenu
        key="sub2"
        title={
          <span>
            <Icon type="team" />
            <span>Team</span>
          </span>
        }
      >
        <Menu.Item key="6">Team 1</Menu.Item>
        <Menu.Item key="8">Team 2</Menu.Item>
      </SubMenu>
      <Menu.Item key="9">
        <Icon type="file" />
        <span>File</span>
      </Menu.Item>
    </Menu>
  );
}
