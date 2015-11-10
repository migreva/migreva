import React from 'react';
import ReactDOM from 'react-dom';
import xr from 'xr';

export default class Skyline extends React.Component {
  constructor(props) {
    super(props);

  }

  pathStyle() {
    return {
      stroke: 'black',
      fill: 'white'
    }
  }

  renderElement = (element, index) => {
    let paths = [];
    for (let path of element.paths) {
      paths.push(<path d={ path } style={ this.pathStyle() }/>)

    }

    let circles = [];
    for (let circle in element.circles) {
      circles.push(<circle cx={ circle.cx } cy={ circle.cy } r={ circle.r } styles={ this.pathStyle() }/>)
    }

    return (
      <g className={ element.className } key={ `element-${index}` }>
        { paths }
        { circles }
      </g>
    )
  }

  render() {
    return (
      <svg width={ this.props.width } height={ this.props.height }>
        { this.props.svgElements.map(this.renderElement) }
      </svg>
    )
  }
}

xr.get('/get-skyline-elements/')
  .then((res) => {
    let data = res.data;

    ReactDOM.render(
      <Skyline svgElements={ data.svgElements } height={ data.height } width={ data.width }/>,
      document.getElementById('skyline')
    )
  });
