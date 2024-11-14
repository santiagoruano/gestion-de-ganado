const cattleForm = document.getElementById('cattleForm');
const tableBody = document.getElementById('tableBody');
const submitBtn = document.getElementById('submitBtn');
const updateBtn = document.getElementById('updateBtn');

//Graficas
const ctxHealth = document.getElementById('healthChart').getContext('2d');
const ctxBreed = document.getElementById('breedChart').getContext('2d');

let cattleArray = [];
let currentEditIndex = null;

// Inicializar gráfica 1
const healthChart = new Chart(ctxHealth, {
    type: 'bar',
    data: {
        labels: ['Sano', 'Enfermo'],
        datasets: [{
            label: 'Cantidad de Animales por Estado de Salud',
            data: [0, 0], // Se actualizará después
            backgroundColor: ['#4CAF50', '#F44336']
        }]
    },
    options: {
        responsive: true
    }
 });

 // Inicializar gráfica 2

 const breedChart = new Chart(ctxBreed, {
    type: 'pie',
    data: {
        labels: [], // Se actualizará después
        datasets: [{
            label: 'Cantidad de Animales por Raza',
            data: [], // Se actualizará después
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
        }]
    },
    options: {
        responsive: true
    }
 });

 // Evento para agregar un nuevo animal
submitBtn.addEventListener('click', function() {
    const animalID = document.getElementById('animalID').value;
    const breed = document.getElementById('breed').value;
    const age = document.getElementById('age').value;
    const healthStatus = document.getElementById('healthStatus').value;
 
 
    if (!animalID || !breed || !age || !healthStatus) {
        alert("Por favor completa todos los campos.");
        return;
    }
 
 
    const newAnimal = {
        id: animalID,
        breed: breed,
        age: age,
        healthStatus: healthStatus
    };
 
 
    cattleArray.push(newAnimal);

 // Actualizar la tabla y las gráficas
 updateTable();
 updateCharts();


 cattleForm.reset();
});


// Función para actualizar la tabla con los datos del array
function updateTable() {
    tableBody.innerHTML = '';
 
 
    cattleArray.forEach((animal, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${animal.id}</td>
            <td>${animal.breed}</td>
            <td>${animal.age}</td>
            <td>${animal.healthStatus}</td>
            <td>
                <button onclick="editRow(${index})">Editar</button>
                <button onclick="deleteRow(${index})">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
 }

 
 // Función para actualizar las gráficas
function updateCharts() {
    const healthCounts = { sano: 0, enfermo: 0 };
    const breedCounts = {};
 
 
    cattleArray.forEach(animal => {
        // Contar estado de salud
        if (animal.healthStatus.toLowerCase() === 'sano') {
            healthCounts.sano++;
        } else if (animal.healthStatus.toLowerCase() === 'enfermo') {
            healthCounts.enfermo++;
        }
 
 
        // Contar razas
        if (!breedCounts[animal.breed]) {
            breedCounts[animal.breed] = 0;
        }
        breedCounts[animal.breed]++;
    });
 
 
    // Actualizar gráfica de salud
    healthChart.data.datasets[0].data[0] = healthCounts.sano;
    healthChart.data.datasets[0].data[1] = healthCounts.enfermo;
    healthChart.update();
 
 
    // Actualizar gráfica de razas
    breedChart.data.labels = Object.keys(breedCounts);
    breedChart.data.datasets[0].data = Object.values(breedCounts);
    breedChart.update();
 }
 
 
 // Función para eliminar un registro de la tabla y del array
 function deleteRow(index) {
    cattleArray.splice(index, 1);
    updateTable();
    updateCharts();
 }
 
 
 // Función para editar un registro de la tabla
 function editRow(index) {
    currentEditIndex = index;
    document.getElementById('animalID').value = cattleArray[index].id;
    document.getElementById('breed').value = cattleArray[index].breed;
    document.getElementById('age').value = cattleArray[index].age;
    document.getElementById('healthStatus').value = cattleArray[index].healthStatus;
 
 
    submitBtn.style.display = 'none';
    updateBtn.style.display = 'block';
 }
 
 
 // Evento para actualizar el registro del animal
 updateBtn.addEventListener('click', function() {
    const animalID = document.getElementById('animalID').value;
    const breed = document.getElementById('breed').value;
    const age = document.getElementById('age').value;
    const healthStatus = document.getElementById('healthStatus').value;
 
 
    if (!animalID || !breed || !age || !healthStatus) {
        alert("Por favor completa todos los campos.");
        return;
    }
 
 
    cattleArray[currentEditIndex] = {
        id: animalID,
        breed: breed,
        age: age,
        healthStatus: healthStatus
    };
 
 
    currentEditIndex = null;
    updateBtn.style.display = 'none';
    submitBtn.style.display = 'block';
 
 
    updateTable();
    updateCharts();
    cattleForm.reset();
 });
 
 
