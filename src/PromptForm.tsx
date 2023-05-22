import { Button, Card, Form, Input, Radio, Select, Tabs } from 'antd';
import Mustache from 'mustache';
import React, { useEffect, useState } from 'react';
const { TextArea } = Input;

const campaignObjectives = [
  { value: 'Text', label: 'Text' },
  {
    value: 'Call-Objective',
    label: 'Call-Objective',
  },
  {
    value: 'Click-Objective-PermissionBased',
    label: 'Click-Objective-PermissionBased',
  },
  {
    value: 'Click-Objective-DirectSend',
    label: 'Click-Objective-DirectSend',
  },
];

const campaignClickObjectives = [
  { value: 'Text', label: 'Text' },
  {
    value: 'Learn More',
    label: 'Learn More',
  },
  {
    value: 'Sign Up',
    label: 'Sign Up',
  },
  {
    value: 'Buy Now',
    label: 'Buy Now',
  },
  {
    value: 'Register',
    label: 'Register',
  },
  {
    value: 'Complete or Finish Purchase (Must mention Complete or Finish)',
    label: 'Complete or Finish Purchase (Must mention Complete or Finish)',
  },
  {
    value: 'Complete or Finish Sign-Up  (Must mention Complete or Finish)',
    label: 'Complete or Finish Sign-Up  (Must mention Complete or Finish)',
  },
  {
    value: 'Get Link To This Offer',
    label: 'Get Link To This Offer',
  },
];

const defaultForm = {
  campaign_objective: campaignObjectives[0].value,
  campaign_rep_title: 'rep',
  campaign_click_objective: campaignClickObjectives[0].value,
  number_msgs_per_day: 1,
  number_days: 15,
  export_format: 'Regular Text',
  export_language: 'English',
};

const PromptForm: React.FC = () => {
  const [form] = Form.useForm();
  const [campaignObjective, setCampaignObjective] = useState(
    campaignObjectives[0].value
  );
  const [previewContent, setPreviewContent] = useState('');
  useEffect(() => {
    const formValues = JSON.parse(localStorage.getItem('prompt-form') ?? '{}');
    formValues.promptTemplate = localStorage.getItem('prompt-template') || '';

    form.setFieldsValue(formValues);

    setCampaignObjective(formValues.campaign_objective);

    preview(formValues);

    console.debug('Load form from local storage', formValues);
  }, [form]);

  const isClickObjective = [
    'Click-Objective-PermissionBased',
    'Click-Objective-DirectSend',
  ].includes(campaignObjective);
  const isCallObjective = campaignObjective === 'Call-Objective';

  Mustache.tags = ['[[', ']]'];
  Mustache.escape = (text) => text;

  const preview = (values: any) => {
    const view = {
      ...values,
      content_negatives_output: `Always change ${values.content_negatives} to Any of the following Phrases ${values.content_negatives_replacement}`,
      do_not_ever_say: `Do not ever say ${values.do_not_ever_say_words}`,
    };

    const template = form.getFieldValue('promptTemplate');

    if (!template) {
      console.warn('The template is empty');
      return;
    }

    const output = Mustache.render(template, view);

    setPreviewContent(output);

    return output;
  };

  const save = (values: any) => {
    const output = preview(values);

    if (output) {
      navigator.clipboard.writeText(output);
    }

    if (!values.highlight_promotion_01) {
      debugger;
    }

    localStorage.setItem('prompt-template', values.promptTemplate);
    values.promptTemplate = null;

    const json = JSON.stringify(values);
    localStorage.setItem('prompt-form', json);
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      initialValues={defaultForm}
      onFinish={save}
    >
      <Card
        title="Default size card"
        extra={
          <>
            <Button type="primary" htmlType="submit">
              Submit and copy
            </Button>
          </>
        }
      >
        <Tabs size="large">
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
                onChange={setCampaignObjective}
              />
            </Form.Item>

            {/* {isClickObjective && ( */}
            <Form.Item
              label="Click-Objective-Goal"
              name="campaign_click_objective"
              tooltip="[[campaign_click_objective]]"
            >
              <Select options={campaignClickObjectives} />
            </Form.Item>
            {/* )} */}

            {/* {isCallObjective && (
              <> */}
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
            {/* </>
            )} */}
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
          <Tabs.TabPane tab="Template" key="5">
            <Form.Item label="Prompt Template" name="promptTemplate">
              <TextArea rows={30} />
            </Form.Item>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Preview" key="6">
            <TextArea rows={30} value={previewContent} />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </Form>
  );
};

export default PromptForm;
