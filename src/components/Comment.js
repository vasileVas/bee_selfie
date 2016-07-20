import React from 'react';

import CommentConfirmation from './CommentConfirmation';

export default class Comment extends React.Component {
  constructor() {
    super();

    this.state = {
      isAbusive: false
    };

    this._handleDelete = this._handleDelete.bind(this);
    this._toggleAbuse = this._toggleAbuse.bind(this);

  }

  render() {

    let commentBody;

    if (!this.state.isAbusive) {
      commentBody = this.props.body;
    } else {
      commentBody = <em>Content marked as abusive</em>;
    }

    return(
      <div className="comment">

        <img src="assets/images/avatar-default.png" />

        <p className="comment-header">{this.props.author}</p>
        <p className="comment-body">{commentBody}</p>

        <div className="comment-actions">
          <CommentConfirmation onConfirm={this._handleDelete}>
            Delete Comment?
          </CommentConfirmation>

        </div>
      </div>
    );
  }

  _toggleAbuse() {
    this.setState({
      isAbusive: !this.state.isAbusive
    });
  }

  _handleDelete() {
    this.props.onDelete(this.props.id);
  }
}
