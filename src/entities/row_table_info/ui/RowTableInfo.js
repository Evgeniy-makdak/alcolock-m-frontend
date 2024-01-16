import { useState } from 'react';

import './RowTableInfo.sass';

const Tabs = {
  info: 'info',
  history: 'history',
};

const RowTableInfo = ({ infoContent, historyContent }) => {
  const [activeTab, setActiveTab] = useState(Tabs.info);

  return (
    <div className={'row-table-info'}>
      <div className="row-table-info__tabs">
        <button
          className={activeTab === Tabs.info ? 'active' : ''}
          onClick={() => setActiveTab(Tabs.info)}>
          инфо
        </button>

        <button
          className={activeTab === Tabs.history ? 'active' : ''}
          onClick={() => setActiveTab(Tabs.history)}>
          история
        </button>
      </div>

      <div className="row-table-info__content">
        {activeTab === Tabs.info ? infoContent : historyContent}
      </div>
    </div>
  );
};

export default RowTableInfo;
