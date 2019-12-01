import React, { Component } from 'react';
import { TableHeader } from '../../../components';
import {
  Table,
  Button,
  Icon,
  Dimmer,
  Pagination,
  Modal,
  Form,
  Dropdown,
  Header,
  Segment,
  Loader
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { withHooksHOC } from '../../../helpers/withHooksHOC';
import LayerApi from '../../../api/LayerApi';
import ActivationFunctionApi from '../../../api/ActivationFunctionApi';
import TransactionApi from '../../../api/TransactionApi';

class TransactionTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isEdit: false,
      activePage: 1,
      data: [],
      activationFunctions: [],
      inputLayers: [],
      outputLayers: [],
      value: {},
      result: {},
      defaultValue: {},
      isLoading: true,
      id: ''
    };
  }

  async componentDidMount() {
    try {
      const data = await TransactionApi.getAll();
      this.setState({
        data: data.data.transactions.map(t => {
          let object = {};
          object['id'] = t._id;
          object['order'] = data.data.transactions.indexOf(t) + 1;
          object['inputLayer'] = t.inputLayer;
          object['outputLayer'] = t.outputLayer;
          object['activationFunction'] = t.activationFunction;
          return object;
        }),
        isLoading: false
      });
    } catch (error) {
      console.log(error);
      this.props.toast.addToast('Something went wrong', {
        appearance: 'error'
      });
    }
  }

  // onChange => for the output to send to the server
  handleChange = (e, data) => {
    let result = this.state.result;
    let value = this.state.value;
    result[data.id + 'Id'] = data.value;
    value[data.id] = data.searchQuery;
    this.setState({
      result,
      value
    });
  };

  handleCancel = () => {
    this.setState({
      value: {},
      result: {},
      isEdit: false
    });
  };

  handleSubmit = async () => {
    try {
      this.setState({
        isEdit: false,
        isLoading: true
      });
      this.props.toast.addToast('Success', {
        appearance: 'success'
      });
      await TransactionApi.update(this.state.id, this.state.result);
      window.location.reload();
    } catch (error) {
      this.props.toast.addToast('Something went wrong. Please try again.', {
        appearance: 'error'
      });
    }
  };

  handleClose = () => this.setState({ isEdit: false, value: {} });

  handlePageChange = (event, { activePage }) => {
    this.props.toast.addToast(`PAGE ${activePage}`, { appearance: 'info' });
  };

  handleDelete = async cell => {
    this.setState({
      id: cell.id
    });
  };

  handleEdit = async cell => {
    const defaultValue = this.state.data.filter(d => d.id === cell.id)[0];
    this.setState({
      isEdit: true,
      defaultValue,
      id: cell.id
    });
    if (this.state.inputLayers.length === 0) {
      const inputLayers = await LayerApi.getAll();
      const outputLayers = await LayerApi.getAll();
      const activationFunctions = await ActivationFunctionApi.getAll();
      this.setState({
        isLoading: false,
        inputLayers: inputLayers.data.layers.map(l => {
          let object = {};
          object['id'] = l._id;
          object['value'] = l._id;
          object['text'] = l.name;
          return object;
        }),
        outputLayers: outputLayers.data.layers.map(l => {
          let object = {};
          object['id'] = l._id;
          object['value'] = l._id;
          object['text'] = l.name;
          return object;
        }),
        activationFunctions: activationFunctions.data.activationFunctions.map(
          a => {
            let object = {};
            object['id'] = a._id;
            object['value'] = a._id;
            object['text'] = a.name;
            return object;
          }
        )
      });
    }
  };

  show = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  render() {
    const {
      open,
      isEdit,
      activePage,
      data,
      defaultValue,
      inputLayers,
      outputLayers,
      activationFunctions,
      value,
      isLoading,
      id
    } = this.state;

    console.log({ defaultValue });
    const tableData = data.map(cell => (
      <Table.Row key={cell.order}>
        <Table.Cell textAlign="center">{cell.order}</Table.Cell>
        <Table.Cell>{cell.inputLayer && cell.inputLayer.name}</Table.Cell>
        <Table.Cell>{cell.outputLayer && cell.outputLayer.name}</Table.Cell>
        <Table.Cell>
          {cell.activationFunction && cell.activationFunction.name}
        </Table.Cell>
        <Table.Cell>
          <Button.Group size="tiny">
            <Button
              animated="fade"
              color="green"
              onClick={() => this.handleEdit(cell)}
            >
              <Button.Content visible>
                <Icon name="edit" />
              </Button.Content>
              <Button.Content hidden>Edit</Button.Content>
            </Button>
            <Button.Or text="or" />
            <Button
              animated="fade"
              color="red"
              onClick={() => {
                this.show();
                this.handleDelete(cell);
              }}
            >
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
    //TODO: Modal Confirm
    return (
      <div>
        <Dimmer.Dimmable as={Segment} dimmed={isEdit} blurring>
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
                onClick={async () => {
                  this.close();
                  window.location.reload();
                  this.props.toast.addToast('Deleted', {
                    appearance: 'success'
                  });
                  await TransactionApi.delete(id);
                }}
              />
            </Modal.Actions>
          </Modal>
          <TableHeader
            content="Transactions"
            subheader="Monitor all the transactions"
            total={data.length}
          />
          <Table singleLine compact striped>
            <Table.Header>
              <Table.HeaderCell width={1} textAlign="center">
                Order
              </Table.HeaderCell>
              <Table.HeaderCell width={4}>Input Layer</Table.HeaderCell>
              <Table.HeaderCell width={4}>Output Layer</Table.HeaderCell>
              <Table.HeaderCell width={5}>
                Activation Functions
              </Table.HeaderCell>
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
            inverted
            active={isEdit}
            onClickOutside={() => this.handleClose()}
          >
            <Header as="h2" color="teal">
              <Icon name="settings" color="teal" />
              <Header.Content style={{ textAlign: 'left' }}>
                Edit transaction
                <Header.Subheader>
                  Change the input/output layer and activation function
                </Header.Subheader>
              </Header.Content>
            </Header>
            <Form style={{ textAlign: 'left' }}>
              <Form.Group widths="equal">
                <Dropdown
                  id="inputLayer"
                  options={inputLayers}
                  value={value.inputLayer}
                  search
                  selection
                  clearable
                  noResultsMessage="No Items"
                  placeholder="Input Layer"
                  onChange={this.handleChange}
                />
                <Dropdown
                  id="outputLayer"
                  options={outputLayers}
                  value={value.outputLayer}
                  search
                  selection
                  clearable
                  noResultsMessage="No Items"
                  placeholder="Output Layer"
                  onChange={this.handleChange}
                />
                <Dropdown
                  id="activationFunction"
                  options={activationFunctions}
                  value={value.activationFunction}
                  onChange={this.handleChange}
                  search
                  selection
                  clearable
                  noResultsMessage="No Items"
                  placeholder="Activation Function"
                />
              </Form.Group>
              <Form.TextArea
                label="Note"
                style={{ minHeight: 100, maxHeight: 200, textAlign: 'left' }}
                placeholder="Leave the reason for changing..."
              />
              <Form.Group style={{ marginTop: 10 }}>
                <Form.Button onClick={this.handleCancel}>Cancel</Form.Button>
                <Form.Button color="teal" onClick={this.handleSubmit}>
                  OK
                </Form.Button>
              </Form.Group>
            </Form>
          </Dimmer>
        </Dimmer.Dimmable>
        <Dimmer active={isLoading} inverted>
          <Loader />
        </Dimmer>
      </div>
    );
  }
}

export default withRouter(withHooksHOC(TransactionTable));
