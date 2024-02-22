$(document).ready(function(){
  var students = JSON.parse(localStorage.getItem('students')) || [
    {id: 1, name: 'John', age: 20},
    {id: 2, name: 'Sarah', age: 22},
    {id: 3, name: 'Mike', age: 21}
  ];

  // Function to populate the student table
  function populateStudentList() {
    $('#studentList').empty();
    $.each(students, function(index, student){
      $('#studentList').append('<tr>' +
        '<td>' + student.id + '</td>' +
        '<td>' + student.name + '</td>' +
        '<td>' + student.age + '</td>' +
        '<td class="btn"><button class="editBtn" data-id="' + student.id + '">Edit</button>' +
        '<button class="deleteBtn" data-id="' + student.id + '">Delete</button></td>' +
        '</tr>');
    });
  }
  
  // Define handleStudentsDataChange() before calling it
  function handleStudentsDataChange() {
    saveStudentsToLocalStorage();
    populateStudentList();
  }

  // Add Student Button Click Event
  $(document).on('click', '#addStudentBtn', function(){
    var studentId = $(this).data('id');
    var student = students.find(function(s) { return s.id === studentId; });
    $("#id").val(students.length + 1);
    $('#addStudentModal').show();
  });

  // Edit Student Button Click Event
  $(document).on('click', '.editBtn', function(){
    var studentId = $(this).data('id');
    var student = students.find(function(s) { return s.id === studentId; });
    $('#editStudentId').val(student.id);
    $('#editName').val(student.name);
    $('#editAge').val(student.age);
    $('#editStudentModal').show();
  });

  // Delete Student Button Click Event
  $(document).on('click', '.deleteBtn', function(){
    var studentId = $(this).data('id');
    $('#confirmDeleteBtn').data('id', studentId);
    $('#deleteStudentModal').show();
  });

  // Close Modal Event
  $('.close').click(function(){
    $('.modal').hide();
  });

  // Add Student Form Submit Event
  $('#addStudentForm').submit(function(e){
    e.preventDefault();
    var newStudent = {
      id: parseInt($('#id').val()),
      name: $('#name').val(),
      age: parseInt($('#age').val())
    };
    students.push(newStudent);
    handleStudentsDataChange();
    $('#addStudentModal').hide();
  });

  // Edit Student Form Submit Event
  $('#editStudentForm').submit(function(e){
    e.preventDefault();
    var studentId = $('#editStudentId').val();
    var studentIndex = students.findIndex(function(s) { return s.id == studentId; });
    students[studentIndex].name = $('#editName').val();
    students[studentIndex].age = parseInt($('#editAge').val());
    handleStudentsDataChange();
    $('#editStudentModal').hide();
  });

  // Confirm Delete Button Click Event
  $('#confirmDeleteBtn').click(function(){
    var studentId = $(this).data('id');
    students = students.filter(function(s) { return s.id != studentId; });
    handleStudentsDataChange();
    $('#deleteStudentModal').hide();
  });
  
  function saveStudentsToLocalStorage() {
    localStorage.setItem('students', JSON.stringify(students));
  }

  handleStudentsDataChange(); // Initial call to load data from localStorage
});
