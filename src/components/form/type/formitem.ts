import type { TooltipProps } from 'antd/lib/tooltip';
import type { ReactNode } from 'react';
import type { IField, Where } from './field';

export declare type IFormItem = {
  label?: ReactNode;
  labelTip?: ReactNode | TooltipProps;
  field: IField | IField[];
  extra?: ReactNode;
  labelCol?: number;
  wrapperCol?: number;
  span?: number; // 宽度 百分比
  width?: number; // 宽度 单位 px
  pull?: number;
  push?: number;
  block?: boolean; // 是否独占一行
  colon?: boolean;
  visible?: boolean | Where | Where[];
  /**控件直接的间隙 */
  whiteSpace?: ReactNode;
  /**多个控件布局方式, 以%作为field占位符 如: %单价 %数量 %总价 */
  inlineLayout?: ReactNode;
  className?: string;
};
