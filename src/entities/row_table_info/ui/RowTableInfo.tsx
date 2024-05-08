import { type FC, ReactNode, useState } from 'react';

import style from './RowTableInfo.module.scss';

type Tab = {
  name: string;
  testid?: string;
  content: ReactNode | string;
};

type RowTableInfoProps = {
  tabs: Tab[];
};

type MappedTabs = {
  nameTabs: { name: string; testid: string }[];
  contentTabs: ReactNode[];
};

export const RowTableInfo: FC<RowTableInfoProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);
  const dataTabs: MappedTabs = {
    nameTabs: [],
    contentTabs: [],
  };
  tabs.map((tab) => {
    dataTabs.nameTabs.push({ name: tab.name, testid: tab?.testid });
    dataTabs.contentTabs.push(tab.content);
  });

  return (
    <div className={style.rowTableInfo}>
      <div className={style.tabs}>
        {dataTabs.nameTabs.map(({ name, testid }, i) => (
          <button
            data-testid={testid}
            key={name}
            className={`${activeTab === i ? style.active : ''} ${style.buttonTab}`}
            onClick={() => setActiveTab(i)}>
            {name}
          </button>
        ))}
      </div>
      {dataTabs.contentTabs.map((content, i) => {
        return (
          activeTab === i && (
            <div key={i} className={activeTab !== i ? style.contentHidden : style.content}>
              {content}
            </div>
          )
        );
      })}
    </div>
  );
};
