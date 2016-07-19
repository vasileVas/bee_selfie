import React from 'react';
//import jQuery from 'jquery';

//import CommentForm from './CommentForm';
import Comment from './Comment';

export default class CommentBox extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showComments: false,
      comments: props.comments
    };

    this._deleteComment = this._deleteComment.bind(this);
    //this._addComment = this._addComment.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState( { comments : nextProps.comments } );
  }

  render() {
    const comments = this._getComments();

    console.log(this.state.comments);

    //this.setState({comments : this.props.comments});

    return(
      <div className="row comments-container">
        {comments}
      </div>

    );
  }

  _getComments() {
    return this.state.comments.map((comment) => {
      return <Comment
               {...comment}
               onDelete={this._deleteComment}
               key={comment.comment_id} />
    });
  }

  _deleteComment(commentID) {
    const comments = this.state.comments.filter(
      comment => comment.id !== commentID
    );

    this.setState({ comments });
  }


}
