import { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Upload,
  UploadFile,
  message,
} from "antd";
import { RcFile, UploadProps } from "antd/es/upload";
import { useUpdateProductMutation } from "@/redux/services/productApi";
import { useAppSelector } from "@/redux/store";
import { IProduct } from "@/redux/services/types";

const { Option } = Select;

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const uploadButton = <Button icon={<UploadOutlined />}>Upload File</Button>;

export type ProductType = {
  product_name?: string;
  product_type?: string;
  price?: string;
  mobile?: string;
  description?: string;
  file: UploadFile[];
  user?: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  item: IProduct;
};

const EditProduct = ({ open, onClose, item }: Props) => {
  const { product_name, price, description, mobile, file, product_type, _id } =
    item;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    // set initialize when tigger open
    setFileList([
      {
        uid: "0",
        name: `${file}`,
        url: `${import.meta.env.VITE_BASE_URL}/${file}`,
        status: "done",
        percent: 100,
      },
    ]);
  }, [open]);

  const [formData, setFormData] = useState<FormData>(new FormData());

  // Hook CRUD product
  const [updateProduct] = useUpdateProductMutation();

  const user = useAppSelector((state) => state.userState.user);

  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    formData.append("file", newFileList[0].originFileObj as Blob);
  };

  const onFinish = async (values: any) => {
    values.user = user?._id;
    values._id = _id;

    console.log("values ============> ", values);

    for (const key in values) {
      formData.append(key, values[key]);
    }

    await updateProduct(formData)
      .then((payload) => {
        console.log("fulfilled", payload);
        message.success("Update success!", 1).then(() => {
          // clear form data
          setFormData(new FormData());

          onClose();
        });
      })
      .catch((error) => console.error("rejected", error));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Drawer
      destroyOnClose
      title="แก้ไขสินค้า"
      width={720}
      onClose={onClose}
      open={open}
      bodyStyle={{ paddingBottom: 80 }}
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button htmlType="submit" form="edit_store" type="primary">
            Submit
          </Button>
        </Space>
      }
    >
      <Form
        preserve={false}
        initialValues={{
          ["product_name"]: product_name,
          ["product_type"]: product_type,
          ["description"]: description !== "undefined" ? description : "",
          ["price"]: price,
          ["mobile"]: mobile,
          ["file"]: file,
        }}
        id="edit_store"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        hideRequiredMark
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item<ProductType>
              name="file"
              // valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[{ required: true, message: "Please an upload file" }]}
            >
              <Upload
                accept="image/png, image/jpeg"
                maxCount={1}
                name="file"
                listType="picture"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                beforeUpload={() => false}
              >
                {uploadButton}
              </Upload>
            </Form.Item>
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<ProductType>
              name="product_name"
              label="ชื่อสินค้า"
              rules={[{ required: true, message: "Please enter product name" }]}
            >
              <Input size="large" placeholder="Please enter product name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<ProductType>
              name="price"
              label="ราคา"
              rules={[
                { required: true, message: "Please enter price" },
                {
                  pattern: new RegExp(/^[0-9]*$/),
                  message: "Please input number only",
                },
              ]}
            >
              <Input size="large" placeholder="Please enter price" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<ProductType>
              name="product_type"
              label="ประเภทสินค้า"
              rules={[
                { required: true, message: "Please select an product type" },
              ]}
            >
              <Select size="large" placeholder="Please select an product type">
                <Option value="ดอกไม้สด">ดอกไม้สด</Option>
                <Option value="ดอกไม้ประดิษฐ์">ดอกไม้ประดิษฐ์</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<ProductType>
              name="mobile"
              label="เบอร์ติดต่อ"
              rules={[
                { required: true, message: "Please enter mobile" },
                { max: 10, message: "Mobile must be less than 10 characters" },
                {
                  pattern: new RegExp(/^[0-9]*$/),
                  message: "Please input number only",
                },
              ]}
            >
              <Input size="large" placeholder="Please enter mobile" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item<ProductType>
              name="description"
              label="คำอธิบายเพิ่มเติม"
            >
              <Input.TextArea
                size="large"
                rows={4}
                placeholder="please enter description"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default EditProduct;
