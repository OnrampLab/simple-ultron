import { Form, Input, Tabs } from 'antd';
import React, { useEffect, useMemo } from 'react';
import { playbook } from '../playbooks/smsCadenceBuilder';
import { generateField } from './FieldBuilder';
const { TextArea } = Input;

interface Props {
  values: any;
  template: string;
  onChange(vallues: any, template: string): void;
  onSubmit(vallues: any, template: string): void;
}

export const PromptDynamicForm: React.FC<Props> = ({
  values = {},
  template,
  onChange,
  onSubmit,
}) => {
  const [form] = Form.useForm();

  const initialValues = useMemo(() => {
    return {
      ...values,
      promptTemplate: template,
    };
  }, [values, template]);

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

  const processValues = (values: any) => {
    const view = {
      ...values,
      content_negatives_output: `Always change ${values.content_negatives} to Any of the following Phrases ${values.content_negatives_replacement}`,
      do_not_ever_say: `Do not ever say ${values.do_not_ever_say_words}`,
    };

    const template = view.promptTemplate;

    return {
      view,
      template,
    };
  };

  const onFormSubmit = (values: any) => {
    const { view, template } = processValues(values);

    onSubmit(view, template);
  };

  const onFormChange = (changedValue: any, allValues: any) => {
    // NOTE: 因為我有分 Tab，antd 疑似有一個 Bug，就是在一開始不可見時，allValues 會是空的
    //       即使是使用 form.getFieldsValue() 也會取到空值
    //       當點完每個 Tab 後，才會有完整的 allValues
    //       暫時解法是先以原本的 initialValues 當基底去 Merge allValues
    const values = {
      ...initialValues,
      ...allValues,
    };

    const { view, template } = processValues(values);

    onChange(view, template);
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      initialValues={initialValues}
      onFinish={onFormSubmit}
      onValuesChange={onFormChange}
    >
      <Tabs size="large">
        <Tabs.TabPane tab="Template" key="template">
          <Form.Item name="promptTemplate" wrapperCol={{ span: 22 }}>
            <TextArea rows={30} />
          </Form.Item>
        </Tabs.TabPane>

        {playbook.blocks.map((block, index) => (
          <Tabs.TabPane tab={block.name} key={index}>
            {block.fields.map((field, index) => generateField(field, index))}
          </Tabs.TabPane>
        ))}
      </Tabs>
    </Form>
  );
};
