import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';
import UserTable from './user-table/';

export default class ManagePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panes: [
        {
          menuItem: 'Dashboard',
          render: () => <Tab.Pane loading>Dashboard</Tab.Pane>
        },
        {
          menuItem: 'Users',
          render: () => (
            <Tab.Pane>
              <UserTable />
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
          color: 'teal',
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
