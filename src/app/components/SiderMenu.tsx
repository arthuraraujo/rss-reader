import React from 'react';
import { Menu, Icon } from 'antd';
import { createUseStyles } from 'react-jss';

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

export default function SiderMenu() {
  const classes = useStyles();

  return (
    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
      <Menu.Item key="1">
        <div className={classes.menuItem}>
          <div>
            <Icon type="desktop" />
            <span>9to5</span>
          </div>
          <div className={classes.badge}>12</div>
        </div>
      </Menu.Item>
      <Menu.Item key="2">
        <Icon type="desktop" />
        <span>Option 2</span>
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
