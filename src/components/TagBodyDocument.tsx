import React from 'react';
import { Tag } from 'primereact/tag';
import { ITags } from '../types/interfaces';

interface TagBodyProps {
  tags: ITags;
}

const TagBody: React.FC<TagBodyProps> = ({ tags }) => (
  <div className="tag-container" role="group" aria-label="tags container">
    <Tag
      value={
        <>
          <i className="pi pi-shopping-bag" aria-hidden="true" />
          <span aria-label="bag count">{`+${tags.bag}`}</span>
        </>
      }
      rounded
      aria-label={`Bag: +${tags.bag}`}
    />
    <Tag
      value={
        <>
          <i className="pi pi-box" aria-hidden="true" />
          <span aria-label="box count">{`+${tags.box}`}</span>
        </>
      }
      rounded
      aria-label={`Box: +${tags.box}`}
    />
  </div>
);

export default TagBody;
