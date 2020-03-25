function verifyCaptcha()
{
    var cresponse = grecaptcha.getResponse();
    var request = new XMLHttpRequest();
    request.open("POST","https://www.google.com/recaptcha/api/siteverify",true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.onreadystatechange = function()
    {
        if(request.readyState == 4 && request.status == 200)
        {
            var result = JSON.parse(request.responseText);
            return result.success;
        }
    }
    request.send("secret=6LcK1eMUAAAAAFxR07yHXQFoEwyDoOwuL9rdpB8u" + "&response=" + cresponse );
}