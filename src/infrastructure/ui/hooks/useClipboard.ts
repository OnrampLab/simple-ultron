import { clipboardAdapter } from '../../adapters/ClipboardAdapter';

interface Parameters {}

export const useClipboard = (parameters: Parameters = {}) => {
  const save = (content: string) => {
    clipboardAdapter.save(content);
  };

  return {
    save,
  };
};
