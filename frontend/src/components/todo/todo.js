import React from 'react';
import './todo.css'

class Todo extends React.Component {
  redirectToStaticSite = () => {
    window.location.href = 'http://localhost:4000/ExploVR-Places.html'; // Replace 'https://example.com' with the URL of your static site
  };

  render() {
    return (
      <div className='mainB'>
        <h2>Make Your TODO plans of the year</h2>
        <button onClick={this.redirectToStaticSite} className='button'>explore todo</button>
      </div>
    );
  }
}

export default Todo;
