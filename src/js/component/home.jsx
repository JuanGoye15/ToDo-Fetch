import React, { useEffect, useState } from "react";	


//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState('');
	const [items, setItems] = useState([]);

	const crearUsuario = async() => {
		const response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/juangoye", {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json"
			}
		}) 
		const data = await response.json()
		console.log(data)
	}

	const obtenerlistaDeTareas = async() => {
		try{
			const response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/juangoye")
			const data = await response.json()
			// console.log(data)
			setItems(data)
		} catch(error) {
			console.log(error)
		}
	} 

	const actualizarListaDeTareas = async() => {
		try{
			const response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/juangoye", {
			method: "PUT",
			body: JSON.stringify(items),
			headers: {
				"Content-Type": "application/json"
			}
		}) 
		const data = await response.json()
		console.log(data)
		} catch(error) {
			console.log(error)
		}		
	}

	useEffect(() => {
		// crearUsuario()
		obtenerlistaDeTareas()
	}, [])

	useEffect(() => {
		// crearUsuario()
		actualizarListaDeTareas()		
	}, [items])

	const addTask = () => {
		if (inputValue != '') {
			setItems([...items, {"label": inputValue, "done": false}]);
			setInputValue('');
		}
	}	
	
	const cambio = (e) => {
		setInputValue(e.target.value)
	}

	const deleteItems = (e) => {
		setItems(items => items.filter((item, i) => i !== e));
	}

	

	const act = () => {		
		return items.map((item, index)=>{		
		const dele = () => {
			deleteItems(index)
		}
		
			return (
				<>				
					<li className="list-group-item gap-3 fs-5 rounded" style={{paddingLeft: "500px"}} key={index}>{item.label}<button onClick={dele} className="rounded">						
					x
					</button>

					</li>
				</>
		)
		})				
	}


	return (
		<>
			<div className="input-group mb-7 justify-content-center p-3">
                <h1>Todos</h1>
            </div>
            <div className="input-group mb-7 justify-content-center p-3"> 
            	<button className="btn btn-success input-group-text" onClick={addTask}></button>           
                <input placeholder="What needs to be done?" value={inputValue} onChange={cambio}/>
            </div>
			<ul className="list-group justify-content-between ps-5 d-flex" style={{marginLeft: "200px", marginRight: "200px"}}>
				{act()}
			</ul>
		</>
	);
};

export default Home;
