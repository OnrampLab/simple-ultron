import { useNavigate } from '@core/infrastructure/ui/hooks/useNavigate';
import { Card, Col, Dropdown, MenuProps, Row } from 'antd';
import { chatgptAdapter } from 'modules/chatgpt/infrastructure/adapters/ChatgptAdapter';
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
  const navigate = useNavigate();
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

  const save = async () => {
    setOldTemplate(template);

    if (workflow) {
      workflow.formValues = formValues;
      workflow.template = template;

      updateWorkflow(workflow);

      navigate(`/workflows/${workflow.id}`);
    }

    const response = await chatgptAdapter.sendMessage('What is OpenAI?');

    console.log({ response });
  };

  const copy = () => {
    saveToClip(previewContent);
  };

  const showDiff = () =>
    showModal({
      title: 'Template Diff',
      content: <TemplateDiff oldValue={oldTemplate} newValue={template} />,
    });

  const showPreview = () =>
    showModal({
      title: 'Preview',
      okText: 'Save',
      cancelText: 'Close',
      onOk: save,
      content: (
        <PromptPreview
          values={formValues}
          template={template}
          onOutputChange={setPreviewContent}
        />
      ),
    });

  const items: MenuProps['items'] = [
    {
      key: 1,
      label: 'Preview',
      onClick: showPreview,
    },
    {
      key: 2,
      label: 'Copy Output',
      onClick: copy,
    },
    {
      key: 3,
      label: 'Show Template Diff',
      onClick: showDiff,
    },
  ];

  return (
    <Card
      title="SMS Cadence Builder"
      extra={
        <Dropdown.Button type="primary" menu={{ items }} onClick={save}>
          Save
        </Dropdown.Button>
      }
    >
      <Row gutter={16}>
        <Col className="gutter-row" span={24}>
          <PromptDynamicForm
            values={formValues}
            template={template}
            onChange={preview}
            onSubmit={preview}
          />
        </Col>
      </Row>
    </Card>
  );
};
