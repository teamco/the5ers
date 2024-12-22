import { Form, Input, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import { metadataColumns } from "./columns";

export function App() {

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
      (id: string) => { console.log(id) } ),
		scroll: { x: 800 },
		bordered: true,
		className: 'gridList',
		dataSource: stocks,
		loading,
		title: () => (
			<div className="gridHeader">
				
			</div>
		)
	};

  const handleCreateStock = () => {
		modalApi.info({
			width: 600,
			title: 'Add new stock',
			content: (
        <Form>
          <Form.Item label={'Name'} name={'name'}>
            <Input />
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
