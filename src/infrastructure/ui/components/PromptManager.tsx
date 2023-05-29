import { Button, Card, Col, Row } from 'antd';
import Mustache from 'mustache';
import React, { useEffect, useState } from 'react';
import { useClipboard } from '../hooks/useClipboard';
import { useWorkflow } from '../hooks/useWorkflow';
import { useGlobalModalContext } from '../providers/GlobalModalProvider';
import { PromptDynamicForm } from './PromptDynamicForm';
import { PromptPreview } from './PromptPreview';
import { TemplateDiff } from './TemplateDiff';

interface Props {
  id?: number;
}

export const PromptManager: React.FC<Props> = ({ id }) => {
  const [formValues, setFormValues] = useState();
  const [template, setTemplate] = useState('');
  const [oldTemplate, setOldTemplate] = useState('');
  const [previewContent, setPreviewContent] = useState('');
  const { showModal } = useGlobalModalContext();
  const { workflow, update: updateWorkflow } = useWorkflow(id);
  const { save: saveToClip } = useClipboard();

  useEffect(() => {
    if (!workflow) {
      return;
    }

    setFormValues(workflow.formValues);
    setTemplate(workflow.template);
    setOldTemplate(workflow.template);
  }, [workflow]);

  Mustache.tags = ['[[', ']]'];
  Mustache.escape = (text) => text;

  const preview = (values: any, template: string) => {
    setFormValues(values);
    setTemplate(template);
  };

  const save = () => {
    setOldTemplate(template);

    if (workflow) {
      workflow.formValues = formValues;
      workflow.template = template;

      updateWorkflow(workflow);

      window.location.href = `#/workflows/${workflow.id}`;
    }
  };

  const copy = () => {
    saveToClip(previewContent);
  };

  const showDiff = () =>
    showModal({
      title: 'Template Diff',
      content: <TemplateDiff oldValue={oldTemplate} newValue={template} />,
    });

  return (
    <Card
      title="SMS Cadence Builder"
      extra={
        <>
          <Button type="primary" onClick={showDiff}>
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
          <PromptDynamicForm
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
    </Card>
  );
};
