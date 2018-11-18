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

createKidsCollection(dbs);
listKidsCollection(dbs);


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
  const director_role = { "_id" : ObjectId("5b7724c904e891395cbdcbe4"), name: 'סיעת לימודית', description: 'Assistant kindergarten educational teacher'};
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

  const g1kt = { 
    "_id" : ObjectId("5b7735edf3796162842506c1"), 
    kindergartenId: ObjectId("5b7735edf3796162842507c1"), 
    hrcore: '7182', 
    name: 'כהן שרית', 
    role: ObjectId("5b7724c904e891395cbdcbe3")};
  const g1kta = { 
    "_id" : ObjectId("5b7735edf3796162842506c2"), 
    kindergartenId: ObjectId("5b7735edf3796162842507c1"), 
    hrcore: '3324', 
    name: 'בן עזרא מיכל', 
    role: ObjectId("5b7724c904e891395cbdcbe4")};
  const g1ktea = { 
    "_id" : ObjectId("5b7735edf3796162842506c3"), 
    kindergartenId: ObjectId("5b7735edf3796162842507c1"), 
    hrcore: '4432', 
    name: 'אהרוני רחלי', 
    role: ObjectId("5b7724c904e891395cbdcbe2")};
  const g1st = { 
    "_id" : ObjectId("5b7735edf3796162842506c4"), 
    kindergartenId: ObjectId("5b7735edf3796162842507c1"), 
    hrcore: '0914', 
    name: 'מועלם איילת', 
    role: ObjectId("5b7724c904e891395cbdcbe6")};
  const g1ot = { 
    "_id" : ObjectId("5b7735edf3796162842506c5"), 
    kindergartenId: ObjectId("5b7735edf3796162842507c1"), 
    hrcore: '8778', 
    name: 'בר זוהר לירון', 
    role: ObjectId("5b7724c904e891395cbdcbe7")};
  const g1et = { 
    "_id" : ObjectId("5b7735edf3796162842506c6"), 
    kindergartenId: ObjectId("5b7735edf3796162842507c1"), 
    hrcore: '5105', 
    name: 'מנדלמן תרצה', 
    role: ObjectId("5b7724c904e891395cbdcbe8")};
  
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
    ObjectId("5b7735edf3796162842506c1"),
    ObjectId("5b7735edf3796162842506c2"),
    ObjectId("5b7735edf3796162842506c3"),
    ObjectId("5b7735edf3796162842506c4"),
    ObjectId("5b7735edf3796162842506c5"),
    ObjectId("5b7735edf3796162842506c6"),
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

function createKidsCollection(dbs) {
  const collectionName = 'kids';

  const kid1 = { "_id" : ObjectId("5b7735edf3796162942506c1"), fname: 'מתניה רפאל', lname: 'אהרון', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2019}]};
  const kid2 = { "_id" : ObjectId("5b7735edf3796162942506c2"), fname: 'ניסים ניתאי', lname: 'בללו', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2019}]};
  const kid3 = { "_id" : ObjectId("5b7735edf3796162942506c3"), fname: 'אביעד מרדכי', lname: 'גבאי', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2019}]};
  const kid4 = { "_id" : ObjectId("5b7735edf3796162942506c4"), fname: 'אוריה', lname: 'דוד', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2019}]};
  const kid5 = { "_id" : ObjectId("5b7735edf3796162942506c5"), fname: 'דניאל', lname: 'האוש', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2019}]};
  const kid6 = { "_id" : ObjectId("5b7735edf3796162942506c6"), fname: 'בנימין', lname: 'כבל', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2019}]};
  const kid7 = { "_id" : ObjectId("5b7735edf3796162942506c7"), fname: 'מאור', lname: 'כהן', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2019}]};
  const kid8 = { "_id" : ObjectId("5b7735edf3796162942506c8"), fname: 'איתן', lname: 'נדב', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2019}]};
  const kid9 = { "_id" : ObjectId("5b7735edf3796162942506c9"), fname: 'מאור ישראל', lname: 'עטון', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2019}]};
  const kid10 = { "_id" : ObjectId("5b7735edf3796162942506ca"), fname: 'יעקב', lname: 'עלינסיאן', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2019}]};

  const kid11 = { "_id" : ObjectId("5b7735edf3796162942506cb"), fname: 'דוד', lname: 'קנר', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2019}]};
  const kid12 = { "_id" : ObjectId("5b7735edf3796162942506cc"), fname: 'אוריה אברהם', lname: 'תם', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2019}]};

  const kids = [];
  kids.push(kid1);
  kids.push(kid2);
  kids.push(kid3);
  kids.push(kid4);
  kids.push(kid5);
  kids.push(kid6);
  kids.push(kid7);
  kids.push(kid8);
  kids.push(kid9);
  kids.push(kid10);

  kids.push(kid11);
  kids.push(kid12);

  createCollection(dbs, collectionName, kids);
}

function listKidsCollection(dbs) {
  printTitle('Created Kids:')
  cursor = dbs.kids.find();
  while(cursor.hasNext()) {
    printjson(cursor.next());
  }
}