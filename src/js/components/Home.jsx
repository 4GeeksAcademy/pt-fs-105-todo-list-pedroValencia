import React, { useState, useEffect } from "react";

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
		borrarTareas(tareaEliminar)
		
	}
	const teclaEnter = (e) => {
		if(e.key === "Enter") {
			setTexto("")
			crearTareas()
		}
	}

	const obtenerTareas = () => {
		fetch('https://playground.4geeks.com/todo/users/pedro', {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
			})
			.then(data => {
				setTareas(data.todos)
			})
			.catch(error => {
				// Manejo de errores
				console.log(error);
			});
	}

const crearTareas = () => {
	fetch('https://playground.4geeks.com/todo/todos/pedro', {
      method: "POST",
      body: JSON.stringify({label: texto, is_done: false}),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
    })
    .then(data => {
        setTareas([...tareas, data])
        console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
    })
    .catch(error => {
        // Manejo de errores
        console.log(error);
    });
}

const borrarTareas = (id) => {
	fetch('https://playground.4geeks.com/todo/todos/' +id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
		setTareas(tareas.filter((tarea) => tarea.id !== id)) 
    })
    .catch(error => {
        // Manejo de errores
        console.log(error);
    });
}

	useEffect(() => {
		obtenerTareas()
	},[])

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
			{tareas.map((tarea) => (
				<li 
				style={{backgroundColor:"#58d68d"}} 
				key={tarea.id}>{tarea.label}
				<button onClick={()=> eliminarTareas(tarea.id)} 
				type="button" 
				className="btn btn-outline-dark btn-sm"
				style= {{marginLeft:20}}>✕</button>
				</li>
			)


			)}
		</ul>
			<p>
				{tareas.length} tareas
			</p>
		</div>
		</>
	);
};

export default Home;