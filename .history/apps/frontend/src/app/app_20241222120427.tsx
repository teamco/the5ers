import { Button, Form, Modal, notification, Table } from "antd";
import { useEffect, useState } from "react";
import { metadataColumns } from "./columns";
import { IStock } from "./stock.interface";
import { StockForm } from "./stock.form";

/**
 * A React component that displays a table of stocks.
 * Each stock includes a edit and delete action.
 * When the edit action is clicked, a modal dialog with a form is opened.
 * When the delete action is clicked, a DELETE request is sent to the server.
 * When the create button is clicked, a modal dialog with a form is opened.
 * When the form is submitted, a POST request is sent to the server.
 * When the server responds with a success status code, a success notification is shown.
 * When the server responds with an error status code, an error notification is shown.
 * When the form is canceled, the modal is closed.
 * The table is reloaded when the component is mounted.
 *
 * @return A JSX element of the component.
 */
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
      (id: string) => { handleEditStock(id) },
      (id: string) => { handleDeleteStock(id) }),
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

  /**
   * Cancels the current modal and resets the form.
   * Called when the cancel button in the modal is clicked.
   */
  const hadleCancel = () => {
    formRef.resetFields();
    Modal.destroyAll();
    setLoading(false);
  };

  /**
   * A helper function to make a JSON request to the server.
   *
   * @param url - The URL of the request.
   * @param opts - Optional request options to be merged with the default options.
   * @returns A promise that resolves to the JSON response from the server.
   */
  const request = async (url: string, opts = {}): Promise<any> => {
    return fetch(url, { ...opts, headers: { "Content-Type": "application/json" } }).then(res => res.json());
  }

/**
 * Opens a modal dialog with a form to edit an existing stock.
 * Submits a PUT request to the server with the updated stock details.
 * Shows a success notification when the update is successful.
 *
 * @param id - The unique identifier of the stock to be edited.
 */

  const handleEditStock = (id: string) => {
    const onFinish = (values: IStock): void => {
      if (Object.keys(values).length === 0) return;

      request(`http://localhost:3000/api/${id}`, { method: 'PUT', body: JSON.stringify(values) }).then(res => {
        notificationApi.success({
          message: 'Status 200',
          description: res.message
        });
      });
    };

    modalApi.info({
      width: 600,
      title: 'Update stock',
      content: <StockForm hadleCancel={hadleCancel} onFinish={onFinish} formRef={formRef} />,
      footer: null
    });
  }

  /**
   * Deletes a stock with the given id from the server.
   * Shows a success notification with the response message.
   * Called when the delete button in the grid is clicked.
   * @param id - The unique identifier of the stock to be deleted.
   */
  const handleDeleteStock = (id: string) => {
    request(`http://localhost:3000/api/${id}`, { method: 'DELETE' }).then(res => {
      notificationApi.success({
        message: 'Status 200',
        description: res.message
      });
    });
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

        setStocks(stocks => [...stocks, res]);

        hadleCancel();
      });
    };

    modalApi.info({
      width: 600,
      title: 'Add new stock',
      content: <StockForm hadleCancel={hadleCancel} onFinish={onFinish} formRef={formRef} />,
      footer: null
    });
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
