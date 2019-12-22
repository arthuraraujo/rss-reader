import React, { useState, useCallback } from 'react';
import { Layout, Breadcrumb } from 'antd';
import { createUseStyles } from 'react-jss';

import SiderMenu from './SiderMenu';
import ResizableSidePanel from './ResizableSidePanel';
import NewsList from './NewsList';
import NewsContent from './NewsContent';

const { Header, Content, Footer, Sider } = Layout;

const useStyles = createUseStyles({
  logo: {
    height: 32,
    background: 'rgba(255, 255, 255, 0.2)',
    margin: 16,
  },
  sider: {
    paddingTop: 20,
    WebkitAppRegion: 'drag',
    overflow: 'auto',
    height: '100vh',
    position: 'fixed',
    left: 0,
  },
});

export default function SiderDemo() {
  const [collapsed, setCollapsed] = useState(false);
  const classes = useStyles();

  const onCollapse = useCallback((collapsed: boolean) => {
    setCollapsed(collapsed);
  }, []);

  return (
    <Layout style={{ minHeight: '100vh', overflow: 'hidden' }}>
      <Sider
        className={classes.sider}
        collapsible={false}
        collapsed={collapsed}
        onCollapse={onCollapse}
      >
        <div className={classes.logo} />
        <SiderMenu />
      </Sider>
      <Layout style={{ marginLeft: 200, overflow: 'hidden' }}>
        {/* <Header style={{ background: '#fff', padding: 0 }} /> */}
        <Content
          style={{
            display: 'flex',
            flexDirection: 'row',
            overflow: 'hidden',
            height: '100vh',
          }}
        >
          <ResizableSidePanel>
            <NewsList />
          </ResizableSidePanel>

          <NewsContent />
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  );
}
