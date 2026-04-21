function UploadArea({ dragging, onDrop, onDragOver, onDragLeave, onFileChange }) {
  return (
    <div className={`upload-card ${dragging ? 'dragging' : ''}`}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      <div className="upload-drop-area">
        <div className="upload-icon">⬆︎</div>
        <p>Arrastra y suelta tus documentos aquí</p>
        <span>o</span>
        <label className="button secondary-button" htmlFor="fileInput">Seleccionar Archivos</label>
        <input
          id="fileInput"
          type="file"
          multiple
          onChange={onFileChange}
          hidden
        />
        <p className="help-text">Formatos soportados: PDF, XML, JPG, PNG (Max 50MB)</p>
      </div>
    </div>
  );
}

export default UploadArea;
