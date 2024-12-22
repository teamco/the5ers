import { Card, Spin } from "antd";
import { IStock } from "../stock.interface";
import { useEffect, useState } from "react";
import { request } from "../../utils/request";

export const Stock = () => {

  const [loading, setLoading] = useState(false);
  const [stock, setStock] = useState<IStock>();

  useEffect(() => {
    setLoading(true);
    request('http://localhost:3000/api').then(res => {
      setStock(res);
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