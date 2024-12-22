import React from "react";
import { Button, Divider, Form, Input, InputNumber } from "antd";

type TProps = {
  hadleCancel: () => void;
  onFinish: (data: any) => void;
  formRef: any;
}

export const StockForm = props => {
  return (
    <Form
      form={formRef}
      onFinish={onFinish}
      layout={"vertical"}
      autoComplete={"off"}
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