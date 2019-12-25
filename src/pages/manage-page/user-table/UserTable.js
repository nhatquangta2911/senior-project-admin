import React, { Component } from "react";
import { TableHeader } from "../../../components";
import {
  Table,
  Button,
  Icon,
  Dimmer,
  Loader,
  Pagination,
  Modal,
  Image
} from "semantic-ui-react";
import { withHooksHOC } from "../../../helpers/withHooksHOC";
import AuthApi from "../../../api/AuthApi";

class UserTable extends Component {
  state = {
    open: false,
    isloading: false,
    activePage: 1,
    data: [],
    id: ""
  };

  componentDidMount() {
    this.setState({
      isLoading: true
    });
    AuthApi.getAll()
      .then(res => {
        this.setState({
          data: res.data,
          isLoading: false
        });
      })
      .catch(error => {
        this.props.toast.addToast("Something went wrong", {
          appearance: "error"
        });
      });
  }

  refresh = async () => {
    this.setState({
      isLoading: true
    });
    try {
      const result = await AuthApi.getAll();
      this.setState({
        data: result.data,
        isLoading: false
      });
    } catch (error) {
      this.setState({
        isLoading: false
      });
      this.props.toast.addToast(error.message, { appearance: "error" });
    }
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

  handleActive = async id => {
    try {
      await AuthApi.active(id);
      this.props.toast.addToast("User has been active", {
        appearance: "success"
      });
      this.refresh();
    } catch (error) {
      this.props.toast.addToast(error.message, { appearance: "error" });
      this.setState({
        isLoading: false
      });
    }
  };

  handleEmergeModal = () => {
    this.setState({
      open: true
    });
  };

  show = id => {
    this.setState({ open: true, id });
  };

  close = () => {
    this.setState({
      open: false
    });
  };

  handleBan = async () => {
    try {
      await AuthApi.ban(this.state.id);
      this.props.toast.addToast("User has been banned", {
        appearance: "info"
      });
      this.setState({ open: false });
      this.refresh();
    } catch (error) {
      this.props.toast.addToast(error.message, { appearance: "error" });
      this.setState({ open: false });
    }
  };

  render() {
    const { open, isLoading, activePage, data } = this.state;
    const tableData =
      data &&
      data.map(cell => (
        <Table.Row key={data.indexOf(cell)} negative={cell.status === 0}>
          <Table.Cell textAlign="center">{data.indexOf(cell) + 1}</Table.Cell>
          <Table.Cell>
            <Image src={cell.picture} size="mini" circular />
          </Table.Cell>
          <Table.Cell>{cell.name}</Table.Cell>
          <Table.Cell>{cell.email}</Table.Cell>
          <Table.Cell>
            <Button.Group size="tiny">
              <Button
                disabled={cell.status === 1}
                animated="fade"
                color="green"
                onClick={() => this.handleActive(cell.id)}
              >
                <Button.Content visible>
                  <Icon name="check" />
                </Button.Content>
                <Button.Content hidden>Active</Button.Content>
              </Button>
              <Button.Or text="or" />
              <Button
                disabled={cell.status === 0}
                animated="fade"
                color="red"
                onClick={() => this.show(cell.id)}
              >
                <Button.Content visible>
                  <Icon name="delete" />
                </Button.Content>
                <Button.Content hidden>Ban</Button.Content>
              </Button>
            </Button.Group>
          </Table.Cell>
        </Table.Row>
      ));
    //TODO: Modal Confirm
    return (
      <div>
        <Modal size="tiny" open={open} onClose={() => this.close()}>
          <Modal.Header>Confirm delete</Modal.Header>
          <Modal.Content>
            Are you sure you want to ban this account?
          </Modal.Content>
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
              onClick={() => {
                this.handleBan();
              }}
            />
          </Modal.Actions>
        </Modal>
        <TableHeader
          content="Users"
          subheader="Monitor all the users"
          total={this.state.data.length}
        />
        <Table singleLine compact striped>
          <Table.Header>
            <Table.HeaderCell width={1} textAlign="center">
              Order
            </Table.HeaderCell>
            <Table.HeaderCell width={1}>Avatar</Table.HeaderCell>
            <Table.HeaderCell width={4}>Name</Table.HeaderCell>
            <Table.HeaderCell width={4}>Email</Table.HeaderCell>
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

export default withHooksHOC(UserTable);
