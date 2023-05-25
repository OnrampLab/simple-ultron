export type ID = number;
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type Block = {
  name: string;
  fields: Field[];
};

interface FormItem {
  name: string;
  label: string;
  defaultValue?: any;
  type: 'text' | 'number' | 'select' | 'radio';
}

interface Input extends FormItem {
  placeholder?: string;
}

interface TextInput extends Input {
  type: 'text';
  defaultValue?: string;
}

interface NumberInput extends Input {
  type: 'number';
  defaultValue?: number;
}

interface Option {
  label: string | number;
  value?: string | number;
  default: boolean;
}

type OptionDefaultValues = Pick<Option, 'default'>;

type OptionWithDefaultsOptional = Optional<Option, keyof OptionDefaultValues>;

interface Select extends FormItem {
  type: 'select';
  options: OptionWithDefaultsOptional[];
}

interface Radio extends FormItem {
  type: 'radio';
  options: OptionWithDefaultsOptional[];
}

type Field = TextInput | NumberInput | Select | Radio;
