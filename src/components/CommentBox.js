import React from 'react';

export default class CommentBox extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      comments: props.comments
    }

  }

  _getComments() {

  }

  render() {
    const comments = this._getComments();
    return(
      <div>
        <h2>Join The Discussion</h2>
        <div className="comment-box">
          <CommentForm addComment={this._addComment} />
          <h3 className="comment-count">{this._getCommentsTitle(comments.length)}</h3>
          <div className="comment-list">
            {comments}
          </div>
        </div>
      </div>

    );
  }
}
