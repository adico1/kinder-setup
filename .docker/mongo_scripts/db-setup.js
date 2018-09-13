const env = 'dev';

const settings = {};

if(env === 'prod') {
  settings.version = '1.0.0';
  settings.dbname = 'kindergarden';
} else {
  settings.version = '1.0.0';
  settings.dbname = 'lab';
}

// authentication is done externally thru command line e.g. mongo file.js --username username --password
const conn = new Mongo();
const dbs = conn.getDB(settings.dbname);

// setup should do auxillary actions to make the application functional such as:
// delete the DB and start a new one  (1st version only)
// create a new DB
// create tables & populate: kindergarder, employees, roles, 
// create indexes
// create proper functions & views

deleteDB(dbs, settings);
createRolesCollection(dbs);
listRolesCollection(dbs);

createEmployeesCollection(dbs);
listEmployeesCollection(dbs);

createKindergartenCollection(dbs);
listKindergartenCollection(dbs);

function deleteDB(dbs,settings) {
  if(settings.version.split('.')[0] === '1') {
    dbs.dropDatabase();
  }
}

function createRolesCollection(dbs) {
  const collectionName = 'employee_roles';

  const ceo_role = { "_id" : ObjectId("5b7724c904e891395cbdcbe1"), name: 'CEO', description: 'Chief Executive Office'};
  const assist_teacher_role = { "_id" : ObjectId("5b7724c904e891395cbdcbe2"), name: 'AssitTeacher', description: 'Assistant kindergarten teacher'};
  const teacher_role = { "_id" : ObjectId("5b7724c904e891395cbdcbe3"), name: 'Teacher', description: 'Kindergarten teacher'};
  const director_role = { "_id" : ObjectId("5b7724c904e891395cbdcbe4"), name: 'Director', description: 'Director of the Kindergarten'};
  const maintenence_role = { "_id" : ObjectId("5b7724c904e891395cbdcbe5"), name: 'Maintenece', description: 'Maintenence'};

  const employeeRoles = [];
  employeeRoles.push(ceo_role);
  employeeRoles.push(assist_teacher_role);
  employeeRoles.push(teacher_role);
  employeeRoles.push(director_role);
  employeeRoles.push(maintenence_role);

  createCollection(dbs, collectionName, employeeRoles);
}

function listRolesCollection(dbs) {
  printTitle('Created Employee Roles:')
  cursor = dbs.employee_roles.find();
  while(cursor.hasNext()) {
    printjson(cursor.next());
  }
}

function createEmployeesCollection(dbs) {
  const collectionName = 'employees';

  const ceo = { "_id" : ObjectId("5b7735edf3796162842506c1"), password: 'password', name: 'אהובה מלמד', role: ObjectId("5b7724c904e891395cbdcbe1")};
  const employee1 = { "_id" : ObjectId("5b7735edf3796162842506c2"), kindergartenId: ObjectId("5b7735edf3796162842507c1"), hrcore: '1234', name: 'חוה גולדשטיין', role: ObjectId("5b7724c904e891395cbdcbe3")};
  const employee2 = { "_id" : ObjectId("5b7735edf3796162842506c3"), kindergartenId: ObjectId("5b7735edf3796162842507c1"), hrcore: '2345', name: 'ברכה לוין', role: ObjectId("5b7724c904e891395cbdcbe4")};
  const employee3 = { "_id" : ObjectId("5b7735edf3796162842506c4"), kindergartenId: ObjectId("5b7735edf3796162842507c1"), hrcore: '3456', name: 'ברוריה שליו', role: ObjectId("5b7724c904e891395cbdcbe2")};
  const employee4 = { "_id" : ObjectId("5b7735edf3796162842506c5"), kindergartenId: ObjectId("5b7735edf3796162842507c1"), hrcore: '4567', name: 'אסתר פינקלשטיין', role: ObjectId("5b7724c904e891395cbdcbe2")};

  const employees = [];
  employees.push(ceo);
  employees.push(employee1);
  employees.push(employee2);
  employees.push(employee3);
  employees.push(employee4);

  createCollection(dbs, collectionName, employees);
}

function listEmployeesCollection(dbs) {
  printTitle('Created Employee:')
  cursor = dbs.employees.find();
  while(cursor.hasNext()) {
    printjson(cursor.next());
  }
}

function createKindergartenCollection(dbs) {
  const collectionName = 'kindergartens';

  const kindergartens1 = { _id: ObjectId("5b7735edf3796162842507c1"), id: '3071', name: 'א.הבירה-שמעון הצדיק 17 -גיל 4', employees: [
    ObjectId("5b7735edf3796162842506c2"),
    ObjectId("5b7735edf3796162842506c3"),
    ObjectId("5b7735edf3796162842506c4"),
    ObjectId("5b7735edf3796162842506c5"),
  ]};

  const kindergartens = [];
  kindergartens.push(kindergartens1);

  createCollection(dbs, collectionName, kindergartens);
}

function listKindergartenCollection(dbs) {
  printTitle('Created Kindergartens:')
  cursor = dbs.kindergartens.find();
  while(cursor.hasNext()) {
    printjson(cursor.next());
  }
}

function createCollection(dbs, collectionName, /*array*/ collectionData) {
  dbs.createCollection(collectionName);
  dbs[collectionName].insertMany(collectionData);
}

function printTitle(title) {
  print('----------------------------------------------------');
  print(title);
  print('----------------------------------------------------');
}