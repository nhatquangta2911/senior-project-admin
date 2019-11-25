/* eslint-disable no-unused-vars */
import React, { Component, Segment } from 'react';
import { Modal, Button } from 'semantic-ui-react';

export default class ModalConfirm extends Component {
  render() {
    const { header, content } = this.props;

    return (
      <Segment>
        <Modal.Header>{header || 'Confirm delete'}</Modal.Header>
        <Modal.Content>
          {content || 'Are you sure you want to delete?'}}
        </Modal.Content>
        <Modal.Actions>
          <Button negative>No</Button>
          <Button
            positive
            content="Yes"
            labelPosition="right"
            icon="checkmark"
          />
        </Modal.Actions>
      </Segment>
    );
  }
}
