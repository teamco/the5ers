import React, { JSX, useEffect } from "react";
import { Button, Divider, Form, FormInstance, Input, InputNumber } from "antd";
import { IStock } from "./stock.interface";

type TProps = {
  hadleCancel: () => void;
  onFinish: (data: any) => void;
  formRef: FormInstance<any>;
  initialValues?: IStock
}

/**
 * A React component that renders an Ant Design Form with three fields: Name, Symbol, and Price.
 * The form will be submitted when the Save button is clicked.
 * The form will be reset when the Reset button is clicked.
 * The form will be canceled when the Cancel button is clicked.
 * 
 * @param hadleCancel A function to be called when the Cancel button is clicked.
 * @param onFinish A function to be called when the form is submitted.
 * @param formRef A reference to the form.
 * @param initialValues The initial values of the form.
 * 
 * @returns A JSX element of the component.
 */
export const StockForm: React.FC<TProps> = (props): JSX.Element => {
  const { hadleCancel, onFinish, formRef, initialValues = {} } = props;

  useEffect(() => { 
    formRef.setFieldsValue(initialValues);
  }, [formRef, initialValues])

  return (
    <Form
      form={formRef}
      onFinish={onFinish}
      layout={"vertical"}
      autoComplete={"off"}
      initialValues={initialValues}
    >
      <Form.Item label={'Name'} name={'name'} rules={[{ required: true, message: 'Please input Name!' }]}>
        <Input />
      </Form.Item>
      <Form.Item label={'Symbol'} name={'symbol'} rules={[{ required: true, message: 'Please input Symbol!', max: 3 }]}>
        <Input />
      </Form.Item>
      <Form.Item label={'Price'} name={'price'} rules={[{ required: true, message: 'Please input Price!' }]}>
        <InputNumber />
      </Form.Item>
      <Divider />
      <Form.Item>
        <div style={{ display: 'flex', columnGap: 10 }}>
          <Button type="primary" onClick={() => {
            formRef.validateFields().then(() => {
              formRef.submit();
            }).catch(e => console.warn(e))
          }}>Save</Button>
          <Button onClick={() => { formRef.resetFields() }}>Reset</Button>
          <Button onClick={hadleCancel}>Cancel</Button>
        </div>
      </Form.Item>
    </Form>
  )
}