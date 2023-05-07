import react, { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import { 
  Card as AntdCard, 
  Button, 
  Modal, 
  Form,
  Input,
  InputNumber,
  Select,
  Checkbox,
  DatePicker
} from "antd";
import moment from "moment";
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
    itemType: Record<string, string>,
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
    mutationFn: (input) => postFunction(input),
    onSuccess: (data) => console.log(data),
    onError: (err) => console.log(`Submit Error: ${err}`)
  });

  // States
  const [isCurrent, setIsCurrent] = useState(false);
  const [dates, setDates] = useState({
    "start_date": null,
    "end_date": null
  });
  const [areValidDates, setAreValidDates] = useState(true);

  // Functions
  const getLabel = (itemName: string, isLowerCase: boolean): string => {
    const label = fieldItemProps.APIToLabel[itemName];
    if (label === "itemTitle") {
      return isLowerCase ? fieldItemProps.itemTitle?.toLowerCase() : fieldItemProps.itemTitle;
    }
    return isLowerCase ? label?.toLowerCase() : label;
  };

  const validateDates = (date: Date, itemName: string): void => {
    dates[itemName] =  date;
    setDates(dates);
    const areValid = (dates.start_date && dates.end_date) && (dates.start_date < dates.end_date);
    setAreValidDates(areValid);
  }

  const parseDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  };

  const onCancel = () => {
    form.resetFields();
    setAreValidDates(true);
    closeForm();
  };

  const onOk = () => {
    form
      .validateFields()
      .then((formData) => {
        formData.start_date = moment(formData.start_date).format("YYYY-MM-DD");
        formData.end_date = moment(formData.start_date).format("YYYY-MM-DD");
        console.log(formData);
        postMutation.mutate(formData);
      })
      .catch((err) => console.log("Form Error: ", err));
  };

  // Components
  const DataInput = ({ name, label, isRequired, isMulti, optionArr }): React.FC => (
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
        mode={isMulti && "multiple"}
        showSearch
        optionFilterProp="label"
        placeholder={`Vui lòng chọn ${label.toLowerCase()}`}
        options={
          optionArr && optionArr.map((dataItem) => ({
            value: dataItem.id ?? dataItem,
            label: dataItem.name ?? dataItem
          }))
        }
      />
    </Form.Item>
  );

  const ItemInput = ({ itemName }) => {
    switch (fieldItemProps.itemType[itemName]) {
      case "number":
        return (
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
            <InputNumber
              controls={false}
            />
          </Form.Item>
        );
      case "object":
        return (
          <DataInput
            name={itemName}
            label={getLabel(itemName, false)}
            isRequired={fieldItemProps.isRequired[itemName]}
            isMulti={true}
            optionArr={fieldItems && fieldItems[itemName]}
          />
        );
      default:
        return (
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
        );
    }
  }

  return (
    <Modal
      className="main-panel-form"
      title={(isAdd ? "Thêm " :"Chỉnh Sửa ") + fieldTitle}
      centered
      open={open}
      onCancel={onCancel}
      onOk={onOk}
      confirmLoading={postMutation.isLoading}
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
              isMulti={false}
              optionArr={dataArr}
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
                isMulti={false}
                optionArr={dataArr}
              />
            :
              <ItemInput itemName={itemName} />
          ))
        }
        {/* Current, Start date, End date, Description */}
        <Form.Item
          name="is_current"
          valuePropName="checked"
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
          validateStatus={!areValidDates && "error"}
        >
          <DatePicker onChange={(date) => validateDates(date?._d, "start_date")}/>
        </Form.Item>
        <Form.Item
          name="end_date"
          label={getLabel("end_date", false) + (isCurrent ? " (dự định)" : "")}
          validateStatus={!areValidDates && "error"}
          help={!areValidDates && `Xin hãy nhập đúng hai ngày (${getLabel("start_date", false)} trước ${getLabel("end_date", false).toLowerCase()})`}
          hidden={fieldItemProps.disableEndDate && isCurrent}
        >
          <DatePicker onChange={(date) => validateDates(date?._d, "end_date")}/>
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
