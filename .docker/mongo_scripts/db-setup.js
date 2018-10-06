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
  const assist_teacher_role = { "_id" : ObjectId("5b7724c904e891395cbdcbe2"), name: 'סיעת', description: 'Assistant kindergarten teacher'};
  const teacher_role = { "_id" : ObjectId("5b7724c904e891395cbdcbe3"), name: 'גננת', description: 'Kindergarten teacher'};
  const director_role = { "_id" : ObjectId("5b7724c904e891395cbdcbe4"), name: 'Director', description: 'Director of the Kindergarten'};
  const maintenence_role = { "_id" : ObjectId("5b7724c904e891395cbdcbe5"), name: 'Maintenece', description: 'Maintenence'};
  const speech_therapist = { "_id" : ObjectId("5b7724c904e891395cbdcbe6"), name: 'קלינאית תקשורת', description: 'קלינאית תקשורת'};
  const occupational_therapist = { "_id" : ObjectId("5b7724c904e891395cbdcbe7"), name: 'מרפאה בעיסוק', description: 'מרפאה בעיסוק'};
  const emotional_therapist = { "_id" : ObjectId("5b7724c904e891395cbdcbe8"), name: 'מטפלת רגשית', description: 'מטפלת רגשית'};
  
  const employeeRoles = [];
  employeeRoles.push(ceo_role);
  employeeRoles.push(assist_teacher_role);
  employeeRoles.push(teacher_role);
  employeeRoles.push(director_role);
  employeeRoles.push(maintenence_role);
  employeeRoles.push(speech_therapist);
  employeeRoles.push(occupational_therapist);
  employeeRoles.push(emotional_therapist);

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

  const g1kt = { "_id" : ObjectId("5b7735edf3796162842506c1"), kindergartenId: ObjectId("5b7735edf3796162842507c1"), hrcore: '3418', name: 'אביבי נעמה', role: ObjectId("5b7724c904e891395cbdcbe3")};
  const g1kta = { "_id" : ObjectId("5b7735edf3796162842506c2"), kindergartenId: ObjectId("5b7735edf3796162842507c1"), hrcore: '9189', name: 'כהן חנה', role: ObjectId("5b7724c904e891395cbdcbe2")};
  const g1st = { "_id" : ObjectId("5b7735edf3796162842506c3"), kindergartenId: ObjectId("5b7735edf3796162842507c1"), hrcore: '2778', name: 'גלר יעל', role: ObjectId("5b7724c904e891395cbdcbe6")};
  const g1ot = { "_id" : ObjectId("5b7735edf3796162842506c4"), kindergartenId: ObjectId("5b7735edf3796162842507c1"), hrcore: '9574', name: 'אשואל מעין', role: ObjectId("5b7724c904e891395cbdcbe7")};
  const g1et = { "_id" : ObjectId("5b7735edf3796162842506c5"), kindergartenId: ObjectId("5b7735edf3796162842507c1"), hrcore: '9082', name: 'מצגר אילה', role: ObjectId("5b7724c904e891395cbdcbe8")};
  
  const employees = [];
  employees.push(g1kt);
  employees.push(g1kta);
  employees.push(g1st);
  employees.push(g1ot);
  employees.push(g1et);

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