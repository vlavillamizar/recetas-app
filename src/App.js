import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import DetalleReceta from './DetalleReceta';
import './App.css';
import { useState, useEffect } from 'react';

function Home() {
  const [recetas, setRecetas] = useState([]);
  const [mensajeError , setMensajeError] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategorialActual] = useState('Dessert');
  const navigate = useNavigate();

  const manejarBusqueda = (e) => {
    const texto = e.target.value;
    setBusqueda(texto);
  };

  const manejarCategoriaClick = (categoria) => {
    setBusqueda('');
    setCategorialActual(categoria);

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`)
    .then(res => res.json())
    .then(data => setRecetas(data.meals || []))
    .catch(() => {
      setRecetas([]);
      setMensajeError('Error al cargar la categoría');
    });
  };

  const irADetalle = (id) => {
    navigate(`/receta/${id}`);
  };

  useEffect(() => {
    const texto = busqueda.trim();

    const url = texto ==='' ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoriaActual}` : 
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${texto}`;

    fetch(url)
    .then(res => res.json())
    .then(data => {
      setRecetas(data.meals || []);
      setMensajeError('');
    })
    .catch(() => {
      setRecetas([]);
      setMensajeError('Error al cargar recetas');
    });
  }, [busqueda, categoriaActual]);  

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    .then(res => res.json())
    .then(data => setCategorias(data.categories || []))
    .catch(() => {
      setRecetas([]);
      setMensajeError('Error al cargar la categoria');
    });
  }, []);  

  return (
    <div>
      <div className="juntar">
        <h1 className="recetas-title">Recetas de cocina</h1>
        <input
          className="search-style"
          type="text"
          placeholder="Buscar receta por nombre..."
          value={busqueda}
          onChange={manejarBusqueda}
        />
      </div>

      <div className="App">
        <div className="categoria-actual">
          <h1>{categoriaActual}</h1>
          <ul className="lista-recetas">
            {recetas.map((receta) => (
              <li
                key={receta.idMeal}
                onClick={() => irADetalle(receta.idMeal)}
                style={{ cursor: 'pointer' }}
              >
                {receta.strMeal}
              </li>
            ))}
          </ul>
        </div>

        <div className="menu-lateral">
          <h2 className="categoria">Categorías</h2>
          <ul className="lista-cat">
            {categorias.map((cat) => (
              <li
                key={cat.idCategory}
                className="lista-cat"
                onClick={() => manejarCategoriaClick(cat.strCategory)}
              >
                {cat.strCategory}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/receta/:id" element={<DetalleReceta />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
