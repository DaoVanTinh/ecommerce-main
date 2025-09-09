import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";

const NotFoundPage = () => {
  const navigation = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, page not fund"
      extra={
        <Button onClick={() => navigation("auth/login")} type="primary">
          Back to login page
        </Button>
      }
    />
  );
};

export default NotFoundPage;
