///////////////////////DOM ACCESS
let data = [];
const inputField = document.querySelector(".Input");
const addBtn = document.querySelector(".addbtn");
const list = document.querySelector(".list");
const Updatebtn = document.querySelector(".Update");
const deletebtn = document.querySelector(".delete");
const GetBox = document.querySelector(".GetBox");
const Updatedata = document.querySelector(".Updatedata");
/////////////////////////replace Function
function replace(value) {
  data.forEach((data, index) => {
    if (data === value) {
      data[index] = value;
    }
  });
}

//////////////////Insert Fnuction
const addFunction = (e) => {
  if (inputField.value) {
    ////////////////////////simple insertion/////////////////test
    data.push(inputField.value);
    UI();
    inputField.value = "";
  }
};
//////////////////////////Delete Function
function deleteFunction(value, index) {
  const delnode = document.getElementById(`${index}`);
  delnode.remove();
  const delItem = data.filter((data) => data !== value);
  data = delItem;
}
////////////////////////Edit Function
let holdvalue, holdelement, holdindex;
function edit(holdValue, holdIndex) {
  inputField.value = holdValue;
  holdelement = document.getElementById(`${holdIndex}`);

  holdindex = holdIndex;
  holdvalue = holdValue;
  console.log(holdindex);
  console.log(holdvalue);
  console.log(holdelement);
}

//////////////////////UpDateData
function upDateData() {
  const temp = inputField.value;

  data.forEach((value, index) => {
    if (value === holdvalue) {
      data[index] = temp;
      holdelement.textContent = temp;
      inputField.value = "";
    }
  });
}

addBtn.addEventListener("click", addFunction);
Updatedata.addEventListener("click", upDateData);
/////////////////////////UI Update
function UI() {
  let html;

  data.forEach((value, index) => {
    html = `<div class="datadiv" id="hello${index}">
        <span class="list" id="h${index}">${value}</span>
        <button class="Update" onclick="edit('${value}','h${index}')">
          <img src="img/update.png" alt="" />
        </button>
        <button class="delete" onclick="deleteFunction('${value}','hello${index}')">
          <img src="img/delete.png" alt="" />
        </button>
      </div>`;
  });
  GetBox.insertAdjacentHTML("afterbegin", html);
}
console.log(data);
