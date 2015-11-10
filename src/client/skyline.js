import React from 'react';
import ReactDOM from 'react-dom';
import xr from 'xr';
import assign from 'object-assign';

let commandRegex = /([a-zA-Z]{1}(?:\s*-?\d+(?:[\s\,]-?\d+\s+)?))|$/g;
console.log(commandRegex.global);

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
      paths.push(<PathElement d={ path } style={ this.pathStyle() } key={ `element-${index}-path-${paths.length}` }/>)
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

class PathElement extends React.Component {
  static defaultProps = {
    style: {
      stroke: 'black',
      fill: 'white'
    }
  }
  constructor(props) {
    super(props);

    this.state = assign({}, this.compilePoints(this.props.d));
  }

  componentDidMount() {
    setTimeout(() => {

      this.drawPoint();
    }, 500);
  }

  componentDidUpdate() {
    setTimeout(() => {

      this.drawPoint();
    }, 500);
  }

  compilePoints(d) {
    let splits = d.split(commandRegex);
    let commands = [];

    for (let split of splits) {
      if (!split.trim()) continue;
      commands.push(split);
    }

    return {
      commands,
      appliedCommands: []
    };
  }

  drawPoint = () => {
    if (this.state.commands.length == this.state.appliedCommands.length) return;

    let commands = this.state.commands;
    let appliedCommands = this.state.appliedCommands;
    appliedCommands.push(commands[appliedCommands.length]);

    this.setState({ commands, appliedCommands })
  }

  render() {
    return (<path d={ this.state.appliedCommands.join(' ') } style={ this.props.style }/>)
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
