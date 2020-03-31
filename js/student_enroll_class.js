function _(id)
{
    return document.getElementById(id);
}

document.body.onload = function()
{
    load_grades();
    load_subjects();
    load_teacher();
}
function load_grades()
{
    var request = new XMLHttpRequest();
    request.open("POST","../php/get_grades.php",true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.onreadystatechange = function()
    {
        if(request.readyState == 4 && request.status == 200)
        {
            var selector = _('grade');
            var result = JSON.parse(request.responseText);
            for(i = 0 ; i < result.length ; ++i)
            {
                var opt = document.createElement('option');
                opt.value = result[i].id;
                opt.innerHTML = result[i].name;
                selector.appendChild(opt);
            }
        }
    }
    request.send();
}

function load_subjects()
{
    var request = new XMLHttpRequest();
    request.open("POST","../php/get_subjects.php",true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.onreadystatechange = function()
    {
        if(request.readyState == 4 && request.status == 200)
        {
            var selector = _('subject');
            var result = JSON.parse(request.responseText);
            for(i = 0 ; i < result.length ; ++i)
            {
                var opt = document.createElement('option');
                opt.value = result[i].id;
                opt.innerHTML = result[i].name;
                selector.appendChild(opt);
            }
        }
    }
    request.send();
}

function load_teacher()
{
    var request = new XMLHttpRequest();
    request.open("POST","../php/get_user.php",true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.onreadystatechange = function()
    {
        if(request.readyState == 4 && request.status == 200)
        {
            var selector = _('teacher');
            var result = JSON.parse(request.responseText);
            for(i = 0 ; i < result.length ; ++i)
            {
                var opt = document.createElement('option');
                opt.value = result[i].id;
                opt.innerHTML = result[i].name;
                selector.appendChild(opt);
            }
        }
    }
    request.send("type=2");
}

document.forms.filter_class.onsubmit = function(e)
{
    e.preventDefault();
    function student_filter_class()
    {
        var grade = _("grade").value;
        var subject = _("subject").value;
        var teacher = _("teacher").value;
        var classes = _("classes");

        classes.innerHTML = "";
        var html = "<div class='col-md-4'><div class='card card-widget widget-user'><div class='widget-user-header bg-warning'><h3 class='widget-user-username'>{{NAME}}</h3><h5 class='widget-user-desc mb-0 text-bold'>{{SUBJECT}}</h5><h6 class='widget-user-desc '>{{INSTITUTE}}</h6></div><div class='widget-user-image mt-3'><img class='img-circle elevation-2' src='../img/user1-128x128.jpg' alt='User Avatar'></div><div class='card-footer'><div class='row'><div class='col-sm-4 border-right border-bottom'><div class='description-block'><h5 class='description-header'>4</h5><span class='description-text'>Institute</span></div></div><div class='col-sm-4 border-right border-bottom'><div class='description-block'><h5 class='description-header'>13,000</h5><span class='description-text'>Students</span></div></div><div class='col-sm-4 border-bottom'><div class='description-block'><h5 class='description-header'>35</h5><span class='description-text'>Units</span></div></div><div class='col-sm-12'><div class='description-block'><divclass='text-center'><button id='{{ID}}' class='btn btn-warning' data-toggle='modal' data-target='#modal-success'><i class='fa fa-heart' ></i> Enroll Now</button></div></div></div></div></div></div></div>";
        if(grade === "" && subject=== "")
        {
            toastr.error("please Select at least grade and subject to get optimum results..");
        }
        else
        {
            var request = new XMLHttpRequest();
            request.open("POST","../php/student_get_classes_to_enroll.php",true);
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            request.onreadystatechange = function()
            {
                if(request.readyState == 4 && request.status == 200)
                {
                    var result = JSON.parse(request.responseText);
                    
                    console.log("subject : " + subject);
                    console.log("grade : " + grade);
                    console.log("teacher: " + teacher);
                    console.log(result);
                    for(var i = 0 ; i < result.length ; ++i)
                    {
                        var box = html;
                        box = box.replace("{{NAME}}" , result[i].NAME);
                        box = box.replace("{{SUBJECT}}" , result[i].SUBJECT);
                        box = box.replace("{{INSTITUTE}}" , result[i].INSTITUTE);
                        box = box.replace("{{ID}}" , result[i].ID);
                        classes.innerHTML += box;
                    }
                }
            }
            if(teacher == "")
            {
                request.send("grade=" + grade + "&subject=" + subject);
            }
            else
            {
                request.send("grade=" + grade + "&subject=" + subject + "&teacher=" + teacher);
            }
        }
    }
}

function ready_enroll_class(element)
{
    var id = element.id;
    _("cid").value = id;
    alert(_("cid").value);
}

document.forms.enroll.onsubmit = function(e)
{
    e.preventDefault();
    var cid = _("cid").value;
    var enroll_key =_("enroll_key").value;

    var request = new XMLHttpRequest();
    request.open("POST","php/student_enroll_class.php",true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.onreadystatechange = function()
    {
        if(request.readyState == 4 && request.status == 200)
        {
            var result = request.responseText;
            if(result == "SUCCESS")
            {
                toastr.success("You Have Been Successfully Enrolled to Class..");
                setTimeout(() => {location.reload(); }, 3000);
            }
            else if(result == "NOTEQ")
            {
                toastr.error("You're Already Registered Member. Try Resetting your password..");
            }
            
            else
            {
                toastr.error("response was : " + request.responseText);
            }
        }
    }
    request.send("id=" +cid + "&enroll_key=" + enroll_key); 
    
}
