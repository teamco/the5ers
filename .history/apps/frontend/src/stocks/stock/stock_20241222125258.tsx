import { Card, Spin } from "antd";
import { IStock } from "../stock.interface";
import { useEffect, useState } from "react";
import { request } from "../../utils/request";
import { useParams } from "react-router-dom";

export const Stock = () => {

  const {id} = useParams();

  const [loading, setLoading] = useState(false);
  const [stock, setStock] = useState<IStock>();

  useEffect(() => {
    setLoading(true);
    request(`http://localhost:3000/api/${id}`).then(res => {
      setStock(res.existingStock);
      setLoading(false);
    })
  }, [id])

  return (
    <Spin tip="Loading" spinning={loading}>
      <Card title={stock?.name}>
        <Card.Meta title={stock?.symbol} description={stock?.price} />
      </Card>
    </Spin>
  )
};