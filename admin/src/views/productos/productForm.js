import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Row, Select, Upload } from "antd";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import {
  ContainerOutlined,
  TagOutlined,
  UploadOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;

const ProductForm = ({ product = {}, isEditing = false }) => {
  let uploadedImgs = [];
  let history = useHistory();

  if (product.image) {
    product.image.forEach((image, i) => {
      uploadedImgs.push({
        uid: i,
        name: `${i}.png`,
        url: image,
      });
    });
  }

  const [fileList, setFileList] = useState(uploadedImgs);
  const [fileListUrl, setFileListUrl] = useState([]);

  const firebaseStorage = (i, info) => {
    let image = [];
    const storage = firebase.storage();
    console.log(fileList[i].uid);
    const uploadTaskPDF = storage
      .ref(`products/${fileList[i].uid}`)
      .put(fileList[i]);
    uploadTaskPDF.on(
      "state_changed",
      (snapshot) => {
        // progress function ...
      },
      (error) => {
        // Error function ...
        console.error(error);
      },
      // eslint-disable-next-line no-loop-func
      () => {
        // complete function ...
        storage
          .ref("products")
          .child(fileList[i].uid)
          .getDownloadURL()
          .then((urlPDF) => {
            image.push(urlPDF);
            if (i === fileList.length - 1) {
              const db = firebase.firestore();
              db.collection("Products")
                .add({
                  name: info.name,
                  fullDescription: info.description,
                  shortDescription: info.description,
                  sku: info.sku,
                  price: info.price,
                  image,
                  stock: info.stock,
                  offerEnd: "",
                  discount: 0,
                  category: info.category,
                  tag: info.tags,
                })
                .then(() => {
                  history.push("/productos");
                })
                .catch((err) => {
                  console.error(err);
                });
            }
          });
      }
    );
  };
  const onFinish = (info) => {
    for (var i = 0; i < fileList.length; i++) {
      firebaseStorage(i, info);
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="name"
        label="Name"
        initialValue={product.name || ""}
        rules={[
          {
            required: true,
            message: "Please input product name!",
          },
        ]}
      >
        <Input
          prefix={<ContainerOutlined />}
          placeholder="Please input product name"
        />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        initialValue={product.shortDescription || ""}
        rules={[
          {
            required: true,
            message: "Please input product description!",
          },
        ]}
      >
        <TextArea rows={4} placeholder="Please input product description" />
      </Form.Item>
      <Form.Item
        name="sku"
        label="SKU"
        initialValue={product.sku || ""}
        rules={[
          {
            required: true,
            message: "Please input product SKU!",
          },
        ]}
      >
        <Input prefix={<TagOutlined />} placeholder="Please input SKU" />
      </Form.Item>
      <Form.Item
        name="category"
        label="Category"
        initialValue={product.category || []}
        rules={[
          {
            required: true,
            message: "Please input the product's categories!",
          },
        ]}
      >
        <Select
          maxTagCount={10}
          mode="tags"
          autoClearSearchValue
          placeholder="Please input the product's categories"
        />
      </Form.Item>
      <Form.Item
        name="tags"
        label="Tags"
        initialValue={product.tag || []}
        rules={[
          {
            required: true,
            message: "Please input your product's tags!",
          },
        ]}
      >
        <Select
          maxTagCount={10}
          mode="tags"
          autoClearSearchValue
          placeholder="Please input the product's tags"
        />
      </Form.Item>
      <Form.Item
        name="price"
        label="Price"
        initialValue={product.price || ""}
        rules={[
          {
            required: true,
            message: "Please input product price!",
          },
        ]}
      >
        <InputNumber
          style={{ minWidth: 150 }}
          formatter={(value) =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          min={0}
        />
      </Form.Item>
      <Form.Item
        name="stock"
        label="Stock"
        initialValue={product.stock || ""}
        rules={[
          {
            required: true,
            message: "Please input product stock!",
          },
        ]}
      >
        <InputNumber style={{ minWidth: 150 }} min={0} />
      </Form.Item>
      <Form.Item name="image" label="Image(s)">
        <Upload
          beforeUpload={(file) => {
            setFileList([...fileList, file]);
            return false;
          }}
          listType="picture"
          accept="image/*"
          fileList={fileList}
        >
          {fileList.length <= 6 && (
            <Button icon={<UploadOutlined />}>Upload</Button>
          )}
        </Upload>
      </Form.Item>
      <Form.Item>
        <Row justify="end">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default ProductForm;
