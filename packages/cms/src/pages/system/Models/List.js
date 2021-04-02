import React, { useState, useEffect } from "react";

import {
  CCard,
  CCardBody,
  CCardHeader,
  CListGroup,
  CListGroupItem,
  CButton,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import Spinner from "components/Spinner";
import { useList } from "context/list";
import { useModal } from "context/modal";

// import list from "api/list";

const Models = () => {
  const { list, setList, selected, selectByIndex } = useList();
  const { setModal } = useModal();
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const getModels = async () => {
      // const models = await list({ apiName: "Models" });
      const list = [
        {
          id: "home",
          name: "Home Page",
          collection: false,
        },
        {
          id: "blogs",
          name: "Blogs",
          collection: true,
        },
        {
          id: "social",
          name: "Social Profiles",
          collection: true,
        },
        {
          id: "about",
          name: "About Page",
          collection: false,
        },
      ];
      setList(list);
      setProcessing(false);
    };
    getModels();
  }, [setList]);

  return (
    <CCard>
      <CCardHeader>
        <span id="listTitle" className="h3">
          Models
        </span>
        <div className="card-header-actions">
          <CButton
            type="button"
            color="primary"
            id="addModel"
            className="float-right"
            onClick={() => setModal("addModel")}
          >
            <CIcon name="cil-plus" />
          </CButton>
        </div>
      </CCardHeader>
      <CCardBody className="model-list">
        {processing ? (
          <Spinner />
        ) : (
          <CListGroup>
            {list.map((model, idx) => (
              <CListGroupItem
                key={model.id}
                action
                active={selected?.id === model.id}
                onClick={() => selectByIndex(idx)}
              >
                <div className="model-item">
                  {model.collection ? (
                    <CIcon name="cil-library" />
                  ) : (
                    <CIcon name="cil-file" />
                  )}

                  <div>
                    <h5 className="d-flex w-100 justify-content-between">
                      {model.name}
                    </h5>
                    <div className="mb-1">{model.id}</div>
                  </div>
                </div>
              </CListGroupItem>
            ))}
          </CListGroup>
        )}
      </CCardBody>
    </CCard>
  );
};

export default Models;
