

//click vertical menu lĩnh vực
const header = document.querySelector('.field-select-header');
const checkboxes = document.querySelector('.field-select-checkboxes');

header.addEventListener('click', function() {
  checkboxes.classList.toggle('active');
});
//end

//click vertical menu trình độ
const header1 = document.querySelector('.field-select-header1');
const checkboxes1 = document.querySelector('.field-select-checkboxes1');

header1.addEventListener('click', function() {
  checkboxes1.classList.toggle('active');
});
//end

//click vertical menu hình thức
const header2 = document.querySelector('.field-select-header2');
const checkboxes2 = document.querySelector('.field-select-checkboxes2');

header2.addEventListener('click', function() {
  checkboxes2.classList.toggle('active');
});
//end

//click vertical menu khoảng giá
const header3 = document.querySelector('.field-select-header3');
const checkboxes3 = document.querySelector('.field-select-checkboxes3');

header3.addEventListener('click', function() {
  checkboxes3.classList.toggle('active');
});
//end

// đếm khóa học
const courseAll = document.querySelectorAll('.card');
const courseHeading = document.querySelector('#course-count');

for (var i = 0; i < courseAll.length; i++) {
  courseHeading.innerHTML = `${i+1} khóa học`; 
  console.log(courseAll[i]);  
}
//end


// Lấy các phần tử cần sử dụng
const selectHeader = document.querySelector('.field-select-header3');
const checkboxesss = document.querySelectorAll('.field-select-checkboxes3 input[type="checkbox"]');
const searchButton = document.querySelector('#search-button');
const checkboxAll = document.querySelector('#all');
 




// Thêm sự kiện click cho dropdown
selectHeader.addEventListener('click', handlearrow);



  // Thêm sự kiện click cho checkbox all


// Hàm xử lý sự kiện click dropdown
function handlearrow() {
  selectHeader.parentElement.classList.toggle('active');
  var svg1 = document.getElementById("svg1");
  var svg2 = document.getElementById("svg2");
  
  if (svg1.style.display === "none") {
    svg1.style.display = "block";
    svg2.style.display = "none";
  } else {
    svg1.style.display = "none";
    svg2.style.display = "block";
  }
  
}

// Hàm lọc khóa học theo giá
function filterCourses() {
  // Lấy các checkbox được chọn
  const checkedCheckboxes = [...checkboxesss].filter(checkbox => checkbox.checked);
  
  // Lọc các khóa học theo checkbox all 
  if (checkedCheckboxes.some(checkbox => checkbox.id === "all" && checkbox.checked)) {
    courseHeading.textContent = `${courseAll.length} khóa học`;
    [...courseAll].forEach(course => course.style.display = 'block');
  } 
  //checkbox  giá
  else {
  const filteredCourses = [...courseAll ].filter(courseAll => {
    // Lấy giá khóa học
    const coursePrice = parseInt(courseAll .querySelector('.price').textContent.replace(/[^0-9]/g, ''));
    
    // Kiểm tra khóa học có nằm trong các mức giá được chọn hay không
    return checkedCheckboxes.some(checkbox => {
      const checkboxValue = parseInt(checkbox.id.replace('tr', '')) * 1000000;
      return coursePrice < checkboxValue;
    });
  });

  courseHeading.textContent = `${filteredCourses.length} khóa học`;
  
  // Ẩn tất cả các khóa học
  [...courseAll].forEach(course => course.style.display = 'none');
  
  // Hiển thị các khóa học được lọc
  filteredCourses.forEach(course => course.style.display = 'block');
  
  // Đóng dropdown
  selectHeader.parentElement.classList.remove('active');
}
}



 



function sortCourses(sortType) {
  const courseContainer = document.querySelector('.inner-wrapper');
  const courses = document.querySelectorAll('.card');
  console.log(courseContainer+'1');

  let sortedCourses = Array.from(courses);

  sortedCourses.sort(function(a, b) {
    let aPrice = parseFloat(a.querySelector('.price').textContent.replace(/\D/g, ''));
    let bPrice = parseFloat(b.querySelector('.price').textContent.replace(/\D/g, ''));

    if (sortType === 'asc') {
      return aPrice - bPrice;
    } else {
      return bPrice - aPrice;
    }
  });

  for (let i = 0; i < sortedCourses.length; i++) {
    courseContainer.appendChild(sortedCourses[i]);
  }
}

const sortLinks = document.querySelectorAll('.sort-link');
for (let i = 0; i < sortLinks.length; i++) {
  sortLinks[i].addEventListener('click', function(event) {
    event.preventDefault();
    let sortType = this.getAttribute('data-sort');
    sortCourses(sortType);
  });
}


