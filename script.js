//Global variables
var subject_count = 1;
var semester_row_count = 1;
var semester_count = 1;

function addSubject(){

    var table_body = document.getElementById("grade-table-body");
    var new_subject = document.createElement("tr");

    //Increase the subject count
    subject_count++;

    //Assign unique id to new row
    new_subject.id = 'subject-row-' + subject_count;

    //Add new subject to the table
    new_subject.innerHTML = 
        '<th scope="row">' + subject_count + '</th>'+
        '<td><input type="text" class="form-control subject-name" id="" placeholder="Enter Subject Name here..."></td>'+
        '<td>'+
            '<select class="form-control credit-hour-input" id="">' +
                '<option value="">--Select Subject\'s Credit hour--</option>' +
                '<option value="2">2</option>' +
                '<option value="3">3</option>' +
                '<option value="4">4</option>' +
                '<option value="5">5</option>' +
                '<option value="6">6</option>' +
            '</select>' +
        '</td>'+

        '<td>' +
            '<select class="form-control subject-grade-input" id="">' +
                '<option value="">--Select Subject\'s Grade--</option>'+
                '<option value="4.00">A</option>'+
                '<option value="3.75">A-</option>'+
                '<option value="3.50">B+</option>'+
                '<option value="3.00">B</option>'+
                '<option value="2.75">B-</option>'+
                '<option value="2.50">C+</option>'+
                '<option value="2.00">C</option>'+
                '<option value="1.75">C-</option>' +
                '<option value="1.00">D</option>' +
                '<option value="0.00">F</option>'+
            '</select>'+
        '</td>'+

        '<td>'+
            '<button class="btn btn-danger" onclick="removeSubject(' + "'" + 'subject-row-' + subject_count + "'" + ')"><i class="fas fa-trash"></i> Remove Subject</button>' +
        '</td>';

    table_body.appendChild(new_subject);
}

function removeSubject(row_id){
    var row = document.getElementById(row_id);

    //Remove row
    row.remove();
}

function calculateGPA(){
    var credit_hours = document.getElementsByClassName("credit-hour-input");
    var subject_grade = document.getElementsByClassName("subject-grade-input");
    var gpa_results = document.getElementById("gpa-results");
    

    if(gpaValidator()){
        //Clear previous results
        gpa_results.innerHTML = "";

        var quality_point = 0;
        var total_credit_hours = 0;

        for(var i = 0; i < credit_hours.length; i++){

            //Get the quality point
            quality_point = quality_point + (parseInt(credit_hours[i].value) * parseFloat(subject_grade[i].value));

            //Get the credit hours
            total_credit_hours = total_credit_hours + parseInt(credit_hours[i].value);
        }

        var results = parseFloat(quality_point / total_credit_hours).toFixed(4)

        if(results >= 2){
            gpa_results.innerHTML = "<span class='text-success'>Results: " + results + " GPA</span>";
        }
        else{
            gpa_results.innerHTML = "<span class='text-danger'>Results: " + results + " GPA</span>";
        }

    }
}

function addSemester(){
    var table_body = document.getElementById("cgpa-grade-table");
    var new_semester = document.createElement("tr");

    //Increase the semester count
    semester_count++;
    semester_row_count++;

    //Assign unique id to new row
    new_semester.id = 'semester-row-' + semester_row_count;

    //Add new subject to the table
    new_semester.innerHTML = 
        '<th scope="row">' + semester_row_count + '</th>'+

        '<td> Year ' + getSemesterYear(semester_count) + " Semester " + getSemesterAfterYear(semester_count) + '</td>'+

        '<td>' + 
            '<input type="number" class="form-control cgpa-credit-input" placeholder="Semester\'s total credit hours" id="cgpa-credit-' + semester_row_count + '" oninput="cgpaCreditHourValidator(this.id)">' +
        '</td>' +

        '<td>' +
            '<input type="number" class="form-control cgpa-gpa-input" placeholder="Semester\'s GPA" id="cgpa-gpa-' + semester_row_count + '" oninput="cgpaGpaValidator(this.id)">' +
        '</td>' +

        '<td>'+
            '<button class="btn btn-danger" onclick="removeSemester(' + "'" + 'semester-row-' + semester_row_count + "'" + ')"><i class="fas fa-trash"></i> Remove Subject</button>' +
        '</td>';

    table_body.appendChild(new_semester);
}

function removeSemester(row_id){
    var row = document.getElementById(row_id);

    //Remove row
    row.remove();

    //Decrease semester count
    semester_count--;
}

function calculateCGPA(){
    var total_credit_hours = document.getElementsByClassName("cgpa-credit-input");
    var gpa_input = document.getElementsByClassName("cgpa-gpa-input");
    var cgpa_results = document.getElementById("cgpa-results");
    

    if(cgpaValidator()){
        //Clear previous results
        cgpa_results.innerHTML = "";

        var cgpa = 0;
        var grand_total_credit_hours = 0;

        for(var i = 0; i < total_credit_hours.length; i++){

            //Get the quality point
            cgpa = cgpa + (parseInt(total_credit_hours[i].value) * parseFloat(gpa_input[i].value));

            //Get the total credit hours
            grand_total_credit_hours = grand_total_credit_hours + parseInt(total_credit_hours[i].value);
        }

        var results = parseFloat(cgpa / grand_total_credit_hours).toFixed(4);

        if(results >= 2){
            cgpa_results.innerHTML = "<span class='text-success'>Results: " + results + " CGPA</span>";
        }
        else{
            cgpa_results.innerHTML = "<span class='text-danger'>Results: " + results + " CGPA</span>";
        }
       
    }
}

function gpaValidator(){
    var credit_hours = document.getElementsByClassName("credit-hour-input");
    var subject_grade = document.getElementsByClassName("subject-grade-input");
    var error = document.getElementById("gpa-error");

    for(var i = 0; i < credit_hours.length; i++){

        if(credit_hours[i].value.trim().length == 0 || subject_grade[i].value.trim().length == 0){

            //Display error message
            error.innerHTML = "Credit hours and Subject's grade are required!";
            return false;
        }
    }

    //Remove error message
    error.innerHTML = "";
    return true;
}

function cgpaValidator(){
    var total_credit_hours = document.getElementsByClassName("cgpa-credit-input");
    var gpa_input = document.getElementsByClassName("cgpa-gpa-input");
    var error = document.getElementById("cgpa-error");

    for(var i = 0; i < total_credit_hours.length; i++){

        if(total_credit_hours[i].value.trim().length == 0 || gpa_input[i].value.trim().length == 0){

            //Display error message
            error.innerHTML = "Semester's Total Credit Hours and Semester's GPA are required!";
            return false;
        }
    }

    //Remove error message
    error.innerHTML = "";
    return true;
}

function cgpaCreditHourValidator(id){

    var credit_hour = document.getElementById(id);

    if(parseInt(credit_hour.value) > 35){

        //Reassign 35 to the input
        credit_hour.value = 35;
    }

    //Check if there is decimal point
    if(credit_hour.value.includes(".")){
        credit_hour.value = credit_hour.value.replace(".", "");
    }

    //Check the imput length
    if(credit_hour.value.trim().length > 2){
        credit_hour.value = credit_hour.value.substring(0, 2);
    }

    //Check if the negative number is being enter
    if(parseInt(credit_hour.value) < 1){
        credit_hour.value = 1;
    }

}

function cgpaGpaValidator(id){

    var gpa = document.getElementById(id);

    if(parseFloat(gpa.value) > 4){

        //Reassign 35 to the input
        gpa.value = "4.0000";
    }

    if(gpa.value.trim().length > 6){
        gpa.value = gpa.value.substring(0, 6);
    }

    //Check if the negative number is being enter
    if(parseFloat(gpa.value) < 0){
        gpa.value = "0.0000";
    }

}

function getSemesterYear(semester){
    
    var year = 1;

    while(semester > 3){

        //Decrease semester and add year
        semester = semester - 3;
        year++;
    }

    return year;
}

function getSemesterAfterYear(semester){

    while(semester > 3){
        semester = semester - 3;
    }

    return semester;
}