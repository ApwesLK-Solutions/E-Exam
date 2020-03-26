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