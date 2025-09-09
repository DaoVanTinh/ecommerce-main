import React, { useState } from "react";
import { Breadcrumb, Button, Pagination, Popconfirm, Table } from "antd";
import { Link } from "react-router-dom";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);

  const column = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
    },
    {
      title: "Người tạo",
      dataIndex: "user",
      key: "user",
      render: (value) => {
        return <>{value}</>;
      },
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
  ];
  return (
    <div>
      <Breadcrumb items={[{ title: "Product Management" }]} />
      <Button type="primary" style={{ marginTop: "10px" }}>
        <Link to={"/add-product"}>Thêm Sản Phẩm</Link>
      </Button>
      <Table
        style={{ marginTop: "10px" }}
        dataSource={products}
        columns={column}
        pagination={false}
      ></Table>
    </div>
  );
};

export default ProductManagement;
