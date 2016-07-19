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

  _previousPicture() {
    console.log('prev');
    this.setState({current_picture_id : this.state.current_picture_id-1});
  }

  _nextPicture() {
    console.log('next');
    this.setState({current_picture_id : this.state.current_picture_id+1});
  }


  _fetchPicturess() {

    console.log(jNorthPole);

    var json= {
     "api_key":"guest",
     "secret":"guest",
     "id": "578de370c9cfa02887000001"
    };

    var responseHandler = function (data) {
      console.log('best');
      console.log(data);
    };

    jNorthPole.getStorage(json, responseHandler);

    var socket = jNorthPole.getNewRealtimeSocket(responseHandler);
    jNorthPole.subscribe(socket, 'foo');
    jNorthPole.publish(socket, 'foo', { message: 'hello' });

    jQuery.ajax({
      method: "GET",
      url: "api/pictures.json",
      success: (pictures) => {
        console.log('here ...');
        console.log(pictures);
        this.setState({ pictures })
      }
    });
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
