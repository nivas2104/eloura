import React from 'react';
import './calender.css'

class Calender extends React.Component {
  redirectToStaticSite = () => {
    window.location.href = 'http://localhost:4000/cal.html'; // Replace 'https://example.com' with the URL of your static site
  };

  render() {
    return (
      <div className='mainB1'>
        <h2>Click for Holidays</h2>
        <button onClick={this.redirectToStaticSite} className='button'>explore todo</button>
      </div>
    );
  }
}

export default Calender;
