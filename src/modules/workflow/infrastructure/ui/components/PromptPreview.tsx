import { Input } from 'antd';
import Mustache from 'mustache';
import React, { useEffect, useState } from 'react';
const { TextArea } = Input;

interface Props {
  values: any;
  template: string;
  onOutputChange(output: string): void;
}

export const PromptPreview: React.FC<Props> = ({
  values,
  template,
  onOutputChange,
}) => {
  const [output, setOutput] = useState('');

  Mustache.tags = ['[[', ']]'];
  Mustache.escape = (text) => text;

  useEffect(() => {
    const result = Mustache.render(template, values || {});

    setOutput(result);
    onOutputChange(result);
  }, [values, template, onOutputChange]);

  return (
    <>
      <h2>Preview</h2>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://chat.openai.com/?model=gpt-4-plugins"
      >
        Go To ChatGPT
      </a>
      <TextArea rows={30} value={output} />
    </>
  );
};
