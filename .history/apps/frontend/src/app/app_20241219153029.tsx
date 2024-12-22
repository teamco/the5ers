import { Table } from "antd";
import React, { useEffect } from "react";

export function App() {

  useEffect(() => {
    fetch('http://localhost:3000/api').then(res => res.json()).then(console.log)
  }, [])

  const tableProps = {

  }


  return (
    <div>
      <Table {...tableProps} />
    </div>
  );
}

export default App;
