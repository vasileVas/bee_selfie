import React from 'react';
import jQuery from 'jquery';
import CommentBox from './CommentBox';
import PictureForm from './PictureForm';

export default class PictureBox extends React.Component {
  constructor() {
    super();
    this.timer = '';
    this.state = {
      current_picture_id : 4,
      show_add_picture : false,
      all_pictures : [],
      pictures : []
    }
    this._deleteComment = this._deleteComment.bind(this);
    this._addComment = this._addComment.bind(this);
    this._addPicture = this._addPicture.bind(this);
    this._previousPicture = this._previousPicture.bind(this);
    this._toggleShowAddPicture = this._toggleShowAddPicture.bind(this);
    this._nextPicture = this._nextPicture.bind(this);
  }

  componentWillMount() {
    this._fetchPicturess();
  }

  componentDidMount() {
    this.timer = setInterval(() => {this._nextPicture()}, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    if (!this.state.all_pictures.length) return null;

    const picture = this.state.pictures[this.state.current_picture_id];
    let form, add_icon, camera_title;
    if (this.state.show_add_picture === true) {
      form = <PictureForm
                  addPicture={this._addPicture} />
      add_icon = 'fa fa-list fa-2x';
      camera_title = 'return to comments';
    } else {
      form = <CommentBox
                  picture_id={picture.id}
                  comments={picture.comments}
                  onDeleteComment={this._deleteComment}
                  onAddComment={this._addComment} />
      add_icon = 'fa fa-camera fa-2x';
      camera_title = 'add photo';
    }

    return(
      <div>
        <div className="cell">
          <article className="article article-picture">
            <div className="article article-picture-description">
              {this.state.current_picture_id+1}/5 : {picture.description}
            </div>
            <div className="article article-picture-image">
              <img src={picture.src} alt="description" />
            </div>
          </article>
          <div className="actions clearfix">
            <a className = "previous" onClick={this._previousPicture} title="previous photo">
              <i className="fa fa-arrow-left fa-2x" aria-hidden="true"></i>
            </a>
            <a className = "camera" onClick={this._toggleShowAddPicture} title={camera_title}>
              <i className={add_icon} aria-hidden="true"></i>
            </a>
            <a className = "next" onClick={this._nextPicture} title="next photo">
              <i className="fa fa-arrow-right fa-2x" aria-hidden="true"></i>
            </a>
          </div>
        </div>
        {form}
      </div>
    );
  }

  _previousPicture(event) {
    event.preventDefault();
    clearInterval(this.timer);
    const index = (this.state.current_picture_id-1) % 5;
    this.setState({
        current_picture_id : index === -1 ? 4 : index,
        show_add_picture : false
      });
  }

  _nextPicture(event) {
    if (event) {
      event.preventDefault();
      clearInterval(this.timer);
    }
    this.setState({
      current_picture_id : (this.state.current_picture_id+1) % 5,
      show_add_picture : false
    });
  }

  _toggleShowAddPicture() {
    clearInterval(this.timer);
    this.setState({
      show_add_picture: !this.state.show_add_picture
    });
  }

  _addPicture(url, description) {
    const new_picture = {
    	"id": this.state.all_pictures.length+1,
    	"src": url,
      "description" : description,
    	"comments": []
    };
    const all_pictures = this.state.all_pictures.concat([new_picture]);
    //console.log(pictures);
    this.setState({
      all_pictures : all_pictures,
      pictures : this._fetchLastPictures(all_pictures),
      show_add_picture : false,
      current_picture_id : 4
    });
    this._savePictures(all_pictures);
  }

  _addComment(picture_id, author, body) {
    const all_pictures = this.state.all_pictures;
    const picture = all_pictures[picture_id-1];
    const new_comment = {
  		"comment_id": `${picture_id}_${picture.comments.length+1}`,
  		"author": author,
  		"body": body
  	};
    picture.comments = picture.comments.concat([new_comment]);
    all_pictures[picture_id-1] = picture;
    this.setState({
      all_pictures : all_pictures,
      pictures : this._fetchLastPictures(all_pictures)
    });
    this._savePictures(all_pictures);
  }

  _deleteComment(comment_id) {
    const [picture_ind, comment_ind] = comment_id.split('_');
    const all_pictures = this.state.all_pictures;
    const picture = all_pictures[picture_ind-1];

    picture.comments.splice(comment_ind-1, 1);
    picture.comments.map(function(comment, index){
      comment.comment_id = `${picture_ind}_${index+1}`;
      return comment;
    })
    all_pictures[picture_ind-1] = picture;
    this.setState({
      all_pictures : all_pictures,
      pictures : this._fetchLastPictures(all_pictures)
    });
    this._savePictures(all_pictures);
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

  _savePictures(all_pictures) {
    const json= {
     "api_key":"tkwdemo",
     "secret":"tkwdemo",
     "id": "578e12a9c9cfa03ef7000001",
     "storage" : all_pictures
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
        const all_pictures = data[0].storage;

        this.setState({
          all_pictures : all_pictures,
          pictures : this._fetchLastPictures(all_pictures)
        });
      }
    });
  }

  _fetchLastPictures(all_pictures) {
    const PICTURES_NO = 5;
    return all_pictures.slice(all_pictures.length-PICTURES_NO, all_pictures.length);
  }

}
