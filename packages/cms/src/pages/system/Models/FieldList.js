import React, { useEffect } from "react";
import { CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useList } from "context/list";
import { useModal } from "context/modal";
import FieldInList from "components/system/FieldInList";

const FieldList = () => {
  const { list, setList } = useList();
  const { setModal } = useModal();

  useEffect(() => {
    const getFiels = async () => {
      const fields = [
        {
          type: "text",
          name: "Title",
          id: "title",
          validations: {
            required: true,
          },
          default: "",
          help: "",
        },
        {
          type: "slug",
          name: "Slug",
          id: "slug",
          validations: {
            required: true,
            reference: "title",
            unique: true,
          },
          default: "",
          help: "",
        },
        {
          type: "image",
          name: "Cover Image",
          id: "cover_image",
          validations: {
            required: true,
          },
          help: "",
        },
        {
          type: "rich-text",
          name: "Description",
          id: "description",
          validations: {
            required: true,
          },
          default: "",
          help: "",
        },
        {
          type: "date",
          name: "Publish Date",
          id: "publish_date",
          validations: {
            required: true,
          },
          default: "",
          help: "",
        },
      ];
      setList(fields);
    };
    getFiels();
  }, [setList]);

  console.log("fieldlist", list);
  if (list.length === 0) {
    return (
      <div className="text-center">
        <h3>Add fields to this model!</h3>
        <p>
          Fields are columns in your spreadsheets. They define the data type in
          your model.
        </p>
        <CButton
          type="button"
          id="addField"
          color="primary"
          onClick={() => setModal("addModelField")}
        >
          <CIcon name="cil-plus" />
          Add Field
        </CButton>
      </div>
    );
  }
  return (
    <div>
      {list.map((f) => (
        <FieldInList key={f.id} {...f} />
      ))}
    </div>
  );
};

export default FieldList;
