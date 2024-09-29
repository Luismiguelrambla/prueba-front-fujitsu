import React from 'react';

const RowExpansion: React.FC = () => (
  <div className="expansion-row">
    <img src="src/assets/pdf-file-icon.svg" alt="PDF Icon" />
    <div className="expansion-container">
      <div>
        <p className="title">Nombre del documento.pdf</p>
        <p className="subtitle">
          Departamento de origen de este documento, puede doblar las líneas que
          sean necesarias
        </p>
      </div>
      <div>
        <p className="title">Evaluación de la Fuente</p>
        <p className="subtitle">Evaluación</p>
      </div>
    </div>
    <div className="expansion-container">
      <div>
        <p className="title">Plantilla utilizada</p>
        <p className="subtitle">Nombre plantilla utilizada en este doc</p>
      </div>
      <div>
        <p className="title">Fecha de creación</p>
        <p className="subtitle">20/05/2023 - 12:20 h</p>
      </div>
    </div>
    <div className="expansion-container">
      <div>
        <p className="title">Restricciones del documento</p>
        <p className="subtitle">3 restriciones Ver</p>
      </div>

      <div>
        <p className="title">Etiquetas</p>
        <p className="subtitle">
          Etiqueta 1, Equtiqueta 2, Etiequeta 3, Etiqueta 4, Etiqueta 5, +3
        </p>
      </div>
    </div>
  </div>
);

export default RowExpansion;
