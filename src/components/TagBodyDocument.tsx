import React from 'react';
import { Tag } from 'primereact/tag';

interface TagBodyProps {
  tags: string[];
}

const TagBody: React.FC<TagBodyProps> = ({ tags }) => (
  <Tag
    value={
      <>
        <i className="pi pi-box" />
        <p>{`+${tags.length}`}</p>
      </>
    }
    rounded
  />
);

export default TagBody;
