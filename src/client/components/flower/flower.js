import React from 'react';

export default class Flower extends React.Component {
  constructor() {
    super()
  }

  render() {

    return (

      <div className="flower-container" key={this.props.data.i}><h4>{this.props.data.name}</h4>

        <div className="flower-picture"
             style={{backgroundImage: `url("https://raw.githubusercontent.com/roibendet/wedding/master/${this.props.data.photo}")`}}/>

        <p>{this.props.data.instructions}</p>

        <strong>{this.props.data.season.toUpperCase()}</strong>

      </div>

    )
  }
}




