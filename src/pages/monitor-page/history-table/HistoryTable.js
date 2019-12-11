import React, { Component } from "react";
import { TableHeader } from "../../../components";
import {
  Table,
  Icon,
  Pagination,
  Dimmer,
  Loader,
  Segment,
  Popup
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import ServerlessTransactionApi from "../../../api/ServerlessTransactionApi";
import { withHooksHOC } from "../../../helpers/withHooksHOC";
import TimeHelper from "../../../helpers/TimeHelper";

class HistoryTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      total: 0,
      historyData: ""
    };
  }

  async componentDidMount() {
    try {
      const data = await ServerlessTransactionApi.getByPage(1);
      this.setState({
        total: data.data.totalPage,
        historyData: data.data,
        isLoading: false
      });
    } catch (error) {
      this.props.toast.addToast(error.message, { appearance: "error" });
    }
  }

  handlePageChange = async (event, { activePage }) => {
    this.setState({ isLoading: true });
    try {
      const result = await ServerlessTransactionApi.getByPage(activePage);
      this.setState({
        historyData: result.data,
        isLoading: false
      });
    } catch (error) {
      this.props.toast.addToast(error.message, { appearance: "error" });
    }
  };

  render() {
    const { historyData, tempData, isLoading } = this.state;
    const historyResult =
      historyData.nodes &&
      historyData.nodes.map(h => (
        <Table.Row key={h._id}>
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
          <Table.Cell textAlign="center">{h.accuracy}</Table.Cell>
          <Table.Cell textAlign="center">{h.loss}</Table.Cell>
          <Popup
            wide
            content={TimeHelper.transferAgo(Date.parse(h.createdAt))}
            header={h.note}
            trigger={
              <Table.Cell textAlign="center">
                <Icon color="teal" size="30" name="list alternate outline" />
              </Table.Cell>
            }
          />
        </Table.Row>
      ));
    return (
      <div style={{ padding: "10px 15px" }}>
        <TableHeader
          content="History"
          subheader="See how the model has changed"
          total={`${historyData.total || 0}`}
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
                Accuracy
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center" rowSpan="3">
                Loss
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
          <Dimmer active={isLoading} inverted>
            <Loader />
          </Dimmer>
        </Table>
        <Pagination
          defaultActivePage={1}
          totalPages={this.state.total}
          onPageChange={this.handlePageChange}
          size="tiny"
        />
      </div>
    );
  }
}

export default withHooksHOC(withRouter(HistoryTable));
