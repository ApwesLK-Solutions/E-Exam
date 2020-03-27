function _(id)
{
    return document.getElementById(id);
}

document.body.onload = function()
{
    load_grades();
    load_subjects();
    load_institutes();
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

function load_institutes()
{
    var request = new XMLHttpRequest();
    request.open("POST","../php/get_institutes.php",true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.onreadystatechange = function()
    {
        if(request.readyState == 4 && request.status == 200)
        {
            var selector = _('institute');
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

//Add class 
document.forms.add_class.onsubmit = function(e)
{
    e.preventDefault();
    if(_('grade').value == "" || _('subject').value == "" || _('institute').value == "" || _('description').value == "" || _('enroll').value == "")
    {
        toastr.error("Please Fill All the Fields..");
    }
    else if(_("description").value == "")
    {
        toastr.error("please enter discription about class and subject");
    }
    else if(_("enroll").value == "")
    {
        toastr.error("Please enter enrollment key");
    }
    else
    {
        var ekeyvisible;
        if(_('public').checked)
        {
            ekeyvisible = 1;
        }
        else
        {
            ekeyvisible = 0;
        }
        var request = new XMLHttpRequest();
        request.open("POST","../php/teacher_add_class.php",true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.onreadystatechange = function()
        {
            if(request.readyState == 4 && request.status == 200)
            {
                var result = request.responseText;
                if(result == "SUCCESS")
                {
                    toastr.success("New Class Has Been Added..");
                }
                else if(result == "FAILED")
                {
                    toastr.error("New Class Addition Failed Error Was : " + request.responseText);
                    
                }
                
                else if(result == "POSTERR")
                {
                    toastr.error("Bad Request Contact Site Admin..");
                }
                else
                {
                    toastr.error("response was : " + request.responseText);
                }
            }
        }
        request.send("grade=" + _("grade").value + "&subject=" + _("subject").value + "&description=" + _("description").value + "&institute=" + _("institute").value + "&ekey=" + _("enroll").value + "&ekeyvisible=" + ekeyvisible); 
    }
}