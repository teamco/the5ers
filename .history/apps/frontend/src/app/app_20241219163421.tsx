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
    fetch('http://localhost:3000/api').then(res => res.json()).then(res => {
      setStocks(res);
      setLoading(false);
    })
  }, [])

  const tableProps = {
    columns: metadataColumns(
      (id: string) => { console.log(id) },
      (id: string) => { console.log(id) }),
    scroll: { x: 800 },
    bordered: true,
    className: 'gridList',
    dataSource: stocks,
    loading,
    title: () => (
      <div className="gridHeader">
        <Button type="primary" onClick={handleCreateStock}>Create</Button>
      </div>
    )
  };

  const handleStock = (method = 'POST', _id?: string = '') => {
    const onFinish = (values): void => {
      
      if (Object.keys(values).length === 0) return;

      setLoading(true);
      
      fetch(`http://localhost:3000/api/${id}`, { method, body: JSON.stringify(values) }).then(res => res.json()).then(res => {
        
        notificationApi.success({
          message: 'Status 200',
          description: res.message
        });   

        setLoading(false);
      });

      Modal.destroyAll();
    };

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
          <Form.Item >
            <Button type="primary" onClick={() => {
              formRef.validateFields().then(() => {
                formRef.submit();
              }).catch(e => console.warn(e))
            }}>Save</Button>
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
