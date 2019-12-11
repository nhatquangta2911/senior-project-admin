import React, { Component } from "react";
import { TableHeader } from "../../../components";
import {
  Form,
  Dropdown,
  Button,
  Table,
  Divider,
  Icon,
  TextArea,
  Dimmer,
  Loader
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
      epochs: [0, 10, 20, 30, 40, 45, 50, 60, 70],
      isLoading: false,
      historyData: ""
    };
  }

  async componentDidMount() {
    try {
      const data = await ServerlessTransactionApi.getCurrent();
      this.setState({
        historyData: data.data && data.data.nodes && data.data.nodes[0]
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
      .then(async res => {
        this.props.toast.addToast(
          `Update successfully${
            res.data.duration ? ` in ${res.data.duration} ms` : ""
          }`,
          { appearance: "success" }
        );
        const body = {
          node1: node1,
          node2: node2,
          node3: node3,
          af1: af1,
          af2: af2,
          af3: af3,
          epochs: epoch,
          accuracy: res.data.accuracy.toFixed(4),
          loss: res.data.loss.toFixed(4),
          note: this.state.note
        };
        const result = await ServerlessTransactionApi.add(body);
        this.props.toast.addToast(
          `Accuracy: ${res.data.accuracy.toFixed(
            4
          )}, Loss: ${res.data.loss.toFixed(4)}`,
          { appearance: "info" }
        );
        this.setState({
          isLoading: false
        });
        this.props.history.push("/history");
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
    console.log(this.state.historyData);
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
                placeholder={`Current Value: ${(historyData &&
                  historyData.node1) ||
                  0}`}
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
                placeholder={`Current Value: ${(historyData &&
                  historyData.node2) ||
                  0}`}
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
                placeholder={`Current Value: ${(historyData &&
                  historyData.node3) ||
                  0}`}
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
                placeholder={`Current Value: ${(historyData &&
                  historyData.af1) ||
                  ""}`}
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
                placeholder={`Current Value: ${(historyData &&
                  historyData.af2) ||
                  ""}`}
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
                placeholder={`Current Value: ${(historyData &&
                  historyData.af3) ||
                  ""}`}
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
                style={{ width: 50, textAlign: "center" }}
                id="epoch"
                color="teal"
                options={epochsResult}
                defaultValue={(historyData && historyData.epochs) || 0}
                onChange={(e, { id, value }) =>
                  this.setState({
                    [id]: value
                  })
                }
              />{" "}
              epochs
            </span>
            <TextArea
              id="note"
              placeholder="Add some note ..."
              row={3}
              onChange={(e, { id, value }) => this.setState({ [id]: value })}
              style={{ maxHeight: 250, minHeight: 100, margin: "10px 0" }}
            />
            <Divider />
            <Dimmer active={isLoading} inverted>
              <Loader content="Training" />
            </Dimmer>
            <Form.Group widths="4" style={{ position: "relative" }}>
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
      </div>
    );
  }
}

export default withHooksHOC(withRouter(TrainTable));
