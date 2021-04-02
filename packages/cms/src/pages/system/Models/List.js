import React, { useEffect } from "react";

import {
  CCard,
  CCardBody,
  CCardHeader,
  CListGroup,
  CListGroupItem,
  CButton,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useHistory, useParams } from "react-router-dom";
import Spinner from "components/Spinner";
import { useList } from "context/list";
import { useModal } from "context/modal";

const Models = () => {
  const { id } = useParams();
  const history = useHistory();
  const { list, selected, selectById, setApiName, hydrating } = useList();
  const { setModal } = useModal();

  useEffect(() => {
    setApiName("Model");
  }, [setApiName]);

  useEffect(() => {
    selectById(id);
  }, [id, selectById]);

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
        {hydrating ? (
          <Spinner />
        ) : list.length > 0 ? (
          <CListGroup>
            {list.map((model, idx) => (
              <CListGroupItem
                key={model.id}
                action
                active={selected?.id === model.id}
                onClick={() => history.push(`/system/models/${model.id}`)}
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
        ) : (
          <div className="p-4 text-center">
            <p>Add your first Model by clicking the plus button above.</p>
          </div>
        )}
      </CCardBody>
    </CCard>
  );
};

export default Models;
