const email=document.getElementById('email');
const dateofbirth=document.getElementById('dob');




  

  
  
 














const userForm = document.getElementById("user-form");


let userData= JSON.parse(localStorage.getItem("user-data") ) || [];


const displayEntries =()=>{
  const userEntries=  JSON.parse(localStorage.getItem("user-data")) || [];

  if(!userEntries) return;

  
  


  let tableEntries = userEntries.map(data=>{
    const namedata =  `<td class="border px-4 py-2">${data.name}</td>`;
    const emaildata =  `<td class="border px-4 py-2">${data.email}</td>`;
    const passworddata =  `<td class="border px-4 py-2">${data.password}</td>`;
    const dataofBirthdata =  `<td class="border px-4 py-2">${data.dateofBirth}</td>`;
    const acceptTermsdata=  `<td class="border px-4 py-2">${data.acceptTerms}</td>`;


    const rowdata =  `<tr>${namedata} ${emaildata} ${passworddata} ${dataofBirthdata} ${acceptTermsdata}</tr>`

    return rowdata;
  }).join("\n");

  const tabledata =`<table class="table-auto w-fill">
          <tr>
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Email</th>
            <th class="px-4 py-2">Password</th>
            <th class="px-4 py-2">Dob</th>
            <th class="px-4 py-2">Accepted terms?</th>
          </tr>

          ${tableEntries}

        </table>`
let userdetails = document.getElementById('user-entries');
userdetails.innerHTML= tabledata;
}



userForm.addEventListener('submit',(event) =>{
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email=document.getElementById('email').value;

  const  password =document.getElementById('password').value;

  const dateofBirth =document.getElementById('dob').value;

  const acceptTerms=document.getElementById('acceptTerms').checked;


  
  let isValid=true;
  
  if(!(validDateofbirth(dateofbirth.value))){
    let message="enter vaild date of birth(between 18 and 55 years old).";
    dateofbirth.setCustomValidity(message);
    dateofbirth.reportValidity();
    isValid=false;
    return;


  } else {
    dateofbirth.setCustomValidity(""); 
   }


if (!isValid) {
    event.preventDefault();
}



  const entry ={
    name,
    email,
    password,
    dateofBirth,
    acceptTerms
  }

  userData.push(entry);

localStorage.setItem("user-data", JSON.stringify(userData));
displayEntries();
});


displayEntries();





function validEmail(email){
  const validpattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 return (validpattern.test(email));  
}

function validDateofbirth(dateofbirth){
  const todayDate =new Date();
  const birthDate =new Date(dateofbirth);

  if(isNaN(birthDate.getTime())) return false;

  const age=todayDate.getFullYear() - birthDate.getFullYear();

  const monthDiff=todayDate.getMonth() - birthDate.getMonth();

  const dateDiff=todayDate.getDate() - birthDate.getDate();


  if(monthDiff<0 || (monthDiff ===0 && dateDiff<0)){
   age--;
  }
  

  return (age>=18 && age<=55);
  
  
}
