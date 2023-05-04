
 const today = new Date().toISOString().split('T')[0]; // Lấy ngày hiện tại và định dạng theo chuẩn ISO
 document.getElementById('date-soon').min = today; // Gán giá trị của min bằng ngày hiện tại

 
 //  hide/show ck editor
 var arrow = document.querySelector(".fa-chevron-downn");
 var ckeditor = document.querySelector(".ckeditor");
 
 // Thêm sự kiện click vào mũi tên
 arrow.addEventListener("click", function() {
   // Nếu CKEditor đang ẩn, hiển thị nó lên và đổi mũi tên
   if (ckeditor.style.display === "none") {
     ckeditor.style.display = "block";
     arrow.classList.remove("fa-chevron-down");
     arrow.classList.add("fa-chevron-up");
   } 
   // Ngược lại, ẩn CKEditor đi và đổi mũi tên
   else {
     ckeditor.style.display = "none";
     arrow.classList.remove("fa-chevron-up");
     arrow.classList.add("fa-chevron-down");
   }
 });


 //hide.show thời gian lớp
 var arroww = document.querySelector(".fa-chevron-downnn");
 var time = document.querySelector(".infomation-time");
 
 // Thêm sự kiện click vào mũi tên
 arroww.addEventListener("click", function() {
   // Nếu CKEditor đang ẩn, hiển thị nó lên và đổi mũi tên
   if (time.style.display === "none") {
     time.style.display = "block";
     arroww.classList.remove("fa-chevron-down");
     arroww.classList.add("fa-chevron-up");
   } 
   // Ngược lại, ẩn CKEditor đi và đổi mũi tên
   else {
     time.style.display = "none";
     arroww.classList.remove("fa-chevron-up");
     arroww.classList.add("fa-chevron-down");
   }
 });
// Lấy các trường giờ bắt đầu và giờ kết thúc và tăng lên 2h
const startTimeField = document.getElementById('time-start');
const endTimeField = document.getElementById('time-end');

// Thêm sự kiện "change" cho trường giờ bắt đầu
startTimeField.addEventListener('change', function() {
  // Lấy giá trị giờ bắt đầu
  const startTime = new Date(`2023-05-03T${this.value}:00`);

  // Tăng giờ bắt đầu lên 2 giờ
  const endTime = new Date(startTime.getTime() + (2 * 60 * 60 * 1000));

  // Cập nhật giá trị của trường giờ kết thúc
  const endHours = endTime.getHours().toString().padStart(2, '0');
  const endMinutes = endTime.getMinutes().toString().padStart(2, '0');
  endTimeField.value = `${endHours}:${endMinutes}`;
});
//end tự tăng 2h



//xử lý sự kiên thêm xóa sửa
const addButton = document.querySelector('.btnsavecourse');
const changed =  document.querySelector('.btnsavechanged');
const classListContainer = document.getElementById('class-list-container');
const addBtn = document.querySelector('.btnsavecoursess')

let previousClassTime = null;
let editingClassItem = null;

//add btn tạo lớp học kế bên ô input
addButton.addEventListener('click', function() {
  const startTimeInput = document.getElementById('time-start');
  const endTimeInput = document.getElementById('time-end');
  const dayInputs = document.querySelectorAll('.checkbox-container input[type="checkbox"]');
  const slotInput = document.querySelector('#full-slot select');
  const classDateInput = document.getElementById('date-soon');

  const days = [];
  dayInputs.forEach((dayInput) => {
    if (dayInput.checked) {
      days.push(dayInput.labels[0].innerText);
    }
  });

  const currentClassTime = {
    start: startTimeInput.value,
    end: endTimeInput.value,
    days: days,
    slot: slotInput.value,
    date: classDateInput.value
  };

  if (previousClassTime !== null) {
    if (currentClassTime.start === previousClassTime.start && currentClassTime.end === previousClassTime.end && currentClassTime.days.toString() === previousClassTime.days.toString()) {
      alert('Khóa học mới trùng thời gian với khóa học trước đó');
      return;
    }
  }

  previousClassTime = currentClassTime;


  

  const classItem = document.createElement('li');
  classItem.innerHTML = `
    <span class="start-time">${startTimeInput.value}</span>
    <span class="end-time">${endTimeInput.value}</span>
    <span class="days">${days.join(', ')}</span>
    <span class="slot">${slotInput.value}</span>
    <span class="open-date">${classDateInput.value}</span>
    <button class="btn-edit">Sửa</button>
    <button class="btn-delete">Xóa</button>
  `;

  classListContainer.appendChild(classItem);

  // reset input sau khi thêm khóa học mới
  startTimeInput.value = '';
  endTimeInput.value = '';
  dayInputs.forEach((dayInput) => {
    dayInput.checked = false;
  });
  slotInput.value = '';
  classDateInput.value = '';

  const deleteButton = classItem.querySelector('.btn-delete');
  deleteButton.addEventListener('click', function() {
    const confirmResult = confirm('Bạn có muốn xóa lớp học này không?');
    if (confirmResult) {
      classItem.remove();
    }
  });

  const editButton = classItem.querySelector('.btn-edit');


  // const startTimeInputEdit = document.createElement('input');
  // const endTimeInputEdit = document.createElement('input');
  // const dayInputsEdit = document.querySelectorAll('.checkbox-container input[type="checkbox"]');
  // const slotInputEdit = document.createElement('select');
  // const classDateInputEdit = document.createElement('input');

  // startTimeInputEdit.type = 'time';
  // startTimeInputEdit.value = startTimeInput.value;
  // endTimeInputEdit.type = 'time';
  // endTimeInputEdit.value = endTimeInput.value;
  // slotInputEdit.innerHTML = slotInput.innerHTML;
  // slotInputEdit.value = slotInput.value;
  // classDateInputEdit.type = 'date';
  // classDateInputEdit.value = classDateInput.value;

  editButton.addEventListener('click', function() {
    // lấy các giá trị từ lớp học được chọn
    const startTime = classItem.querySelector('.start-time').innerHTML;
    const endTime = classItem.querySelector('.end-time').innerHTML;
    const days = classItem.querySelector('.days').innerHTML.split(', ');
    const slot = classItem.querySelector('.slot').innerHTML;
    const classDate = classItem.querySelector('.open-date').innerHTML;
  
    // hiển thị các giá trị này trên các ô input
    startTimeInput.value = startTime;
    endTimeInput.value = endTime;
    dayInputs.forEach((dayInput) => {
      dayInput.checked = days.includes(dayInput.labels[0].innerText);
    });
    slotInput.value = slot;
    classDateInput.value = classDate;
  
    // thay đổi giao diện nút Sửa thành nút Lưu
    addButton.style.display = 'none';
    changed.style.display = 'block';   
      

  });

  
  
  changed.addEventListener('click', function() {
    // lấy các giá trị từ các ô input
    const newStartTime = startTimeInput.value;
    const newEndTime = endTimeInput.value;
    const newDays = [];
    dayInputs.forEach((dayInput) => {
      if (dayInput.checked) {
        newDays.push(dayInput.labels[0].innerText);
      }
    });
    const newSlot = slotInput.value;
    const newClassDate = classDateInput.value;
  
    // cập nhật thông tin của lớp học được chọn
    classItem.querySelector('.start-time').innerHTML = newStartTime;
    classItem.querySelector('.end-time').innerHTML = newEndTime;
    classItem.querySelector('.days').innerHTML = newDays.join(', ');
    classItem.querySelector('.slot').innerHTML = newSlot;
    classItem.querySelector('.open-date').innerHTML = newClassDate;
  
    // thay đổi giao diện nút Lưu thành nút Sửa
    addButton.style.display = 'block';
    changed.style.display = 'none';
    startTimeInput.value = '';
    endTimeInput.value = '';
    dayInputs.forEach((dayInput) => {
      dayInput.checked = false;
    });
    slotInput.value = '';
    classDateInput.value = '';
  
});

});

//add btn tạo lớp học btn dài phía dưới
addBtn.addEventListener('click', function() {
  const startTimeInput = document.getElementById('time-start');
  const endTimeInput = document.getElementById('time-end');
  const dayInputs = document.querySelectorAll('.checkbox-container input[type="checkbox"]');
  const slotInput = document.querySelector('#full-slot select');
  const classDateInput = document.getElementById('date-soon');

  const days = [];
  dayInputs.forEach((dayInput) => {
    if (dayInput.checked) {
      days.push(dayInput.labels[0].innerText);
    }
  });

  const currentClassTime = {
    start: startTimeInput.value,
    end: endTimeInput.value,
    days: days,
    slot: slotInput.value,
    date: classDateInput.value
  };

  if (previousClassTime !== null) {
    if (currentClassTime.start === previousClassTime.start && currentClassTime.end === previousClassTime.end && currentClassTime.days.toString() === previousClassTime.days.toString()) {
      alert('Khóa học mới trùng thời gian với khóa học trước đó');
      return;
    }
  }
  previousClassTime = currentClassTime;

  const classItem = document.createElement('li');
  classItem.innerHTML = `
    <span class="start-time">${startTimeInput.value}</span>
    <span class="end-time">${endTimeInput.value}</span>
    <span class="days">${days.join(', ')}</span>
    <span class="slot">${slotInput.value}</span>
    <span class="open-date">${classDateInput.value}</span>
    <button class="btn-edit">Sửa</button>
    <button class="btn-delete">Xóa</button>
  `;

  classListContainer.appendChild(classItem);

  // reset input sau khi thêm khóa học mới
  startTimeInput.value = '';
  endTimeInput.value = '';
  dayInputs.forEach((dayInput) => {
    dayInput.checked = false;
  });
  slotInput.value = '';
  classDateInput.value = '';

  //button delete
  const deleteButton = classItem.querySelector('.btn-delete');
  deleteButton.addEventListener('click', function() {
    const confirmResult = confirm('Bạn có muốn xóa lớp học này không?');
    if (confirmResult) {
      classItem.remove();
    }
  });

  const editButton = classItem.querySelector('.btn-edit');
  //edit thông tin lớp
  editButton.addEventListener('click', function() {
    // lấy các giá trị từ lớp học được chọn
    const startTime = classItem.querySelector('.start-time').innerHTML;
    const endTime = classItem.querySelector('.end-time').innerHTML;
    const days = classItem.querySelector('.days').innerHTML.split(', ');
    const slot = classItem.querySelector('.slot').innerHTML;
    const classDate = classItem.querySelector('.open-date').innerHTML;
  
    // hiển thị các giá trị này trên các ô input
    startTimeInput.value = startTime;
    endTimeInput.value = endTime;
    dayInputs.forEach((dayInput) => {
      dayInput.checked = days.includes(dayInput.labels[0].innerText);
    });
    slotInput.value = slot;
    classDateInput.value = classDate;
  
    // thay đổi giao diện nút Sửa thành nút Lưu
    addButton.style.display = 'none';
    changed.style.display = 'block';   
      

  });
  // lưu thông tin mới 
  changed.addEventListener('click', function() {
    // lấy các giá trị từ các ô input
    const newStartTime = startTimeInput.value;
    const newEndTime = endTimeInput.value;
    const newDays = [];
    dayInputs.forEach((dayInput) => {
      if (dayInput.checked) {
        newDays.push(dayInput.labels[0].innerText);
      }
    });
    const newSlot = slotInput.value;
    const newClassDate = classDateInput.value;
  
    // cập nhật thông tin của lớp học được chọn
    classItem.querySelector('.start-time').innerHTML = newStartTime;
    classItem.querySelector('.end-time').innerHTML = newEndTime;
    classItem.querySelector('.days').innerHTML = newDays.join(', ');
    classItem.querySelector('.slot').innerHTML = newSlot;
    classItem.querySelector('.open-date').innerHTML = newClassDate;
  
    // thay đổi giao diện nút Lưu thành nút Sửa
    addButton.style.display = 'block';
    changed.style.display = 'none';
    startTimeInput.value = '';
    endTimeInput.value = '';
    dayInputs.forEach((dayInput) => {
      dayInput.checked = false;
    });
    slotInput.value = '';
    classDateInput.value = '';
  
});
});

//end xử lý sự kiên thêm xóa sửa








// tags

const tagContainer = document.querySelector('.tag-container');
const tagInput = document.querySelector('.tag-input-field');
const tagList = document.querySelector('.tag-list');

let tags = [];

tagInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    const tagText = tagInput.value.trim();

    if (tagText !== '' && !tags.includes(tagText)) {
      tags.push(tagText);
      const tag = createTag(tagText);
      tagList.appendChild(tag);
      tagInput.value = '';
    }
  }
});

function deleteTag(index) {
  tags.splice(index, 1);
  tagList.removeChild(tagList.childNodes[index]);
}

function createTag(text) {
  const tag = document.createElement('div');
  tag.classList.add('tag');
  tag.innerHTML = `
    <span class="tag-text">${text}</span>
    <button class="delete-button" onclick="deleteTag(${tags.length - 1})">x</button>
  `;
  return tag;
}

//end tags
// const tagInput = document.querySelector('.tag-input-field');
// let tags = [];

// tagInput.addEventListener('keydown', function(event) {
//   if (event.key === 'Enter') {
//     const tagText = tagInput.value.trim();

//     if (tagText !== '' && !tags.includes(tagText)) {
//       tags.push(tagText);
//       tagInput.value = tags.join(', ');
//     }
//   }
// });




//validate meet
function validateMeetLink() {
  const meetLinkInput = document.getElementById("meet-link");
  const meetLink = meetLinkInput.value;
  const meetLinkRegex = /^https?:\/\/meet.google.com\/[a-zA-Z0-9_-]{12,}$/;
  const meetErrorMessage = document.getElementById("meet-error-message");

  if (meetLinkRegex.test(meetLink)) {
    meetErrorMessage.textContent = "";
  } else {
    meetErrorMessage.textContent = "Link không hợp lệ, vui lòng nhập lại!";
  }
}
//end validate


var quill = new Quill('#editor-container', {
  modules: {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['image', 'code-block']
    ]
  },
  placeholder: 'Compose an epic...',
  theme: 'snow'  // or 'bubble'
});


//textarea max 200
function countChars() {
  let input = document.getElementById("input-area").value;
  let count = input.length;
  let charCount = document.getElementById("char-count");
  charCount.innerText = count + "/200";

  if (count >= 200) {
    document.getElementById("error-messages").style.display = "block";
  } else {
    document.getElementById("error-messages").style.display = "none";
  }
}



// end text



// validate độ dài >3
function validateContent() {
    const contentInput = document.getElementById("content");
    const content = contentInput.value;
    const errorMessage = document.getElementById("error-message");
  
    if (content.length >= 3) {
      errorMessage.textContent = "";
    } else {
      errorMessage.textContent = "Nội dung phải có ít nhất 3 kí tự!";
    }
  }
  
  
  //format money
  function formatMoney(input) {
    // Xóa các ký tự không phải số khỏi chuỗi nhập vào
    let val = input.value.replace(/[^0-9]/g, '');
  
    // Thêm dấu chấm vào giữa các số hàng nghìn
    val = val.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  
    // Thêm đơn vị tiền tệ VNĐ vào sau số tiền
    val = val ? val + ' VNĐ' : '';
  
    // Gán giá trị đã định dạng vào ô input
    input.value = val;
  }
  
  
  //upload img
  function handleImageUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(event) {
      const imagePreview = document.getElementById("image-preview");
      imagePreview.src = event.target.result;
    }
    document.getElementById("file-name").textContent = file.name;
  }
  
  function deleteImage() {
    const imagePreview = document.getElementById("image-preview");
    imagePreview.src = "./img/images/upload-img.jpg";
    document.getElementById("file-name").textContent = "";
  }
  
  
  
  // check min-max
  function validateInput() {
    const minInput = document.getElementById("min-input");
    const maxInput = document.getElementById("max-input");
    const minErrorMessage = document.getElementById("min-error-message");
    const maxErrorMessage = document.getElementById("max-error-message");
  
    const min = parseFloat(minInput.value);
    const max = parseFloat(maxInput.value);
  
    if (min < 0) {
      minErrorMessage.innerText = "Giá trị nhập vào không được âm.";
    } else {
      minErrorMessage.innerText = "";
    }
  
    if (max < 0) {
      maxErrorMessage.innerText = "Giá trị nhập vào không được âm.";
    } else {
      maxErrorMessage.innerText = "";
    }
  
    
  
  
  
    if (max < min) {
      // maxInput.value = min;
      maxErrorMessage.innerText = "Giá trị max không thể nhỏ hơn min";
    } else if (max == min) {
      maxErrorMessage.innerText = "Giá trị max không thể bằng giá trị min";
    } else {
      maxErrorMessage.innerText = "";
    }
  }
  
  
  
  function resizeInput() {
    var input = document.getElementById("money-input");
    if (window.innerWidth <= 500) {
      input.style.width = "300px";
    } else {
      input.style.width = "671px";
    }
  }
  
  window.onresize = resizeInput;




  
  
  
  
  
  