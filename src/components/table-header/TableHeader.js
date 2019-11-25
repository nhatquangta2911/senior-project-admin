/* eslint-disable no-undef */
import React from 'react';
import { Header, Label } from 'semantic-ui-react';
import { useToasts } from 'react-toast-notifications';

const TableHeader = ({ content, subheader, total }) => {
  const { addToast } = useToasts();
  return (
    <Header as="h3" dividing>
      {content}
      <Label
        color="teal"
        circular
        onClick={() =>
          addToast('Test', { appearance: 'info', autoDismiss: true })
        }
      >
        {total}
      </Label>
      <Header.Subheader>{subheader}</Header.Subheader>
    </Header>
  );
};

export default TableHeader;
