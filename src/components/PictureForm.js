import React from 'react';

export default class PictureForm extends React.Component {
  constructor() {
    super();

    this.state = {
      error: false
    };

    this._handleSubmit = this._handleSubmit.bind(this);
    this._resetForm = this._resetForm.bind(this);

    this.messages = {
      "valid_url" : "Please provide a valid image url.",
      "missing_field": "Please provide an url and a description."
    };
  }

  render() {
    const message = this.state.error ?
        <p className="message_error">{this.messages[this.state.error]}</p> : "";

    return (
      <div className="row_ picture-container">
        <div className="cell">
          <h2>Add new picture</h2>
          <div className="picture-box">
            <form className="picture-form" onSubmit={this._handleSubmit}>
              <label>New picture</label>
              <div className="picture-form-fields">
                <input placeholder="URL:"  ref={c => this._url = c} onChange={this._resetForm}/>
                <input placeholder="Description:"  ref={c => this._description = c} onChange={this._resetForm}/>
              </div>
              {message}
              <div className="picture-form-actions">
                <button type="submit">
                  Add picture
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  _resetForm() {
    this.setState({error: false});
  }

  _handleSubmit(event) {
    event.preventDefault();

    if ( this._url.value === ""  || this._description.value === "" ) {
      this.setState({ error: 'missing_field' });
      return;
    }

    if (!/^((https?|ftp):)?\/\/.*\.(jpeg|jpg|png|gif|bmp)$/.test(this._url.value)) {
      this.setState({ error: 'valid_url' });
      return;
    }

    this.props.addPicture(this._url.value, this._description.value);

    this._url.value = '';
    this._description.value = '';
    
  }
}
