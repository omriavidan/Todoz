import { Modal, Button, Input, Space, Dropdown, Typography, Select } from "antd"
import Title from "antd/es/typography/Title";
import { useState } from "react";
import { useWindowSizeContext } from "../utils/useWindowSize";
import TextArea from "antd/es/input/TextArea";

interface CreateModalProps {
  open: boolean,
  setOpen: (value: boolean) => void
}

const CreateModal: React.FC<CreateModalProps> = ({ open, setOpen }) => {

  const [loading, setLoading] = useState(false);
  const { width, height } = useWindowSizeContext();

  const handleCreate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      title='Create an Issue'
      onOk={handleCreate}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleCreate}>
          Create
        </Button>,
      ]}
    >
      <Space size='small' direction="vertical" style={{ display: 'flex', flex: 1, marginTop: '20px', marginBottom: '40px'}}>
        <Typography>Issue Type</Typography>
        <Select placeholder="" style={{ width: width * 0.15 }} options={[
          { value: 'bug', label: 'Bug' },
          { value: 'feature', label: 'Feature' },
          { value: 'improvment', label: 'Improvment' },
        ]} />
        <Typography>Summary</Typography>
        <Input placeholder="" />
        <Typography>Description</Typography>
        <TextArea rows={4} />
        <Typography>Assignee</Typography>
        <Select placeholder="" style={{ flex: 1, display: 'flex' }} options={[
          { value: 'user1', label: 'User1' },
          { value: 'user2', label: 'User2' },
          { value: 'user3', label: 'User3' },
        ]} />
        <Typography>Story Points</Typography>
        <Input placeholder="" />
      </Space>
    </Modal>
  )
}

export default CreateModal;