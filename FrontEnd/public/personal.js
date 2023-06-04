//martial status

function handleChange(that) {
  if (that.value === "Married") {
    document.querySelector(
      ".ifYes"
    ).innerHTML = `<input class="ifYes" type="text" id="spouse_name" name="spouseName" placeholder="Spouse Name" />`;
  } else {
    document.querySelector(".ifYes").innerHTML = "";
  }
}

//present Address-permanent Address

const houseNo = document.getElementById("HouseNo")
const streetLocality = document.getElementById("StreetLocality")
const city = document.getElementById("City")
const state = document.getElementById("State")
const country = document.getElementById("country")
const pincode = document.getElementById("pincode")

const checkedd = document.getElementById("filladdress");
checkedd.addEventListener("click", function (e) {
  console.log("clicked");
  if (checkedd.checked === true) {
    console.log(houseNo)
    document.getElementById("HouseNoD").value = houseNo.value;
    document.getElementById("StreetLocalityD").value = streetLocality.value;
    document.getElementById("CityD").value = city.value;
    document.getElementById("StateD").value = state.value;
    document.getElementById("countryD").value = country.value;
    document.getElementById("pincodeD").value = pincode.value;
  } else if (checkedd.checked === false) {
   document.getElementById("HouseNoD").value = ""
   document.getElementById("StreetLocalityD").value = ""
   document.getElementById("CityD").value = ""
    document.getElementById("StateD").value = ""
    document.getElementById("countryD").value = "";
    document.getElementById("pincodeD").value = "";
  }
});

//Hr isLeft

const hr = document.querySelector(".left");
const insert = document.querySelector(".insert");

hr.addEventListener("click", function (e) {
  if (e.target.value == "Yes") {
    insert.innerHTML = `<input class="hr" type="text" name="dateOfRelieving" placeholder="Date of Relieving"/>`;
  } else {
    insert.innerHTML = "";
  }
});


function getFacultyIdFromCookie() {
 const cookiestring= document.cookie
 const ans=cookiestring.split("=")
  var facultyId =ans[1]

  document.getElementById("facultyID").value=facultyId;
  
}





  // Retrieve facultyID from the URL and set it as the value of the hidden field
  window.addEventListener('load', getFacultyIdFromCookie);

