function _(id)
{
    return document.getElementById(id);
}

_("sendotp").onclick = function()
{
    var mobile = _("mobile").value;
    var request = new XMLHttpRequest();
    request.open("POST","php/otp.php",true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.onreadystatechange = function()
    {
        if(request.readyState == 4 && request.status == 200)
        {
            toastr.info('An OTP code has been sent your mobile..');
        }
    }
    request.send("to=" + mobile);
    
}
document.forms.passwdreset.onsubmit = function(e)
{
    e.preventDefault();
    if(_('mobile').value == "" || _('otp').value == "" || _('password').value == "" || _('cpassword').value == "")
    {
        toastr.error("Please Fill All the Fields..");
    }
    else if(_("otp").value == "")
    {
        toastr.error("Verify Your Mobile Number..");
    }
    else if(_("password").value != _("cpassword").value)
    {
        toastr.error("Password and Confirm Password Not Matched..");
    }
    else
    {
        var request = new XMLHttpRequest();
        request.open("POST","php/password_reset.php",true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.onreadystatechange = function()
        {
            if(request.readyState == 4 && request.status == 200)
            {
                var result = request.responseText;
                if(result == "SUCCESS")
                {
                    toastr.success("Password Update Success. Redirecting to Login...");
                    setTimeout(() => {window.location.replace("login.php"); }, 3000);
                }
                else if(result == "FAILED")
                {
                    toastr.error("Password Update Failed. Please Contact Site Admin..");
                }
                else if(result == "OTPERR")
                {
                    toastr.error("Invalid OTP Code. Aborting..");
                }
                else
                {
                    toastr.error("response was : " + request.responseText);
                    grecaptcha.reset();
                }
            }
        }
        request.send("username=" + _("mobile").value + "&otp=" + _("otp").value + "&password=" + _("password").value); 
    }
}

