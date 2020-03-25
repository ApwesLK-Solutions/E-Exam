function _(id)
{
    return document.getElementById(id);
}

//Register
document.forms.regform.onsubmit = function(e)
{
    e.preventDefault();
    if(_('name').value == "" || _('mobile').value == "" || _('otp').value == "" || _('password').value == "" || _('cpassword').value == "")
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
    else if((grecaptcha.getResponse() == "") || verifyCaptcha() == false)
    {
        toastr.error("Please Complete the Captcha..");
    }
    else
    {
        var request = new XMLHttpRequest();
        request.open("POST","php/add_user.php",true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.onreadystatechange = function()
        {
            if(request.readyState == 4 && request.status == 200)
            {
                var result = request.responseText;
                if(result == "SUCCESS")
                {
                    toastr.success("You Have Been Registered. Redirecting to Login...");
                    setTimeout(() => {window.location.replace("login.php"); }, 3000);
                }
                else if(result == "ALRDEXI")
                {
                    toastr.error("You're Already Registered Member. Try Resetting your password..");
                    grecaptcha.reset();
                }
                else if(result == "OTPERR")
                {
                    toastr.error("Invalid OTP Code. Aborting..");
                    grecaptcha.reset();
                }
                else if(result == "POSTERR")
                {
                    toastr.error("Bad Request Contact Site Admin..");
                    grecaptcha.reset();
                }
                else
                {
                    toastr.error("response was : " + request.responseText);
                    grecaptcha.reset();
                }
            }
        }
        request.send("name=" + _("name").value + "&mobile=" + _("mobile").value + "&password=" + _("password").value + "&otp=" + _("otp").value + "&type=2"); 
    }
    
}

//Send OTP
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


