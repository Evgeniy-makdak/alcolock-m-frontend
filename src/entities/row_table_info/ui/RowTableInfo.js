import { useState } from 'react';

import style from './RowTableInfo.module.scss';

const Tabs = {
  info: 'info',
  history: 'history',
};

const RowTableInfo = ({ infoContent, historyContent }) => {
  const [activeTab, setActiveTab] = useState(Tabs.info);

  return (
    <div className={style.rowTableInfo}>
      <div className={style.tabs}>
        <button
          className={activeTab === Tabs.info ? style.active : ''}
          onClick={() => setActiveTab(Tabs.info)}>
          инфо
        </button>

        <button
          className={activeTab === Tabs.history ? style.active : ''}
          onClick={() => setActiveTab(Tabs.history)}>
          история
        </button>
      </div>

      <div className={style.content}>{activeTab === Tabs.info ? infoContent : historyContent}</div>
    </div>
  );
};

export default RowTableInfo;
