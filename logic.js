///////////////////////DOM ACCESS
let data = [
  { ObjectPro: "goHome", list: [] },
  { ObjectPro: "goOffice", list: [] },
];
const inputField = document.querySelector(".Input");
const addBtn = document.querySelector(".addbtn");
const list = document.querySelector(".list");
const Updatebtn = document.querySelector(".Update");
const deletebtn = document.querySelector(".delete");
const GetBox = document.querySelector(".GetBox");
const Updatedata = document.querySelector(".Updatedata");
let InputSublist;
const addbtnSublist = document.querySelector(".addbtnSublist");
let ObjectRepresentation;
let dataDiv;
let printArrayData;
let start = document.querySelector(".start");
let end = document.querySelector(".end");
let errorchecker = document.querySelector(".errorchecker");

////////////////////test
let counter = 0;
let matchedName = false;
//////////////////Insert Function
const addFunction = (e) => {
  const ObjectPro = inputField.value;
  if (inputField.value) {
    // start.style.display = "block";
    // end.style.display = "block";
    ////////////////////////simple insertion/////////////////test
    for (const item of data) {
      if (item.ObjectPro === inputField.value) {
        console.log("matched");
        matchedName = true;
      }
    }

    if (matchedName) {
      console.log("Same object is not allowed");
      errorchecker.textContent = "Same object is not allowed";
      errorchecker.style.color = "red";
      matchedName = false;
    } else {
      errorchecker.textContent = "";
      errorchecker.style.color = "red";
      counter++;
      data.splice(counter, 0, {
        ObjectPro: ObjectPro.replace(/ /g, ""),
        list: [],
      });

      UI();
      inputField.value = "";
    }
  }
  ///////////////////////Style STATIC TEXT
  ////////////////////// Style is placed here before
  printArrayData = document.querySelector(".printArrayData");
};
//////////////////////////Delete Main Object Function
function deleteFunction(value, index) {
  const delnode = document.getElementById(`${index}`);
  delnode.remove();
  const delItem = data.filter((data) => data.ObjectPro !== value);
  data = delItem;
  counter--;
  if (data.length === 0) {
    ///////////////////////Style STATIC TEXT
    // start.style.display = "none";
    // end.style.display = "none";
  }
}
////////////////////////Edit Function
let holdvalue, holdelement, holdindex, holdobj, lastItem, holdinput;
function edit(holdValue, holdIndex, obj, mainpoint) {
  let parentNOde = document.getElementById(`hello${mainpoint}`).children;

  for (const item of parentNOde) {
    if (item.className === "setSpanData" && item.id == holdIndex) {
      holdelement = item;
    }
    if (item.id == `insertlistBox${mainpoint}`) {
      //  InputSublist.value = item;

      let inputParent = item.children;
      for (const item of inputParent) {
        if (item.className === `InputSublist${mainpoint}`) {
          item.value = holdValue;
          holdinput = item;
        }
      }
    }
  }

  // InputSublist.value = holdValue;
  holdobj = obj;
  // holdelement = document.getElementById(`${holdIndex}e`);

  holdindex = holdIndex;
  holdvalue = holdValue;

  // console.log("====================", holdvalue, holdindex, holdelement, obj);
}

//////////////////////UpDateData in array
function upDateData(pickDomObjeect) {
  const temp = holdinput.value;
  for (const item of data) {
    if (item.ObjectPro === holdobj) {
      item.list[holdindex] = temp;
      let selectedParentList;
      let parentObject = document.getElementById(
        `hello${pickDomObjeect}`
      ).children;

      for (const item of parentObject) {
        if (item.className === "setSpanData" && item.id === `${holdindex}`) {
          selectedParentList = item.children;
          // let pickFChild = item.firstChild;

          // pickFChild.textContent = "";
          // pickFChild.textContent = temp;
        }
      }
      for (const lists of selectedParentList) {
        if (lists.id === `${holdindex}e`) {
          lists.textContent = temp;
        }
      }

      // holdelement.textContent = temp;
      InputSublist.value = "";
    }
  }
}

////////////////////add DATA into Object array
function addDataInObject(catchObject, index) {
  ObjectRepresentation = document.querySelector(
    `.ObjectRepresentation${catchObject}`
  );

  InputSublist = document.querySelector(`.InputSublist${index}`);

  const datasls = document.getElementById(`hello${index}`).children;

  for (const item of datasls) {
  }

  // for (const item of data) {
  //   if (item.id === `${count}`) {
  //     console.log("remove element", item);
  //     item.remove();
  //   }
  //   count++;
  // }

  for (const item of data) {
    if (item.ObjectPro === catchObject) {
      if (InputSublist.value === "") {
        return;
      } else {
        item.list.push(InputSublist.value);
        setspan(item.list, item.ObjectPro, index);
        InputSublist.value = "";
      }
    }
  }
}

////////////////////////Event binding
addBtn.addEventListener("click", addFunction);
Updatedata.addEventListener("click", upDateData);

/////////////////////////UI Update
function UI() {
  start.innerHTML = "";

  let html;

  data.forEach((value, index) => {
    html = `<div class="datadiv" id="hello${index}">
        <div class="ObjectRepresentation${value.ObjectPro}" id="data">
          <span class="list" id="h${index}">${value.ObjectPro}</span>
          <button
            class="delete"
            onclick="deleteFunction('${value.ObjectPro}','hello${index}')"
          ><img src="img/delete.png" alt="" />
          </button>
        </div>
        <div class="insertlistBox" id="insertlistBox${index}">
          <input type="text" class="InputSublist${index}" />
          <button class="addbtnSublist"  onclick="addDataInObject('${value.ObjectPro}','${index}')">Insert</button>
          <button class="addbtnSublist" onclick="upDateData('${index}')">
          Update
          </button>
          </div>
           </div>`;

    start.insertAdjacentHTML("beforeend", html);
    addDataInObject(value.ObjectPro, index);
    displayInstant(value.list, value.ObjectPro, index);
  });
}
///////////////////////////////child list UI

function displayInstant(value, objName, mainpoint) {
  let html;
  value.forEach((value, index) => {
    html = `
    <div class="setSpanData" id="${index}">
    <span class="printArrayData${index}" id="${index}e">${value}</span>
     <button
            class="delete"
            onclick="delSpanItem('${value}','${index}','${objName}','${mainpoint}')"
          >
            <img src="img/delete.png" alt="" />
          </button>
            <button
             class="Update"
           onclick="edit('${value}','${index}','${objName}','${mainpoint}')"
           >
             <img src="img/update.png" alt="" />
           </button>
          </div>`;
    ObjectRepresentation.insertAdjacentHTML("afterend", html ?? "");
  });
}

function setspan(value, objName, mainpoint) {
  // for (let index = 0; index < data.length - 1; index++) {
  //     if(data[index].id===`${}`)
  // }
  // let count = 0;
  // for (const item of data) {
  //   if (item.className == "setSpanData" && item.id === `${count++}`) {
  //     item.remove();
  //   } else {
  //     console.log("problems");
  //   }
  // }

  let html;
  value.forEach((value, index) => {
    html = `
    <div class="setSpanData" id="${index}">
    <span class="printArrayData${index}" id="${index}e">${value}</span>
     <button
            class="delete"
            onclick="delSpanItem('${value}','${index}','${objName}','${mainpoint}')"
          >
            <img src="img/delete.png" alt="" />
          </button>
            <button
             class="Update"
           onclick="edit('${value}','${index}','${objName}','${mainpoint}')"
           >
             <img src="img/update.png" alt="" />
           </button>
          </div>`;
  });
  ObjectRepresentation.insertAdjacentHTML("afterend", html ?? "");
}
//////////////////////////////del obj list item
function delSpanItem(value, index, objName, mainpoint) {
  // let cIndex = 1 + Number(index);

  let parentNode = document.getElementById(`hello${mainpoint}`).children;

  let deletedBox;
  let deletedText;
  for (const item of parentNode) {
    if (item.className === "setSpanData" && item.id === index) {
      deletedBox = item.children;
      item.remove();
    }
  }
  for (const item of deletedBox) {
    if (item.id === `${index}e`) {
      deletedText = item.textContent;
    }
  }
  // console.log(parentNode[cIndex].remove());

  data.forEach((checkobj) => {
    if (checkobj.ObjectPro === objName) {
      const copyArray = checkobj.list;
      const filterData = copyArray.filter((data) => data !== deletedText);
      checkobj.list = filterData;
    }
  });
}
////////////////////////////testing point
