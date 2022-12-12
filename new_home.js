let empPayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
    empPayrollList = getEmployeePayrollDataFromStorage();
    createInnerHtml();
    localStorage.removeItem('editEmp');
});

const getEmployeePayrollDataFromStorage = () => {
    return localStorage.getItem('EmployeePayrollList') ? 
                        JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
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
         <img name="${empPayrollData._id}" onclick="remove(this)" alt="delete"src="../assets/icons/delete-black-18dp.svg">
         <img name="${empPayrollData._id}" alt="edit" onclick="update(this)"src="../assets/icons/create-black-18dp.svg">
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
            _id: new Date().getTime(),
            _profilePic: '../assets/profile-images/Ellipse -2.png'
        },
        {
            _name: 'Rashmika Mandanna',
            _gender: 'Female',
            _department: [
                'Finance'
            ],
            _salary:'5000000',
            _startDate: '29 Sept 2020',
            _note:'',
            _id: new Date().getTime() +1,
            _profilePic: '../assets/profile-images/Ellipse -1.png'
        }
    ];
    return empPayrollListLocal;
}

const remove = (node) => {
    let empPayrollData =empPayrollList.find(empData => empData._id == node._id);
    if(!empPayrollData) return;
    const index = empPayrollList.map(empData => empData._id).indexOf(empPayrollData._id);
    empPayrollList.splice(index,1);
    localStorage.setItem("EmployeePayrollList",JSON.stringify(empPayrollList));
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
}