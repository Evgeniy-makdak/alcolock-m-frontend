import { ReactNode, useState } from 'react';

import style from './RowTableInfo.module.scss';

interface Tab {
  name: string;
  content: ReactNode | string;
}

interface RowTableInfoProps {
  tabs: Tab[];
}

export const RowTableInfo = ({ tabs }: RowTableInfoProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const nameTabs = tabs.map((tab) => tab.name);
  const contentTabs = tabs.map((tab) => tab.content);

  return (
    <div className={style.rowTableInfo}>
      <div className={style.tabs}>
        {nameTabs.map((name, i) => (
          <button
            key={name}
            className={activeTab === i ? style.active : ''}
            onClick={() => setActiveTab(i)}>
            {name}
          </button>
        ))}
      </div>
      {contentTabs.map((content, i) => (
        <div
          key={i}
          hidden={activeTab !== i}
          className={activeTab !== i ? style.contentHidden : style.content}>
          {content}
        </div>
      ))}
    </div>
  );
};
