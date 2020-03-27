
/*document.forms.add_class.onchange = function(e)
{
    e.preventDefault();

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
        request.open("POST","../php/teacher_update_class_enroll_key_visibility.php",true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.onreadystatechange = function()
        {
            if(request.readyState == 4 && request.status == 200)
            {
                var result = request.responseText;
                if(result == "SUCCESS")
                {
                    toastr.success("You have been successfully changed enrollment ey visibility..");
                }
                else if(result == "FAILED")
                {
                    toastr.error("Enrollment key visibility change failed..");
                    
                }
            }
        }
        request.send("ekeyvisible=" + ekeyvisible); 
    
}
*/

function update_visibility(e)
{
    console.log(e.value);
}