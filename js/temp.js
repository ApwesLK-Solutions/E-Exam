document.body.onload = function()
{

}

function load_grades()
{
    var request = new XMLHttpRequest();
    request.open("POST","php/get_grades.php",true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.onreadystatechange = function()
    {
        if(request.readyState == 4 && request.status == 200)
        {
            var result = JSON.parse(request.responseText);

        }
    }
    request.send();
}