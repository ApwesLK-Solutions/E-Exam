function _(id)
{
    return document.getElementById(id);
}

document.body.onload = function()
{
    load_grades();
    load_subjects();
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

function student_filter_class()
{
    var grade = _("grade").value;
    var subject = _("subject").value;
    var teacher = _("teacher").value;

    if(grade === "" && subject=== "" || teacher== "")
    {
        toastr.error("please Select at least grade and subject to get optimum results..");
    }
    else
    {
        var request = new XMLHttpRequest();
        request.open("POST","../php/get_subjects.php",true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.onreadystatechange = function()
        {
            if(request.readyState == 4 && request.status == 200)
            {
                
                
                
            }
        }
        request.send("grade=" + grade + "&subject=" + subject + "&teacher=" + teacher);
    }
}