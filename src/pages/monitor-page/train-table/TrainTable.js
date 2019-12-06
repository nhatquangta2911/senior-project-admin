import React, { Component } from "react";
import { TableHeader } from "../../../components";
import { Form, Dropdown, Button } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import DjangoApi from "../../../api/DjangoApi";
import { withHooksHOC } from "../../../helpers/withHooksHOC";

class TrainTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: ["relu", "sigmoid", "tanh", "linear", "step", "maxout"],
      epochs: [10, 20, 30, 40, 50, 60, 70],
      isLoading: false
    };
  }

  handleSubmit = async () => {
    this.setState({
      isLoading: true
    });
    const { node1, node2, node3, af1, af2, af3, epoch } = this.state;
    try {
      const result = await DjangoApi.train({
        node1,
        node2,
        node3,
        af1,
        af2,
        af3,
        epochs: epoch
      });
      this.props.toast.addToast(
        "Update successfully. It might take at least 3 minutes to update the model.",
        { appearance: "success" }
      );
      this.setState({
        isLoading: false
      });
      this.props.history.push("/log");
    } catch (err) {
      this.props.toast.addToast("Something went wrong. Please try again.", {
        appearance: "error"
      });
      this.setState({
        isLoading: false
      });
    }
  };

  render() {
    const { options, epochs, isLoading } = this.state;
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
        <div style={{ margin: "30px 0" }}>
          <Form>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                id="node1"
                label="Amount of Nodes (Layer 1)"
                placeholder="Current Value: 400"
                onChange={(e, { id, value }) =>
                  this.setState({
                    [id]: parseInt(value)
                  })
                }
              />
              <Form.Input
                fluid
                id="node2"
                label="Amount of Nodes (Layer 2)"
                placeholder="Current Value: 800"
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
                    [id]: parseInt(value)
                  })
                }
              />
              <Dropdown
                fluid
                style={{ margin: "0 6px" }}
                id="af2"
                label="Activation Function (Layer 1)"
                search
                clearable
                noResultsMessage="No Items"
                placeholder="Current Value: relu"
                selection
                options={optionResult}
                onChange={(e, { id, value }) =>
                  this.setState({
                    [id]: parseInt(value)
                  })
                }
              />
              <Dropdown
                fluid
                style={{ margin: "0 6px" }}
                id="af3"
                label="Activation Function (Layer 1)"
                search
                clearable
                noResultsMessage="No Items"
                placeholder="Current Value: relu"
                selection
                options={optionResult}
                onChange={(e, { id, value }) =>
                  this.setState({
                    [id]: parseInt(value)
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
      </div>
    );
  }
}

export default withHooksHOC(withRouter(TrainTable));
