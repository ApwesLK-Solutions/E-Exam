function _(id)
{
    return document.getElementById(id);
}


function update_visibility(e)
{
    if(document.readyState == "complete")
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
}

//prepare update class info
function prepare_update_class(element)
{
    var cid = element.id;
    _('cid').value = cid;
    var description = _('description');
    var Enrollment =_('enroll');

    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function()
    {
        if(this.readyState == 4 && this.status == 200)
        { 
            var retval = JSON.parse(ajax.responseText);
            //console.log(retval);
            //console.log(ajax.responseText);
            var text = retval[0].description;
            $('#description').summernote('code',text);
            Enrollment.value = retval[0].enroll_key;
        }
    }
    ajax.open("POST", "../php/teacher_get_class_to_update.php",true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send("id="+cid);
}


//update class info
document.forms.update_class.onsubmit = function(e)
{
    e.preventDefault();
    if( _('description').value == "" || _('enroll').value == "")
    {
        toastr.error("Please Fill All the Fields..");
    }
    else if(_("cid").value == "")
    {
        toastr.error("Data not Loaded correctly. Please reload the page..");
    }
    else if(_("description").value == "")
    {
        toastr.error("please enter discription about class and subject..");
    }
    else if(_("enroll").value == "")
    {
        toastr.error("Please enter enrollment key..");
    }
    
    else
    {
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
        request.open("POST","../php/teacher_update_my_class.php",true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.onreadystatechange = function()
        {
            if(request.readyState == 4 && request.status == 200)
            {
                var result = request.responseText;
                if(result == "SUCCESS")
                {
                    toastr.success("Class info updated successfully..");
                    setTimeout(() => {location.reload(); }, 2000);
                }
                else if(result == "FAILED")
                {
                    toastr.error("class info update Failed Error Was : " + request.responseText);
                    
                }
                
                else if(result == "POSTERR")
                {
                    toastr.error("Bad Request Contact Site Admin..");
                }
                else
                {
                    toastr.error("response was : " + request.responseText);
                }
            }
        }
        request.send("id=" + _("cid").value + "&description=" + _("description").value + "&ekey=" + _("enroll").value + "&ekeyvisible=" + ekeyvisible); 
    }
}

function delete_class(element)
{
    var cid = element.id;
    
}
