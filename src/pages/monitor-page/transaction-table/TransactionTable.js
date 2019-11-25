import React, { Component } from 'react';
import { TableHeader } from '../../../components';
import {
  Table,
  Button,
  Icon,
  Dimmer,
  Loader,
  Pagination,
  Modal
} from 'semantic-ui-react';
import { useToasts } from 'react-toast-notifications';

export default class TransactionTable extends Component {
  state = {
    open: false,
    isloading: false,
    activePage: 1,
    data: [
      {
        order: 1,
        inputLayer: 'Layer 1',
        outputLayer: 'Layer 5',
        activationFunction: 'ReLU'
      },
      {
        order: 2,
        inputLayer: 'Layer 4',
        outputLayer: 'Layer 13',
        activationFunction: 'Sigmoid'
      },
      {
        order: 3,
        inputLayer: 'Layer 2',
        outputLayer: 'Layer 3',
        activationFunction: 'Tanh'
      },
      {
        order: 4,
        inputLayer: 'Layer 8',
        outputLayer: 'Layer 4',
        activationFunction: 'Maxout'
      },
      {
        order: 5,
        inputLayer: 'Layer 2',
        outputLayer: 'Layer 9',
        activationFunction: 'Sigmoid'
      }
    ]
  };

  handleOpen = () => {
    this.setState({ isLoading: true });
  };
  handleClose = () => this.setState({ isLoading: false });

  handlePageChange = (event, { activePage }) => {
    this.setState({
      activePage,
      isLoading: true
    });
    setTimeout(() => {
      this.setState({
        isLoading: false
      });
    }, 500);
  };

  handleEdit = () => {
    this.setState({
      isLoading: true
    });
    setTimeout(() => {
      this.setState({
        isLoading: false
      });
    }, 500);
  };

  handleEmergeModal = () => {
    this.setState({
      open: true
    });
  };

  show = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  render() {
    const { open, isLoading, activePage, data } = this.state;
    const tableData = data.map(cell => (
      <Table.Row key={cell.order}>
        <Table.Cell textAlign="center">{cell.order}</Table.Cell>
        <Table.Cell>{cell.inputLayer}</Table.Cell>
        <Table.Cell>{cell.outputLayer}</Table.Cell>
        <Table.Cell>{cell.activationFunction}</Table.Cell>
        <Table.Cell>
          <Button.Group size="tiny">
            <Button
              animated="fade"
              color="green"
              onClick={() => this.handleEdit()}
            >
              <Button.Content visible>
                <Icon name="edit" />
              </Button.Content>
              <Button.Content hidden>Edit</Button.Content>
            </Button>
            <Button.Or text="or" />
            <Button animated="fade" color="red" onClick={() => this.show()}>
              <Button.Content visible>
                <Icon name="delete" />
              </Button.Content>
              <Button.Content hidden>
                <Icon name="remove circle" />
              </Button.Content>
            </Button>
          </Button.Group>
        </Table.Cell>
      </Table.Row>
    ));
    return (
      <div>
        <Modal size="tiny" open={open} onClose={() => this.close()}>
          <Modal.Header>Confirm delete</Modal.Header>
          <Modal.Content>Are you sure you want to delete?</Modal.Content>
          <Modal.Actions>
            <Button
              negative
              onClickOutside={() => this.close()}
              onClick={() => this.close()}
            >
              No
            </Button>
            <Button
              positive
              content="Yes"
              labelPosition="right"
              icon="checkmark"
              onClick={useToasts => {
                this.close();
                useToasts().addToast('Demo', {
                  appearance: 'info',
                  autoDismiss: true
                });
              }}
            />
          </Modal.Actions>
        </Modal>
        <TableHeader
          content="Transactions"
          subheader="Monitor all the transactions"
          total="27"
        />
        <Table singleLine compact striped>
          <Table.Header>
            <Table.HeaderCell width={1} textAlign="center">
              Order
            </Table.HeaderCell>
            <Table.HeaderCell width={4}>Input Layer</Table.HeaderCell>
            <Table.HeaderCell width={4}>Output Layer</Table.HeaderCell>
            <Table.HeaderCell width={5}>Activation Functions</Table.HeaderCell>
            <Table.HeaderCell width={2}></Table.HeaderCell>
          </Table.Header>
          <Table.Body>{tableData}</Table.Body>
        </Table>
        <Pagination
          defaultActivePage={activePage}
          totalPages={10}
          onPageChange={this.handlePageChange}
          size="tiny"
        />
        <Dimmer
          active={isLoading}
          inverted
          onClickOutside={() => this.handleClose()}
        >
          <Loader>Loading</Loader>
        </Dimmer>
      </div>
    );
  }
}
