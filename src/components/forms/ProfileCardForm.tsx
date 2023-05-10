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
  DatePicker,
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
  deleteFunction: (input: Record<string, unknown>) => void,
  refetchFunction: () => void,
  dataArr: Record<string, unknown>[],
};

// Form for editing or adding for different fields in profile page
export const ProfileCardForm: React.FC<ProfileCardFormProps> = (props) => {
  // Hooks
  const [form] = Form.useForm();

  const postMutation = useMutation({
    mutationFn: (input) => props.isAdd ? props.postFunction(input) : props.postFunction(props.fieldItems.id, input),
    onMutate: () => {
      setModalLoading(true);
    },
    onSuccess: (data) => {
      setModalLoading(false);
      props.refetchFunction();
      handleCancel();
    },
    onError: (err) => console.log(`Submit Error: ${err}`)
  });

  const deleteMutation = useMutation({
    mutationFn: () => props.deleteFunction(props.fieldItems?.id),
    onSuccess: (data) => {
      props.refetchFunction();
      handleCancel();
    },
    onError: (err) => console.log(`Delete Error: ${err}`)
  })

  // States
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [isCurrent, setIsCurrent] = useState<boolean>(!props.isAdd && props.fieldItems?.is_current);
  const [areValidDates, setAreValidDates] = useState<boolean>(true);

  // Functions
  const getLabel = (itemName: string, isLowerCase: boolean): string => {
    const label = props.fieldItemProps.APIToLabel[itemName];
    if (label === "itemTitle") {
      return isLowerCase ? props.fieldItemProps.itemTitle?.toLowerCase() : props.fieldItemProps.itemTitle;
    }
    return isLowerCase ? label?.toLowerCase() : label;
  };

  const validateDates = () => {
    const startDate = form.getFieldValue("start_date");
    const endDate = form.getFieldValue("end_date");
    if (startDate && endDate) {
      setAreValidDates(startDate <= endDate);
    }
  }

  const parseDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  };

  const handleCancel = () => {
    setIsCurrent(!props.isAdd && props.fieldItems?.is_current);
    setAreValidDates(true);
    form.resetFields();
    props.closeForm();
  }

  const handleDelete = () => {
    Modal.confirm({
      centered: true,
      content: `Bạn chắc chắn bạn muốn xóa mục ${props.fieldTitle?.toLowerCase()} của bạn tại ${props.fieldItems?.[props.fieldItemProps.dataName]}?`,
      okText: `Xóa`,
      cancelText: `Không, cảm ơn`,
      onOk() {
        deleteMutation.mutate();
      },
    });
  };

  const handleOk = () => (
    form
      .validateFields()
      .then((formData) => {
        formData.start_date = moment(formData.start_date).format("YYYY-MM-DD");
        formData.end_date = moment(formData.start_date).format("YYYY-MM-DD");
        postMutation.mutate(formData);
      })
      .catch((err) => console.log("Form Error: ", err))
  );

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
        loading={props.dataArr === undefined}
        options={
          (optionArr ?? ['1']).map((dataItem) => ({
            value: name === props.fieldItemProps.dataIDLabel ? dataItem.id : dataItem,
            label: name === props.fieldItemProps.dataIDLabel ? dataItem.name : dataItem,
          }))
        }
      />
    </Form.Item>
  );

  const ItemInput = ({ itemName }) => {
    switch (props.fieldItemProps.itemType[itemName]) {
      case "number":
        return (
          <Form.Item 
            name={itemName}
            label={getLabel(itemName, false)}
            rules={[
              {
                required: props.fieldItemProps.isRequired[itemName],
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
            isRequired={props.fieldItemProps.isRequired[itemName]}
            isMulti={true}
            optionArr={props.fieldItems?.[itemName]}
          />
        );
      default:
        return (
          <Form.Item 
            name={itemName}
            label={getLabel(itemName, false)}
            rules={[
              {
                required: props.fieldItemProps.isRequired[itemName],
                message: `Vui lòng nhập ${getLabel(itemName, true)}`,
              },
            ]}
          >
            <Input />
          </Form.Item>
        );
    }
  };

  return (
    <Modal
      className="main-panel-form"
      title={(props.isAdd ? "Thêm " :"Chỉnh Sửa ") + props.fieldTitle}
      centered
      open={props.open}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={postMutation.isLoading}
      footer={[
        <div class="main-panel-form-delete-btn">
          {!props.isAdd && 
            <Button 
              type="text"
              loading={deleteMutation.isLoading}
              onClick={handleDelete}
            >
              Xóa mục này
            </Button>
          }
        </div>,
        <Button onClick={handleCancel}>
          Bỏ qua
        </Button>,
        <Button type="primary" loading={modalLoading} onClick={handleOk}>
          {props.isAdd ? "Thêm" : "Lưu"}
        </Button>
      ]}
    >
      <Form
        form={form}
        name="profileForm"
        layout="vertical"
        disabled={postMutation.isLoading}
        initialValues={
          !props.isAdd && props.fieldItems
        }
      >
        {/* Item's Title - meaning the string display as the header */}
        {
          props.fieldItemProps.labelToAPI.itemTitle === props.fieldItemProps.dataName ?
            <DataInput
              name={props.fieldItemProps.dataIDLabel}
              label={props.fieldItemProps.itemTitle}
              isRequired={true}
              isMulti={false}
              optionArr={props.dataArr}
            />
          :
            <Form.Item
              name={props.fieldItemProps.labelToAPI.itemTitle}
              label={props.fieldItemProps.itemTitle}
              rules={[
                {
                  required: true,
                  message: `Vui lòng nhập ${props.fieldItemProps.itemTitle.toLowerCase()}`
                }
              ]}
            >
              <Input />
            </Form.Item>
        }
        {/* All the fields in between */}
        {
          props.fieldItemProps.layout.map((itemName) => (
            itemName === props.fieldItemProps.dataName ?
              <DataInput
                name={props.fieldItemProps.dataIDLabel}
                label={props.fieldItemProps.APIToLabel[itemName]}
                isRequired={true}
                isMulti={false}
                optionArr={props.dataArr}
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
            onChange={(event) => {
              setIsCurrent(event.target.checked);
              if (props.fieldItemProps.disableEndDate && event.target.checked) {
                setAreValidDates(true);
              }
              else {
                validateDates();
              }
            }}
          >
            {getLabel("is_current", false)}
          </Checkbox>
        </Form.Item>
        <Form.Item
          name="start_date"
          label={getLabel("start_date", false)}
          validateStatus={!areValidDates && "error"}
        >
          <DatePicker format="DD/MM/YYYY" onChange={validateDates}/>
        </Form.Item>
        <Form.Item
          name="end_date"
          label={getLabel("end_date", false) + (isCurrent ? " (dự định)" : "")}
          validateStatus={!areValidDates && "error"}
          help={!areValidDates && `Xin hãy nhập đúng hai ngày (${getLabel("start_date", false)} trước ${getLabel("end_date", false).toLowerCase()})`}
          hidden={props.fieldItemProps.disableEndDate && isCurrent}
        >
          <DatePicker format="DD/MM/YYYY" onChange={validateDates}/>
        </Form.Item>
        <Form.Item
          name="description"
          label={`Mô tả ${props.fieldItemProps.itemTitle.toLowerCase()}`}
        >
          <Input.TextArea allowClear/>
        </Form.Item>
      </Form>
    </Modal>
  );
};
