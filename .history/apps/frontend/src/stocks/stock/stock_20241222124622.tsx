import { Card, Spin } from "antd";
import { IStock } from "../stock.interface";
import { useState } from "react";

export const Stock = () => {

  const [loading, setLoading] = useState(false);
  const [stock, setSockt] = useState<IStock>();

  useEffect(() => {
    setLoading(true);
    request('http://localhost:3000/api').then(res => {
      setStocks(res);
      setLoading(false);
    })
  }, [])

  return (
    <Spin tip="Loading" spinning={loading}>
      <Card title="Stock">
        <Card.Meta title="Card title" description="This is the description" />
      </Card>
    </Spin>
  )
};