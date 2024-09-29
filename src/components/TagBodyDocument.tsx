import React from 'react';
import { Tag } from 'primereact/tag';
import { ITags } from '../types/interfaces';

interface TagBodyProps {
  tags: ITags;
}

const TagBody: React.FC<TagBodyProps> = ({ tags }) => (
  <div className="tag-container">
    <Tag
      value={
        <>
          <i className="pi pi-shopping-bag" />
          <p>{`+${tags.bag}`}</p>
        </>
      }
      rounded
    />
    <Tag
      value={
        <>
          <i className="pi pi-box" />
          <p>{`+${tags.box}`}</p>
        </>
      }
      rounded
    />
  </div>
);

export default TagBody;
