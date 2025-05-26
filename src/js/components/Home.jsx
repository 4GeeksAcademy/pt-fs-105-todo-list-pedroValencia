import React, { useState } from "react";

//create your first component
const Home = () => {
	const [texto, setTexto] = useState("")
	const [tareas, setTareas] = useState([])
	
	const manejarTexto = (event) => {
		setTexto(event.target.value)
	}
	const manejarTareas = () => {
		setTareas([...tareas, texto])
		setTexto("")
	}
	const eliminarTareas = (tareaEliminar) => {
		setTareas(tareas.filter((tarea, index) => index !== tareaEliminar)) 
	}
	const teclaEnter = (e) => {
		if(e.key === "Enter") {
			setTareas([...tareas, texto])
			setTexto("")
		}
	}



	return (
		<>
		<div style={{margin:10}}>
		<input 
		value = {texto}	
		onChange={manejarTexto}
		onKeyDown={teclaEnter}
		/>
		<button style={{padding: "4px 20px"}} type="button" className="btn btn-warning btn-sm" onClick={manejarTareas}>Enviar</button>
		</div>
		<div>
		{tareas.length === 0 && (
          <p style={{ margin: 10 }}>No hay tareas</p>
        )}
		<ul>
			{tareas.map((tarea, index) => (
				<li 
				style={{backgroundColor:"#58d68d"}} 
				key={index}>{tarea}
				<button onClick={()=> eliminarTareas(index)} 
				type="button" 
				className="btn btn-outline-dark btn-sm"
				style= {{marginLeft:20}}>✕</button>
				</li>
			)


			)}
		</ul>

		</div>
		</>
	);
};

export default Home;