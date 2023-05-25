import { Form, Input, Radio, Select } from 'antd';

export const generateField = (field: any, index: number) => {
  let component = <></>;
  let defaultValue = field.defaultValue;
  let options = field.options;

  if (['select', 'radio'].includes(field.type)) {
    options = field.options?.map((option: any) => {
      return {
        ...option,
        value: option.value ?? option.label,
      };
    });
    const defaultOption = options.find((option: any) => option.default);
    defaultValue = defaultOption?.value;
  }

  if (field.type === 'text') {
    component = <Input placeholder={field.placeholder} />;
  }

  if (field.type === 'number') {
    component = <Input type="number" placeholder={field.placeholder} />;
  }

  if (field.type === 'select') {
    component = <Select options={options} />;
  }

  if (field.type === 'radio') {
    component = (
      <Radio.Group defaultValue={defaultValue}>
        {options.map((option: any, index: number) => (
          <Radio value={option.value} key={index}>
            {option.label}
          </Radio>
        ))}
      </Radio.Group>
    );
  }

  return (
    <Form.Item
      key={index}
      label={field.label}
      name={field.name}
      tooltip={`[[${field.name}]]`}
      initialValue={defaultValue}
    >
      {component}
    </Form.Item>
  );
};
