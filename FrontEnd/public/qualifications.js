window.onload = function() {
    var addRowButton = document.getElementById("addRow");
    var submitButton = document.getElementById("submit");
    var form = document.querySelector("form.frm");
    var table = document.getElementById("data");
  
    // Add event listener to the addRow button
    addRowButton.addEventListener("click", function(event) {
      event.preventDefault();
      addRow();
    });
  
    // Add event listener to the submit button
    submitButton.addEventListener("click", function(event) {
      event.preventDefault();
      submitForm();
    });
  
    // Attach event listeners to the table for edit and delete buttons
    table.addEventListener("click", function(event) {
      var target = event.target;
      if (target.tagName === "BUTTON") {
        var action = target.textContent.trim().toLowerCase();
        if (action === "edit") {
          editRow(target);
        } else if (action === "delete") {
          deleteRow(target);
        }
      }
    });
  
    // Function to add a new row to the table
    function addRow() {
      var newRow = table.insertRow();
  
      var level = document.getElementById("level").value;
      var examDegree = document.getElementById("exam").value;
      var schoolCollege = document.getElementById("school").value;
      var university = document.getElementById("university").value;
      var yearOfPassing = document.getElementById("pass").value;
      var maxMarks = document.getElementById("maxmarks").value;
      var marksObtained = document.getElementById("obtmarks").value;
      var percentage = document.getElementById("percentage").value;
      var division = document.getElementById("division").value;
      var achievement = document.getElementById("achievement").value;
  
      // Insert data into the new row
      var cell1 = newRow.insertCell();
      var cell2 = newRow.insertCell();
      var cell3 = newRow.insertCell();
      var cell4 = newRow.insertCell();
      var cell5 = newRow.insertCell();
      var cell6 = newRow.insertCell();
      var cell7 = newRow.insertCell();
      var cell8 = newRow.insertCell();
      var cell9 = newRow.insertCell();
      var cell10 = newRow.insertCell();
      var cell11 = newRow.insertCell();
  
      cell1.innerHTML = level;
      cell2.innerHTML = examDegree;
      cell3.innerHTML = schoolCollege;
      cell4.innerHTML = university;
      cell5.innerHTML = yearOfPassing;
      cell6.innerHTML = maxMarks;
      cell7.innerHTML = marksObtained;
      cell8.innerHTML = percentage;
      cell9.innerHTML = division;
      cell10.innerHTML = achievement;
      cell11.innerHTML =
        '<button>Edit</button> <button>Delete</button>';
  
      // Store the facultyId as a data attribute in the row
      newRow.dataset.facultyId = document.getElementById("facultyID").value;
  
      // Clear input fields after adding a row
      form.reset();
    }
  
    // Function to delete a row
    function deleteRow(button) {
      var row = button.parentNode.parentNode;
      row.parentNode.removeChild(row);
    }
  
    // Function to edit a row
    function editRow(button) {
      var row = button.parentNode.parentNode;
  
      // Get the values from the row and populate the input fields
      document.getElementById("level").value = row.cells[0].innerHTML;
      document.getElementById("exam").value = row.cells[1].innerHTML;
      document.getElementById("school").value = row.cells[2].innerHTML;
      document.getElementById("university").value = row.cells[3].innerHTML;
      document.getElementById("pass").value = row.cells[4].innerHTML;
      document.getElementById("maxmarks").value = row.cells[5].innerHTML;
      document.getElementById("obtmarks").value = row.cells[6].innerHTML;
      document.getElementById("percentage").value = row.cells[7].innerHTML;
      document.getElementById("division").value = row.cells[8].innerHTML;
      document.getElementById("achievement").value = row.cells[9].innerHTML;
  
      // Delete the row after editing
      deleteRow(button);
    }
  
    // Function to submit the form data to the server
    function submitForm() {
      var rows = table.rows;
      var data = [];
  
      // Iterate through each row in the table (excluding the header row)
      for (var i = 1; i < rows.length; i++) {
        var row = rows[i];
        var rowData = {
          facultyId: row.dataset.facultyId,
          level: row.cells[0].innerHTML,
          Exam_Degree: row.cells[1].innerHTML,
          School_College: row.cells[2].innerHTML,
          Board_Uni: row.cells[3].innerHTML,
          year_of_passing: row.cells[4].innerHTML,
          Max_marks_grades: row.cells[5].innerHTML,
          marks_grade_obtained: row.cells[6].innerHTML,
          percent_marks: row.cells[7].innerHTML,
          division: row.cells[8].innerHTML,
          achievement: row.cells[9].innerHTML
        };
  
        data.push(rowData);
      }
  
      // Make a POST request to the server with the form data
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "/qualification", true);
      xhr.setRequestHeader("Content-Type", "application/json");
  
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 304) {
            alert("Form submitted successfully!");
            table.innerHTML = ""; // Clear the table after submitting
            const ans=document.cookie.split("=")
            const facultyId=ans[1];
            window.location.href=`http://localhost:4000/user/${facultyId}/login`
          } else {
            alert("An error occurred while submitting the form.");
          }
        }
      };
  
      xhr.send(JSON.stringify(data));
    }
  
    // Retrieve facultyID from the URL and set it as the value of the hidden field
    getFacultyIdFromCookie();
  };
  
  function getFacultyIdFromCookie() {
    const cookieString = document.cookie;
    const cookieParts = cookieString.split("; ");
    for (var i = 0; i < cookieParts.length; i++) {
      var cookie = cookieParts[i].split("=");
      if (cookie[0] === "facultyId") {
        document.getElementById("facultyID").value = cookie[1];
        break;
      }
    }
  }
  