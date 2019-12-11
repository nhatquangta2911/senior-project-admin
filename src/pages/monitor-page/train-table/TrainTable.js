import React, { Component } from "react";
import { TableHeader } from "../../../components";
import {
  Form,
  Dropdown,
  Button,
  Table,
  Divider,
  Icon
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import DjangoApi from "../../../api/DjangoApi";
import ServerlessTransactionApi from "../../../api/ServerlessTransactionApi";
import { withHooksHOC } from "../../../helpers/withHooksHOC";
import TimeHelper from "../../../helpers/TimeHelper";

class TrainTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: ["relu", "sigmoid", "tanh", "linear", "step", "maxout"],
      epochs: [10, 20, 30, 40, 50, 60, 70],
      isLoading: false,
      historyData: ""
    };
  }

  async componentDidMount() {
    try {
      const data = await ServerlessTransactionApi.getAll();
      this.setState({
        historyData: data.data
      });
    } catch (error) {
      this.props.toast.addToast(error.message, { appearance: "error" });
    }
  }

  handleSubmit = () => {
    this.props.toast.addToast(
      `Updating Modal. It might take a little while to update the model.`,
      { appearance: "info", autoDismissTimeout: 5000 }
    );
    this.setState({
      isLoading: true
    });
    const { node1, node2, node3, af1, af2, af3, epoch } = this.state;
    DjangoApi.train({
      node1: node1,
      node2: node2,
      node3: node3,
      af1: af1,
      af2: af2,
      af3: af3,
      epochs: epoch
    })
      .then(res => {
        this.props.toast.addToast(
          `Update successfully${
            res.data.duration ? ` in ${res.data.duration} ms` : ""
          }`,
          { appearance: "success" }
        );
        setTimeout(() => {
          this.props.toast.addToast(
            `Accuracy: ${res.data.accuracy.toFixed(
              4
            )}, Loss: ${res.data.loss.toFixed(4)}`,
            { appearance: "info" }
          );
        }, 3000);
        this.setState({
          isLoading: false
        });
        this.props.history.push("/log");
      })
      .catch(err => {
        this.props.toast.addToast(
          "Something went wrong. Please try again." + err.message,
          {
            appearance: "error"
          }
        );
        this.setState({
          isLoading: false
        });
      });
  };

  render() {
    const { options, epochs, isLoading, historyData } = this.state;
    const historyResult =
      historyData.nodes &&
      historyData.nodes.map(h => (
        <Table.Row>
          <Table.Cell textAlign="center" style={{ color: "orange" }}>
            {h.node1}
          </Table.Cell>
          <Table.Cell textAlign="center">{h.af1}</Table.Cell>
          <Table.Cell textAlign="center" style={{ color: "orange" }}>
            {h.node2}
          </Table.Cell>
          <Table.Cell textAlign="center">{h.af2}</Table.Cell>
          <Table.Cell textAlign="center" style={{ color: "orange" }}>
            {h.node3}
          </Table.Cell>
          <Table.Cell textAlign="center">{h.af3}</Table.Cell>
          <Table.Cell textAlign="center">{h.epochs}</Table.Cell>
          <Table.Cell textAlign="center">
            <Icon color="green" name="checkmark" size="small" />
          </Table.Cell>
          <Table.Cell textAlign="center" style={{ fontSize: "0.9em" }}>
            {TimeHelper.transferAgo(Date.parse(h.createdAt))}
          </Table.Cell>
          <Table.Cell style={{ fontSize: "0.9em" }}>{h.note}</Table.Cell>
        </Table.Row>
      ));
    const optionResult =
      options &&
      options.map(o => ({
        key: o,
        text: o,
        value: o,
        image: {
          avatar: true,
          src:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Symbol_of_a_neuron_with_a_sigmoid_activationfunction.svg/458px-Symbol_of_a_neuron_with_a_sigmoid_activationfunction.svg.png"
        }
      }));
    const epochsResult =
      epochs &&
      epochs.map(e => ({
        key: e,
        text: e,
        value: e
      }));
    console.log(this.state);
    return (
      <div style={{ padding: "10px 15px" }}>
        <div style={{ margin: "10px 0" }}>
          <TableHeader
            content="Update the training parameters"
            subheader="Make sure you had checked thoroughly before updating these information. It might affect the accuracy of the model"
            total="v1"
          />
        </div>
        <div style={{ margin: "30px 0 50px" }}>
          <Form>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                id="node1"
                label="Amount of Nodes (Layer 1)"
                placeholder="Current Value: 800"
                onChange={(e, { id, value }) => {
                  console.log({ e, id, value });
                  this.setState({
                    [id]: parseInt(value)
                  });
                }}
              />
              <Form.Input
                fluid
                id="node2"
                label="Amount of Nodes (Layer 2)"
                placeholder="Current Value: 400"
                onChange={(e, { id, value }) =>
                  this.setState({
                    [id]: parseInt(value)
                  })
                }
              />
              <Form.Input
                fluid
                id="node3"
                label="Amount of Nodes (Layer 3)"
                placeholder="Current Value: 10"
                onChange={(e, { id, value }) =>
                  this.setState({
                    [id]: parseInt(value)
                  })
                }
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Dropdown
                fluid
                style={{ margin: "0 6px" }}
                id="af1"
                label="Activation Function (Layer 1)"
                search
                clearable
                noResultsMessage="No Items"
                placeholder="Current Value: relu"
                selection
                options={optionResult}
                onChange={(e, { id, value }) =>
                  this.setState({
                    [id]: value
                  })
                }
              />
              <Dropdown
                fluid
                style={{ margin: "0 6px" }}
                id="af2"
                label="Activation Function (Layer 2)"
                search
                clearable
                noResultsMessage="No Items"
                placeholder="Current Value: relu"
                selection
                options={optionResult}
                onChange={(e, { id, value }) =>
                  this.setState({
                    [id]: value
                  })
                }
              />
              <Dropdown
                fluid
                style={{ margin: "0 6px" }}
                id="af3"
                label="Activation Function (Layer 3)"
                search
                clearable
                noResultsMessage="No Items"
                placeholder="Current Value: relu"
                selection
                options={optionResult}
                onChange={(e, { id, value }) =>
                  this.setState({
                    [id]: value
                  })
                }
              />
            </Form.Group>
            <span>
              Change into{" "}
              <Dropdown
                style={{ margin: "0 5px" }}
                inline
                id="epoch"
                color="teal"
                options={epochsResult}
                defaultValue={50}
                onChange={(e, { id, value }) =>
                  this.setState({
                    [id]: value
                  })
                }
              />{" "}
              epochs
            </span>
            <Form.Group widths="6" style={{ position: "relative" }}>
              <Button
                color="teal"
                style={{ position: "absolute", right: 0 }}
                loading={isLoading}
                onClick={() => this.handleSubmit()}
              >
                Submit
              </Button>
            </Form.Group>
          </Form>
        </div>
        <Divider />
        <TableHeader
          content="History"
          subheader="See how the model has changed"
          total={`v${historyData.total || 0}`}
        />
        <Table celled structured color="teal" striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="2" textAlign="center">
                Layer 1
              </Table.HeaderCell>
              <Table.HeaderCell colSpan="2" textAlign="center">
                Layer 2
              </Table.HeaderCell>
              <Table.HeaderCell colSpan="2" textAlign="center">
                Layer 3
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center" rowSpan="3">
                Epochs
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center" rowSpan="3">
                Status
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center" rowSpan="3" width="2">
                Date
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center" rowSpan="3">
                Note
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell
                style={{ fontSize: "0.8em" }}
                textAlign="center"
                width="1"
              >
                Nodes
              </Table.HeaderCell>
              <Table.HeaderCell
                style={{ fontSize: "0.8em" }}
                textAlign="center"
                width="2"
              >
                Activation Function
              </Table.HeaderCell>
              <Table.HeaderCell
                style={{ fontSize: "0.8em" }}
                textAlign="center"
                width="1"
              >
                Nodes
              </Table.HeaderCell>
              <Table.HeaderCell
                style={{ fontSize: "0.8em" }}
                textAlign="center"
                width="2"
              >
                Activation Function
              </Table.HeaderCell>
              <Table.HeaderCell
                style={{ fontSize: "0.8em" }}
                textAlign="center"
                width="1"
              >
                Nodes
              </Table.HeaderCell>
              <Table.HeaderCell
                style={{ fontSize: "0.8em" }}
                textAlign="center"
                width="2"
              >
                Activation Function
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{historyResult}</Table.Body>
        </Table>
      </div>
    );
  }
}

export default withHooksHOC(withRouter(TrainTable));
