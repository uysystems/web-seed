﻿'use strict';

/**validation section @zubayer */

//validate form @zubayer
function validate_form(formSelector) {
    $('.error_message').remove();
    var validate_fields = $( formSelector + " :input");

    //fields loop
    $.each(validate_fields, function (index, val) {
        var cur_fields = $( formSelector + " [name='" + val.name + "']");
        var validate_rules = val.dataset.validate;
        if (validate_rules != undefined) {
            var val_rules = JSON.parse(validate_rules);
            //rules loop
            $.each(val_rules, function (ind, val) {
                //rule wise loop
                $.each(val, function (rule_name, options) {
                    //message an otpions
                    var data_to_pass = null;
                    var message_to_show = null;
                    $.each(options, function (data_ind, data_val) {
                        message_to_show = data_val.message;
                        if (data_val.options != undefined) {
                            data_to_pass = data_val.options;
                        }
                    });

                    //check
                 
                    var field_value = $(cur_fields).val();
                    
                    var rule_status = validation[rule_name](field_value, formSelector, data_to_pass);
                    if (rule_status == false) {
                        $(cur_fields).addClass('error');
                        $(cur_fields).addClass(rule_name);
                        $("<div class='error_message'>" + message_to_show + "</div>").insertAfter(cur_fields);
                    } else {
                        $(cur_fields).removeClass('error');
                        $(cur_fields).removeClass(rule_name);
                    }
                });
            });
        }
    });

return is_form_valid(formSelector);
/*
  if(is_form_valid(formSelector) == false){
	$(formSelector).submit();
	
	}else{
		return false;
	}*/
}

//is_form_validate @zubayer
function is_form_valid(formSelector) {
    var error = true;
    var validate_fields = $(formSelector + " :input");
    $.each(validate_fields, function (index, val) {
        var cur_field_status = $(formSelector+ " [name='" + val.name + "']").hasClass('error');
        if (cur_field_status == true) {
            error = false;
        }
    });
    return error;
}

/* validation rules and defination @zubayer */
var validation = new Array();

//not_empty @zubayer
validation['not_empty'] = function (data) {
    if (data == undefined) {
        return false;
    } else if (data == '') {
        return false;
    } else if (data == null) {
        return false;
    }
    return true;
}
//email @zubayer
validation['email'] = function (data) {
	var first_char = data.substr(0,1);
	if(first_char == '.' || first_char == '-' || first_char == '_'){
		return false;
	}
    var email_pattern = /^[a-zA-Z0-9-._]+@[a-zA-Z0-9-_]+?\.[a-zA-Z]{2,3}$/;
    if (data.match(email_pattern) == null) {
        return false
    }
    return true;
}
//integer @zubayer
validation['integer'] = function (data) {
    var integer_pattern = /^[0-9]+$/; //^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (data.match(integer_pattern) == null) {
        return false
    }
    return true;
}

//integer@zubayer
validation['compair_with'] = function (data, form_id, options) {

    var com_val = $(form_id + " [name='" + options[0].compair_field + "']").val();

    if (com_val != data) {
        return false;
    }
    return true;

}



//unique email @zubayer
validation['unique'] = function (data, options) {
    getJson(data, options[0].url, function (data) {
        if (data != '+ok') {
            return false;
        }
    });
    return true;
}

// floating @ belal
validation['floating'] = function (data) {
    var floting_pattern = /^[^-/0a-zA-Z][0-9]*(?:\.[0-9]+)?$/;
    if (data.match(floting_pattern) == null) {
        return false;
    }
    return true;
}

