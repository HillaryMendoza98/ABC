function ValidateFrom(){
    let name = document.getElementById('inputname').value;
    let RFC = document.getElementById('inputRFC').value;
    let direccion = document.getElementById('inputdireccion').value;
    let Email = document.getElementById('inputEmail').value;

    if(name ==""){
        alert('El campo nombre es requerido');
        return false;
    }
    if(RFC ==""){
        alert('El campo RFC es requerido');
        return false;
    }
    if(direccion ==""){
        alert('El campo direccion es requerido');
        return false;
    }
    if(Email ==""){
        alert('El campo correo es requerido');
        return false;
    }else if(!Email.includes('@')){
        alert('El correo no es valido');
        return false;
    }

    return true;
}


function ReadData(){
    let listPeople;

    if (localStorage.getItem('listPeople') == null){
        listPeople =[]; 
    }else {
        listPeople = JSON.parse(localStorage.getItem('listPeople'));
    }

    var html ="";
    listPeople.forEach(function (Element, index) {
        html += "<tr>";
        html += "<td>"+ Element.name + "</td>"; 
        html += "<td>"+ Element.RFC + "</td>"; 
        html += "<td>"+ Element.direccion + "</td>"; 
        html += "<td>"+ Element.Email + "</td>";
        html += '<td><button onclick="deleteData('+ index +')" class="btn btn-danger">Eliminar Dato</button> <button onclick="editData('+ index +')" class="btn btn-warning">Editar Dato</button>';
        html += "</tr>";
    });

    document.querySelector('#tableData').innerHTML = html;

}

document.addEventListener('DOMContentLoaded', function () {
ReadData();
});


function deleteData(index) {
    console.log('Botón de eliminar clickeado para el índice', index);
    var listPeople = JSON.parse(localStorage.getItem('listPeople'));
    listPeople.splice(index, 1);
    localStorage.setItem('listPeople', JSON.stringify(listPeople));
    
    ReadData();
}


function editData(index) {
    console.log('Botón de edición clickeado para el índice', index);

    var listPeople = JSON.parse(localStorage.getItem('listPeople'));
    var personToEdit = listPeople[index];
    var newName = prompt('Ingrese el nuevo nombre', personToEdit.name);
    var newRFC = prompt('Ingrese el nuevo RFC', personToEdit.RFC);
    var newDireccion = prompt('Ingrese la nueva dirección', personToEdit.direccion);
    var newEmail = prompt('Ingrese el nuevo correo electrónico', personToEdit.Email);

    personToEdit.name = newName;
    personToEdit.RFC = newRFC;
    personToEdit.direccion = newDireccion;
    personToEdit.Email = newEmail;

    localStorage.setItem('listPeople', JSON.stringify(listPeople));
    ReadData();
}

document.onload = ReadData();

function AddData(){
    if(ValidateFrom() == true){
        let name =document.getElementById('inputname').value;
        let RFC =document.getElementById('inputRFC').value;
        let direccion =document.getElementById('inputdireccion').value;
        let Email =document.getElementById('inputEmail').value;

        var listPeople;

        if(localStorage.getItem('listPeople')== null ){
            listPeople = []; 

        }else{
            listPeople = JSON.parse(localStorage.getItem('listPeople'));
        }

        listPeople.push({
            name: name,
            RFC: RFC,
            direccion: direccion,
            Email: Email
        });

        localStorage.setItem('listPeople', JSON.stringify(listPeople));

        ReadData();

        document.getElementById('inputname').value = "";
        document.getElementById('inputRFC').value = "";
        document.getElementById('inputdireccion').value = "";
        document.getElementById('inputEmail').value = "";
    
    }
    

}

