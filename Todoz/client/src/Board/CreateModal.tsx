import { Modal, Button, Input, Typography, Select, Space } from "antd";
import Title from "antd/es/typography/Title";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup"; // For validation
import { v4 as uuidv4 } from "uuid";

import { useWindowSizeContext } from "../utils/useWindowSize";
import { Issue } from "../utils/Interfaces";

interface CreateModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  addIssue: (issue: Issue) => void;
}

const CreateModal: React.FC<CreateModalProps> = ({ open, setOpen, addIssue }) => {
  const [loading, setLoading] = useState(false);
  const { width } = useWindowSizeContext();

  // Formik setup
  const formik = useFormik({
    initialValues: {
      issueType: "",
      summary: "",
      description: "",
      assignee: "",
      storyPoints: 0,
    },
    validationSchema: Yup.object({
      issueType: Yup.string().required("Issue Type is required"),
      summary: Yup.string().required("Summary is required"),
      description: Yup.string().required("Description is required"),
      assignee: Yup.string().required("Assignee is required"),
      storyPoints: Yup.number()
        .typeError("Must be a number")
        .positive("Story points must be positive"),
    }),
    onSubmit: (values) => {
      console.log(values)
      const newIssue: Issue = {
        ...values,
        id: uuidv4(),
        status: 'todo'
      };
      addIssue(newIssue)
      // setLoading(true);
      setOpen(false);
 
    },
  });

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      title="Create an Issue"
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={() => formik.handleSubmit()}>
          Create
        </Button>,
      ]}
    >
      <form onSubmit={formik.handleSubmit}>
        <Space size="small" direction="vertical" style={{ width: "100%", marginTop: 20 }}>
          {/* Issue Type */}
          <Typography>Issue Type</Typography>
          <Select
            placeholder="Select issue type"
            style={{ width: "100%" }}
            value={formik.values.issueType}
            onChange={(value) => formik.setFieldValue("issueType", value)}
            options={[
              { value: "bug", label: "Bug" },
              { value: "feature", label: "Feature" },
              { value: "improvement", label: "Improvement" },
            ]}
          />
          {formik.errors.issueType && formik.touched.issueType && (
            <Typography style={{ color: "red" }}>{formik.errors.issueType}</Typography>
          )}

          {/* Summary */}
          <Typography>Summary</Typography>
          <Input
            placeholder="Enter summary"
            name="summary"
            value={formik.values.summary}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.summary && formik.touched.summary && (
            <Typography style={{ color: "red" }}>{formik.errors.summary}</Typography>
          )}

          {/* Description */}
          <Typography>Description</Typography>
          <TextArea
            rows={4}
            name="description"
            placeholder="Enter description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.description && formik.touched.description && (
            <Typography style={{ color: "red" }}>{formik.errors.description}</Typography>
          )}

          {/* Assignee */}
          <Typography>Assignee</Typography>
          <Select
            placeholder="Select assignee"
            style={{ width: "100%" }}
            value={formik.values.assignee}
            onChange={(value) => formik.setFieldValue("assignee", value)}
            options={[
              { value: "user1", label: "User1" },
              { value: "user2", label: "User2" },
              { value: "user3", label: "User3" },
            ]}
          />
          {formik.errors.assignee && formik.touched.assignee && (
            <Typography style={{ color: "red" }}>{formik.errors.assignee}</Typography>
          )}

          {/* Story Points */}
          <Typography>Story Points</Typography>
          <Input
            placeholder="Enter story points"
            name="storyPoints"
            value={formik.values.storyPoints}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.storyPoints && formik.touched.storyPoints && (
            <Typography style={{ color: "red" }}>{formik.errors.storyPoints}</Typography>
          )}
        </Space>
      </form>
    </Modal>
  );
};

export default CreateModal;
