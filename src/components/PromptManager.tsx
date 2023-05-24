import { Button, Card, Col, Modal, Row } from 'antd';
import Mustache from 'mustache';
import React, { useEffect, useState } from 'react';
import {
  campaignClickObjectives,
  campaignObjectives,
} from '../constants/campaignObjectives';
import PromptForm from './PromptForm';
import { PromptPreview } from './PromptPreview';
import { TemplateDiff } from './TemplateDiff';

const defaultForm = {
  campaign_objective: campaignObjectives[0].value,
  campaign_rep_title: 'rep',
  campaign_click_objective: campaignClickObjectives[0].value,
  number_msgs_per_day: 1,
  number_days: 15,
  export_format: 'Regular Text',
  export_language: 'English',
};

export const PromptManager: React.FC = () => {
  const [formValues, setFormValues] = useState(defaultForm);
  const [template, setTemplate] = useState('');
  const [oldTemplate, setOldTemplate] = useState('');
  const [previewContent, setPreviewContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const storedJsonString = localStorage.getItem('prompt-form');
    const storedTemplate = localStorage.getItem('prompt-template');

    if (storedJsonString) {
      const values = JSON.parse(storedJsonString);
      setFormValues(values);
      console.debug('Load form from local storage', values);
    }

    if (storedTemplate) {
      setTemplate(storedTemplate);
      setOldTemplate(storedTemplate);
    }
  }, []);

  Mustache.tags = ['[[', ']]'];
  Mustache.escape = (text) => text;

  const preview = (values: any, template: string) => {
    setFormValues(values);
    setTemplate(template);
  };

  const save = () => {
    localStorage.setItem('prompt-template', template);

    const json = JSON.stringify(formValues);
    localStorage.setItem('prompt-form', json);
  };

  const copy = () => {
    if (previewContent) {
      navigator.clipboard.writeText(previewContent);
    }
  };

  return (
    <Card
      title="SMS Cadence Builder"
      extra={
        <>
          <Button type="primary" onClick={showModal}>
            Show Template Diff
          </Button>{' '}
          <Button type="primary" onClick={copy}>
            Copy Output
          </Button>{' '}
          <Button type="primary" onClick={save}>
            Save
          </Button>
        </>
      }
    >
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <PromptForm
            values={formValues}
            template={template}
            onChange={preview}
            onSubmit={preview}
          />
        </Col>
        <Col className="gutter-row" span={12}>
          <PromptPreview
            values={formValues}
            template={template}
            onOutputChange={setPreviewContent}
          />
        </Col>
      </Row>
      <Modal
        title="Template Diff"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        <TemplateDiff oldValue={oldTemplate} newValue={template} />
      </Modal>
    </Card>
  );
};
