import React, { Component } from "react";
import { Menu, Search, Segment } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      results: [],
      value: "",
      activeItem: "home"
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { isLoading, activeItem, results, value } = this.state;
    return (
      <Menu color="teal" borderless stackable inverted size="medium">
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
          <Menu.Item
            name="logout"
            active={activeItem === "logout"}
            onClick={this.handleItemClick}
          />
        </Menu.Menu>
      </Menu>
    );
  }
}

export default withRouter(Navbar);
