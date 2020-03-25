function _(id)
{
    return document.getElementById(id);
}

document.forms.login.onsubmit = function(e)
{
    e.preventDefault();
    if(_('username').value == "" || _('password').value == "")
    {
        toastr.error("Please Fill All the Fields..");
    }
    else
    {
        var request = new XMLHttpRequest();
        request.open("POST","php/login.php",true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.onreadystatechange = function()
        {
            if(request.readyState == 4 && request.status == 200)
            {
                var result = request.responseText;
                if(result == "ADMIN")
                {
                    toastr.success("Login Success. Redirecting to Admin Dashboard...");
                    setTimeout(() => {window.location.replace("admin_dashboard.php"); }, 3000);
                }
                else if(result == "STUDENT")
                {
                    toastr.success("Login Success. Redirecting to Student Dashboard...");
                    setTimeout(() => {window.location.replace("student_dashboard.php"); }, 3000);
                }
                else if(result == "TEACHER")
                {
                    toastr.success("Login Success. Redirecting to Teacher Dashboard...");
                    setTimeout(() => {window.location.replace("teacher_dashboard.php"); }, 3000);
                }
                else if(result == "POSTERR")
                {
                    toastr.error("Bad Request Contact Site Admin..");
                }
                else if(result == "NOUSER")
                {
                    toastr.error("Login Failed. User Doesnt Exists..");
                }
                else if(result == "CREDERR")
                {
                    toastr.error("Login Failed. Invalid Password..");
                }
                else if(result == "SESSERR")
                {
                    toastr.error("Login Failed. Error While Starting Session..");
                }
                else
                {
                    toastr.error("response was : " + request.responseText);
                }
            }
        }
        request.send("username=" + _("username").value + "&password=" + _("password").value); 
    }
}