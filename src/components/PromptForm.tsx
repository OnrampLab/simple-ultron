import { Form, Input, Radio, Select, Tabs } from 'antd';
import React, { useEffect, useMemo } from 'react';
import {
  campaignClickObjectives,
  campaignObjectives,
} from '../constants/campaignObjectives';
const { TextArea } = Input;

interface Props {
  values: any;
  template: string;
  onChange(vallues: any, template: string): void;
  onSubmit(vallues: any, template: string): void;
}

const PromptForm: React.FC<Props> = ({
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
        <Tabs.TabPane tab="Key Campaign Information" key="1">
          <Form.Item
            label="Company Name"
            name="company_name"
            tooltip="[[company_name]]"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Campaign Category"
            name="campaign_category"
            tooltip="[[campaign_category]]"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Campaign Website Url"
            name="campaign_website_url"
            tooltip="[[campaign_website_url]]"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Campaign Objective"
            name="campaign_objective"
            tooltip="[[campaign_objective]]"
            shouldUpdate
          >
            <Select
              options={campaignObjectives}
              // onChange={setCampaignObjective}
            />
          </Form.Item>

          <Form.Item
            label="Click-Objective-Goal"
            name="campaign_click_objective"
            tooltip="[[campaign_click_objective]]"
          >
            <Select options={campaignClickObjectives} />
          </Form.Item>

          <Form.Item
            label="Business Hours"
            name="campaign_business_hours"
            tooltip="[[campaign_business_hours]]"
          >
            <Input placeholder="I.e.Monday to Friday, 8am - 6pm, PST, Ignore for click campaign" />
          </Form.Item>
          <Form.Item
            label="Company Prefers to call their call reps"
            name="campaign_rep_title"
            tooltip="[[campaign_rep_title]]"
          >
            <Input placeholder="I.e. consultant, advisor, sales rep, experts, agents, Ignore for click campaign" />
          </Form.Item>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Campaign Highlights" key="2">
          <Form.Item
            label="Promotions"
            name="highlight_promotion_01"
            tooltip="[[highlight_promotion_01]]"
          >
            <Input placeholder="I.e. Existing Promotions/Discount/Limited Time Offers" />
          </Form.Item>
          <Form.Item
            label="Key Selling Points 1"
            name="highlight_key_selling_point_01"
            tooltip="[[highlight_key_selling_point_01]]"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Key Selling Points 2"
            name="highlight_key_selling_point_02"
            tooltip="[[highlight_key_selling_point_02]]"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Trust Building Statements 1"
            name="highlight_trust_building_statement_01"
            tooltip="[[highlight_trust_building_statement_01]]"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Trust Building Statements 2"
            name="highlight_trust_building_statement_02"
            tooltip="[[highlight_trust_building_statement_02]]"
          >
            <Input />
          </Form.Item>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Campaign Content Negatives" key="3">
          <Form.Item
            label="Always change"
            name="content_negatives"
            tooltip="[[content_negatives]]"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="to Any of the following Phrases"
            name="content_negatives_replacement"
            tooltip="[[content_negatives_replacement]]"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Do not ever say"
            name="do_not_ever_say_words"
            tooltip="[[do_not_ever_say_words]]"
          >
            <Input />
          </Form.Item>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Formatting & Output Options" key="4">
          <Form.Item
            label="Number of messages per version"
            name="number_msgs_per_day"
            tooltip="[[number_msgs_per_day]]"
          >
            <Select
              options={[
                { label: 1, value: 1 },
                { label: 2, value: 2 },
                { label: 3, value: 3 },
                { label: 4, value: 4 },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Number of Days"
            name="number_days"
            tooltip="[[number_days]]"
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Export Format"
            name="export_format"
            tooltip="[[export_format]]"
          >
            <Radio.Group>
              <Radio value="Regular Text">Regular Text</Radio>
              <Radio value="CSV">CSV</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Language"
            name="export_language"
            tooltip="[[export_language]]"
          >
            <Select
              options={[
                { label: 'English' },
                { label: 'Mandarin Traditional Chinese (繁體字）' },
                { label: 'Spanish' },
              ]}
            />
          </Form.Item>
        </Tabs.TabPane>
      </Tabs>
    </Form>
  );
};

export default PromptForm;
