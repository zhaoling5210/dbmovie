import React from "react";
import { HashRouter, Route, Link } from "react-router-dom";
// import "antd/dist/antd.css";
import appStyle from "./app.scss";

import { Layout, Menu } from "antd";
import AboutContainer from "./components/about/AboutContainer";
import HomeContainer from "./components/home/HomeContainer";
import MovieContainer from "./components/movie/MovieContainer";
const { Header, Content, Footer } = Layout;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <HashRouter>
        <Layout className="layout" style={{ height: "100%" }}>
          {/* 头部 */}
          <Header>
            <div className={appStyle["logo"]} />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={[window.location.hash.split("/")[1]]}
              style={{ lineHeight: "64px" }}
            >
              <Menu.Item key="home">
                <Link to="/home">首页</Link>
              </Menu.Item>
              <Menu.Item key="movie">
                <Link to="/movie/in_theaters/1">电影</Link>
              </Menu.Item>
              <Menu.Item key="about">
                <Link to="/about">关于</Link>
              </Menu.Item>
            </Menu>
          </Header>
          {/* 中间内容区域 */}
          <Content style={{ flex: 1 }}>
            <Route path="/movie" component={MovieContainer} />
            <Route path="/about" component={AboutContainer} />
            <Route path="/home" component={HomeContainer} />
          </Content>
          <hr />
          {/* 底部 */}
          <Footer style={{ textAlign: "center" }}>©2018</Footer>
        </Layout>
      </HashRouter>
    );
  }
}
