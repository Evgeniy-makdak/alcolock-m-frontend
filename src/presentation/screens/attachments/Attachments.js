import EditTable from "../../shared/components/edit_table/EditTable";
import {
  ADD_POPUP_TITLE,
  DELETE_POPUP_TITLE,
  EDIT_POPUP_TITLE,
  getDeletePopupBody,
  getRowsTemplate,
  HEADERS
} from "./const";
import AppConstants from "../../../internal/app_constants";
import {
  addAttachment,
  AttachmentsSortTypes,
  deleteAttachment,
  uploadAttachments
} from "../../../internal/effector/attachments/effects";
import {addAttachmentFormSelectors, editAttachmentFormSelectors} from "../../../internal/effector/attachments/forms";
import AttachmentsForm from "./components/AttachmentsForm";
import {attachmentsStore} from "../../../internal/effector/attachments/store";
import {selectedBranchStore} from "../../../internal/effector/selected_branch/store";
import {userStore} from "../../../internal/effector/user/store";
import {UserPermissionsTypes} from "../../../internal/effector/user/effects";

const Attachments = () => {
  const loading = attachmentsStore.attachmentsLoading.useValue()
  const selectedBranch = selectedBranchStore.selectedBranch.useValue()
  const userData = userStore.userData.useValue()

  return (
    <div className={'page attachments'}>
      <EditTable
        loading={loading}
        headers={HEADERS}
        getRowsTemplate={getRowsTemplate}
        initOrderType={AppConstants.OrderTypes.desc}
        initOrderBy={AttachmentsSortTypes.byDate}
        addFormSelectors={addAttachmentFormSelectors}
        editFormSelectors={editAttachmentFormSelectors}
        uploadListPromise={uploadAttachments}
        deleteItemPromise={userData?.permissions.attachments === UserPermissionsTypes.create
          ? deleteAttachment
          : null}
        addItemPromise={userData?.permissions.attachments === UserPermissionsTypes.create
          ? addAttachment
          : null}
        deletePopupParams={{
          title: DELETE_POPUP_TITLE,
          getBody: getDeletePopupBody
        }}
        addPopupParams={{
          title: ADD_POPUP_TITLE,
          Body: AttachmentsForm
        }}
        editPopupParams={{
          title: EDIT_POPUP_TITLE,
          Body: AttachmentsForm
        }}
        updateTable={selectedBranch}
      />
    </div>
  )
}

export default Attachments
