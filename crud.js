function validateForm() {

    var name = document.getElementById("name").value;
    var dob = document.getElementById("dob").value;
    var address = document.getElementById("address").value;
    var email = document.getElementById("email").value;
    var salary = document.getElementById("salary").value;

    var myDate = new Date(dob);
    var myyear = myDate.getFullYear();
    var mymonth = myDate.getMonth();
    var mydate = myDate.getDate();

    var today = new Date();
    var nowyear = today.getFullYear();
    var nowmonth = today.getMonth();
    var nowdate = today.getDate();

    var age = nowyear - myyear;
    var age_month = nowmonth - mymonth;
    var age_date = nowdate - mydate;

    if (name == "") {
        document.getElementById("message_1").innerHTML = "name is required";
        return false;
    }
    else {
        document.getElementById("message_1").style.display = "none";
    }

    if (dob == "") {
        document.getElementById("message_2").innerHTML = "Date of Birth is required";
        return false;

    }
    else if (myDate > today) {
        // document.getElementById("message_2").innerHTML ="You cannot enter a date in Future....";
        alert("You cannot enter a date in Future.");
        return false;
    }
    else {
        document.getElementById("message_2").style.display = "none";
    }
    if (age > 70) {
        alert("you can not enter more than 70 year");
        return false
    }
    if (age_month < 0 || age_month == 0 && age_date < 0) {
        age = parseInt(age) - 1;
    }
    if ((age == 18 && age_month <= 0 && age_date <= 0 || age < 18)) {
        alert("You Cannot enter age less then 18");
        return false
    }

    if (address == "") {
        document.getElementById("message_3").innerHTML = "Address is required";
        return false;
    }
    else {
        document.getElementById("message_3").style.display = "none";
    }

    if (email == "") {
        document.getElementById("message_4").innerHTML = "Email is required";
        return false;
    }
    else if (!email.includes("@")) {
        // alert("Invalid email address");
        document.getElementById("message_4").innerHTML = "Invalid email address; Must Conatain @ ";
        return false;
    }
    else {
        document.getElementById("message_4").style.display = "none";
    }

    if (salary == "") {
        document.getElementById("message_5").innerHTML = "salary is required";
        return false;
    }

    if (isNaN(salary) || salary < 1) {
        document.getElementById("message_5").innerHTML = "please enter only Numeric Value (for Ex. 1200)";
        return false
    }
    else {
        document.getElementById("message_5").style.display = "none";
    }

    return true;
}

function showData() {
    var headerhtml = ""
    headerhtml += `<tr>`
    headerhtml += `<th>Id</th>`
    headerhtml += `<th><input type="checkbox" for="selectAll" id="check_box" onclick="selectAll(this)" /> Select All </th>`
    headerhtml += `<th>Name</th>`
    headerhtml += `<th>DOB</th>`
    headerhtml += `<th>address</th>`
    headerhtml += `<th>Emali</th>`
    headerhtml += `<th>Salary</th>`
    headerhtml += `<th>Action <button class="btn btn-danger" type="delete all" id="deleteall" onclick="deleteRow()"> Delete All Selected </button> </th>`
    headerhtml += `</tr>`

    setTimeout(() => {
        const table = document.querySelector("#crudTable thead")
        // console.log('table', table)
        if (table) {
            document.querySelector("#crudTable thead").innerHTML = headerhtml;
        }
    }, 2);

    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    }
    else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"))
    }

    var html = "";
    peopleList.forEach(function (element, index) {
        html += "<tr>"
        html += "<td>" + (index + 1) + "</td>";
        html += '<td><input type="checkbox" id = " ' +
            (index + 1) +
            '"class = "selected"> Select </input> </td>';

        html += "<td class='namevalue'>" + element.name + "</td>";
        html += "<td class='dobvalue'>" + element.dob + "</td>";
        html += "<td>" + element.address + "</td>";
        html += "<td class='emailvalue'>" + element.email + "</td>";
        html += "<td class='salaryvalue'>" + element.salary + "</td>";
        html += '<td class= "newbtn"> <button onclick="DeleteData(' +
            index +
            ')" class="btn btn-danger"> Delete </button><button onclick="UpdateData(' +
            index +
            ')" class=" btn btn-warning"> Edit </button></td>';
        html += "</tr>"
    });

    setTimeout(() => {
        const table = document.querySelector("#crudTable tbody")
        // console.log('table', table)
        if (table) {
            document.querySelector("#crudTable tbody").innerHTML = html;
        }
    }, 2);
}

document.onload = showData();

function AddData() {
    if (validateForm() == true) {
        let name = document.getElementById("name").value;
        var dob = document.getElementById("dob").value;
        var address = document.getElementById("address").value;
        var email = document.getElementById("email").value;
        var salary = document.getElementById("salary").value;

        var peopleList
        if (localStorage.getItem("peopleList") == null) {
            peopleList = [];
        }
        else {
            peopleList = JSON.parse(localStorage.getItem("peopleList"));
        }

        peopleList.push({
            name: name,
            dob: dob,
            address: address,
            email: email,
            salary: salary,
        });

        localStorage.setItem("peopleList", JSON.stringify
            (peopleList));
        showData()
        document.getElementById("name").value = ""
        document.getElementById("dob").value = ""
        document.getElementById("address").value = ""
        document.getElementById("email").value = ""
        document.getElementById("salary").value = ""
    }
}

function getSelectvalue() {
    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    }
    else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"))
    }

    let checkboxes = document.getElementsByName("getdata")
    // console.log(checkboxes)
    checkboxes = Array.from(checkboxes).map(function (checkBox) {
        if (checkBox.checked == true) {
            return checkBox.className
        }

        return null
    })
    checkboxes = checkboxes.filter(function (checkBox) {
        if (checkBox) {
            return true
        }
        console.log(checkboxes)
        return false
    })
    if (checkboxes.length == 0) {
        return showData()
    }
    var headerhtml = "";
    headerhtml += "<tr>"
    headerhtml += `<th>Id</th>`
    headerhtml += `<th><input type="checkbox" for="selectAll" id="check_box" onclick="selectAll(this)" /> Select All </th>`
    checkboxes.includes("Name") && (headerhtml += `<th>Name</th>`)
    checkboxes.includes("DOB") && (headerhtml += `<th>DOB</th>`)
    checkboxes.includes("Email") && (headerhtml += `<th>Emali</th>`)
    checkboxes.includes("Salary") && (headerhtml += `<th>Salary</th>`)
    headerhtml += `<th>Action <button class="btn btn-danger" type="delete all" id="deleteall" onclick="deleteRow()"> Delete All Selected </button> </th>`
    html += "</tr>"

    headerhtml += "</tr>"
    setTimeout(() => {
        const table = document.querySelector("#crudTable thead")
        // console.log('table', table)
        if (table) {
            document.querySelector("#crudTable thead").innerHTML = headerhtml;
        }

    }, 1);
    var html = "";
    peopleList.forEach(function (element,index) {
        html += "<tr>"
        html += "<td>" + (index + 1) + "</td>";
        html += '<td><input type="checkbox" id = " ' +
            (index + 1) +
            '"class = "selected"> Select </input> </td>';
        checkboxes.includes("Name") && (html += "<td class='namevalue'>" + element.name + "</td>");
        checkboxes.includes("DOB") && (html += "<td class='dobvalue'>" + element.dob + "</td>");
        checkboxes.includes("Email") && (html += "<td class='emailvalue'>" + element.email + "</td>");
        checkboxes.includes("Salary") && (html += "<td class='salaryvalue'>" + element.salary + "</td>");
        html += '<td class= "newbtn"> <button onclick="DeleteData(' +
            index +
            ')" class="btn btn-danger"> Delete </button><button onclick="UpdateData(' +
            index +
            ')" class=" btn btn-warning"> Edit </button></td>';
        html += "</tr>"
        html += "</tr>"
    });
    setTimeout(() => {
        const table = document.querySelector("#crudTable tbody")
        // console.log('table', table)
        if (table) {
            document.querySelector("#crudTable tbody").innerHTML = html;
        }

    }, 1);

}

function Searchdata() {
    let filter = document.getElementById("searchinput").value.toUpperCase();
    let myTable = document.getElementById("crudTable");
    let tr = myTable.getElementsByTagName("tr");
    // console.log(tr)

    for (let i = 0; i < tr.length; i++) {
        let Name = tr[i].getElementsByTagName("td")[2];
        let Email = tr[i].getElementsByTagName("td")[5];


        if (Name || Email) {
            let NameValue = Name.textContent || Name.innerHTML;
            let Emailvalue = Email.textContent || Email.innerHTML;
            if (NameValue.toUpperCase().indexOf(filter) > -1 || Emailvalue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = ""
                // console.log(emailvalue)
                // console.log(nameValue)
            }
            else {
                tr[i].style.display = "none"

            }
        }
    }

}

let expanded = true
function showCheckboxes() {

    let checkboxes =
        document.getElementById("checkBoxes");

    if (!expanded) {
        checkboxes.style.display = "block";
        expanded = true;
    } else {
        checkboxes.style.display = "none";
        expanded = false;
    }
}

function DeleteData(index) {
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    }
    else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"))
    }
    if (window.confirm("are you sure?")) {
        peopleList.splice(index, 1);
        localStorage.setItem("peopleList", JSON.stringify
            (peopleList));
        showData()
    }
}

function deleteRow() {
    let table = document.getElementById("crudTable");
    if (window.confirm("are you sure?")) {
        let ArreyToDelete = []
        // console.log(Array.from(table.rows));
        Array.from(table.rows).forEach((item, index) => {
            if ((index === 0)) {
                return;
            }
            let input = item.childNodes[1].childNodes[0];
            // console.log(input);
            if (input && input.checked) {
                ArreyToDelete.push(index - 1)
            }
        });
        let peopleList = JSON.parse(localStorage.getItem("peopleList"));
        peopleList = peopleList.filter(function (item, index) {
            return !ArreyToDelete.includes(index)
        })

        localStorage.setItem("peopleList", JSON.stringify(peopleList));
        showData();
    }
}

function selectAll() {
    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    }
    else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"))
    }
    var checkbox = document.getElementById("check_box")
    var checkboxes = document.getElementsByClassName("selected")
    if (checkbox.checked == true) {
        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = true;
        }
    }
    else {
        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = false;
        }
        localStorage.setItem("peopleList", JSON.stringify
            (peopleList));
        showData()
    }
}

function UpdateData(index) {
    document.getElementById("submit").style.display = "none";
    document.getElementById("update").style.display = "block";

    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    }
    else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    document.getElementById("name").value = peopleList[index].name;
    document.getElementById("dob").value = peopleList[index].dob;
    document.getElementById("address").value = peopleList[index].address;
    document.getElementById("email").value = peopleList[index].email;
    document.getElementById("salary").value = peopleList[index].salary;

    document.querySelector("#update").onclick = function () {
        if (validateForm() == true) {
            peopleList[index].name = document.getElementById("name").value;
            peopleList[index].dob = document.getElementById("dob").value;
            peopleList[index].address = document.getElementById("address").value;
            peopleList[index].email = document.getElementById("email").value;
            peopleList[index].salary = document.getElementById("salary").value;

            localStorage.setItem("peopleList", JSON.stringify
                (peopleList));
            showData()
            document.getElementById("name").value = ""
            document.getElementById("dob").value = ""
            document.getElementById("address").value = ""
            document.getElementById("email").value = ""
            document.getElementById("salary").value = ""
            document.getElementById("submit").style.display = "block";
            document.getElementById("update").style.display = "none";
        }
    }
}




// function getSelectvalue() {

//      selectValue = document.getElementById("list");

//     if (selectValue) {
//         selectValue = selectValue.value
//         document.getElementById('crudTable').style.display = ""
//     }

//     console.log(selectValue)

//     var peopleList;
//     if (localStorage.getItem("peopleList") == null) {
//         peopleList = [];
//     }
//     else {
//         peopleList = JSON.parse(localStorage.getItem("peopleList"))
//     }

//     var headerhtml = "";
//     selectValue == (headerhtml += "<tr>")
//     selectValue == "Name" && (headerhtml += `<th>Name</th>`)
//     selectValue === "DOB" && (headerhtml += `<th>DOB</th>`)
//     selectValue === "Email" && (headerhtml += `<th>Emali</th>`)
//     selectValue === "Salary" && (headerhtml += `<th>Salary</th>`)
//     selectValue == (headerhtml += "</tr>")
//     setTimeout(() => {
//         const table = document.querySelector("#crudTable thead")
//         // console.log('table', table)
//         if (table) {
//             document.querySelector("#crudTable thead").innerHTML = headerhtml;
//         }
//     }, 1);
//     var html = "";
//     peopleList.forEach(function (element) {
//         selectValue == (html += "<tr>")
//         selectValue == "Name" && (html += "<td class='namevalue'>" + element.name + "</td>");
//         selectValue == "DOB" && (html += "<td class='dobvalue'>" + element.dob + "</td>");
//         selectValue == "Email" && (html += "<td class='emailvalue'>" + element.email + "</td>");
//         selectValue == "Salary" && (html += "<td class='salaryvalue'>" + element.salary + "</td>");
//         selectValue == (html += "</tr>")
//     });
//     setTimeout(() => {
//         const table = document.querySelector("#crudTable tbody")
//         // console.log('table', table)
//         if (table) {
//             document.querySelector("#crudTable tbody").innerHTML = html;
//         }
//     }, 1);

// };