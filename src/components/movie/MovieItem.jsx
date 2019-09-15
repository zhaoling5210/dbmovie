import React from "react";
import MovieItemStyle from "../../scss/MovieItem.scss";
import { Rate } from "antd";
export default class MovieItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className={MovieItemStyle.box} onClick={this.getDetail}>
        <img
          src={"https://images.weserv.nl/?url=" + this.props.images.small}
          alt={this.props.images.small}
          className={MovieItemStyle.img}
        />
        <h4>{this.props.title}</h4>
        <h4>{this.props.year}</h4>
        <h4>{this.props.genres.join("，")}</h4>
        <Rate
          disabled
          allowHalf
          count={10}
          defaultValue={
            (this.props.rating.average * 10) % 10 >= 5
              ? ~~this.props.rating.average + 0.5
              : ~~this.props.rating.average
          }
        />
      </div>
    );
  }
  getDetail = () => {
    this.props.history.push(`/movie/detail/${this.props.id}`);
  };
}
