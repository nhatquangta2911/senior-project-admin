import React, { Component } from "react";
import { Tab } from "semantic-ui-react";
import TransactionTable from "./transaction-table";
import LayerTable from "./layer-table";
import ActivationTable from "./activation-table";
import TrainTable from "./train-table/TrainTable";
import HistoryTable from "./history-table/HistoryTable";

export default class MonitorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panes: [
        {
          menuItem: "History",
          render: () => (
            <Tab.Pane>
              <HistoryTable />
            </Tab.Pane>
          )
        },
        {
          menuItem: "Training",
          render: () => (
            <Tab.Pane>
              <TrainTable />
            </Tab.Pane>
          )
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
          menuItem: "Activation Functions",
          render: () => (
            <Tab.Pane>
              <ActivationTable />
            </Tab.Pane>
          )
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
        defaultActiveIndex="0"
      />
    );
  }
}
