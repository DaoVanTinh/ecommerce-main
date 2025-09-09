import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { login } from "../../services";
import { saveToLocalStorage } from "../../utils";
import { toast } from "react-hot-toast";

const Login = () => {
  const [form] = Form.useForm();
  const navigation = useNavigate();

  const onFinish = async () => {
    try {
      const username = form.getFieldValue("username");
      const password = form.getFieldValue("password");

      const result = await login(username, password);

      if (result.data.isSuccess == true) {
        toast.success("Success");
        saveToLocalStorage("token", JSON.stringify(result.data.token));
        navigation("/product-management");
      } else {
        toast.error("Đăng nhập thất bại");
      }
    } catch (error) {
      toast.error("Đăng nhập thất bại");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      className=""
      style={{
        marginTop: "20px",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Đăng nhập</h1>
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="UserName"
            name="username"
            rules={[
              {
                required: true,
                message: "Pls input your name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Pls input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
