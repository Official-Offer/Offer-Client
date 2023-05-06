import react, { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import { 
  Card as AntdCard, 
  Button, 
  Modal, 
  Form,
  Input,
  Select,
  Checkbox,
  DatePicker
} from "antd";
import { CloseOutlined } from "@ant-design/icons";

interface ProfileCardFormProps {
  open: boolean,
  closeForm: () => void,
  isAdd: boolean,
  fieldTitle: string,
  fieldItemProps: {
    itemTitle: string,
    dataIDLabel: string,
    dataName: string,
    disableEndDate: boolean,
    layout: string[],
    labelToAPI: Record<string, string>,
    APIToLabel: Record<string, string>,
    isRequired: Record<string, boolean>,
  },
  fieldItems?: Record<string, unknown>,
  postFunction: (input: Record<string, unknown>) => void,
  dataArr: Record<string, unknown>[],
};

// Form for editing or adding for different fields in profile page
export const ProfileCardForm: React.FC<ProfileCardFormProps> = ({ open, closeForm, isAdd, fieldTitle, fieldItemProps, fieldItems, postFunction, dataArr }) => {
  // Hooks
  const [form] = Form.useForm();

  const postMutation = useMutation({
    mutationFn: postFunction,
    onSuccess: (data) => console.log(data),
    onError: (err) => console.log(`Submit Error: ${err}`)
  });

  // States
  const [isCurrent, setIsCurrent] = useState(false);

  // Functions
  const getLabel = (itemName: string, isLowerCase: boolean) => {
    const label = fieldItemProps.APIToLabel[itemName];
    if (label === "itemTitle") {
      return isLowerCase ? fieldItemProps.itemTitle?.toLowerCase() : fieldItemProps.itemTitle;
    }
    return isLowerCase ? label?.toLowerCase() : label;
  };

  const onCancel = () => {
    form.resetFields();
    closeForm();
  };

  const onOk = () => {
    form
      .validateFields()
      .then(console.log)
      .catch((err) => console.log("Form Error: ", err));
  };

  // Components
  const DataInput = ({ name, label, isRequired }) => (
    <Form.Item
      name={name}
      label={label}
      rules={[
        {
          required: isRequired,
          message: `Vui lòng nhập ${label.toLowerCase()}`
        }
      ]}
    >
      <Select
        showSearch
        placeholder={`Vui lòng chọn ${label.toLowerCase()}`}
      >
        {
          dataArr && dataArr.map((dataItem) => (
            <Select.Option key={dataItem.id} value={dataItem.name}>
              {dataItem.name}
            </Select.Option>
          ))
        }
      </Select>
    </Form.Item>
  );

  return (
    <Modal
      className="main-panel-form"
      title={(isAdd ? "Thêm " :"Chỉnh Sửa ") + fieldTitle}
      centered
      open={open}
      onCancel={onCancel}
      onOk={onOk}
    >
      <Form
        form={form}
        name="profileForm"
        layout="vertical"
      >
        {/* Item's Title - meaning the string display as the header */}
        {
          fieldItemProps.labelToAPI.itemTitle === fieldItemProps.dataName ?
            <DataInput
              name={fieldItemProps.dataIDLabel}
              label={fieldItemProps.itemTitle}
              isRequired={true}
            />
          :
            <Form.Item
              name={fieldItemProps.labelToAPI.itemTitle}
              label={fieldItemProps.itemTitle}
              rules={[
                {
                  required: true,
                  message: `Vui lòng nhập ${fieldItemProps.itemTitle.toLowerCase()}`
                }
              ]}
            >
              <Input />
            </Form.Item>
        }
        {/* All the fields in between */}
        {
          fieldItemProps.layout.map((itemName) => (
            itemName === fieldItemProps.dataName ?
              <DataInput
                name={fieldItemProps.dataIDLabel}
                label={fieldItemProps.APIToLabel[itemName]}
                isRequired={true}
              />
            :
              <Form.Item 
                name={itemName}
                label={getLabel(itemName, false)}
                rules={[
                  {
                    required: fieldItemProps.isRequired[itemName],
                    message: `Vui lòng nhập ${getLabel(itemName, true)}`,
                  },
                ]}
              >
                <Input />
              </Form.Item>
          ))
        }
        {/* Current, Start date, End date, Description */}
        <Form.Item
          name="is_current"
        >
          <Checkbox
            onChange={(event) => setIsCurrent(event.target.checked)}
          >
            {getLabel("is_current", false)}
          </Checkbox>
        </Form.Item>
        <Form.Item
          name="start_date"
          label={getLabel("start_date", false)}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="end_date"
          label={getLabel("end_date", false) + (isCurrent ? " (dự định)" : "")}
          hidden={fieldItemProps.disableEndDate && isCurrent}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="description"
          label={`Mô tả ${fieldItemProps.itemTitle.toLowerCase()}`}
        >
          <Input.TextArea allowClear/>
        </Form.Item>
      </Form>
    </Modal>
  );
};
