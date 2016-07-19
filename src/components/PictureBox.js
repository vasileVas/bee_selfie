import React from 'react';
import jQuery from 'jquery';
import CommentBox from './CommentBox';

export default class PictureBox extends React.Component {
  constructor() {
    super();

    this.state = {
      current_picture_id : 0,
      pictures : []
    }

    //this._getCurrentPicture();
  }

  componentWillMount() {
    this._fetchPicturess();
  }

  render() {

    if (!this.state.pictures.length) return null;

    const picture = this.state.pictures[this.state.current_picture_id];

    return(
      <div className="picture">
        <div className = "previous" onClick={this._previousPicture.bind(this)}>prev</div>
        <div className = "next" onClick={this._nextPicture.bind(this)}>next</div>

        <p>img - src = {picture.src}</p>

        <CommentBox title="ok" comments={picture.comments} />

      </div>
    );

  }

  _previousPicture() {
    console.log('prev');
    //this._addPicture();
    //this._addComment(4, 'radu 4', 'bbbb 2');
    this._deleteComment("4_1");

    //this.setState({current_picture_id : this.state.current_picture_id-1});
  }

  _addComment(picture_id, author, body) {
    const pictures = this.state.pictures;
    const picture = pictures[picture_id-1];
    const new_comment = {
  		"comment_id": `${picture_id}_${picture.comments.length+1}`,
  		"author": author,
  		"body": body
  	};
    picture.comments = picture.comments.concat([new_comment]);
    pictures[picture_id-1] = picture;

    this.setState({pictures});
    this._savePictures(pictures);
  }

  _deleteComment(comment_id) {
    const [picture_ind, comment_ind] = comment_id.split('_');
    const pictures = this.state.pictures;
    const picture = pictures[picture_ind-1];

    picture.comments.splice(comment_ind-1, 1);
    pictures[picture_ind-1] = picture;

    this.setState({pictures});
    this._savePictures(pictures);
  }

  _addPicture() {
    console.log('add picture');
    const new_picture = {
    	"id": this.state.pictures.length+1,
    	"src": `src${this.state.pictures.length+1}.jpg`,
    	"comments": []
    };
    const pictures = this.state.pictures.concat([new_picture]);
    //console.log(pictures);
    this.setState({pictures});
    this._savePictures(pictures);
  }

  _nextPicture() {
    console.log('next');
    //this._savePictures();
    this.setState({current_picture_id : this.state.current_picture_id+1});
  }

  _calljNorthPole(json, responseHandler) {

    jNorthPole.getStorage(json, responseHandler.bind(this));
    jNorthPole.getNewRealtimeSocket(responseHandler);

  }

  _calljNorthPoleByAjax(json, method, responseHandler) {
    jQuery.ajax({
      url: "https://json.northpole.ro/storage.json",
      type: method,
      data: JSON.stringify(json),
      dataType: 'json',
      success: responseHandler
    });
  }

  _savePictures(pictures) {
    //console.log(this.state.pictures);
    const json= {
     "api_key":"tkwdemo",
     "secret":"tkwdemo",
     "id": "578e12a9c9cfa03ef7000001",
     "storage" : pictures
    };
    this._calljNorthPoleByAjax(json, 'PUT', (data) => {
      console.log(data);
    });
  }

  _fetchPicturess() {

    const json= {
     "api_key":"tkwdemo",
     "secret":"tkwdemo",
     "id": "578e12a9c9cfa03ef7000001"
    };

    this._calljNorthPoleByAjax(json, 'SEARCH', (data) => {
      if (data != null && data[0]) {
        const pictures = data[0].storage;
        this.setState({ pictures });
      }
    });

  }


}
