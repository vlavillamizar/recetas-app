import { useParams } from 'react-router-dom';
import './DetalleReceta.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DetalleReceta() {
  const { id } = useParams();
  const [receta, setReceta] = useState(null);

  const navigate = useNavigate();

    const volverInicio = () => {
        navigate('/');
    };

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(res => res.json())
      .then(data => setReceta(data.meals?.[0]));
  }, [id]);

  if (!receta) return <p>Cargando</p>;

  return (
    <div className="contenedor" >
    <div className = "junt">
        <h1 className="recetas-title">Recetas de cocina</h1>
        <button className="boton" 
            onClick={volverInicio}>
            Volver al inicio
        </button>
    </div>
      <h1>{receta.strMeal}</h1>
      <img src={receta.strMealThumb} alt={receta.strMeal} width="300" />
      <p><strong>Categoría:</strong> {receta.strCategory}</p>
      <p><strong>Área:</strong> {receta.strArea}</p>
      <h3>Instrucciones:</h3>
      <p>{receta.strInstructions}</p>
      {receta.strYoutube && (
        <p>
          <a href={receta.strYoutube} target="_blank" rel="noreferrer">
            Ver video
          </a>
        </p>
      )}
    </div>
  );
}

export default DetalleReceta;
