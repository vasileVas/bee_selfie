import React from 'react';
//import jQuery from 'jquery';

import CommentForm from './CommentForm';
import Comment from './Comment';

export default class CommentBox extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showComments: false,
      comments: props.comments
    };

    this._deleteComment = this._deleteComment.bind(this);
    this._addComment = this._addComment.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState( { comments : nextProps.comments } );
  }

  render() {
    const comments = this._getComments();
    return(
      <div className="row_ comments-container">
        <div className="cell">
          <div className="comment-box">
            <h3 className="comment-count">{this._getCommentsTitle(comments.length)}</h3>
            <div className="comment-list">
              {comments}
            </div>
            <h2>Join The Discussion</h2>
            <CommentForm addComment={this._addComment} />
          </div>
        </div>
      </div>
    );
  }

  _getCommentsTitle(commentCount) {
    if (commentCount === 0) {
      return 'No comments yet';
    } else if (commentCount === 1) {
      return '1 comment';
    } else {
      return `${commentCount} comments`;
    }
  }

  _addComment(commentAuthor, commentBody) {
    this.props.onAddComment(this.props.picture_id, commentAuthor, commentBody);
  }

  _getComments() {
    return this.state.comments.map((comment) => {
      return <Comment
               {...comment}
               onDelete={this._deleteComment}
               key={comment.comment_id} />
    });
  }

  _deleteComment(comment_id) {
    //const id = `${this.props.picture_id}_${comment_id}`;
    this.props.onDeleteComment(comment_id);
  }

}
