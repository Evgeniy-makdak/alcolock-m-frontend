import React from 'react';

import { Card, CardContent, Divider } from '@mui/material';

import {
  type Field,
  getTypeOfRowIconLabel,
  summaryExhaleResult,
} from '../lib/getTypeOfRowIconLabel';
import { getTypeOfRowIconValue } from '../lib/getTypeOfRowIconValue';
import style from './Info.module.scss';

interface InfoProps {
  fields: Field[];
  withoutPaddings?: boolean;
}

export const Info = ({ fields, withoutPaddings = false }: InfoProps) => {
  return (
    <Card className={style.card}>
      <CardContent
        className={`${withoutPaddings ? style.zeroPaddings : style.paddings} ${style.info}`}>
        {fields.map((field, i) => {
          const summaryExhaleResultText = field?.summaryExhaleResult;
          const value = field?.value;
          const valueIsArray = Array.isArray(value);

          return (
            <React.Fragment key={i}>
              <div className={style.row}>
                <span className={style.label}>
                  {field?.type ? getTypeOfRowIconLabel(field?.type, field?.label) : field?.label}
                </span>
                <span className={style.value} style={field?.style}>
                  {summaryExhaleResultText && summaryExhaleResult[summaryExhaleResultText]}
                  {!summaryExhaleResultText && !valueIsArray && getTypeOfRowIconValue(value)}
                  {valueIsArray && (
                    <div className={style.labelWrapper}>
                      {value.map((val, i) => (
                        <React.Fragment key={i}>{getTypeOfRowIconValue(val)}</React.Fragment>
                      ))}
                    </div>
                  )}
                </span>
              </div>
              <Divider />
            </React.Fragment>
          );
        })}
      </CardContent>
    </Card>
  );
};
