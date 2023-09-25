import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import logo from "@/assets/logo/flower-1x.svg";
import { useLoginUserMutation } from "@/redux/services/authApi";
import { useLocation, useNavigate } from "react-router-dom";

export type LoginInput = {
  email?: string;
  password?: string;
};

const Login: React.FC = () => {
  // ** Hook
  const navigate = useNavigate();
  const location = useLocation();

  // ? API Login Mutation
  const [loginUser, { isLoading, isError, error, isSuccess }] = useLoginUserMutation();

  const from = ((location.state as any)?.from.pathname as string) || '/store';

  useEffect(() => {
    if (isSuccess) {
      message.success('You successfully logged in');
      navigate(from)
    }
    if (isError) {
      if (Array.isArray((error as any).data.error)) {
        (error as any).data.error.forEach((el: any) =>
          message.error(el.message)
        );
      } else {
        message.error((error as any).data.message);
      }
    }
  }, [isLoading]);

  const onFinish = (values: LoginInput) => {
    console.log("Success:", values);
    loginUser(values);
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="content-center">
      <Form
        name="login"
        style={{ maxWidth: 400, width: "100%" }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div style={{ textAlign: "center" }}>
          <img src={logo} alt="Flower" width="64.375px" height="64.375px" />
          <p style={{ marginTop: 12 }}>
            Flower4ever is the flower marketplace for you forever.
          </p>
        </div>
        <Form.Item<LoginInput>
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input
            size="large"
            placeholder="email"
            prefix={<UserOutlined />}
          />
        </Form.Item>

        <Form.Item<LoginInput>
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 8, message: "Password at least 8 characters!" },
            {
              pattern: new RegExp(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/
              ),
              message:
                "Must have atleast 1 uppercase, 1 lowercase letter and 1 number and one symbol/special",
            },
          ]}
        >
          <Input.Password
            size="large"
            placeholder="Password"
            prefix={<LockOutlined />}
          />
        </Form.Item>

        {/* <Form.Item<LoginInput>
        name="remember"
        valuePropName="checked"
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item> */}
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Sign in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
