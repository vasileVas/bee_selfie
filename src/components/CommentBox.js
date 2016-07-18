import React from 'react';

export default class CommentBox extends React.Component {
  render() {
    return(
      <h2>Comments: {this.props.title}</h2>
    );
  }
}  
