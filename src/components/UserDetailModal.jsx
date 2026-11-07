function UserDetailModal({ user, onClose }) {
  if (!user) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,.55)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="card p-4 shadow"
        style={{
          width: "420px",
          maxWidth: "90%",
          borderRadius: "12px",
        }}
      >
        <h2 className="mb-3">
          Detalle del usuario
        </h2>

        <p>
          <strong>ID:</strong> {user.id}
        </p>

        <p>
          <strong>Nombre:</strong> {user.name}
        </p>

        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <p>
          <strong>Rol:</strong> {user.role}
        </p>

        {user.superadmin && (
          <p>
            ⭐ Super Administrador
          </p>
        )}

        <button
          className="btn btn-dark mt-3"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default UserDetailModal;