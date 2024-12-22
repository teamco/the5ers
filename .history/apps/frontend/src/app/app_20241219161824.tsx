import { Button, Divider, Form, Input, InputNumber, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import { metadataColumns } from "./columns";

export function App() {
  const [formRef] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [stocks, setStocks] = useState([]);

  const [modalApi, modalHolder] = Modal.useModal();

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

  const handleCreateStock = () => {
    const onFinish = (values): void => {
      if (Object.keys(values).length === 0) return;
      
      setLoading(true);
      debugger
      fetch('http://localhost:3000/api', { method: 'POST', body: JSON.stringify(values) }).then(res => res.json()).then(res => {
        debugger
        setStocks(res);
        setLoading(false);
      })
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
            <Button type="primary" onClick={formRef.submit()}>Save</Button>
          </Form.Item>
        </Form>
      ),
      footer: null
    })
  }

  return (
    <div>
      {modalHolder}
      <Table {...tableProps} />
    </div>
  );
}

export default App;
