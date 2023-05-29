class ClipboardAdapter {
  save(content: string) {
    if (!content) {
      console.warn('No content to save to clipboard!');

      return;
    }

    navigator.clipboard.writeText(content);
  }
}

export const clipboardAdapter = new ClipboardAdapter();
