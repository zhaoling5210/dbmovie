import React from "react";
import { Button, Icon, Spin } from "antd";
import fecthJSONP from "fetch-jsonp";

export default class MovieDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
      isloading: true
    };
  }
  componentWillMount() {
    const url = `https://api.douban.com/v2/movie/subject/${
      this.props.match.params.id
    }?apikey=0df993c66c0c636e29ecbb5344252a4a`;
    fecthJSONP(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          info: data,
          isloading: false
        });
      });
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.goBack}>
          <Icon type="left" />
          返回电影列表页面
        </Button>
        {this.renderInfo()}
      </div>
    );
  }
  goBack = () => {
    this.props.history.go(-1);
  };
  renderInfo = () => {
    if (this.state.isloading) {
      return <Spin />;
    } else {
      return (
        <div style={{ textAlign: "center" }}>
          <img
            src={
              "https://images.weserv.nl/?url=" + this.state.info.images.large
            }
            alt={this.state.info.images.large}
          />
          <p>{this.state.info.summary}</p>
        </div>
      );
    }
  };
}
