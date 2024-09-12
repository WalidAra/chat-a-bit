import { Provider } from "react-redux";
import React from "react";
import { Store } from "@/core";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={Store}> {children} </Provider>;
};

export default ReduxProvider;
