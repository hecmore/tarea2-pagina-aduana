function InfoCard({ info }) {
  return (
    <div className="panel-card info-card">
      <h2>Información Adicional</h2>
      <div className="info-field">
        <strong>Aduana</strong>
        <span>{info.aduana}</span>
      </div>
      <div className="info-field">
        <strong>Patente</strong>
        <span>{info.patente}</span>
      </div>
      <div className="info-field">
        <strong>Trámite</strong>
        <span>{info.tramite}</span>
      </div>
    </div>
  );
}

export default InfoCard;
