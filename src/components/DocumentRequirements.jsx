function DocumentRequirements({ documents }) {
  return (
    <div className="panel-card document-requirements">
      <h2>Documentos Requeridos <span className="country-flag">🇲🇽 Mexico</span></h2>
      {documents.map((doc) => (
        <label className="document-item" key={doc.label}>
          <input type="radio" checked={doc.required} readOnly />
          <div>
            <span>{doc.label}</span>
            <small>{doc.required ? 'Requerido' : 'Opcional'}</small>
          </div>
        </label>
      ))}
    </div>
  );
}

export default DocumentRequirements;
