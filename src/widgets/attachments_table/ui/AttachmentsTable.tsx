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
import { ResetFilters } from '@shared/ui/reset_filters/ResetFilters';
import { SearchInput } from '@shared/ui/search_input/SearchInput';
import { FilterButton } from '@shared/ui/table_filter_button';

import { useAttachmentsTable } from '../hooks/useAttachmentsTable';

export const AttachmentsTable = () => {
  const { addModalData, deleteAttachModalData, filtersData, tableData } = useAttachmentsTable();
  const resetFilters = attachmentsFilterPanelStore((state) => state.resetFilters);
  const hasActiveFilters = attachmentsFilterPanelStore((state) => state.hasActiveFilters);

  return (
    <>
      <TableHeaderWrapper>
        <SearchInput
          testId={
            testids.page_attachments.attachments_widget_header
              .ATTACHMENTS_WIDGET_HEADER_SEARCH_INPUT
          }
          value={filtersData.input}
          onClear={() => filtersData.setInput('')}
          setState={filtersData.setInput}
        />
        <InputsDates
          onClear={filtersData.clearDates}
          inputStartTestId={
            testids.page_attachments.attachments_widget_header.ATTACHMENTS_WIDGET_HEADER_FROM_DATE
          }
          inputEndTestId={
            testids.page_attachments.attachments_widget_header.ATTACHMENTS_WIDGET_HEADER_TO_DATE
          }
          onChangeStartDate={filtersData.changeStartDate}
          onChangeEndDate={filtersData.changeEndDate}
          valueStartDatePicker={filtersData.startDate}
          valueEndDatePicker={filtersData.endDate}
        />
        <FilterButton
          active={hasActiveFilters}
          open={filtersData.openFilters}
          toggle={filtersData.toggleFilters}
          testid={
            testids.page_attachments.attachments_widget_header
              .ATTACHMENTS_WIDGET_HEADER_FILTER_BUTTON
          }
        />
        <ResetFilters
          title="Сбросить фильтры"
          reset={() => (resetFilters(), filtersData.clearDates())}
        />
      </TableHeaderWrapper>
      <AttachmentsFilterPanel open={filtersData.openFilters} />
      <Table
        // TODO => кол-во элементов должно приходить с бэка
        rowCount={100}
        paginationMode="server"
        onSortModelChange={tableData.changeTableSorts}
        apiRef={tableData.apiRef}
        onPaginationModelChange={tableData.changeTableState}
        pageNumber={tableData.page}
        loading={tableData.isLoading}
        columns={tableData.headers}
        rows={tableData.rows}
      />
      <Popup
        testid={testids.page_attachments.attachments_popup_add_attach.ATTACHMENTS_ADD_ATTACH}
        closeonClickSpace={false}
        toggleModal={addModalData.toggleAppAttachModal}
        headerTitle="Привязка Алкозамка"
        onCloseModal={addModalData.closeAppAttachModal}
        isOpen={addModalData.openAppAttachModal}
        body={<AttachmentAddForm onClose={addModalData.closeAppAttachModal} />}
      />
      <Popup
        testid={testids.page_attachments.attachments_popup_delete_attach.ATTACHMENTS_DELETE_ATTACH}
        closeonClickSpace={false}
        onCloseModal={deleteAttachModalData.closeDeleteModal}
        isOpen={deleteAttachModalData.openDeleteModal}
        headerTitle="Удаление привязки Алкозамка"
        toggleModal={deleteAttachModalData.toggleOpenDeleteModal}
        body={
          <div>
            <p>
              Вы действительно хотите удалить привязку{' '}
              <b>{deleteAttachModalData.selectAttachment?.text}</b>
            </p>
            <ButtonFormWrapper>
              <Button
                testid={`${testids.POPUP_ACTION_BUTTON}_${testids.page_attachments.attachments_popup_delete_attach.ATTACHMENTS_DELETE_ATTACH}`}
                onClick={deleteAttachModalData.deleteAttachment}>
                удалить
              </Button>
              <Button
                testid={`${testids.POPUP_CANCEL_BUTTON}_${testids.page_attachments.attachments_popup_delete_attach.ATTACHMENTS_DELETE_ATTACH}`}
                onClick={deleteAttachModalData.closeDeleteModal}>
                отмена
              </Button>
            </ButtonFormWrapper>
          </div>
        }
      />
    </>
  );
};
