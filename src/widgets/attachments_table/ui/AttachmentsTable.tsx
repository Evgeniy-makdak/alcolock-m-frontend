import { ResetFilters } from '@entities/reset_filters/ui/ResetFilters';
import { FilterButton } from '@entities/table_filter_button';
import { AttachmentAddForm } from '@features/attachments_add_form';
import {
  AttachmentsFilterPanel,
  attachmentsFilterPanelStore,
} from '@features/attachments_filter_panel';
import { Table } from '@shared/components/Table/Table';
import { ButtonFormWrapper } from '@shared/components/button_form_wrapper/ButtonFormWrapper';
import { TableHeaderWrapper } from '@shared/components/table_header_wrapper/ui/TableHeaderWrapper';
import { testids } from '@shared/const/testid';
import { Button } from '@shared/ui/button';
import { InputsDates } from '@shared/ui/inputs_dates/InputsDates';
import { Popup } from '@shared/ui/popup';
import { SearchInput } from '@shared/ui/search_input/SearchInput';

import { useAttachmentsTable } from '../hooks/useAttachmentsTable';

export const AttachmentsTable = () => {
  const {
    input,
    isLoading,
    openFilters,
    page,
    toggleOpenFilters,
    setInput,
    rows,
    headers,
    changeTableState,
    openAppAttachModal,
    closeAppAttachModal,
    toggleAppAttachModal,
    closeDeleteModal,
    toggleOpenDeleteModal,
    openDeleteModal,
    selectAttachment,
    deleteAttachment,
    apiRef,
    changeTableSorts,
    changeEndDate,
    changeStartDate,
    clearDates,
    endDate,
    startDate,
  } = useAttachmentsTable();
  const resetFilters = attachmentsFilterPanelStore((state) => state.resetFilters);
  return (
    <>
      <TableHeaderWrapper>
        <SearchInput
          testId={
            testids.page_attachments.attachments_widget_header
              .ATTACHMENTS_WIDGET_HEADER_SEARCH_INPUT
          }
          value={input}
          onClear={() => setInput('')}
          setState={setInput}
        />
        <InputsDates
          onClear={clearDates}
          inputStartTestId={
            testids.page_attachments.attachments_widget_header.ATTACHMENTS_WIDGET_HEADER_FROM_DATE
          }
          inputEndTestId={
            testids.page_attachments.attachments_widget_header.ATTACHMENTS_WIDGET_HEADER_TO_DATE
          }
          onChangeStartDate={changeStartDate}
          onChangeEndDate={changeEndDate}
          valueStartDatePicker={startDate}
          valueEndDatePicker={endDate}
        />
        <FilterButton
          open={openFilters}
          toggle={toggleOpenFilters}
          testid={
            testids.page_attachments.attachments_widget_header
              .ATTACHMENTS_WIDGET_HEADER_FILTER_BUTTON
          }
        />
        <ResetFilters title="Сбросить фильтры" reset={() => (resetFilters(), clearDates())} />
      </TableHeaderWrapper>
      {openFilters && <AttachmentsFilterPanel />}
      <Table
        rowCount={100}
        paginationMode="server"
        onSortModelChange={changeTableSorts}
        apiRef={apiRef}
        onPaginationModelChange={changeTableState}
        pageNumber={page}
        loading={isLoading}
        columns={headers}
        rows={rows}
      />
      <Popup
        testid={testids.page_attachments.attachments_popup_add_attach.ATTACHMENTS_ADD_ATTACH}
        closeonClickSpace={false}
        toggleModal={toggleAppAttachModal}
        headerTitle="Привязка Алкозамка"
        onCloseModal={closeAppAttachModal}
        isOpen={openAppAttachModal}
        body={<AttachmentAddForm onClose={closeAppAttachModal} />}
      />
      <Popup
        testid={testids.page_attachments.attachments_popup_delete_attach.ATTACHMENTS_DELETE_ATTACH}
        closeonClickSpace={false}
        onCloseModal={closeDeleteModal}
        isOpen={openDeleteModal}
        headerTitle="Удаление привязки Алкозамка"
        toggleModal={toggleOpenDeleteModal}
        body={
          <div>
            <p>
              Вы действительно хотите удалить привязку <b>{selectAttachment?.text}</b>
            </p>
            <ButtonFormWrapper>
              <Button
                testid={`${testids.POPUP_ACTION_BUTTON}_${testids.page_attachments.attachments_popup_delete_attach.ATTACHMENTS_DELETE_ATTACH}`}
                onClick={deleteAttachment}>
                удалить
              </Button>
              <Button
                testid={`${testids.POPUP_CANCEL_BUTTON}_${testids.page_attachments.attachments_popup_delete_attach.ATTACHMENTS_DELETE_ATTACH}`}
                onClick={closeDeleteModal}>
                отмена
              </Button>
            </ButtonFormWrapper>
          </div>
        }
      />
    </>
  );
};
