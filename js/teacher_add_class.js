function _(id)
{
    return document.getElementById(id);
}

//load grades to js
function grade_load()
{
    $('#grade').select2({
        ajax: {
            type: 'post',
            url: '../php/get_grades.php',
            dataType: 'json',
            data: function () {
                return {
                    json: JSON.stringify(json),
                    
                    delay: 0.1
                };
            },
            processResults: function (data) {
                return {
                    results: $.map(data, function(obj) {
                        return { id: obj.ime, text: obj.ime };
                    })
                };
            }
        }
    });
}

