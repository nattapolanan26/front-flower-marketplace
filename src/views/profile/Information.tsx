import React from "react";
import { Col, Divider, Drawer, Row } from "antd";
import { useAppSelector } from "@/redux/store";

interface DescriptionItemProps {
  title: string;
  content: React.ReactNode;
}

const DescriptionItem = ({ title, content }: DescriptionItemProps) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

type Props = {
  open: boolean;
  onClose: () => void;
};

const ViewProfile = ({ open, onClose }: Props) => {
  const user_info = useAppSelector((state) => state.userState.user);
  return (
    <Drawer
      width={640}
      placement="right"
      closable={false}
      onClose={onClose}
      open={open}
    >
      <p
        className="site-description-item-profile-p"
        style={{ marginBottom: 24 }}
      >
        User Profile
      </p>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title="Full Name"
            content={`${user_info?.name} ${user_info?.lastname} `}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem title="Email" content={user_info?.email} />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem title="CitizenID" content={user_info?.citizenId} />
        </Col>
        <Col span={12}>
          <DescriptionItem title="Phone Number" content={user_info?.mobile} />
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={24}>
          <DescriptionItem title="Role" content={user_info?.role} />
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={12}>
          <DescriptionItem
            title="CreatedAt"
            content={user_info?.createdAt?.toString()}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title="CreatedAt"
            content={user_info?.updatedAt?.toString()}
          />
        </Col>
      </Row>
    </Drawer>
  );
};

export default ViewProfile;
