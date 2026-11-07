import { useState } from "react";
import { NavLink } from "react-router-dom";

import useGetUsers from "../../hooks/user/useGetUsers";
import useDeleteUser from "../../hooks/user/useDeleteUser";

import useGetProducts from "../../hooks/products/useGetProducts";
import useDeleteProduct from "../../hooks/products/useDeleteProduct";

import {
  notifySuccess,
  notifyError,
  notifyInfo,
  confirmAction,
} from "../../utils/notify";

import UserDetailModal from "../UserDetailModal";
import Loader from "../Loader";

function AdminPanelPage() {
  const {
    users,
    error: usersError,
    loading: usersLoading,
    refetch: refetchUsers,
  } = useGetUsers();

  const { deleteUser } = useDeleteUser();

  const {
    products,
    error: productsError,
    loading: productsLoading,
    refetch: refetchProducts,
  } = useGetProducts();

  const {
    deleteProduct,
    loading: deleteProductLoading,
  } = useDeleteProduct();

  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const term = search.trim().toLowerCase();

  const filteredUsers = term
    ? users.filter(
        (user) =>
          user.name?.toLowerCase().includes(term) ||
          user.email?.toLowerCase().includes(term)
      )
    : users;

  const totalStock = products.reduce(
    (total, product) => total + Number(product.quantity || 0),
    0
  );

  const availableProducts = products.filter(
    (product) => product.status === "AVAILABLE"
  ).length;

  const adminUsers = users.filter(
    (user) => user.role === "admin" || user.superadmin
  ).length;

  const handleDeleteUser = async (user) => {
    if (user.superadmin) {
      notifyInfo(
        "Acción no permitida",
        "El Superadmin no puede ser eliminado."
      );

      return;
    }

    const confirmed = await confirmAction(
      `¿Eliminar a "${user.name}"?`,
      "El usuario dejará de listarse y no podrá iniciar sesión.",
      "Sí, eliminar"
    );

    if (!confirmed) return;

    const result = await deleteUser(user.id);

    if (result) {
      if (selectedUser?.id === user.id) {
        setSelectedUser(null);
      }

      await refetchUsers();

      notifySuccess(
        "Usuario eliminado",
        `"${user.name}" fue dado de baja correctamente.`
      );
    } else {
      notifyError(
        "Error al eliminar",
        "Ocurrió un error al eliminar el usuario."
      );
    }
  };

  const handleDeleteProduct = async (product) => {
    const confirmed = await confirmAction(
      `¿Eliminar "${product.name}"?`,
      "Esta acción eliminará definitivamente el producto.",
      "Sí, eliminar"
    );

    if (!confirmed) return;

    const success = await deleteProduct(product.id);

    if (success) {
      await refetchProducts();

      notifySuccess(
        "Producto eliminado",
        `"${product.name}" fue eliminado correctamente.`
      );
    } else {
      notifyError(
        "Error al eliminar",
        "No se pudo eliminar el producto."
      );
    }
  };

  if (usersLoading || productsLoading) {
    return <Loader />;
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <p>Administración</p>
          <h2>Panel Admin</h2>
        </div>

        <nav
          className="admin-sidebar-nav"
          aria-label="Navegación del panel administrador"
        >
          <a href="#dashboard">
            <span aria-hidden="true">▦</span>
            Resumen
          </a>

          <a href="#usuarios">
            <span aria-hidden="true">👥</span>
            Usuarios
          </a>

          <a href="#productos">
            <span aria-hidden="true">📦</span>
            Productos
          </a>

          <NavLink to="/products/create">
            <span aria-hidden="true">＋</span>
            Crear producto
          </NavLink>

          <NavLink to="/products">
            <span aria-hidden="true">🛍</span>
            Ver tienda
          </NavLink>
        </nav>
      </aside>

      <main className="admin-main">
        <section
          id="dashboard"
          className="admin-dashboard-header"
        >
          <div>
            <p className="admin-eyebrow">
              Incorrecta Taller
            </p>

            <h1>Dashboard</h1>

            <p className="admin-dashboard-intro">
              Gestioná usuarios, productos, stock y disponibilidad
              desde un único lugar.
            </p>
          </div>

          <NavLink
            to="/products/create"
            className="admin-primary-link"
          >
            Crear producto
          </NavLink>
        </section>

        <section
          className="admin-stats"
          aria-label="Estadísticas generales"
        >
          <article className="admin-stat-card">
            <p>Usuarios</p>
            <strong>{users.length}</strong>
            <span>{adminUsers} administradores</span>
          </article>

          <article className="admin-stat-card">
            <p>Productos</p>
            <strong>{products.length}</strong>
            <span>{availableProducts} disponibles</span>
          </article>

          <article className="admin-stat-card">
            <p>Stock total</p>
            <strong>{totalStock}</strong>
            <span>Unidades registradas</span>
          </article>
        </section>

        <section
          id="usuarios"
          className="admin-section"
        >
          <div className="admin-section-header">
            <div>
              <p className="admin-eyebrow">
                Administración
              </p>

              <h2>Gestión de usuarios</h2>
            </div>

            <p className="admin-section-count">
              {filteredUsers.length}{" "}
              {filteredUsers.length === 1
                ? "usuario"
                : "usuarios"}
            </p>
          </div>

          <div className="admin-search">
            <label htmlFor="admin-user-search">
              Buscar usuario
            </label>

            <input
              id="admin-user-search"
              type="search"
              placeholder="Buscar por nombre o email..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>

          {usersError && (
            <div className="admin-error" role="alert">
              <p>
                {usersError.message || String(usersError)}
              </p>

              <button
                type="button"
                onClick={refetchUsers}
              >
                Reintentar
              </button>
            </div>
          )}

          {!usersError && (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="admin-table-empty"
                      >
                        No se encontraron usuarios.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user.id}>
                        <td data-label="Nombre">
                          <strong>{user.name}</strong>
                        </td>

                        <td data-label="Email">
                          {user.email}
                        </td>

                        <td data-label="Rol">
                          <span
                            className={`admin-badge ${
                              user.superadmin
                                ? "admin-badge--superadmin"
                                : user.role === "admin"
                                  ? "admin-badge--admin"
                                  : "admin-badge--client"
                            }`}
                          >
                            {user.superadmin
                              ? "Superadmin"
                              : user.role}
                          </span>
                        </td>

                        <td data-label="Acciones">
                          <div className="admin-table-actions">
                            <button
                              className="admin-action-button admin-action-button--view"
                              type="button"
                              onClick={() =>
                                setSelectedUser(user)
                              }
                            >
                              Ver
                            </button>

                            <button
                              className="admin-action-button admin-action-button--delete"
                              type="button"
                              onClick={() =>
                                handleDeleteUser(user)
                              }
                              disabled={user.superadmin}
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section
          id="productos"
          className="admin-section"
        >
          <div className="admin-section-header">
            <div>
              <p className="admin-eyebrow">
                Catálogo
              </p>

              <h2>Gestión de productos</h2>
            </div>

            <NavLink
              to="/products/create"
              className="admin-primary-link"
            >
              Crear producto
            </NavLink>
          </div>

          {productsError && (
            <div className="admin-error" role="alert">
              <p>
                {productsError.message ||
                  String(productsError)}
              </p>

              <button
                type="button"
                onClick={refetchProducts}
              >
                Reintentar
              </button>
            </div>
          )}

          {!productsError && (
            <div className="admin-table-wrapper">
              <table className="admin-table admin-products-table">
                <thead>
                  <tr>
                    <th>Imagen</th>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Categoría</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {products.length === 0 ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="admin-table-empty"
                      >
                        No hay productos cargados.
                      </td>
                    </tr>
                  ) : (
                    products.map((product) => (
                      <tr key={product.id}>
                        <td data-label="Imagen">
                          <img
                            className="admin-product-image"
                            src={product.image}
                            alt={product.name}
                            loading="lazy"
                          />
                        </td>

                        <td data-label="Producto">
                          <strong>{product.name}</strong>
                        </td>

                        <td data-label="Precio">
                          $
                          {product.price.toLocaleString(
                            "es-AR"
                          )}
                        </td>

                        <td data-label="Stock">
                          <span
                            className={`admin-stock ${
                              product.quantity === 0
                                ? "admin-stock--empty"
                                : product.quantity <= 3
                                  ? "admin-stock--low"
                                  : ""
                            }`}
                          >
                            {product.quantity}
                          </span>
                        </td>

                        <td data-label="Categoría">
                          {product.category}
                        </td>

                        <td data-label="Estado">
                          <span
                            className={`admin-badge ${
                              product.status === "AVAILABLE"
                                ? "admin-badge--available"
                                : "admin-badge--unavailable"
                            }`}
                          >
                            {product.status === "AVAILABLE"
                              ? "Disponible"
                              : "No disponible"}
                          </span>
                        </td>

                        <td data-label="Acciones">
                          <div className="admin-table-actions">
                            <NavLink
                              to={`/products/edit/${product.id}`}
                              className="admin-action-button admin-action-button--edit"
                            >
                              Editar
                            </NavLink>

                            <button
                              className="admin-action-button admin-action-button--delete"
                              type="button"
                              onClick={() =>
                                handleDeleteProduct(product)
                              }
                              disabled={deleteProductLoading}
                            >
                              {deleteProductLoading
                                ? "Eliminando..."
                                : "Eliminar"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}

export default AdminPanelPage;