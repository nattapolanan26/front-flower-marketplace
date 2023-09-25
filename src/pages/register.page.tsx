import logo from "@/assets/logo/flower-1x.svg";
import { useRegisterUserMutation } from "@/redux/services/authApi";
import { LockOutlined } from "@ant-design/icons";
import { Button, Form, Input, Steps, message, theme } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    title: "Information",
    content: "First-content",
  },
  {
    title: "Set password",
    content: "Second-content",
  },
];

export type RegisterInput = {
  name?: string;
  lastname?: string;
  citizenId?: string;
  mobile?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [step, setStep] = useState<RegisterInput>({
    name: "",
    lastname: "",
    citizenId: "",
    mobile: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  // ? Hook Register Mutation
  const [registerUser, { isLoading, isSuccess, error, isError }] = useRegisterUserMutation();

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onFinish = async (values: RegisterInput) => {
    // const url = `${import.meta.env.VITE_BASE_URL}/api/auth/register`;

    let result = {
      ...step,
      ...values
    };

    setStep(result);

    if (current > 0) {
      // ? Executing the RegisterUser Mutation
      registerUser(result);
      // try {
        // const res = await axios.post(url, result);
        // console.log('response : ', res)
        // if (res.data.status === 'success') {
        //   message.success("Register complete!", 1.5).then(() => navigate('/login'));
        // }
      // } catch (err: any) {
      //   if(err) {
      //     prev()
      //     message.error(err.response.data.status + " : " + err.response.data.message);
      //   }
      // }
    } else {
      next();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      message.success("Register complete!")
      navigate('/login')
    }

    if (isError) {
      console.log(error);
      if (Array.isArray((error as any).data.error)) {
        (error as any).data.error.forEach((el: any) =>
          message.error(el.message)
        );
      } else {
        message.error((error as any).data.message)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    lineHeight: "260px",
    color: token.colorTextTertiary,
    marginTop: "2rem",
  };

  return (
    <div className="content-center">
      <Form
        name="register"
        style={{ maxWidth: 400, width: "100%" }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <img src={logo} alt="Flower" width="64.375px" height="64.375px" />
          <p style={{ marginTop: 12 }}>
            Flower4ever is the flower marketplace for you forever.
          </p>
        </div>
        <Steps current={current} items={items} />
        <div style={contentStyle}>
          {current === 0 ? (
            <>
              <Form.Item<RegisterInput>
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input size="large" placeholder="Name" />
              </Form.Item>

              <Form.Item<RegisterInput>
                name="lastname"
                rules={[
                  { required: true, message: "Please input your lastname!" },
                ]}
              >
                <Input size="large" placeholder="Lastname" />
              </Form.Item>

              <Form.Item<RegisterInput>
                name="citizenId"
                rules={[
                  { required: true, message: "Please input your citizenID!" },     
                  { min: 13, message: 'CitizenId must be more than 13 characters' },
                  { max: 13, message: 'CitizenId must be less than 13 characters' }
                ]}
              >
                <Input size="large" placeholder="Citizen ID" />
              </Form.Item>

              <Form.Item<RegisterInput>
                name="email"
                rules={[
                  {type: 'email', message: 'Please check format email!'},
                  { required: true, message: "Please input your email!" }
                ]}
              >
                <Input size="large" placeholder="Email" />
              </Form.Item>

              <Form.Item<RegisterInput>
                name="mobile"
                rules={[
                  { required: false, message: "Please input your mobile!" },
                  { max: 10, message: "Mobile must be less than 10 characters!" },
                ]}
              >
                <Input size="large" placeholder="Mobile" />
              </Form.Item>
            </>
          ) : (
            <>
              <Form.Item<RegisterInput>
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                  { min: 8, message: "Password at least 8 characters!" },
                  { 
                    pattern: new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/), 
                    message: 'Must have atleast 1 uppercase, 1 lowercase letter and 1 number and one symbol/special'
                  }
                ]}
                hasFeedback
              >
                <Input.Password
                  size="large"
                  placeholder="Password"
                  prefix={<LockOutlined />}
                />
              </Form.Item>

              <Form.Item<RegisterInput>
                name="passwordConfirm"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  { min: 8, message: "Password at least 8 characters!" },
                  { 
                    pattern: new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/), 
                    message: 'Must have atleast 1 uppercase, 1 lowercase letter and 1 number and one symbol/special'
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The new password that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Confirm Password"
                  prefix={<LockOutlined />}
                />
              </Form.Item>
            </>
          )}
        </div>
        <div style={{ marginTop: 24 }}>
          {current < steps.length - 1 && (
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Submit
              </Button>
            </Form.Item>
          )}
          {current === steps.length - 1 && (
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Register
              </Button>
            </Form.Item>
          )}
          {current > 0 && (
            <Button style={{ width: "100%" }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

export default RegisterPage;
