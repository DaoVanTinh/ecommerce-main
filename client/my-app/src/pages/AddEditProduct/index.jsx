import { Button, Form, Input } from "antd";
import { createProduct } from "../../services";
import toast from "react-hot-toast";
const AddEditProduct = () => {
  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("quantity", values.quantity);
      const result = await createProduct(formData);
      if (result.data.isSuccess) {
        toast.success("Tạo sản phẩm thành công");
      }
    } catch (error) {
      toast.error("Tạo sản phẩm thất bại");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="Tên sản phẩm" name="name">
          <Input />
        </Form.Item>

        <Form.Item
          label="Giá sản phẩm"
          name="price"
          rules={[
            {
              required: true,
              message: "Please input price!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Số lượng sản phẩm"
          name="quantity"
          rules={[
            {
              required: true,
              message: "Please input price!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddEditProduct;
