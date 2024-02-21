/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppConstants } from '@app/index';
import { ActivateForm } from '@entities/alkozamki_activate_form';
import type { IAlcolocks, IDeviceAction } from '@shared/types/BaseQueryTypes';
import { Button, ButtonsType } from '@shared/ui/button';
import { Popup } from '@shared/ui/popup';

import { useAlkozamkiServiceMode } from '../hooks/useAlkozamkiServiceMode';
import style from './AlkozamkiServiceMode.module.scss';

interface AlkozamkiServiceModeProps {
  deviceAction: IDeviceAction;
  alkolock: IAlcolocks;
}

// TODO => вынести все лишние функции в lib - компонент очень раздут
export const AlkozamkiServiceMode = ({ deviceAction, alkolock }: AlkozamkiServiceModeProps) => {
  const {
    getButtons,
    handleActivate,
    handleCloseActivatePopup,
    handleDeactivate,
    openActivatePopup,
    openDeactivatePopup,
    toggleActivatePopup,
    toggleDeactivatePopup,
    isLoadingActivateServiceModeMutation,
  } = useAlkozamkiServiceMode(deviceAction, alkolock);

  return (
    <>
      <div className={style.alcolockServiceMode}>
        <span className={style.name}>Режим "Автосервис": </span>
        {/* {getText()} */}
        {getButtons()}
      </div>

      <Popup
        isOpen={openActivatePopup}
        headerTitle={'Включить режима “Автосервис”?'}
        toggleModal={toggleActivatePopup}
        closeonClickSpace={false}
        body={
          <ActivateForm
            isLoading={isLoadingActivateServiceModeMutation}
            onValidSubmit={(duration) => (handleCloseActivatePopup(), handleActivate(duration))}
            handleClosePopup={handleCloseActivatePopup}
          />
        }
      />

      <Popup
        isOpen={openDeactivatePopup}
        headerTitle={'Отключить режим “Автосервис”?'}
        toggleModal={toggleDeactivatePopup}
        buttons={[
          <Button key={'action_1'} typeButton={ButtonsType.action} onClick={handleDeactivate}>
            {'Отключить'}
          </Button>,
          <Button key={'action_2'} typeButton={ButtonsType.action} onClick={toggleDeactivatePopup}>
            {AppConstants.cancelTxt}
          </Button>,
        ]}
      />
    </>
  );
};
