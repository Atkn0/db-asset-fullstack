const express = require('express');
const bodyParser = require('body-parser');
const employeeController = require('./controllers/employee_controller');
const departmentController = require('./controllers/department_controller');
const internet_provider_controller = require("./controllers/interet_provider_controller");
const hardware_controller = require('./controllers/hardware_controller');
const software_controller = require('./controllers/software_controller');
const assigned_controller = require('./controllers/assigned_controller');
const uses_controller = require("./controllers/uses_controller");

const app = express();
app.use(bodyParser.json());

// Employee fonksiyonlarını rotala bağlayın
app.get('/employees', employeeController.getAllEmployees);
//app.get('/employees', employeeController.getEmployeeById);
app.post('/employees', employeeController.createEmployee);
app.put('/employees', employeeController.updateEmployee);
app.delete("/employees",employeeController.deleteEmployee);


// Department fonksiyonlarını rotala bağlayın
//app.get('/departments', departmentController.getDepartmanNameById);
app.get('/departments', departmentController.getAllDepartmants);

//Internet_Provider
app.get("/provider",internet_provider_controller.getAllInternetProviders);
app.post("/provider",internet_provider_controller.addInternetProvider);
app.delete("/provider",internet_provider_controller.deleteInternetProviderById);

//hardware 
app.get("/hardware", hardware_controller.getAllHardware);
//app.get("/hardware/:id",hardware_controller.getHardwareById);
app.post("/hardware",hardware_controller.addHardware);
app.delete("/hardware",hardware_controller.deleteHardwareById);


//software
app.get("/software",software_controller.getAllSoftware);
//app.get("/software/:id",software_controller.getSoftwareById);
app.post("/software",software_controller.addSoftware);
app.delete("/software",software_controller.deleteSoftware)

//assigned işlemleri
app.get("/assigned",assigned_controller.getAllAssigned);
app.post("/assigned",assigned_controller.addAssigned);
app.delete("/assigned",assigned_controller.deleteAssigned);

//uses işlemleri
app.get("/uses",uses_controller.getAllUses);
app.post("/uses",uses_controller.addUses);
app.delete("/uses",uses_controller.deleteUses);



// Sunucu başlatma
app.listen(3000, () => console.log('Sunucu 3000 portunda çalışıyor...'));
