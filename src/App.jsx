import { useCallback, useMemo, useState } from 'react';
import ExpedienteCard from './components/ExpedienteCard.jsx';
import UploadArea from './components/UploadArea.jsx';
import FileList from './components/FileList.jsx';
import DocumentRequirements from './components/DocumentRequirements.jsx';
import InfoCard from './components/InfoCard.jsx';

const expedienteData = {
  title: 'Pedimento A-1234567',
  reference: 'MEX-10111',
  client: 'Grupo Comercial MX',
  date: '24 May 2024',
};

const requiredDocuments = [
  { label: 'Pedimento de Importación/Exportación', required: true },
  { label: 'Factura Comercial', required: true },
  { label: 'Lista de Empaque', required: true },
  { label: 'Guía Aérea / Conocimiento de Embarque', required: true },
  { label: 'Certificado de Origen', required: false },
  { label: 'Encargo Conferido', required: false },
];

const additionalInfo = {
  aduana: 'Aeropuerto CDMX (AICM)',
  patente: '3456',
  tramite: 'Importación',
};

const initialFiles = [
  {
    id: '1',
    name: 'Factura_Comercial_MEX10111.pdf',
    sizeLabel: '3.2MB',
    uploadedAt: '24/05/24',
  },
  {
    id: '2',
    name: 'Lista_Empaque_MEX10111.pdf',
    sizeLabel: '1.5MB',
    uploadedAt: '24/05/24',
  },
];

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function App() {
  const [files, setFiles] = useState(initialFiles);
  const [dragging, setDragging] = useState(false);

  const expectedCount = 5;

  const progress = useMemo(() => Math.min(100, Math.round((files.length / expectedCount) * 100)), [files.length]);

  const handleFiles = useCallback((incomingFiles) => {
    const nextFiles = Array.from(incomingFiles).map((file, index) => ({
      id: `${file.name}-${file.lastModified}-${index}`,
      name: file.name,
      sizeLabel: formatFileSize(file.size),
      uploadedAt: new Date().toLocaleDateString('es-MX'),
    }));
    setFiles((current) => [...current, ...nextFiles]);
  }, []);

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);
    if (event.dataTransfer.files?.length) {
      handleFiles(event.dataTransfer.files);
    }
  }, [handleFiles]);

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragging(false);
  }, []);

  const handleFileInputChange = useCallback((event) => {
    if (event.target.files?.length) {
      handleFiles(event.target.files);
      event.target.value = '';
    }
  }, [handleFiles]);

  const removeFile = useCallback((id) => {
    setFiles((current) => current.filter((file) => file.id !== id));
  }, []);

  const saveAndContinue = useCallback(() => {
    window.alert('Simulación guardada. Esta aplicación es completamente estática.');
  }, []);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-left">
          <div className="brand">AduanaNet</div>
          <nav className="nav-links">
            <a href="#">Documentos</a>
            <a href="#">Pedimentos</a>
            <a href="#">Servicios</a>
            <a href="#">Mi Cuenta</a>
          </nav>
        </div>
        <div className="user-panel">
          <div className="account-badge">
            <div className="avatar">AR</div>
            <div className="account-info">
              <span className="account-label">Mi Cuenta</span>
              <strong>Alejandro Ruiz</strong>
            </div>
          </div>
          <button className="logout-button">Logout</button>
        </div>
      </header>

      <main className="page-container">
        <section className="main-card">
          <div className="page-title">
            <h1>Carga de Documentos para Despacho Aduanal</h1>
            <div className="stepper">
              <span className="step completed">1. Datos General</span>
              <span className="step-separator">→</span>
              <span className="step active">2. Subir Archivos</span>
              <span className="step-separator">→</span>
              <span className="step">3. Confirmación</span>
            </div>
          </div>

          <section className="content-grid">
            <article className="panel panel-left">
              <ExpedienteCard expediente={expedienteData} />
            </article>

            <article className="panel panel-center">
              <UploadArea
                dragging={dragging}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onFileChange={handleFileInputChange}
              />

              <FileList files={files} onRemove={removeFile} />

              <div className="progress-row">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progress}%` }} />
                </div>
                <span>{progress}% complete</span>
              </div>

              <div className="actions-row">
                <button className="text-button">Cancelar</button>
                <button className="primary-button" onClick={saveAndContinue}>Guardar y Continuar</button>
              </div>
            </article>

            <article className="panel panel-right">
              <DocumentRequirements documents={requiredDocuments} />
              <InfoCard info={additionalInfo} />
            </article>
          </section>
        </section>
      </main>
    </div>
  );
}

export default App;
