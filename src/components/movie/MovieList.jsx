import React from "react";
import { Spin, Pagination } from "antd";
import fetchJSONP from "fetch-jsonp";
import MovieItem from "./MovieItem";

export default class MovieContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieType: props.match.params.type, //要获取的电影类型
      nowPage: ~~props.match.params.page || 1,
      total: 0, //总共多少条
      pageSize: 12,
      movieList: [],
      isloading: true
    };
  }
  componentWillMount() {
    this.loadMovieListByTypeAndPage();
  }
  componentWillReceiveProps(nextProps) {
    this.setState(
      {
        isloading: true,
        nowPage: nextProps.match.params.page,
        movieType: nextProps.match.params.type
      },
      function() {
        this.loadMovieListByTypeAndPage();
      }
    );
  }

  render() {
    return <div>{this.renderList()}</div>;
  }
  renderList = () => {
    if (this.state.isloading) {
      return <Spin />;
    } else {
      return (
        <div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap"
            }}
          >
            {this.state.movieList.map((item, index, arr) => {
              return (
                <MovieItem
                  {...item}
                  key={item.id}
                  history={this.props.history}
                />
              );
            })}
          </div>
          <Pagination
            defaultCurrent={+this.state.nowPage}
            total={+this.state.total}
            pageSize={this.state.pageSize}
            onChange={this.pageChange}
          />
        </div>
      );
    }
  };
  loadMovieListByTypeAndPage() {
    const start = +this.state.pageSize * (+this.state.nowPage - 1);
    const url = `https://api.douban.com/v2/movie/${
      this.state.movieType
    }?apikey=0df993c66c0c636e29ecbb5344252a4a&start=${start}&count=${
      this.state.pageSize
    }`;

    fetchJSONP(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          movieList: data.subjects,
          isloading: false, //加载完成
          total: data.total
        });
      });
  }
  pageChange = (page, pageSize) => {
    this.props.history.push(`/movie/${this.state.movieType}/${page}`);
  };
}
