import React, { useState } from 'react';
import { NextPage } from 'next';
import { Menu, Form, Input, Button } from 'antd';
import { useMutation } from 'react-query';
import { changePassword } from '@services/apiUser';
import { UserOutlined, CheckOutlined } from '@ant-design/icons';

const Settings: NextPage = () => {
  const list = [
    {
      key: "account",
      label: "Tài khoản",
      icon: <UserOutlined />
    },
  ];

  const [form] = Form.useForm();

  const [oldPassWrong, setOldPassWrong] = useState(false);

  const changePassMutation = useMutation({
    mutationFn: (formData) => changePassword(formData),
    // mutationFn: (formData) => Promise.response(formData),
    onSuccess: (data) => {
      setOldPassWrong(false);
      setTimeout(() => {
        changePassMutation.reset(); // Change status to idle
        form.resetFields();
      }, 1500);
    },
    onError: (error) => {
      if (error.response?.data && error.response.data.old_password) {
        setOldPassWrong(true);
        console.log("Change password error: Wrong password");
      }
      else {
        console.log(`Change password error: ${error}`);
      }
    },
  });
    

  const handleChangePassword = () => {
    setOldPassWrong(false);
    form
      .validateFields()
      .then((formData) => {
        changePassMutation.mutate({
          old_password: formData.old_password,
          new_password: formData.new_password
        })
      });
  };

  return (
    <div className="split-layout no-padding">
      <div className="split-layout-item flex-xs scroll right-border no-padding">
        <Menu
          mode="inline"
          className="settings-menu"
          defaultSelectedKeys={["account"]} 
          items={list} 
          />
      </div>
      <div className="split-layout-item flex-xl scroll">
        <div className="form-page">
          <h1>Tài khoản</h1>
          <h2>Thay đổi mật khẩu</h2>
          <Form
            form={form}
            layout="vertical" 
            className="form-page-input"
            onFinish={handleChangePassword}
            scrollToFirstError
            validateTrigger="onBlur"
            validateMessages={{
              required: "Mục này không được để trống",
              string: {
                min: "Mật khẩu phải có ít nhất ${min} ký tự"
              }
            }}
          >
            <Form.Item
              name="old_password"
              label="Mật khẩu hiện tại"
              validateStatus={oldPassWrong ? "error" : "success"}
              help={oldPassWrong && "Mật khẩu nhập không chính xác. Xin vui lòng thử lại."}
              rules={[
                {
                  required: true,
                }
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="new_password"
              label="Mật khẩu mới"
              rules={[
                { 
                  required: true,
                  min: 12 
                }
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="new_password_confirm"
              label="Xác nhận mật khẩu mới"
              hasFeedback
              rules={[
                {
                  required: true,
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("new_password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Mật khẩu xác nhận không khớp. Xin vui lòng thử lại."));
                  }
                })
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit"
                loading={changePassMutation.isLoading} 
                icon={changePassMutation.isSuccess && <CheckOutlined />}
              >
                {changePassMutation.isSuccess ? "Thay đổi thành công" : "Lưu thay đổi"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Settings;