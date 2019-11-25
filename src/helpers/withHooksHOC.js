import React from "react";
import { useToasts } from "react-toast-notifications";

export const withHooksHOC = Component => {
  return props => {
    const toast = useToasts();
    return <Component toast={toast} {...props} />;
  };
};
