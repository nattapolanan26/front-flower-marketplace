import { useState } from "react";
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
import { useAddProductMutation } from "@/redux/services/productApi";
import { useAppSelector } from "@/redux/store";
import { useNavigate } from "react-router-dom";

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
  user?: string;
};

type ProductForm = ProductType & {
  file: UploadFile[];
}

type ProductRequest = ProductType & {
  file?: File;
};

type Props = {
  open: boolean;
  onClose: () => void;
};

const CreateProduct = ({ open, onClose }: Props) => {
  const [form] = Form.useForm();
  const navigation = useNavigate();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [formData, setFormData] = useState<FormData>(new FormData());

  // Hook Add product
  const [addProduct] = useAddProductMutation();

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

    formData.append("file", newFileList[0].originFileObj as File);
  };

  const onFinish = async (values: any) => {
    values.user = user?._id;

    for (const key in values) {
      formData.append(key as keyof ProductRequest, values[key]);
    }

    await addProduct(formData)
    .then((payload) => {
      console.log('fulfilled', payload)
      message.success("Create success!", 1).then(() => {
        // clear form data
        setFormData(new FormData())

        onClose()
      });
    })
    .catch((error) => console.error('rejected', error));

    
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const resetFile = () => setFileList([])

  return (
    <Drawer
      destroyOnClose
      title="เพิ่มสินค้า"
      width={720}
      onClose={onClose}
      open={open}
      bodyStyle={{ paddingBottom: 80 }}
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button htmlType="reset" form="create_store" type="default" onClick={resetFile}>
            Reset
          </Button>
          <Button htmlType="submit" form="create_store" type="primary">
            Submit
          </Button>
        </Space>
      }
    >
      <Form
        preserve={false}
        id="create_store"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        hideRequiredMark
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item<ProductForm>
              name="file"
              valuePropName="fileList"
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
                 {fileList.length >= 8 ? null : uploadButton}
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
            <Form.Item<ProductForm>
              name="product_name"
              label="ชื่อสินค้า"
              rules={[{ required: true, message: "Please enter product name" }]}
            >
              <Input size="large" placeholder="Please enter product name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<ProductForm>
              name="price"
              label="ราคา"
              rules={[{ required: true, message: "Please enter price" },
              {
                pattern: new RegExp(
                  /^[0-9]*$/
                ),
                message:
                  "Please input number only",
              }]}
            >
              <Input size="large" placeholder="Please enter price" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<ProductForm>
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
            <Form.Item<ProductForm>
              name="mobile"
              label="เบอร์ติดต่อ"
              rules={[
                { required: true, message: "Please enter mobile" },
                { max: 10, message: "Mobile must be less than 10 characters" },
                {
                  pattern: new RegExp(
                    /^[0-9]*$/
                  ),
                  message:
                    "Please input number only",
                }
              ]}
            >
              <Input size="large" placeholder="Please enter mobile" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item<ProductForm>
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

export default CreateProduct;
