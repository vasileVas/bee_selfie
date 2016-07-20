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

    console.log(this.state.comments);

    //this.setState({comments : this.props.comments});


    return(
      <div className="row_ comments-container">
        <div className="cell">
          <h2>Join The Discussion</h2>
          <div className="comment-box">
            <CommentForm addComment={this._addComment} />
            <h3 className="comment-count">{this._getCommentsTitle(comments.length)}</h3>
            <div className="comment-list">
              {comments}
            </div>
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

    console.log(`${commentAuthor, commentBody}`);

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
    console.log('222'+comment_id);
    const id = `${this.props.picture_id}_${comment_id}`;
    this.props.onDeleteComment(id);
  }

}
