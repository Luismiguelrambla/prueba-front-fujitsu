import React from 'react';

interface NameBodyProps {
  name: string;
}

const NameBody: React.FC<NameBodyProps> = ({ name }) => {
  return (
    <div className="p-column-nameBody">
      <span>{name}</span>
      <div className="p-column-nameBody-sub">
        <div>
          <p>Documento - PDF</p>
          <img src="src/assets/arrows.svg" alt="arrows" />
        </div>
        <p
          className="p-column-nameBody-breadcrumbs"
          title={
            'Expedientes > Contenido Islas Baleares > Expedientes Material'
          }
        >
          {'Expedientes > Contenido Islas Baleares > Expedientes Material'}
        </p>
      </div>
    </div>
  );
};

export default NameBody;
