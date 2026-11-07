
import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";

import ProductCard from "../ProductCard";
import Loader from "../Loader";
import useGetProducts from "../../hooks/products/useGetProducts";
import useAuth from "../../hooks/user/useAuth";

function Products() {
  const {
    products,
    loading,
    error,
    refetch,
  } = useGetProducts();

  const { isAdmin } = useAuth();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [sortBy, setSortBy] = useState("default");

  const categories = useMemo(() => {
    const availableCategories = products
      .map((product) => product.category)
      .filter(Boolean);

    return [...new Set(availableCategories)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const result = products.filter((product) => {
      const matchesSearch =
        !normalizedSearch ||
        product.name
          ?.toLowerCase()
          .includes(normalizedSearch) ||
        product.description
          ?.toLowerCase()
          .includes(normalizedSearch);

      const matchesCategory =
        category === "ALL" ||
        product.category === category;

      return matchesSearch && matchesCategory;
    });

    return [...result].sort((productA, productB) => {
      switch (sortBy) {
        case "price-asc":
          return productA.price - productB.price;

        case "price-desc":
          return productB.price - productA.price;

        case "name-asc":
          return productA.name.localeCompare(
            productB.name,
            "es"
          );

        default:
          return 0;
      }
    });
  }, [products, search, category, sortBy]);

  const handleClearFilters = () => {
    setSearch("");
    setCategory("ALL");
    setSortBy("default");
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <section className="shop-feedback">
        <p className="shop-feedback-eyebrow">
          Algo salió mal
        </p>

        <h1>No pudimos cargar el Shop</h1>

        <p>
          Revisá la conexión e intentá nuevamente.
        </p>

        <button
          type="button"
          className="shop-retry-button"
          onClick={refetch}
        >
          Reintentar
        </button>
      </section>
    );
  }

  return (
    <section className="shop-page">
      <header className="shop-header">
        <div className="shop-header-copy">
          <p className="shop-eyebrow">
            Incorrecta Taller
          </p>

          <h1>SHOP</h1>

          <p className="shop-intro">
            Explorá nuestra selección de prendas de diseño
            independiente y series limitadas.
          </p>
        </div>

        {isAdmin && (
          <NavLink
            to="/products/create"
            className="shop-admin-button"
          >
            Crear producto
          </NavLink>
        )}
      </header>

      <div className="shop-toolbar">
        <div className="shop-search">
          <label
            htmlFor="product-search"
            className="shop-control-label"
          >
            Buscar
          </label>

          <input
            id="product-search"
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Buscar por nombre o descripción"
          />
        </div>

        <div className="shop-filter">
          <label
            htmlFor="product-category"
            className="shop-control-label"
          >
            Categoría
          </label>

          <select
            id="product-category"
            value={category}
            onChange={(event) =>
              setCategory(event.target.value)
            }
          >
            <option value="ALL">
              Todas
            </option>

            {categories.map((currentCategory) => (
              <option
                key={currentCategory}
                value={currentCategory}
              >
                {currentCategory}
              </option>
            ))}
          </select>
        </div>

        <div className="shop-filter">
          <label
            htmlFor="product-sort"
            className="shop-control-label"
          >
            Ordenar
          </label>

          <select
            id="product-sort"
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value)
            }
          >
            <option value="default">
              Recomendados
            </option>

            <option value="price-asc">
              Menor precio
            </option>

            <option value="price-desc">
              Mayor precio
            </option>

            <option value="name-asc">
              Nombre A-Z
            </option>
          </select>
        </div>
      </div>

      <div className="shop-results-bar">
        <p>
          {filteredProducts.length}{" "}
          {filteredProducts.length === 1
            ? "producto"
            : "productos"}
        </p>

        {(search ||
          category !== "ALL" ||
          sortBy !== "default") && (
          <button
            type="button"
            className="shop-clear-filters"
            onClick={handleClearFilters}
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {products.length === 0 ? (
        <div className="shop-empty">
          <h2>No hay productos disponibles</h2>

          <p>
            Todavía no se cargaron productos en la tienda.
          </p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="shop-empty">
          <h2>No encontramos resultados</h2>

          <p>
            Probá con otra búsqueda o categoría.
          </p>

          <button
            type="button"
            className="shop-empty-button"
            onClick={handleClearFilters}
          >
            Ver todos los productos
          </button>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onProductDeleted={refetch}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Products;

