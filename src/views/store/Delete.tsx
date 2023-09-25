import React, { Dispatch, SetStateAction } from "react";
import { Modal } from "antd";
import { useDeleteProductMutation } from "@/redux/services/productApi";

type Props = { 
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    id: string
}

const DeleteModal: React.FC<Props> = ({ open, setOpen, id }: Props) => {
  const [deleteProduct, { isLoading } ] = useDeleteProductMutation();

  const handleOkDel = () => {
    deleteProduct(id)
    setOpen(false);
  };

  const handleCancelDel = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      title="ลบสินค้า"
      onOk={handleOkDel}
      onCancel={handleCancelDel}
      footer={(_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          <OkBtn />
        </>
      )}
    >
      {isLoading ? <div>Loading...</div> : null}
      <p>ยืนยันการลบสินค้านี้?</p>
    </Modal>
  );
};

export default DeleteModal;
