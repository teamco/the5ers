import { Button, Divider, Form, Input, InputNumber, Modal, notification, Table } from "antd";
import { useEffect, useState } from "react";
import { metadataColumns } from "./columns";

export function App() {
  const [formRef] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [stocks, setStocks] = useState([]);

  const [modalApi, modalHolder] = Modal.useModal();
  const [notificationApi, notificationHolder] = notification.useNotification({
    stack: { threshold: 3 }
  });

  useEffect(() => {
    setLoading(true);
    request('http://localhost:3000/api').then(res => {
      setStocks(res);
      setLoading(false);
    })
  }, [])

  const tableProps = {
    columns: metadataColumns(
      (id: string) => { handleStock('PUT', id) },
      (id: string) => { handleStock('DELETE', id) }),
    scroll: { x: 800 },
    bordered: true,
    className: 'gridList',
    dataSource: stocks,
    loading,
    title: () => (
      <div className="gridHeader">
        <Button type="primary" onClick={handleStock}>Create</Button>
      </div>
    )
  };

  const hadleCancel = () => {
    formRef.resetFields();
    Modal.destroyAll();
    setLoading(false);
  };

  const request = async (url: string, opts = {}): Promise<any> => {
    return fetch(url, { ...opts, headers: { "Content-Type": "application/json" } }).then(res => res.json());
  }

  const handleStock = (method = 'POST', _id?: string = '') => {
    const onFinish = (values): void => {

      if (Object.keys(values).length === 0) return;

      setLoading(true);
      
      request(`http://localhost:3000/api`, { method: 'POST', body: JSON.stringify(values) }).then(res => {

        notificationApi.success({
          message: 'Status 200',
          description: res.message
        });

        hadleCancel();
      });
    };

    const { name, symbol, price } = _id ? stocks.find((s) => s._id === _id) : {};

    modalApi.info({
      width: 600,
      title: 'Add new stock',
      content: (
        <Form
          form={formRef}
          onFinish={onFinish}
          layout={"vertical"}
          autoComplete={"off"}
          initialValues={_id ? {
            name,
            symbol,
            price
          } : {}}
        >
          <Form.Item label={'Name'} name={'name'} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label={'Symbol'} name={'symbol'} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label={'Price'} name={'price'} rules={[{ required: true }]}>
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
      ),
      footer: null
    })
  }

  return (
    <div>
      {modalHolder}
      {notificationHolder}
      <Table {...tableProps} />
    </div>
  );
}

export default App;
