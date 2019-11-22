import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";

export default function withAuth(ComponentNeedToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        redirect: false
      };
    }

    componentDidMount() {
      const token = window.sessionStorage.getItem("token");
      if (!token) {
        this.setState({
          redirect: true
        });
      }
    }

    render() {
      const { redirect } = this.state;
      if (redirect) {
        return <Redirect to="/auth" />;
      }
      return (
        <Fragment>
          <ComponentNeedToProtect {...this.props} />
        </Fragment>
      );
    }
  };
}
