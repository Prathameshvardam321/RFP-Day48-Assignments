
let empPayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
    if(site_properties.use_local_storage.match("true")){
        getEmployeePayrollDataFromStorage();
    }else{
        getEmployeePayrollDataFromServer();
    }
    
});

const processEmployeePayrollDataResponse= () =>{
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
}

const getEmployeePayrollDataFromStorage = () => {
    return localStorage.getItem('EmployeePayrollList') ? 
                        JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
    processEmployeePayrollDataResponse();                  
}

const getEmployeePayrollDataFromServer = () =>{
    makeServiceCall("GET",site_properties,true).then(responseText=>{
        empPayrollList = JSON.parse(responseText);
        processEmployeePayrollDataResponse();
    })
    .catch(error=>{
        console.log("GET Error Status: "+JSON.stringify(error));
        empPayrollList = [];
        processEmployeePayrollDataResponse();
    })
}
const createInnerHtml = () => { 
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>" + 
                        "<th>Salary</th><th>Start Date</th><th>Actions</th>";               
    let innerHtml = `${headerHtml}`;
    let empPayrollList = createEmployeePayrollJSON();
    for (const empPayrollData of empPayrollList) {                    
    innerHtml = `${innerHtml}
     <tr>
      <td><img class="profile" alt="" src="${empPayrollData._profilePic}"></td>
      <td>${empPayrollData._name}</td>
      <td>${empPayrollData._gender}</td>
      <td>${getDeptHtml(empPayrollData._department)}</div>
      <td>${empPayrollData._salary}</td>
      <td>${stringifyDate(empPayrollData._startDate)}</td>
      <td>
         <img name="${empPayrollData.id}" onclick="remove(this)" alt="delete"src="../assets/icons/delete-black-18dp.svg">
         <img name="${empPayrollData.id}" alt="edit" onclick="update(this)"src="../assets/icons/create-black-18dp.svg">
      </td>    
    </tr>
    `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
    document.querySelector(".emp-count").textContent = empPayrollList.length;
}

const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList){
        deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`
    }
    return deptHtml;
}

const createEmployeePayrollJSON = () => {
    let empPayrollListLocal =[
        {
            _name: 'Narayan Mahadevan',
            _gender: 'male',
            _department: [
                'Engineering',
                'Finance'
            ],
            _salary:'500000',
            _startDate: '29 Oct 2019',
            _note:'',
            id: new Date().getTime(),
            _profilePic: '../assets/profile-images/Ellipse -2.png'
        },
        {
            _name: 'Carry Minati',
            _gender: 'Female',
            _department: [
                'Finance'
            ],
            _salary:'6800000',
            _startDate: '12 Sept 2019',
            _note:'',
            id: new Date().getTime() +1,
            _profilePic: '../assets/profile-images/Ellipse -1.png'
        }
    ];
    return empPayrollListLocal;
}
const createAndUpdateStorage=()=>{
let empPayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
if(empPayrollList){
    let empPayrollData = empPayrollList.find(empData=>empData.id==employeePayrollObj.id);
if(!empPayrollData){
    empPayrollList.push(employeePayrollObj);
}else{
    const index = empPayrollList.map(empData=>empData.id).indexOf(empPayrollData.id);
    empPayrollList.splice(index,1,employeePayrollObj);
}
}else{
    empPayrollList = [employeePayrollObj]
}
localStorage.setItem("EmployeePayrollList",JSON.stringify(empPayrollList));
}
const checkName =(name)=>{
    let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
    if(!nameRegex.test(name)){
        throw  'Name is Incorrect';
    }
}
const checkStartDate = (startDate) =>{
    let now = new Date();
    if(startDate>now) {
        throw 'Start Date is a Future Date!';
    
    }
   var diff = Math.abs(now.getTime() -startDate.getTime());
   if(diff/(1000*60*60*24)>30){
 throw 'Start Date is 30 days beyond!';
   }
}
const remove = (node) => {
    let empPayrollData =empPayrollList.find(empData => empData.id == node.id);
    if(!empPayrollData) return;
    const index = empPayrollList.map(empData => empData.id).indexOf(empPayrollData.id);
    empPayrollList.splice(index,1);
    localStorage.setItem("EmployeePayrollList",JSON.stringify(empPayrollList));
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
}