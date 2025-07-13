const formulario = document.getElementById("formulario");
const itemInput = document.getElementById("itemInput");
const cantidadInput = document.getElementById("cantidadInput");
const lista = document.getElementById("lista");
const exportarBtn = document.getElementById("exportarBtn");

const mostrarLista = () => {
  lista.innerHTML = ""; 

  items.map((item, index) => {
    const div = document.createElement("div");
    div.className = "item";

    const span = document.createElement("span");
    span.textContent = `${item.nombre} x${item.cantidad}`;

    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.className = "eliminar-btn";
    botonEliminar.onclick = () => {
      items.splice(index, 1);
      setearItemsEnLocalStorage();
      mostrarLista();
    };

    div.appendChild(span);
    div.appendChild(botonEliminar);
    lista.appendChild(div);
  });
}

const obtenerItemsDeLocalStorage = () => {
  const elements = JSON.parse(localStorage.getItem("listaCompras"));
  return elements || [];
};

const setearItemsEnLocalStorage = () => {
  localStorage.setItem("listaCompras", JSON.stringify(items));  
};

const validarInput = (nombre) => {
  if (!nombre) {
    alert("Por favor, ingrese un nombre válido para el item.");
  }
}

let items = obtenerItemsDeLocalStorage();
mostrarLista();

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = itemInput.value.trim();
  validarInput(nombre);
  const cantidad = parseInt(cantidadInput.value);

  if (!nombre || cantidad <= 0) return;

  const existente = items.find(
    (item) => item.nombre.toLowerCase() === nombre.toLowerCase()
  );

  if (existente) {
    existente.cantidad += cantidad;
  } else {
    items.push({ nombre, cantidad });
  }

  setearItemsEnLocalStorage();

  itemInput.value = "";
  cantidadInput.value = 1;

  mostrarLista();
});
