import React from "react";
import { Breadcrumb, Spin, Alert } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { useGlobals } from "./GlobalContext";

const names = {
  "/": "Browse / Tracks",
  "/person": "Profile",
  "/login": "Login form",
  "/invoice": "Requested items",
  "/add-track": "Add track form",
};

const CurrentPageHeader = () => {
  const location = useLocation();
  const { loading } = useGlobals();

  return (
    <Breadcrumb
      style={{ height: 50, paddingBottom: 20, fontWeight: 600, fontSize: 20 }}
    >
      <Breadcrumb.Item>
        {names[location.pathname]}
        <span style={{ padding: 10 }}>{loading && <Spin />}</span>
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};

export { CurrentPageHeader };
