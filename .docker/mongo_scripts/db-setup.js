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

function createKidsCollection(dbs) {
  const collectionName = 'kids';

  const kid1 = { "_id" : ObjectId("5b7735edf3796162942506c1"), fname: 'נעמה', lname: 'אביבי', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2018}]};
  const kid2 = { "_id" : ObjectId("5b7735edf3796162942506c2"), fname: 'חנה', lname: 'כהן', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2018}]};
  const kid3 = { "_id" : ObjectId("5b7735edf3796162942506c3"), fname: 'יעל', lname: 'גלר', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2018}]};
  const kid4 = { "_id" : ObjectId("5b7735edf3796162942506c4"), fname: 'מעין', lname: 'אשואל', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2018}]};
  const kid5 = { "_id" : ObjectId("5b7735edf3796162942506c5"), fname: 'אילה', lname: 'מצגר', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2018}]};
  const kid6 = { "_id" : ObjectId("5b7735edf3796162942506c6"), fname: 'אילה', lname: 'מצגר', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2018}]};
  const kid7 = { "_id" : ObjectId("5b7735edf3796162942506c7"), fname: 'אילה', lname: 'מצגר', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2018}]};
  const kid8 = { "_id" : ObjectId("5b7735edf3796162942506c8"), fname: 'אילה', lname: 'מצגר', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2018}]};
  const kid9 = { "_id" : ObjectId("5b7735edf3796162942506c9"), fname: 'אילה', lname: 'מצגר', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2018}]};
  const kid10 = { "_id" : ObjectId("5b7735edf3796162942506ca"), fname: 'אילה', lname: 'מצגר', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2018}]};

  const kid11 = { "_id" : ObjectId("5b7735edf3796162942506cb"), fname: 'נעמה', lname: 'אביבי', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2018}]};
  const kid12 = { "_id" : ObjectId("5b7735edf3796162942506cc"), fname: 'חנה', lname: 'כהן', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2018}]};
  const kid13 = { "_id" : ObjectId("5b7735edf3796162942506cd"), fname: 'יעל', lname: 'גלר', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2018}]};
  const kid14 = { "_id" : ObjectId("5b7735edf3796162942506ce"), fname: 'מעין', lname: 'אשואל', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2018}]};
  const kid15 = { "_id" : ObjectId("5b7735edf3796162942506cf"), fname: 'אילה', lname: 'מצגר', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2018}]};
  const kid16 = { "_id" : ObjectId("5b7735edf3796162942506d0"), fname: 'אילה', lname: 'מצגר', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2018}]};
  const kid17 = { "_id" : ObjectId("5b7735edf3796162942506d1"), fname: 'אילה', lname: 'מצגר', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2018}]};
  const kid18 = { "_id" : ObjectId("5b7735edf3796162942506d2"), fname: 'אילה', lname: 'מצגר', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2018}]};
  const kid19 = { "_id" : ObjectId("5b7735edf3796162942506d3"), fname: 'אילה', lname: 'מצגר', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2018}]};
  const kid20 = { "_id" : ObjectId("5b7735edf3796162942506d4"), fname: 'אילה', lname: 'מצגר', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2018}]};

  const kid21 = { "_id" : ObjectId("5b7735edf3796162942506d5"), fname: 'נעמה', lname: 'אביבי', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2018}]};
  const kid22 = { "_id" : ObjectId("5b7735edf3796162942506d6"), fname: 'חנה', lname: 'כהן', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2018}]};
  const kid23 = { "_id" : ObjectId("5b7735edf3796162942506d7"), fname: 'יעל', lname: 'גלר', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2018}]};
  const kid24 = { "_id" : ObjectId("5b7735edf3796162942506d8"), fname: 'מעין', lname: 'אשואל', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2018}]};
  const kid25 = { "_id" : ObjectId("5b7735edf3796162942506d9"), fname: 'אילה', lname: 'מצגר', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2018}]};
  const kid26 = { "_id" : ObjectId("5b7735edf3796162942506da"), fname: 'אילה', lname: 'מצגר', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2018}]};
  const kid27 = { "_id" : ObjectId("5b7735edf3796162942506db"), fname: 'אילה', lname: 'מצגר', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2018}]};
  const kid28 = { "_id" : ObjectId("5b7735edf3796162942506dc"), fname: 'אילה', lname: 'מצגר', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2018}]};
  const kid29 = { "_id" : ObjectId("5b7735edf3796162942506dd"), fname: 'אילה', lname: 'מצגר', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2018}]};
  const kid30 = { "_id" : ObjectId("5b7735edf3796162942506de"), fname: 'אילה', lname: 'מצגר', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2018}]};

  const kid31 = { "_id" : ObjectId("5b7735edf3796162942506df"), fname: 'נעמה', lname: 'אביבי', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2018}]};
  const kid32 = { "_id" : ObjectId("5b7735edf3796162942506e0"), fname: 'חנה', lname: 'כהן', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2018}]};
  const kid33 = { "_id" : ObjectId("5b7735edf3796162942506e1"), fname: 'יעל', lname: 'גלר', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2018}]};
  const kid34 = { "_id" : ObjectId("5b7735edf3796162942506e2"), fname: 'מעין', lname: 'אשואל', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2018}]};
  const kid35 = { "_id" : ObjectId("5b7735edf3796162942506e3"), fname: 'אילה', lname: 'מצגר', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2018}]};
  const kid36 = { "_id" : ObjectId("5b7735edf3796162942506e4"), fname: 'אילה', lname: 'מצגר', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2018}]};
  const kid37 = { "_id" : ObjectId("5b7735edf3796162942506e5"), fname: 'אילה', lname: 'מצגר', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2018}]};
  const kid38 = { "_id" : ObjectId("5b7735edf3796162942506e6"), fname: 'אילה', lname: 'מצגר', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2018}]};
  const kid39 = { "_id" : ObjectId("5b7735edf3796162942506e7"), fname: 'אילה', lname: 'מצגר', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2018}]};
  const kid40 = { "_id" : ObjectId("5b7735edf3796162942506e8"), fname: 'אילה', lname: 'מצגר', registrar: [{kindergartenId: ObjectId("5b7735edf3796162842507c1"), year:2018}]};

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
  kids.push(kid13);
  kids.push(kid14);
  kids.push(kid15);
  kids.push(kid16);
  kids.push(kid17);
  kids.push(kid18);
  kids.push(kid19);
  kids.push(kid20);

  kids.push(kid21);
  kids.push(kid22);
  kids.push(kid23);
  kids.push(kid24);
  kids.push(kid25);
  kids.push(kid26);
  kids.push(kid27);
  kids.push(kid28);
  kids.push(kid29);
  kids.push(kid30);

  kids.push(kid31);
  kids.push(kid32);
  kids.push(kid33);
  kids.push(kid34);
  kids.push(kid35);
  kids.push(kid36);
  kids.push(kid37);
  kids.push(kid38);
  kids.push(kid39);
  kids.push(kid40);

  createCollection(dbs, collectionName, kids);
}

function listKidsCollection(dbs) {
  printTitle('Created Kids:')
  cursor = dbs.kids.find();
  while(cursor.hasNext()) {
    printjson(cursor.next());
  }
}