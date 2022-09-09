import type { ReactNode } from 'react';
import type { IFormItem } from './formitem';
import type { Where } from './field';
import type { ActionProps } from '../../action';

export declare type IForm = {
  // 有多个form时使用
  name?: string | Symbol;
  labelAlign?: 'left' | 'right';
  // 默认horizontal
  layout?: 'horizontal' | 'vertical' | 'inline' | 'table';
  span?: number; // 宽度 百分比
  width?: number; // 宽度 px
  gutter?: number | [number, number];
  labelCol?: number;
  wrapperCol?: number;
  formItems?: IFormItem[];
  /**对其方式 */
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
  /**form分块展示 */
  groups?: {
    title: ReactNode;
    extra?: ReactNode;
    formItems: IFormItem[];
    component?: JSX.Element;
    visible?: boolean | Where;
  }[];
  /**按钮 */
  buttons?: ReactNode[];
  /**提交方法 */
  // submition?: (values: object) => void
  actions?: Array<
    | ActionProps<'url'>
    | ActionProps<'link'>
    | ActionProps<'api'>
    | ActionProps<'modal'>
    | ActionProps<'cancel'>
    | ActionProps<'reset'>
    | ActionProps<'submit'>
  >;
};
