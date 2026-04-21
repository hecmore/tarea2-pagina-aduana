function FileList({ files, onRemove }) {
  return (
    <div className="file-list-card">
      {files.map((file) => (
        <div className="file-row" key={file.id}>
          <div>
            <div className="file-name">{file.name}</div>
            <div className="file-meta">{file.sizeLabel} · Listado {file.uploadedAt}</div>
          </div>
          <button className="text-button" onClick={() => onRemove(file.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}

export default FileList;
