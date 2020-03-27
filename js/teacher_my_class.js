function _(id)
{
    return document.getElementById(id);
}


function update_visibility(e)
{
    if(document.readyState == 4)
    {
        var class_id = e.value;
        var status;
        if(e.checked)
        {
            status = 1;
        }
        else
        {
            status = 0;
        }
        var request = new XMLHttpRequest();
        request.open("POST","../php/teacher_update_class_enroll_key_visibility.php",true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.onreadystatechange = function()
        {
            if(request.readyState == 4 && request.status == 200)
            {
                var result = request.responseText;
                if(result == "SUCCESS")
                {
                    toastr.success("You have been successfully changed enrollment key visibility..");
                }
                else if(result == "FAILED")
                {
                    toastr.error("Enrollment key visibility change failed..");
                    if(status == 1)
                    {
                        e.checked = false;
                    }
                    else
                    {
                        e.checked = true;
                    }
                }
            }
        }
        request.send("id=" + class_id + "&visibility=" + status); 
    }
    else
    {
        alert('This dont give a fuck')
    }
}



