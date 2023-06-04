window.onload = function() {
    var addRowButton = document.getElementById("addRow");
    var submitButton = document.getElementById("submit");
    var form = document.querySelector("form.frm");
    var table = document.getElementById("data");
  
    // Get the facultyId from the hidden input field
    var facultyId = document.getElementById("facultyID").value;
  
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
  
      var orgName = document.getElementById("Organization_Name").value
    var designation = document.getElementById('Designation').value
    var dateofJoin = document.getElementById('Date_of_Joining').value
    var dateofRel = document.getElementById('Date_of_Relieving').value
    var payScale= document.getElementById('Pay_Scale').value
    var jobProfile = document.getElementById('Job_Profile').value
    var reasonforLeaving = document.getElementById('Reason_for_Leaving').value
    var lastSalary = document.getElementById('Last_Salary_Drawn').value
  
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
  
      cell1.innerHTML = orgName;
      cell2.innerHTML = designation;
      cell3.innerHTML = dateofJoin;
      cell4.innerHTML = dateofRel;
      cell5.innerHTML = payScale;
      cell6.innerHTML = jobProfile;
      cell7.innerHTML = reasonforLeaving;
      cell8.innerHTML = lastSalary;
      cell9.innerHTML =
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
      document.getElementById("Organization_Name").value = row.cells[0].innerHTML;
      document.getElementById("Designation").value = row.cells[1].innerHTML;
      document.getElementById("Date_of_Joining").value = row.cells[2].innerHTML;
      document.getElementById("Date_of_Relieving").value = row.cells[3].innerHTML;
      document.getElementById("Pay_Scale").value = row.cells[4].innerHTML;
      document.getElementById("Job_Profile").value = row.cells[5].innerHTML;
      document.getElementById("Reason_for_Leaving").value = row.cells[6].innerHTML;
      document.getElementById("Last_Salary_Drawn").value = row.cells[7].innerHTML;
  
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
          orgName: row.cells[0].innerHTML,
          designation: row.cells[1].innerHTML,
          dateofJoin: row.cells[2].innerHTML,
          dateofRel: row.cells[3].innerHTML,
          payScale: row.cells[4].innerHTML,
          jobProfile: row.cells[5].innerHTML,
          reasonforLeaving: row.cells[6].innerHTML,
          lastSalary: row.cells[7].innerHTML,
        };
  
        data.push(rowData);
      }
  
      // Make a POST request to the server with the form data
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "/experience", true);
      xhr.setRequestHeader("Content-Type", "application/json");
  
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status ===304) {
            alert("Form submitted successfully!");
            window.location.href="http://localhost:4000/phd"
            table.innerHTML = ""; // Clear the table after submitting
          } else {
            alert("An error occurred while submitting the form.");
          }
        }
      };
  
      xhr.send(JSON.stringify(data));
    }
    getFacultyIdFromCookie();
  };

  
     // Retrieve facultyID from the URL and set it as the value of the hidden field
     function getFacultyIdFromCookie() {
        console.log("hi")
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