import AppConstants from '@app/lib/app_constants';
import StateBuilder from '@shared/lib/state_builder';

export const attachmentsLoadingState = new StateBuilder(true);
export const attachmentsListState = new StateBuilder([]);
export const allAttachmentsState = new StateBuilder(AppConstants.attachmentsList);
export const lastGetAttachmentsListRequest = new StateBuilder(null);
export const lastGetAttachmentDataRequest = new StateBuilder(null);
export const creatingAttachmentLoadingState = new StateBuilder(false);
export const changingAttachmentLoadingState = new StateBuilder(false);
export const loadingAttachmentDataState = new StateBuilder(false);

export const attachmentsStore = {
  attachmentsLoading: attachmentsLoadingState.createHooks(),
  attachmentsList: attachmentsListState.createHooks(),
  allAttachments: allAttachmentsState.createHooks(),
  creating: creatingAttachmentLoadingState.createHooks(),
  changing: changingAttachmentLoadingState.createHooks(),
  loadingData: loadingAttachmentDataState.createHooks(),
};
