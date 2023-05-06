import react, { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { 
  Card as AntdCard, 
  Button, 
  Modal, 
  Form,
  Input
} from "antd";
import { CloseOutlined } from "@ant-design/icons";

interface ProfileCardFormProps {
  open: boolean,
  closeForm: () => void,
  isAdd: boolean,
  fieldTitle: string,
  fieldItemProps: {
    itemTitle: string,
    contentLayout: string[],
    formLayout: string[],
    labelToAPI: Record<string, string>,
    APIToLabel: Record<string, string>,
    isRequired: Record<string, boolean>,
  },
  fieldItems?: Record<string, unknown>,
  postFunction: (input: Record<string, unknown>) => void,
};

// Form for editing or adding for different fields in profile page
export const ProfileCardForm: React.FC<ProfileCardFormProps> = ({ open, closeForm, isAdd, fieldTitle, fieldItemProps, fieldItems, postFunction }) => {
  const form = Form.useForm();
  const getLabel = (itemName: string, isLowerCase: boolean) => {
    const label = fieldItemProps.APIToLabel[itemName];
    if (label === "itemTitle") {
      return isLowerCase ? fieldItemProps.itemTitle?.toLowerCase() : fieldItemProps.itemTitle;
    }
    return isLowerCase ? label?.toLowerCase() : label;
  };

  const onCancel = () => {
    closeForm();
  };

  return (
    <Modal
      className="main-panel-form"
      title={(isAdd ? "Thêm " :"Chỉnh Sửa ") + fieldTitle}
      centered
      open={open}
      onCancel={onCancel}
    >
      <Form
        name="profileForm"
        layout="vertical"
      >
        {
          fieldItemProps.formLayout.map((itemName) => (
            <Form.Item 
              name={itemName}
              label={getLabel(itemName, false)}
              rules={[
                {
                  required: fieldItemProps.isRequired[itemName],
                  message: "Vui lòng nhập " + getLabel(itemName, true),
                },
              ]}
            >
              <Input />
            </Form.Item>
          ))
        }
      </Form>
    </Modal>
  );
};
