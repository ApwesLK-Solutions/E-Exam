function send_notification(to,text)
{
    var request = new XMLHttpRequest();
    request.open("POST","../php/send_notification.php","true")
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    {
        if(request.readyState == 4 && request.status == 200)
        {
            console.log(request.responseText);
        }
    }
    request.send("to=" + to + "&text=" + text);
}

function receive_notification()
{
    setInterval(() => {
        var request = new XMLHttpRequest();
        request.open("POST","../php/receive_notification.php","true")
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        {
            if(request.readyState == 4 && request.status == 200)
            {
                console.log(JSON.parse(request.responseText));
            }
        }
        request.send();
    }, 5000);
}

document.addEventListener('load',function()
{
    receive();
});