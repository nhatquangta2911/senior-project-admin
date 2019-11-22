import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      results: [],
      value: "",
      activeItem: "",
      token: ""
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleLogout = () => {
    window.sessionStorage.clear();
    this.setState({
      activeItem: "auth"
    });
    this.props.history.push("/auth");
  };

  render() {
    const { activeItem } = this.state;
    return (
      <Menu color="teal" borderless stackable inverted size="small">
        <Menu.Item
          as={Link}
          to="/"
          name="home"
          active={activeItem === "home"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as={Link}
          to="/log"
          name="activity log"
          active={activeItem === "activity log"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as={Link}
          to="/monitor"
          name="monitor model"
          active={activeItem === "monitor model"}
          onClick={this.handleItemClick}
        />
        <Menu.Menu position="right">
          {!window.sessionStorage.getItem("token") ? (
            <Menu.Item
              as={Link}
              to="/auth"
              name="login"
              active={activeItem === "login"}
              onClick={() => this.handleItemClick}
            />
          ) : (
            <Menu.Item
              as={Link}
              to="/auth"
              name="logout"
              onClick={() => this.handleLogout()}
            />
          )}
        </Menu.Menu>
      </Menu>
    );
  }
}

export default withRouter(Navbar);
