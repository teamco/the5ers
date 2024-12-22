import { Button, Divider, Form, Input, InputNumber, Modal, notification, Table } from "antd";
import { useEffect, useState } from "react";
import { metadataColumns } from "./columns";
import { IStock } from "./stock.interface";
import { MaxLength } from 'class-validator';
import { StockForm } from "./stock.form";

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
      (id: string) => { handleEditStock('PUT', id) },
      (id: string) => { handleDeleteStock('DELETE', id) }),
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

  const hadleCancel = () => {
    formRef.resetFields();
    Modal.destroyAll();
    setLoading(false);
  };

  const request = async (url: string, opts = {}): Promise<any> => {
    return fetch(url, { ...opts, headers: { "Content-Type": "application/json" } }).then(res => res.json());
  }

  const handleEditStock = (method: string, id: string) => {
    const onFinish = (values: IStock): void => {
      if (Object.keys(values).length === 0) return;

      request(`http://localhost:3000/api/${id}`, { method, body: JSON.stringify(values) }).then(res => {
        notificationApi.success({
          message: 'Status 200',
          description: res.message
        });
      });
    };
  }

  /**
   * Creates a modal dialog with a form to create a new stock.
   * Submits a POST request to the server to create a new stock.
   * Shows a success notification when the request is successful.
   * Resets the form and closes the modal when the request is successful or the cancel button is clicked.
   */
  const handleCreateStock = () => {
    const onFinish = (values: IStock): void => {

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

    modalApi.info({
      width: 600,
      title: 'Add new stock',
      content: <StockForm hadleCancel={hadleCancel} onFinish={onFinish} formRef={formRef} />,
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
