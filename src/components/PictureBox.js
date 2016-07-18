import React from 'react';
//import jQuery from 'jquery';
import CommentBox from './CommentBox';

export default class PictureBox extends React.Component {
  constructor() {
    super();

    const pictures = [
          {id:1, src:'pic1.png', comments:[
            {id:1, author:'radu 1', body:'...some content 1 1....'},
            {id:2, author:'vasile 1', body:'...some content 1 2....'}
          ]},
          {id:2, src:'pic2.png', comments:[
            {id:1, author:'radu 2', body:'...some content 2 1....'},
            {id:2, author:'vasile 2', body:'...some content 2 2....'}
          ]},
          {id:3, src:'pic3.png', comments:[
            {id:1, author:'radu 3', body:'...some content 3 1....'},
            {id:2, author:'vasile 3', body:'...some content 3 2....'}
          ]}
        ];

    this.state = {
      current_picture_id : 0,
      pictures : pictures
    }
  }

  _previousPicture() {
    alert('prev');
  }

  _nextPicture() {
    alert('next');
  }

  render() {

    //console.log(this.state.pictures)

    return(
      <div className="picture">
        <div className = "previous" onClick={this._previousPicture.bind(this)}>prev</div>
        <div className = "next" onClick={this._nextPicture.bind(this)}>next</div>

        <p>img - src = </p>

        <CommentBox title="ok" />

      </div>
    );
  }
}
