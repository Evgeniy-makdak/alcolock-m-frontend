import { AppConstants } from '@app';
import { AttachmentsForm } from '@entities/attachments_form';
import { EditTable } from '@features/edit_table';
import { UserPermissionsTypes } from '@features/menu_button/model/effects';
import { userStore } from '@features/menu_button/model/store';
import { PageWrapper } from '@layout/page_wrapper';
import { selectedBranchStore } from '@shared/model/selected_branch/store';

import {
  ADD_POPUP_TITLE,
  DELETE_POPUP_TITLE,
  EDIT_POPUP_TITLE,
  HEADERS,
  getDeletePopupBody,
  getRowsTemplate,
} from '../lib/const';
import {
  AttachmentsSortTypes,
  addAttachment,
  deleteAttachment,
  uploadAttachments,
} from '../model/effects';
import { addAttachmentFormSelectors, editAttachmentFormSelectors } from '../model/forms';
import { attachmentsStore } from '../model/store';

const Attachments = () => {
  const loading = attachmentsStore.attachmentsLoading.useValue();
  const selectedBranch = selectedBranchStore.selectedBranch.useValue();
  const userData = userStore.userData.useValue();

  return (
    <PageWrapper>
      <EditTable
        loading={loading}
        headers={HEADERS}
        getRowsTemplate={getRowsTemplate}
        initOrderType={AppConstants.OrderTypes.desc}
        initOrderBy={AttachmentsSortTypes.byDate}
        addFormSelectors={addAttachmentFormSelectors}
        editFormSelectors={editAttachmentFormSelectors}
        uploadListPromise={uploadAttachments}
        deleteItemPromise={
          userData?.permissions.attachments === UserPermissionsTypes.create
            ? deleteAttachment
            : null
        }
        addItemPromise={
          userData?.permissions.attachments === UserPermissionsTypes.create ? addAttachment : null
        }
        deletePopupParams={{
          title: DELETE_POPUP_TITLE,
          getBody: getDeletePopupBody,
        }}
        addPopupParams={{
          title: ADD_POPUP_TITLE,
          // TODO => тут нужно прокидывать isLoading после внедрения ts
          Body: AttachmentsForm,
        }}
        editPopupParams={{
          title: EDIT_POPUP_TITLE,
          // TODO => тут нужно прокидывать isLoading после внедрения ts
          Body: AttachmentsForm,
        }}
        updateTable={selectedBranch}
      />
    </PageWrapper>
  );
};

export default Attachments;
