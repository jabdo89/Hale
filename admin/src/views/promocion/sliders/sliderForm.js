import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, Input, Row, Upload } from "antd";
import firebase from "firebase";
import { ContainerOutlined, UploadOutlined } from "@ant-design/icons";

const SliderForm = ({ slider = {}, isEditing = false }) => {
  const [sliderImage, setSliderImage] = useState(slider.image || []);

  const history = useHistory();

  const firebaseStorage = (info) => {
    const storage = firebase.storage();
    console.log(info.image.file);
    const uploadTaskPDF = storage
      .ref(`sliders/${info.image.file.uid}`)
      .put(info.image.file);
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
          .ref("sliders")
          .child(info.image.file.uid)
          .getDownloadURL()
          .then((urlPDF) => {
            const db = firebase.firestore();
            db.collection("Sliders")
              .add({
                image: urlPDF,
                title: info.title,
                subtitle: info.subtitle,
                url: "/shop-grid-standard",
              })
              .then(() => {
                history.push("/sliders");
              })
              .catch((err) => {
                console.error(err);
              });
          });
      }
    );
  };

  const onFinish = (info) => {
    console.log(info);
    firebaseStorage(info);
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="title"
        label="Title"
        initialValue={slider.title || ""}
        rules={[
          {
            required: true,
            message: "Please input slider title!",
          },
        ]}
      >
        <Input
          prefix={<ContainerOutlined />}
          placeholder="Please input slider title"
        />
      </Form.Item>
      <Form.Item
        name="subtitle"
        label="Subtitle"
        initialValue={slider.subtitle || ""}
        rules={[
          {
            required: true,
            message: "Please input slider subtitle!",
          },
        ]}
      >
        <Input
          prefix={<ContainerOutlined />}
          placeholder="Please input slider subtitle"
        />
      </Form.Item>
      <Form.Item
        name="image"
        label="Image"
        rules={[
          {
            required: true,
            message: "Please input slider image!",
          },
        ]}
      >
        <Upload
          beforeUpload={(file) => {
            setSliderImage([file]);
            return false;
          }}
          onRemove={() => {
            setSliderImage([]);
          }}
          listType="picture"
          accept="image/*"
          fileList={sliderImage}
        >
          <Button disabled={sliderImage.length !== 0} icon={<UploadOutlined />}>
            Upload
          </Button>
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

export default SliderForm;
