function Loader() {
  return (
    <div className="loader-container">
      <div className="loader-content">
        <img
          src="/logo-blanco.jpg"
          alt="Incorrecta Taller"
          className="loader-logo"
        />

        <h2 className="loader-title">
          INCORRECTA
          <span>TALLER</span>
        </h2>

        <p className="loader-text">
          Cargando colección...
        </p>
      </div>
    </div>
  );
}

export default Loader;