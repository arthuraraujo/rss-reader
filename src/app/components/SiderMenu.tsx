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

type RssSources = {
  [key: string]: {
    url: string;
  };
};

const RSS_SOURCES: RssSources = {
  '9to5': {
    url: 'http://rsshub.app/9to5/mac',
  },
  dgtle: {
    url: 'http://rsshub.app/dgtle',
  },
  '36kr': {
    url: 'http://rsshub.app/36kr/newsflashes',
  },
  infoq: {
    url: 'http://rsshub.app/infoq/recommend',
  },
  ifanrApp: {
    url: ' http://rsshub.app/ifanr/app',
  },
  ifanrCoolbuy: {
    url: ' http://rsshub.app/ifanr/coolbuy',
  },
};

export default function SiderMenu() {
  const classes = useStyles();

  const handleSelect = useCallback(parms => {
    const { key } = parms;

    console.log('key,', key, RSS_SOURCES[key]);

    if (RSS_SOURCES[key]) {
      listStore.setNewSource(key, RSS_SOURCES[key].url);
    }
  }, []);

  return (
    <Menu
      onSelect={handleSelect}
      theme="dark"
      defaultSelectedKeys={['9to5']}
      mode="inline"
    >
      <Menu.Item key="9to5">
        <div className={classes.menuItem}>
          <div>
            <Icon type="desktop" />
            <span>9to5</span>
          </div>
          <div className={classes.badge}>12</div>
        </div>
      </Menu.Item>
      <Menu.Item key="dgtle">
        <Icon type="desktop" />
        <span>数字尾巴</span>
      </Menu.Item>
      <Menu.Item key="36kr">
        <Icon type="desktop" />
        <span>36kr</span>
      </Menu.Item>
      <Menu.Item key="infoq">
        <Icon type="desktop" />
        <span>InfoQ推荐</span>
      </Menu.Item>
      <Menu.Item key="ifanrApp">
        <Icon type="desktop" />
        <span>爱范儿 App</span>
      </Menu.Item>
      <Menu.Item key="ifanrCoolbuy">
        <Icon type="desktop" />
        <span>爱范儿 玩物志</span>
      </Menu.Item>
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
