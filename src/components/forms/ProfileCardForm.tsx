/* eslint-disable react/jsx-key */
import react, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
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
import { CloseOutlined } from "@ant-design/icons";
import moment from "moment";
import { formatProfileData } from "@utils/formatters/dataFormat";
import { formatDate } from "@utils/formatters/numberFormat";
import { extractNestedData, extractKeyByValue } from "@utils/extractors";

interface ProfileCardFormProps {
  open: boolean;
  closeForm: () => void;
  isAdd: boolean;
  fieldTitle: string;
  fieldItemProps: {
    itemTitle: string;
    fieldItemProps: string;
    dataIdMap: string[];
    disableEndDate: boolean;
    layout: string[];
    labelToAPI: Record<string, string>;
    APIToLabel: Record<string, string>;
    itemType: Record<string, string>;
    isRequired: Record<string, boolean>;
  };
  fieldValues?: Record<string, any>;
  updateFunction: (...args: any[]) => void;
  deleteFunction?: (id: number) => void;
  refetchFunction: () => void;
  dataArr: Record<string, unknown>[][];
}

interface DataInputProps {
  name: string;
  label: string;
  isRequired?: boolean;
  isMulti?: boolean;
  optionList: Record<string, unknown>[];
  value?: string | number;
}

// Form for editing or adding for different fields in profile page
export const ProfileCardForm: React.FC<ProfileCardFormProps> = (props) => {
  // States
  const [fieldValues, setFieldValues] = useState<Record<string, any>>({});
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [isCurrent, setIsCurrent] = useState<boolean>(
    !props.isAdd && props.fieldValues?.is_current,
  );
  const [areValidDates, setAreValidDates] = useState<boolean>(true);

  // Hooks
  useEffect(() => {
    // if (props.fieldValues) {
    //   setFieldValues((prev) => {
    //     prev = { ...props.fieldValues };
    //     const start_date = props.fieldValues.start_date;
    //     const end_date = props.fieldValues.end_date;
    //     prev.start_date = start_date ? moment(start_date) : null;
    //     prev.end_date = end_date ? moment(end_date) : null;
  
    //     if (props.fieldItemProps.dataIdMap?.[0] === "itemTitle") {
    //       const itemTitle = prev[props.fieldItemProps.labelToAPI.itemTitle];
    //       prev[props.fieldItemProps.labelToAPI.itemTitle] = parseInt(extractKeyByValue(props.dataArr[0], itemTitle));
    //     }
    //     console.log(prev)
    //     return prev;
    //   })
    // }
    setFieldValues(props.fieldValues);
  }, [props.fieldValues]);

  const [form] = Form.useForm();
  const updateFunction = async (input: string) => {
    if (props.isAdd) {
      return await props.updateFunction(input);
    } else if (fieldValues) {
      return await props.updateFunction(fieldValues.id, input);
    }
    return new Error("No field items found");
  };

  const updateMutation = useMutation({
    mutationKey: props.isAdd ? ["addMutation"] : ["updateMutation"],
    mutationFn: updateFunction,
    onMutate: () => {
      setModalLoading(true);
    },
    onSuccess: (data) => {
      setModalLoading(false);
      props.refetchFunction();
      handleCancel();
    },
    onError: (err: any) => console.log(`Submit Error: ${err}`),
  });

  const deleteFunction = async () => {
    if (props.deleteFunction && !props.isAdd) {
      return await props.deleteFunction(fieldValues?.id);
    }
    return new Error("delete mutation");
  };

  const deleteMutation = useMutation({
    mutationKey: ["deleteMutation"],
    mutationFn: deleteFunction,
    onSuccess: (data) => {
      props.refetchFunction();
      handleCancel();
    },
    onError: (err) => console.log(`Delete Error: ${err}`),
  });
  // if (!props.isAdd) {
  // }

  // Functions
  const getLabel = (itemName: string, isLowerCase: boolean): string => {
    const label = props.fieldItemProps.APIToLabel[itemName];
    if (label === "itemTitle") {
      return isLowerCase
        ? props.fieldItemProps.itemTitle?.toLowerCase()
        : props.fieldItemProps.itemTitle;
    }
    return isLowerCase ? label?.toLowerCase() : label;
  };

  const validateDates = () => {
    const startDate = form.getFieldValue("start_date");
    const endDate = form.getFieldValue("end_date");
    if (startDate && endDate) {
      setAreValidDates(startDate <= endDate);
    }
  };

  const handleCancel = () => {
    setIsCurrent(!props.isAdd && fieldValues?.is_current);
    setAreValidDates(true);
    form.resetFields();
    props.closeForm();
  };

  const handleDelete = () => {
    Modal.confirm({
      centered: true,
      content: `Bạn chắc chắn bạn muốn xóa mục ${props.fieldTitle?.toLowerCase()} của bạn tại ${props
        .fieldValues?.[props.fieldItemProps.dataName[0]]}?`,
      okText: `Xóa`,
      cancelText: `Không, cảm ơn`,
      onOk() {
        deleteMutation.mutate();
      },
    });
  };

  const handleOk = () =>
    form
      .validateFields()
      .then((formData) => {
        formData.start_date = formData.start_date.format("YYYY-MM-DD");
        formData.end_date = formData.end_date ? formData.end_date.format("YYYY-MM-DD") : null;
        if (props.fieldItemProps.queryLabel === "school") {
          // convert all numeric string to number
          formData.school = parseInt(formData.schoolName);
          delete formData.schoolName;
        }
        console.log(formData);
        // updateMutation.mutate(formData);
      })
      .catch((err) => console.log("Form Error: ", err));

  // Components
  const DataInput: React.FC<DataInputProps> = ({
    name,
    label,
    isRequired,
    isMulti,
    optionList
  }) => (
    <Form.Item
      name={name}
      label={label}
      rules={[
        {
          required: isRequired,
          message: `Vui lòng nhập ${label.toLowerCase()}`,
        },
      ]}
    >
      {/* {console.log(optionList)} */}
      <Select
        mode={isMulti ? "multiple" : undefined}
        showSearch
        optionFilterProp="label"
        placeholder={`Vui lòng chọn ${label.toLowerCase()}`}
        placement="bottomLeft"
        loading={props.dataArr === undefined}
        options={optionList ? Object.keys(optionList).map((key) => ({
          key: parseInt(key),
          value: parseInt(key),
          label: typeof optionList[key] === "object" ? (optionList[key].name || optionList[key].label) : optionList[key],
        })) : []}
      />
    </Form.Item>
  );

  const ItemInput: React.FC<{ itemName: string }> = ({ itemName }) => {
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
            <InputNumber controls={false} />
          </Form.Item>
        );
      case "object":
        return (
          <DataInput
            name={itemName}
            label={getLabel(itemName, false)}
            isRequired={props.fieldItemProps.isRequired[itemName]}
            isMulti={false}
            optionList={props.dataArr[props.fieldItemProps.dataIdMap.indexOf(itemName)]}
          />
        );
      case "object-multi":
        // if (fieldValues) {
        //   const dataIdIndex = props.fieldItemProps.dataIdMap.indexOf(itemName);
        //   if (dataIdIndex !== -1) {
        //     let optionList = props.dataArr[dataIdIndex];
        //     if (typeof optionList === "object") {
        //       optionList = Object.keys(optionList).sort((a, b) => a - b).map((key) => ({
        //         key: key,
        //         value: key,
        //         label: typeof optionList[key] === "object" ? (optionList[key].name || optionList[key].label) : optionList[key],
        //       }));
        //   }
        // }
        return (
          <DataInput
            name={itemName}
            label={getLabel(itemName, false)}
            isRequired={props.fieldItemProps.isRequired[itemName]}
            isMulti={true}
            optionList={props.dataArr[props.fieldItemProps.dataIdMap.indexOf(itemName)]}
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
      title={(props.isAdd ? "Thêm " : "Chỉnh Sửa ") + props.fieldTitle}
      centered
      open={props.open}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={updateMutation.isLoading}
      footer={[
        <div className="main-panel-form-delete-btn">
          {!props.isAdd && (
            <Button
              type="text"
              loading={deleteMutation.isLoading}
              onClick={handleDelete}
            >
              Xóa mục này
            </Button>
          )}
        </div>,
        <Button onClick={handleCancel}>Bỏ qua</Button>,
        <Button type="primary" loading={modalLoading} onClick={handleOk}>
          {props.isAdd ? "Thêm" : "Lưu"}
        </Button>,
      ]}
    >
      <Form
        form={form}
        name="profile-form"
        className="profile-form"
        layout="vertical"
        disabled={updateMutation.isLoading}
        initialValues={!props.isAdd ? fieldValues : {}}
      >
        {/* {console.log(fieldValues)}
        {console.log(props.dataArr)} */}
        {/* Item's Title - meaning the string display as the header */}
        {props.fieldItemProps.dataIdMap?.[0] === "itemTitle" ? (
          <DataInput
            name={props.fieldItemProps.labelToAPI.itemTitle}
            label={props.fieldItemProps.itemTitle}
            isRequired={true}
            isMulti={false}
            optionList={props.dataArr[0]}
          />
        ) : (
          <Form.Item
            name={props.fieldItemProps.labelToAPI.itemTitle}
            label={props.fieldItemProps.itemTitle}
            rules={[
              {
                required: true,
                message: `Vui lòng nhập ${props.fieldItemProps.itemTitle.toLowerCase()}`,
              },
            ]}
          >
            <Input />
          </Form.Item>
        )}

        {/* All the fields in between */}
        {/* {props.fieldItemProps.layout.map((itemName) =>
          itemName === props.fieldItemProps.dataName[1] ? (
            <DataInput
              name={itemName}
              label={props.fieldItemProps.APIToLabel[itemName]}
              isRequired={false}
              isMulti={false}
              optionList={props.dataArr[props.fieldItemProps.dataIdMap.indexOf(itemName)]}
            />
          ) : (
            <ItemInput itemName={itemName} />
          ),
        )} */}
        {props.fieldItemProps.layout.map((itemName) => <ItemInput itemName={itemName} />)}
        {/* Current, Start date, End date, Description */}
        <Form.Item name="is_current" valuePropName="checked">
          <Checkbox
            onChange={(event) => {
              setIsCurrent(event.target.checked);
              if (props.fieldItemProps.disableEndDate && event.target.checked) {
                setAreValidDates(true);
              } else {
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
          validateStatus={!areValidDates ? "error" : ""}
        >
          <DatePicker format="D/M/YYYY" onChange={validateDates} />
        </Form.Item>
        <Form.Item
          name={"end_date"}
          label={getLabel("end_date", false) + (isCurrent ? " (dự định)" : "")}
          validateStatus={!areValidDates ? "error" : ""}
          help={
            !areValidDates &&
            `Xin hãy nhập đúng hai ngày (${getLabel(
              "start_date",
              false,
            )} trước ${getLabel("end_date", false).toLowerCase()})`
          }
          hidden={props.fieldItemProps.disableEndDate && isCurrent}
        >
          <DatePicker format="D/M/YYYY" onChange={validateDates} />
        </Form.Item>
        <Form.Item
          name="description"
          label={`Mô tả ${props.fieldItemProps.itemTitle.toLowerCase()}`}
        >
          <Input.TextArea allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
};
