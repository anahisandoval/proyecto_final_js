class Horario {
    constructor(id, fecha, horaI, horaF,disponibilidad) {
      this.id = id;
      this.fecha = fecha;
      this.horaI = horaI;
      this.horaF = horaF;
      this.disponibilidad=disponibilidad;

    }
  }
  class Persona{
    constructor(id,nombreR,banda, genero){
      this.id=id;
      this.nombreR=nombreR;
      this.banda=banda;
      this.genero=genero;
    }
  }
  

let horarios = [];
let counter = 1;
let idEditarHora = 0;
const horarioTable = document.querySelector("#HorarioTable tbody");
const horarioForm = document.querySelector("#HorarioForm");
const horaDiv = document.querySelector("#menuContent");

const cargarHorarios= async() => {
        const response = await fetch('./bd/data.json')
        .then((response) => response.json())
        .then((data) =>{      
        data.forEach((hora) => {
        const horaHTML = document.createElement("tr");
        horaHTML.innerHTML = `<th scope="row">${hora.id}</th>
        <td>${hora.fecha}</td>
        <td>${hora.horaI}</td>
        <td>${hora.horaF}</td>
        <td>${hora.disponibilidad}</td>
        <td><button id="editBtn_${hora.id}" type="button" class="btn btn-primary" onclick="editarHora(event)" data-bs-toggle="modal" data-bs-target="#exampleModal"
                >Editar</button>
            <button id="deleteBtn_${hora.id}" type="button" class="btn btn-danger" onclick="eliminarHora(event)" data-bs-toggle="modal"
                >Borrar</button>
            </td>`;
        horarioTable.appendChild(horaHTML);
  })
  })
        
}
cargarHorarios();

function guardarHorario() {
    if (idEditarHora != 0) {
      for (let index = 0; index < horarios.length; index++) {
        if (horarios[index].id == idEditarHora) {
          horarios[index].fecha = horarioForm.fecha.value;
          horarios[index].horaI = horarioForm.horaI.value;
          horarios[index].horaF = horarioForm.horaF.value;
          horarios[index].disponibilidad = horarioForm.disponibilidad.value;
          break;
        }
      }
      actualizarHorarioTable();
      idEditarHora = 0;
    } else {
      //crear
      const newHora = new Horario(
        counter,
        horarioForm.fecha.value,
        horarioForm.horaI.value,
        horarioForm.horaF.value,
        horarioForm.disponibilidad.value
      );
      horarios.push(newHora);
      counter++;
      Toastify({
        text: "Se agregó un horario",
        duration: 3000,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
      }).showToast();
      actualizarHorarioTable();
      agregarHora(newHora);
      
    }


  }
  
  
  function actualizarHorarioTable() {
    horarioTable.innerHTML = "";   
    horarios.forEach((hora) => {
      const horaHTML = document.createElement("tr");
      horaHTML.innerHTML = `<th scope="row">${hora.id}</th>
          <td>${hora.fecha}</td>
          <td>${hora.horaI}</td>
          <td>${hora.horaF}</td>
          <td>${hora.disponibilidad}</td>
          <td><button id="editBtn_${hora.id}" type="button" class="btn btn-primary" onclick="editarHora(event)" data-bs-toggle="modal" data-bs-target="#exampleModal"
                  >Editar</button>
              <button id="deleteBtn_${hora.id}" type="button" class="btn btn-danger" onclick="eliminarHora(event)" data-bs-toggle="modal"
                  >Borrar</button>
              </td>`;
          horarioTable.appendChild(horaHTML);
    });
  }
    

  function eliminarHora(event) {
    swal({
      title: "Alerta de eliminación",
      text: "¿Desea eliminar el horario permanentemente?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const btn = event.target;
        const id = btn.id.split("_")[1];
        horarios = horarios.filter((hora) => hora.id != id);
        
        actualizarHorarioTable();
      } else {
        
      }
    });

  }

  function editarHora(event) {
    const btn = event.target;
    const id = btn.id.split("_")[1];
    const hora = horarios.filter((hora) => hora.id == id)[0];
    horarioForm.fecha.value = hora.fecha;
    horarioForm.horaI.value = hora.horaI;
    horarioForm.horaF.value = hora.horaF;
    horarioForm.disponibilidad.value = hora.disponibilidad;
    idEditarHora = hora.id;
  }
  