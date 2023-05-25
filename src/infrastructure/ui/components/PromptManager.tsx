import { Button, Card, Col, Row } from 'antd';
import Mustache from 'mustache';
import React, { useEffect, useState } from 'react';
import { Playbook } from '../../../domain/entities/Playbook';
import { smsCadenceBuilder } from '../../../domain/playbookForms/smsCadenceBuilder';
import { clipboardAdapter } from '../../adapters/ClipboardAdapter';
import { playbookAdapter } from '../../adapters/PlaybookAdapter';
import { useGlobalModalContext } from '../providers/GlobalModalProvider';
import { PromptDynamicForm } from './PromptDynamicForm';
import { PromptPreview } from './PromptPreview';
import { TemplateDiff } from './TemplateDiff';

export const PromptManager: React.FC = () => {
  const [formValues, setFormValues] = useState();
  const [template, setTemplate] = useState('');
  const [oldTemplate, setOldTemplate] = useState('');
  const [previewContent, setPreviewContent] = useState('');
  const { showModal } = useGlobalModalContext();

  useEffect(() => {
    const playbook = playbookAdapter.get();

    setFormValues(playbook.formValues);
    setTemplate(playbook.template);
    setOldTemplate(playbook.template);
  }, []);

  Mustache.tags = ['[[', ']]'];
  Mustache.escape = (text) => text;

  const preview = (values: any, template: string) => {
    setFormValues(values);
    setTemplate(template);
  };

  const save = () => {
    setOldTemplate(template);

    const playbook = new Playbook(
      1,
      'My SMS Cadence Builder',
      smsCadenceBuilder.name,
      formValues,
      template
    );

    playbookAdapter.update(playbook);
  };

  const copy = () => {
    if (previewContent) {
      clipboardAdapter.save(previewContent);
    }
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
