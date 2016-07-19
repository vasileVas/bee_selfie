import React from 'react';
//import jQuery from 'jquery';
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

  _previousPicture() {
    console.log('prev');
    this.setState({current_picture_id : this.state.current_picture_id-1});
  }

  _nextPicture() {
    console.log('next');
    this.setState({current_picture_id : this.state.current_picture_id+1});
  }

  _calljNorthPole(json, responseHandler) {

    jNorthPole.getStorage(json, responseHandler.bind(this));
    jNorthPole.getNewRealtimeSocket(responseHandler);

  }


  _fetchPicturess() {

    console.log(jNorthPole);

    var json= {
     "api_key":"tkwdemo",
     "secret":"tkwdemo",
     "id": "578e12a9c9cfa03ef7000001"
    };

    this._calljNorthPole(json, function (data) {
      if (data != null && data[0]) {
        const pictures = data[0].storage;
        this.setState({ pictures });
      }
    );


    /*jQuery.ajax({
      method: "GET",
      url: "api/pictures.json",
      success: (pictures) => {
        console.log('here ...');
        console.log(pictures);
        this.setState({ pictures })
      }
    });*/
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
}
