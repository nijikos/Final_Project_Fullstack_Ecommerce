// import { Form, Input, Button, Checkbox } from "antd";
// const layout = {
//   labelCol: {
//     span: 8,
//   },
//   wrapperCol: {
//     span: 16,
//   },
// };
// const tailLayout = {
//   wrapperCol: {
//     offset: 8,
//     span: 16,
//   },
// };

// const AddProduct = () => {
//   const onFinish = (values) => {
//     console.log("Success:", values);
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

//   const { TextArea } = Input;

//   return (
//     <Form
//       {...layout}
//       name="basic"
//       initialValues={{
//         remember: true,
//       }}
//       onFinish={onFinish}
//       onFinishFailed={onFinishFailed}
//     >
//       <Form.Item
//         label="Product Name"
//         name="productName"
//         rules={[
//           {
//             required: true,
//             message: "You have to input your the product name!",
//           },
//         ]}
//       >
//         <Input />
//       </Form.Item>
//       <Form.Item
//         label="Price"
//         name="price"
//         rules={[
//           {
//             required: true,
//             message: "Please input the price!",
//           },
//         ]}
//       >
//         <Input.Password />
//       </Form.Item>
//       <Form.Item>
//         <TextArea rows={4} placeholder="Enter product description" />
//       </Form.Item>
//       <Form.Item>
//         <p>Stock</p>
//       </Form.Item>
//       <Form.Item {...tailLayout}>
//         <Button type="primary" htmlType="submit">
//           Submit
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };

// export default AddProduct;
