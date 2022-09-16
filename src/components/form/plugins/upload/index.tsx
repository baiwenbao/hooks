import React, { useEffect, useState } from 'react';
import { Upload, message, Space, Button } from 'antd';
import { FormStore } from '../../ts/createFormStore';
import plugins from '../../ts/hooks';
import { IField, Value } from '../../type/field';
import { Subject } from 'rxjs';
import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { RcFile, UploadChangeParam, UploadProps } from 'antd/lib/upload';
import { omit } from 'lodash';
import { UploadFile } from 'antd/lib/upload/interface';
import { pluck, filter, take, delay } from 'rxjs/operators';

export declare type ImgUploadProps<T extends Value | Value[]> = {
  formStore: FormStore;
  fieldState: IField<'upload'>;
  internalValue$: Subject<T>;
  internalValue: T;
  change$: Subject<undefined>;
  blur$: Subject<undefined>;
  onChange: Function;
  /** 单位MB */
  // maxSize?: number;
  /** 获取接口返回url */
  // getResUrl?: Function;
  props: UploadProps;
};

const FileUpload = (props: ImgUploadProps<string | string[]>) => {
  const { fieldState, formStore, onChange, change$ } = props;
  const { maxSize, getResUrl, value, props: uploadProps } = fieldState;
  const onRemove = uploadProps?.onRemove;
  const originBeforeUpload = uploadProps?.beforeUpload;
  const maxCount = uploadProps?.maxCount;

  const { dispatch, $ } = formStore;
  const [loading, setLoading] = useState<boolean>();

  const beforeUpload = (file: RcFile, fileList: RcFile[]) => {
    const isMatchSize = maxSize ? file.size / 1024 / 1024 <= maxSize : true;
    if (!isMatchSize) {
      message.error(`文件大于${maxSize}MB`);
    }

    return Promise.resolve(originBeforeUpload ? originBeforeUpload(file, fileList) : true)
      .then(() => {
        if (isMatchSize) return true;
        return Promise.reject(`文件大于${maxSize}MB`);
      })
      .catch(() => Upload.LIST_IGNORE);
  };

  const handleChange = (info: UploadChangeParam) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
    } else if (info.file.status === 'done') {
      setLoading(false);
    } else if (info.file.status === 'error') {
      setLoading(false);
    }
    const updateState = { 'props.fileList': info.fileList };
    if (info.file.status === 'done') {
      if (maxCount && maxCount > 1) {
        const urls = info.fileList.map((file) =>
          getResUrl ? getResUrl(file.response) : file.url!,
        );
        Object.assign(updateState, {
          value: urls,
        });
      } else {
        const url = getResUrl ? getResUrl(info.file.response) : info.file.url;
        Object.assign(updateState, {
          value: url,
        });
      }
      info.file.url = getResUrl ? getResUrl(info.file.response) : info.file.url;
    }
    dispatch(fieldState.name, updateState);
  };

  const handleRemove = async (file: UploadFile<any>) => {
    try {
      const result = await Promise.resolve(onRemove ? onRemove(file) : true);
      if (result === false) return false;
      const url = getResUrl && file.response ? getResUrl(file.response) : file.url;

      if (maxCount && maxCount > 1 && Array.isArray(fieldState.value)) {
        const fileList = uploadProps.fileList?.filter((file) => file.url !== url);
        dispatch(fieldState.name, {
          value: (fieldState.value as string[]).filter((_url) => _url !== url),
          'props.fileList': fileList,
        });
      } else {
        dispatch(fieldState.name, {
          value: undefined,
          'props.fileList': undefined,
        });
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  );

  const defaultFileList = Array.isArray(value)
    ? value.map((url) => ({ url, uid: '-1', status: 'done' }))
    : { url: value };

  // 初始化回显fileList
  useEffect(() => {
    $(fieldState.name!)
      .pipe(
        filter((state) => !state.__from__),
        pluck('value'),
        filter((value) => !!value),
        take(1),
        // 防止 {props.fileList: []}更新早于{value: fileList}
        delay(0),
      )
      .subscribe((value) => {
        const finalValue = Array.isArray(value) ? value : [value];

        dispatch(fieldState.name, {
          'props.fileList': finalValue.map((url) => {
            const fileName = url.split('/').pop();
            return { url, uid: '-1', status: 'done', name: fileName };
          }),
        });
      });
  }, []);

  return (
    <Upload
      {...omit(uploadProps, 'value')}
      fileList={(fieldState.props as UploadProps)?.fileList || []}
      onRemove={handleRemove}
      maxCount={maxCount}
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {uploadProps?.listType === 'picture-card' ? (
        uploadButton
      ) : (
        <Button icon={<UploadOutlined />}>上传</Button>
      )}
    </Upload>
  );
};

// @ts-ignore
plugins.field.tap('upload', (customFieldProps) => {
  // @ts-ignore
  return <FileUpload {...customFieldProps} />;
});
