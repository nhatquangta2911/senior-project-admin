import React, { Component } from 'react';
import { Menu, Button, Responsive, Label } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      results: [],
      value: '',
      activeItem: '',
      token: ''
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleLogout = () => {
    window.sessionStorage.clear();
    this.setState({
      activeItem: 'auth'
    });
    this.props.history.push('/auth');
  };

  render() {
    const { activeItem } = this.state;
    return (
      <div>
        {window.sessionStorage.getItem('token') && (
          <Label as={Link} to="/" image style={{ marginTop: '10px' }}>
            <img
              src="https://react.semantic-ui.com/images/avatar/small/christian.jpg"
              alt="avatar"
            />
            Quang (Shawn) N. TA
            <Label.Detail>Admin</Label.Detail>
          </Label>
        )}
        <Menu
          color="teal"
          borderless
          stackable
          inverted
          size="large"
          style={{ margin: '2px 0 10px' }}
        >
          <Menu.Item
            as={Link}
            to="/"
            name="home"
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />

          <Menu.Item
            as={Link}
            to="/manage"
            name="Manage Users"
            active={activeItem === 'Manage Users'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to="/monitor"
            name="monitor model"
            active={activeItem === 'monitor model'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to="/log"
            name="Activity Logs"
            active={activeItem === 'Activity Logs'}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position="right">
            {!window.sessionStorage.getItem('token') ? (
              <Menu.Item
                as={Link}
                to="/auth"
                onClick={() => this.handleItemClick}
              >
                <Responsive
                  {...Responsive.onlyComputer}
                  as={Button}
                  content="Login"
                  icon="sign-in"
                  labelPosition="left"
                />
              </Menu.Item>
            ) : (
              <Menu.Item
                as={Link}
                to="/auth"
                onClick={() => this.handleLogout()}
              >
                <Responsive
                  {...Responsive.onlyComputer}
                  as={Button}
                  content="Logout"
                  icon="sign-out"
                  labelPosition="left"
                />
              </Menu.Item>
            )}
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

export default withRouter(Navbar);
