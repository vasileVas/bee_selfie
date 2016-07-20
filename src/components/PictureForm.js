import React from 'react';

export default class PictureForm extends React.Component {
  constructor() {
    super();
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  render() {
    return (
      <div className="row_ picture-container">
        <div className="cell">
          <h2>Add new picture</h2>
          <div className="picture-box">
            <form className="picture-form" onSubmit={this._handleSubmit}>
              <label>New picture</label>
              <div className="picture-form-fields">
                <input placeholder="URL:"  ref={c => this._url = c} />
                <input placeholder="Description:"  ref={c => this._description = c} />
              </div>
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

  _handleSubmit(event) {
    event.preventDefault();

    if (!/^((https?|ftp):)?\/\/.*\.(jpeg|jpg|png|gif|bmp)$/.test(this._url.value)) {
      alert('Please provide a valid image url.');
      return;
    }

    if ( this._url.value === ""  || this._description.value === "" ) {
      alert('Please provide an url and a description.');
      return;
    }

    this.props.addPicture(this._url.value, this._description.value);

    this._url.value = '';
    this._description.value = '';


  }
}
