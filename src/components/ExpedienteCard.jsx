function ExpedienteCard({ expediente }) {
  return (
    <div className="panel-card">
      <h2>Expediente Actual</h2>
      <div className="expediente-field">
        <strong>Pedimento</strong>
        <span>{expediente.title}</span>
      </div>
      <div className="expediente-field">
        <strong>Referencia</strong>
        <span>{expediente.reference}</span>
      </div>
      <div className="expediente-field">
        <strong>Cliente</strong>
        <span>{expediente.client}</span>
      </div>
      <div className="expediente-field">
        <strong>Fecha</strong>
        <span>{expediente.date}</span>
      </div>
    </div>
  );
}

export default ExpedienteCard;
