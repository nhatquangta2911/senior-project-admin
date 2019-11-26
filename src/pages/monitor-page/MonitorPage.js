import React, { Component } from "react";
import { Tab, Responsive } from "semantic-ui-react";
import TransactionTable from "./transaction-table";

export default class MonitorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panes: [
        {
          menuItem: "Dashboard",
          render: () => <Tab.Pane loading>Dashboard</Tab.Pane>
        },
        {
          menuItem: "Transactions",
          render: () => (
            <Tab.Pane>
              <TransactionTable />
            </Tab.Pane>
          )
        },
        {
          menuItem: "Layers",
          render: () => <Tab.Pane loading>Layers</Tab.Pane>
        },
        {
          menuItem: "Activation Functions",
          render: () => <Tab.Pane loading>Activation Functions</Tab.Pane>
        }
      ]
    };
  }
  render() {
    const { panes } = this.state;
    return (
      <Tab
        menu={{
          fluid: true,
          color: "teal",
          vertical: true,
          pointing: true
        }}
        menuPosition="left"
        panes={panes}
        grid={{ paneWidth: 13, tabWidth: 3 }}
        defaultActiveIndex="1"
      />
    );
  }
}
