import { Table } from "antd";
import React, { useEffect, useState } from "react";

export function App() {

  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api').then(res => res.json()).then(setStocks)
  }, [])

  const tableProps = {
		columns,
		scroll: { x: 800 },
		bordered: true,
		className: 'gridList',
		dataSource: stocks,
		loading: isLoading(),
		title: () => (
			<div className="gridHeader">
				
			</div>
		)
	};


  return (
    <div>
      <Table {...tableProps} />
    </div>
  );
}

export default App;
