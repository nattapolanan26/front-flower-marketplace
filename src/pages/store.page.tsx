import { useGetProductMeQuery } from "@/redux/services/productApi";
import { IProduct } from "@/redux/services/types";
import { useAppSelector } from "@/redux/store";
import CreateProduct from "@/views/store/Create";
import EditProduct from "@/views/store/Edit";
import DeleteModal from "@/views/store/Delete";
import {
  DownloadOutlined,
  MoreOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  ShopOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Row,
  Typography,
  Image,
  Space,
  Dropdown,
  Empty,
} from "antd";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

const items = [
  {
    label: "แก้ไข",
    key: "1",
  },
  {
    label: "ลบ",
    key: "2",
  },
];

const CardItem = () => {
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [itemEdit, setItemEdit] = useState<IProduct>({
    _id: "",
    product_name: "",
    product_type: "",
    price: "",
    mobile: "",
    description: "",
    file: "",
    createdAt: null,
    updatedAt: null,
    __v: 0,
  });

  const onClose = () => {
    setOpen(false);
  };

  const user = useAppSelector((state) => state.userState.user);

  const { data: product } = useGetProductMeQuery(user?._id as string);

  const onMenuClick = (row: IProduct, e: any) => {
    setDeleteOpen(false);
    setItemEdit(row);
    if (e.key == "1") {
      setOpen(true);
    } else {
      setDeleteOpen(true);
    }
  };

  return (
    <>
      <DeleteModal
        open={deleteOpen}
        setOpen={setDeleteOpen}
        id={itemEdit._id}
      />
      <EditProduct open={open} onClose={onClose} item={itemEdit} />
      {product ? (
        product.length > 0 ? (
          product.map((row) => {
            const price = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(parseInt(row.price as string));
            return (
              <Col
                className="gutter-row"
                xs={{ span: 24 }}
                sm={{ span: 12 }}
                md={{ span: 8 }}
                lg={{ span: 6 }}
                xxl={{ span: 4 }}
                key={row._id}
              >
                <Card
                  hoverable
                  style={{ height: "100%", width: '100%' }}
                  cover={
                    <Image
                      loading="lazy"
                      src={
                        row.file != null
                          ? `${import.meta.env.VITE_BASE_URL}/${row.file}`
                          : "error"
                      }
                      alt="card"
                      preview={{
                        toolbarRender: (
                          _,
                          {
                            transform: { scale },
                            actions: {
                              onFlipY,
                              onFlipX,
                              onRotateLeft,
                              onRotateRight,
                              onZoomOut,
                              onZoomIn,
                            },
                          }
                        ) => (
                          <Space size={12} className="toolbar-wrapper">
                            <DownloadOutlined />
                            <SwapOutlined rotate={90} onClick={onFlipY} />
                            <SwapOutlined onClick={onFlipX} />
                            <RotateLeftOutlined onClick={onRotateLeft} />
                            <RotateRightOutlined onClick={onRotateRight} />
                            <ZoomOutOutlined
                              disabled={scale === 1}
                              onClick={onZoomOut}
                            />
                            <ZoomInOutlined
                              disabled={scale === 50}
                              onClick={onZoomIn}
                            />
                          </Space>
                        ),
                      }}
                      fallback="data:image/png;base64,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"
                    />
                  }
                >
                  <Typography.Title level={5}>
                    {row.product_name}
                  </Typography.Title>
                  <Typography.Paragraph>
                    {row.description && row.description !== "undefined" ? row.description : <br />}
                  </Typography.Paragraph>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>
                      <Typography.Text
                        style={{ fontSize: "18px", fontWeight: 700 }}
                      >
                        {price}
                      </Typography.Text>
                    </div>
                    <div>
                      <Dropdown
                        menu={{ items, onClick: (e) => onMenuClick(row, e) }}
                      >
                        <a onClick={(e) => e.preventDefault()}>
                          <MoreOutlined
                            style={{ fontSize: "25px", color: "#000" }}
                          />
                        </a>
                      </Dropdown>
                    </div>
                  </div>
                </Card>
              </Col>
            );
          })
        ) : (
          <div style={{ textAlign: "center", width: "100%" }}>
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{ height: 60 }}
              description="ไม่พบข้อมูลสินค้าในร้านนี้"
            />
          </div>
        )
      ) : null}
    </>
  );
};

const StorePage: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const isDesktop = useMediaQuery({ minWidth: 885 });

  return (
    <>
      <CreateProduct open={open} onClose={onClose} />
      <div style={{ margin: isDesktop ? "5rem" : "1rem" }}>
        <Typography.Title
          level={1}
          style={{
            padding: 10,
            borderTop: "1px solid #000",
            borderBottom: "1px solid #000",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              BEST WISHES FLOWER SHOP
              <ShopOutlined style={{ marginLeft: "0.5rem" }} />
            </div>
            {isDesktop ? (
              <div
                style={{ display: "flex", alignSelf: "center", width: "15%" }}
              >
                <Button
                  type="primary"
                  size="large"
                  style={{ width: "100%" }}
                  onClick={showDrawer}
                >
                  เพิ่มสินค้า
                </Button>
              </div>
            ) : null}
          </div>
        </Typography.Title>
        {!isDesktop ? (
          <div style={{ margin: "1rem 0" }}>
            <Button type="primary" size="large" style={{ width: "100%" }}>
              เพิ่มสินค้า
            </Button>
          </div>
        ) : null}
        <Row gutter={[16, 24]}>{CardItem()}</Row>
      </div>
    </>
  );
};

export default StorePage;
