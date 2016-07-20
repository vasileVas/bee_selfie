import React from 'react';
import { Link } from 'react-router';

export default class Layout extends React.Component {

  render() {
    return (
      <div>
        <div className="top-menu">
          <ul>
            <li>
              <Link to="/pictures">Pictures</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>
        {this.props.children}
      </div>
    );
  }

}
