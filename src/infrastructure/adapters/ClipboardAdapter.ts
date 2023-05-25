class ClipboardAdapter {
  save(content: string) {
    navigator.clipboard.writeText(content);
  }
}

export const clipboardAdapter = new ClipboardAdapter();
