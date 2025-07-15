import React from 'react';
import { useNavigate } from 'react-router-dom';
import './button.css';

// Wrapper to pass `navigate` prop
const withNavigation = (Component) => {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
};

class Button extends React.Component {
  redirectToExplore = () => {
    this.props.navigate('/explore'); // Use navigate from props
  };

  render() {
    return (
      <div className='mainBox'>
        <h1 className='main-text'>Explore the World in VR</h1>
        <button onClick={this.redirectToExplore} className='button-main'>Explore VR</button>
      </div>
    );
  }
}

// Export the component wrapped with `withNavigation`
export default withNavigation(Button);
