import React from 'react';
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer-esm';

interface Props {
  oldValue: string;
  newValue: string;
}

export const TemplateDiff: React.FC<Props> = ({ oldValue, newValue }) => {
  return (
    <ReactDiffViewer
      oldValue={oldValue}
      newValue={newValue}
      splitView={true}
      compareMethod={DiffMethod.WORDS}
    />
  );
};
