function verifyCaptcha()
{
    var cresponse = grecaptcha.getResponse();
    var request = new XMLHttpRequest();
    request.open("POST","php/proxy.php",true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.onreadystatechange = function()
    {
        if(request.readyState == 4 && request.status == 200)
        {
            var result = JSON.parse(request.responseText);
            console.log(result);
            return result.success;
            
        }
    }
    request.send("response=" + cresponse);
}