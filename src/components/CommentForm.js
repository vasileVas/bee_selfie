import React from 'react';

export default class CommentForm extends React.Component {
  constructor() {
    super();
    this.state = {
      characters: 0,
      error: false
    };

    this._handleSubmit = this._handleSubmit.bind(this);
    this._getCharacterCount = this._getCharacterCount.bind(this);
    this._resetForm = this._resetForm.bind(this);

    this.messages = {
      "missing_field": "Please provide an author and a comment."
    };
  }

  render() {
    const message = this.state.error ?
        <p className="message_error">{this.messages[this.state.error]}</p> : "";

    return (
      <form className="comment-form" onSubmit={this._handleSubmit}>
        <label>New comment</label>
        <div className="comment-form-fields">
          <input placeholder="Name:"  ref={c => this._author = c} onChange={this._resetForm}/>
          <textarea placeholder="Comment:" ref={c => this._body = c} onChange={this._getCharacterCount}></textarea>
        </div>
        <p>{this.state.characters} characters</p>
        {message}
        <div className="comment-form-actions">
          <button type="submit">
            Post comment
          </button>
        </div>
      </form>
    );
  }

  _resetForm() {
    this.setState({error: false});
  }

  _getCharacterCount() {
    this._resetForm();
    this.setState({
      characters: this._body.value.length
    });
  }

  _handleSubmit(event) {
    event.preventDefault();
    if ( this._author.value === ""  || this._body.value === "" ) {
      this.setState({ error: 'missing_field' });
      return;
    }
    this.props.addComment(this._author.value, this._body.value);
    this._author.value = '';
    this._body.value = '';
    this.setState({ characters: 0  });
  }
}
