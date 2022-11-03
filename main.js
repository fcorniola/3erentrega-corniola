const tasa = 80;

class Prestamo {
    constructor (nombre, monto, cuotas, total, cuota){
        this.nombre = nombre;
        this.monto = monto;
        this.cuotas = cuotas;
        this.total = total;
        this.cuota = cuota;
        }
}

const  prestamos = [];

const idCotizar = document.getElementById("cotizador");

idCotizar.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const monto = document.getElementById("monto").value;
    const cuotas = document.getElementById("cuotas").value;
    const total = (monto * (1 + ((tasa/12)*cuotas)/100)).toFixed(2);
    const cuota = (total / cuotas).toFixed(2);

    const prestamo = new Prestamo (nombre, monto, cuotas, total, cuota);
    prestamos.push(prestamo);

    localStorage.setItem("Prestamo", JSON.stringify(prestamos));

    idCotizar.reset();

    mostrar(prestamo);
})

const datos = document.getElementById("datos");

const mostrar = (prestamo) => {
    let aux = "";
    aux += `<p> ${prestamo.nombre} solicitaste $${prestamo.monto} en ${prestamo.cuotas} cuotas</p>
        <p> Total a devolver $${prestamo.total} </p>
        <p> En ${prestamo.cuotas} cuotas de $${prestamo.cuota}</p>
    `
    datos.innerHTML = aux;
} 

const historial = document.getElementById("historial");
const hist = document.getElementById("hist");

historial.addEventListener("click", (e) => {
    if(localStorage.getItem("prestamo")) {
        prestamos = JSON.parse(localStorage.getItem("prestamo"));
    }
    prestamos.forEach((prestamo) => {
    const card = document.createElement("div");
    card.classList.add("col-xl-3", "col-md-6", "col-xs-12", "text-center", "mt-2");
    card.innerHTML = `
    <div class="card">
        <h3> Nombre: ${prestamo.nombre} </h3>
        <h3> Monto: ${prestamo.monto} </h3>
        <h3> Cuotas: ${prestamo.cuotas} </h3>
    </div>
    `
    hist.appendChild(card);
    })
})