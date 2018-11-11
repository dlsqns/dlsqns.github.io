
/*
 * Element Ȯ���� Check
 * ex : checkFile(name,val)
 * @return : 
 */
function checkFile(name,val) {
	var fileName = "";
	
	if (fileName == val) {
		return false;
		
	} else {
		var thumbext = val; //������ �߰��� input �ڽ��� ��
		thumbext = thumbext.slice(thumbext.indexOf(".") + 1).toLowerCase(); //���� Ȯ���ڸ� �߶󳻰�, �񱳸� ���� �ҹ��ڷ� ����ϴ�.

		if(thumbext == "jpg" || thumbext == "png" ||  thumbext == "gif"){ //Ȯ���ڸ� Ȯ���մϴ�.
			fileName = val;
			return true;
		} else {
			alert('�̹��� ����(jpg, png, gif)�� ��� �����մϴ�.');
			if ($.browser.msie) {
			    $("#"+fileName).replaceWith( $("#"+fileName).clone(true) );
			} else {
			    $("#"+fileName).val('');
			}
			return false;
		}
	}
}

//Ȯ���� ��Ʈ��
function checkimg(val, id) {
	var thumbext = val; //������ �߰��� input �ڽ��� ��
	thumbext = thumbext.slice(thumbext.indexOf(".") + 1).toLowerCase(); //���� Ȯ���ڸ� �߶󳻰�, �񱳸� ���� �ҹ��ڷ� ����ϴ�.

	if(thumbext == "jpg" || thumbext == "png" ||  thumbext == "gif"){ //Ȯ���ڸ� Ȯ���մϴ�.
			return true;
	} else {
		alert('�̹��� ����(jpg, png, gif, bmp)�� ��� �����մϴ�.');
		if ($.browser.msie) {
			$("#"+id).replaceWith( $("#"+id).clone(true) );
		} else {
			$("#"+id).val('');
		}
		return false;
	}
}
/*
 * FORM Elements SelectBox Nullable Check 
 * ex : isSelectNullChk(id, title)
 * @param : üũ�� id
 * @param : üũ�� ��ȯ�� text
 * @return : boolean
 */
function isSelectNullChk(id, title) {
	var val = $("#" + id + " option:selected").val();
	var len = val.length;
	
    if (len > 0) {
        return true;
    } else {
    	alert(title + " ��(��) ������ �ּ���");
		$("#" + id).focus();
        return false;
    }
}

/*
 * Element Character Check
 * ex : onloadCharCheck()
 * @return : 
 */
function onloadCharCheck() {
    var $forms = $("form");
    var $elem;
    for (var i = 0; i < $forms.size(); i++) {
        $elem = $forms.find("*");
        
        for (var j = 0; j < $elem.size(); j++) {
            initSetCharType($elem.eq(j));
        }
    }
}

/*
 * Element Character Type�� Check
 * ex : initSetCharType(element)
 * @param : element
 * @return : 
 */
function initSetCharType(elem) {
    /* �ѱ۸� */
    if ( elem.attr("chartype") == "kor" ) {
        elem.css("ime-mode", "active");
        elem.bind("blur", function (event) {
            setKoreanOnlyBlur(event);
        });
    
    /* �ѱ� + ���� */
    } else if ( elem.attr("chartype") == "kornum" ) {
        elem.css("ime-mode", "active");
        elem.bind("blur", function (event) {
            setKorNumOnlyBlur(event);
        });
        
    /* �ѱ� + ���� */
    } else if ( elem.attr("chartype") == "koreng" ) {
        elem.css("ime-mode", "auto");
        elem.bind("blur", function (event) {
            setKorEngOnlyBlur(event);
        });
        
    /* �ѱ� + ���� + ���� */
    } else if ( elem.attr("chartype") == "korengnum" ) {
        elem.css("ime-mode", "auto");
        elem.bind("blur", function (event) {
            setKorEngNumOnlyBlur(event);
        });
        
    /* ��� */
    } else if ( elem.attr("chartype") == "eng" ) {
        elem.css("ime-mode", "inactive");
        elem.bind("blur", function (event) {
            setEnglishOnlyBlur(event);
        });
        
    /* ���� + ���� */
    } else if ( elem.attr("chartype") == "engnum" ) {
        elem.css("ime-mode", "inactive");
        elem.bind("blur", function (event) {
            setEngNumOnlyBlur(event);
        });
        
    /* �Ǽ��� */
    } else if ( elem.attr("chartype") == "float" ) {
        elem.css("ime-mode", "disabled");
        elem.bind("blur", function (event) {
            setFloatOnlyBlur(event);
        });
        
    /* ������ */
    } else if ( elem.attr("chartype") == "int" ) {
        elem.css("ime-mode", "disabled");
        elem.bind("blur", function (event) {
            setIntegerOnlyBlur(event);
        });
        
    /* ���ڸ� */
    } else if ( elem.attr("chartype") == "onlynum" ) {
        elem.css("ime-mode", "disabled");
        
        elem.bind("keypress", function (event) {
            setNumberOnlyPress(event);
        });
        
        elem.bind("blur", function (event) {
            setNumberOnlyBlur(event);
        });
        
    /* �����θ� �� ���� �⺻���� �ݾ� ǥ�� */
    } else if ( elem.attr("chartype") == "money" ) {
        elem.css({"text-align":"right", "ime-mode":"disabled"});
        elem.bind("blur", function (event) {
            setMoneyBlur(event);
        });
        
    /* �Ǽ��� �ݾ� */
    } else if ( elem.attr("chartype") == "floatmoney" ) {
        elem.css({"text-align":"right", "ime-mode":"disabled"});
        elem.bind("blur", function (event) {
            setFloatMoneyBlur(event);
        });
        
    /* �̸��� ���� */
    } else if ( elem.attr("chartype") == "email" ) {
        elem.css("ime-mode", "inactive");
        elem.bind("blur", function (event) {
            setEmailOnlyBlur(event);
        });
        
    /* ID ����üũ */
    } else if ( elem.attr("chartype") == "id" ) {
        elem.css("ime-mode", "inactive");
        elem.bind("blur", function (event) {
            setIDOnlyBlur(event);
        });
    }
}

/*
 * �̺�Ʈ üũ : Firefox �� ȣȯ�� ����
 * ex : checkEvent(event)
 * @param : event
 */
function checkEvent(event) {
    /* IE �� ��� */
    if (!event) {
        event = window.event;
        event.target = event.srcElement;
        event.which = event.keyCode;
    }
    return event;
}

/*
 * Ű �Է½� �ѱ۸� �Է¹ޱ� (blur ����)
 * ex : setKoreanOnlyBlur(event)
 * @param : event
 */
function setKoreanOnlyBlur(event) {
    event = checkEvent(event);
    var elemval = event.target.value;
    var title = "";
    
    if (event.target.title != null && event.target.title != undefined && event.target.title != "") {
        title = "[" + event.target.title + "] ";
    }

    for (var i = 0; i < elemval.length; i++) {
        var pKey = elemval.charCodeAt(i);
        
        if ( !((pKey > 0x3130 && pKey < 0x318F) || (pKey >= 0xAC00 && pKey <= 0xD7A3)) ) {
            alert(title + "�ѱ۸� �Է� �����մϴ�!");
            event.target.value = "";
            event.target.focus();
            return false;
        }
    }
}

/*
 * Ű �Է½� �ѱ�+���ڸ� �Է¹ޱ� (blur ����)
 * ex : setKorNumOnlyBlur(event)
 * @param : event
 */
function setKorNumOnlyBlur(event) {
    event = checkEvent(event);
    var elval = event.target.value;
    var title = "";
    
    if (event.target.title != null && event.target.title != undefined && event.target.title != "") {
        title = "[" + event.target.title + "] ";
    }
    
    for (var i = 0; i < elval.length; i++) {
        var pKey = elval.charCodeAt(i);
        
        if ( !((pKey > 0x3130 && pKey < 0x318F) || (pKey >= 0xAC00 && pKey <= 0xD7A3)) && (pKey < 48 || pKey > 57) ) {
            alert(title + "�ѱ�, ���ڸ� �Է� �����մϴ�!");
            event.target.value = "";
            event.target.focus();
            return false;
        }
    }
}

/*
 * Ű �Է½� ���ڸ� �Է¹ޱ� (keypress ����)
 * ex : setNumberOnlyPress(event)
 * @param : event
 */
function setNumberOnlyPress(event) {
    event = checkEvent(event);
    
    if ( (event.which < 48 || event.which >57) && !(event.which == 8 || event.which == 9) ) {
        event.preventDefault();
        return;
    }
    
    event.returnValue = true;
}

/*
 * Ű �Է½� ���ڸ� �Է¹ޱ� (blur ����)
 * ex : setKorNumOnlyBlur(event)
 * @param : event
 */
function setNumberOnlyBlur(event) {
    event = checkEvent(event);
    var elval = event.target.value;
    var title = "";
    
    if (event.target.title != null && event.target.title != undefined && event.target.title != "") {
        title = "[" + event.target.title + "] ";
    }
    
    for (var i = 0; i < elval.length; i++) {
        var pKey = elval.charCodeAt(i);
        
        if ( !((pKey > 47 && pKey < 58) || (pKey == 8 || pKey == 9)) ) {
            alert(title + "���ڸ� �Է� �����մϴ�!");
            event.target.value = "";
            event.target.focus();
            return false;
        }
    }
}

/*
 * Ű �Է½� �ѱ� + ������ �Է¹ޱ� (blur ����)
 * ex : setKorEngOnlyBlur(event)
 * @param : event
 */
function setKorEngOnlyBlur(event) {
    event = checkEvent(event);
    var elval = event.target.value;
    var title = "";
    
    if (event.target.title != null && event.target.title != undefined && event.target.title != "") {
        title = "[" + event.target.title + "] ";
    }
    
    for (var i = 0; i < elval.length; i++) {
        var pKey = elval.charCodeAt(i);
        
		if (pKey != 32)	{
			if ( !((pKey > 0x3130 && pKey < 0x318F) || (pKey >= 0xAC00 && pKey <= 0xD7A3)) && !((pKey > 96 && pKey < 123) || (pKey > 64 && pKey < 91)) ) {
				alert(title + "�ѱ�, ��� �Է� �����մϴ�!");
				event.target.value = "";
				event.target.focus();
				return false;
			}
        }
    }
}

/*
 * Ű �Է½� �ѱ� + ������ �Է¹ޱ� (blur ����)
 * ex : setKorEngOnlyBlur(event)
 * @param : event
 */
function setKorEngNumOnlyBlur(event) {
    event = checkEvent(event);
    var elval = event.target.value;
    var title = "";
    
    if (event.target.title != null && event.target.title != undefined && event.target.title != "") {
        title = "[" + event.target.title + "] ";
    }
    
    for (var i = 0; i < elval.length; i++) {
        var pKey = elval.charCodeAt(i);
        
		if (pKey != 32)	{
			if ( !((pKey > 0x3130 && pKey < 0x318F) || (pKey >= 0xAC00 && pKey <= 0xD7A3)) && !((pKey > 96 && pKey < 123) || (pKey > 64 && pKey < 91)) && !(pKey > 47 && pKey < 58) ) {
				alert(title + "�ѱ�,����,���ڸ� �Է� �����մϴ�!");
				event.target.value = "";
				event.target.focus();
				return false;
			}
        }
    }
}

/*
 * Ű �Է½� ������ �Է¹ޱ� (blur ����)
 * ex : setEnglishOnlyBlur(event)
 * @param : event
 */
function setEnglishOnlyBlur(event) {
    event = checkEvent(event);
    var elval = event.target.value;
    var title = "";
    
    if (event.target.title != null && event.target.title != undefined && event.target.title != "") {
        title = "[" + event.target.title + "] ";
    }
    
    for (var i = 0; i < elval.length; i++) {
        var pKey = elval.charCodeAt(i);
        
        if ( !((pKey > 96 && pKey < 123) || (pKey > 64 && pKey < 91)) ) {
            alert(title + "��� �Է� �����մϴ�!");
            event.target.value = "";
            event.target.focus();
            return false;
        }
    }
}

/*
 * Ű �Է½� ����+���ڸ� �Է¹ޱ� (blur ����)
 * ex : setEngNumOnlyBlur(event)
 * @param : event
 */
function setEngNumOnlyBlur(event) {
    event = checkEvent(event);
    var elval = event.target.value;
    var title = "";
    
    if (event.target.title != null && event.target.title != undefined && event.target.title != "") {
        title = "[" + event.target.title + "] ";
    }
    
    for (var i = 0; i < elval.length; i++) {
        var pKey = elval.charCodeAt(i);
        
        if ( !((pKey > 96 && pKey < 123) || (pKey > 64 && pKey < 91)) && !(pKey > 47 && pKey < 58) ) {
            alert(title + "����,���ڸ� �Է� �����մϴ�!");
            event.target.value = "";
            event.target.focus();
            return false;
        }
    }
}

/*
 * Ű �Է½� �Ǽ��� �Է¹ޱ� (blur ����)
 * ex : setFloatOnlyBlur(event)
 * @param : event
 */
function setFloatOnlyBlur(event) {
    event = checkEvent(event);
    var elval = event.target.value;
    var floatPoint = elval.indexOf('.') != -1 ? elval.indexOf('.') : elval.length;
    var evtValueLength = event.target.value.length;
    var title = "";
    
    if (event.target.title != null && event.target.title != undefined && event.target.title != "") {
        title = "[" + event.target.title + "] ";
    }
    
    for (var i = 0; i < evtValueLength; i++) {
        var pKey = elval.charCodeAt(i);
        
        // - �� �Էµ��� ���
        if (evtValueLength == 1 && pKey == 45) {
            alert(title + "- �� �Էµ� �� �����ϴ�!");
            event.target.focus();
            return false;
        }
        
        // �Է� ���� '.'�� �� ���̳� �� �ڿ� ������ ��� ��� �޼���
        if ((i == 0 && pKey == 46) || (i == (evtValueLength-1) && pKey == 46)) {
            alert(title + "�Ҽ����� �� ���̳� �� �ڿ� ���� �� �����ϴ�!");
            event.target.value = "";
            event.target.focus();
            return false;
        }
        
        // �Ҽ��� �̻��� ���� ���
        if (i < floatPoint) {
            if ( ((floatPoint-1)-i)%4 == 3 && (floatPoint-1) != 0 && elval.charAt(i) == ',' ) continue;
            if ( i == 0 && elval.charAt(i) == '-' ) continue;
        }
        
        if (i > floatPoint && elval.charAt(i) == '.') {
            alert(title + "�Ҽ����� �Ѱ� �̻� ���� �� �����ϴ�!");
            event.target.focus();
            return false;
        }
        
        // �Է°� �� '-' �� �߰��� ������ ��� ��� �޼���
        if (i != 0 && pKey == 45) {
            alert(title + "- �� �Է°� �� �� �տ��� �����Ͽ��� �մϴ�!");
            event.target.focus();
            return false;
        }
        
        if ( !(pKey > 47 && pKey < 58) && !(pKey == 45 || pKey == 46) ) {
            alert(title + "����, . , - �� �Է� �����մϴ�!");
            reset();
			event.target.focus();
			
            return false;
        }
    }
}

/*
 * Ű �Է½� ������ �Է¹ޱ� (blur ����)
 * ex : setIntegerOnlyBlur(event)
 * @param : event
 */
function setIntegerOnlyBlur(event) {
    event = checkEvent(event);
    var elval = event.target.value;
    var evtValueLength = elval.length;
    var title = "";
    
    if (event.target.title != null && event.target.title != undefined && event.target.title != "") {
        title = "[" + event.target.title + "] ";
    }
    
    for (var i = 0; i < evtValueLength; i++) {
        var pKey = elval.charCodeAt(i);
        
        // - �� �Է����� ���
        if (evtValueLength == 1 && pKey == 45) {
            alert(title + "- �� �Է��� �� �����ϴ�!");
            event.target.focus();
            return false;
        }
        
        if(((evtValueLength-1)-i)%4 == 3 && (evtValueLength-1) != 0 && elval.charAt(i) == ',' ) continue;
        if(i == 0 && elval.charAt(i) == '-' ) continue;
        
        // �Է°� �� '-' �� �߰��� ������ ��� ��� �޼���
        if (i != 0 && pKey == 45) {
            alert(title + "- �� �Է°� �� �� �տ��� �����Ͽ��� �մϴ�!");
            event.target.focus();
            return false;
        }
        
        if ( !(pKey > 47 && pKey < 58) && !(pKey == 45) ) {
            alert(title + "���ڸ� �Է� �����մϴ�!");
            event.target.focus();
            return false;
        }
    }
}

/*
 * Ű �Է½� money(���ڸ� �Է�, 3�ڸ����� ',' ó��) �Է¹ޱ� (blur ����)
 * ex : setMoneyBlur(event)
 * @param : event
 */
function setMoneyBlur(event) {
    event = checkEvent(event);
    var tempVal = event.target.value;
    
    if (tempVal.length > 0) {
        var stat = true;
        while(stat) {
            if ((tempVal.length > 0 && tempVal.substring(0,1) == 0)) {
                tempVal = tempVal.substr(1);
            } else if (tempVal.length > 1 && tempVal.substring(0,1) == '-' && tempVal.substring(1,2) == 0) {
                tempVal = "-" + tempVal.substr(2);
            } else {
                stat = false;
            }
        }
    }
    
    var moneyReg = new RegExp('(-?[0-9]+)([0-9]{3})');
    tempVal = tempVal.replace(/\,/g, "");
    while (moneyReg.test(tempVal)) {
        tempVal = tempVal.replace(moneyReg, '$1,$2');
    }
    
    event.target.value = tempVal;
    setIntegerOnlyBlur(event);
    event.preventDefault();
}

/*
 * Ű �Է½� money('.',���ڸ� �Է�, 3�ڸ����� ',' ó��) �Է¹ޱ� (blur ����)
 * ex : setFloatMoneyBlur(event)
 * @param : event
 */
function setFloatMoneyBlur(event) {
    event = checkEvent(event);
    var tempV = event.target.value;
    var floatnum = "";
    
    if (tempV.indexOf(".") != -1) {
        floatnum = tempV.substring(tempV.indexOf("."));
        tempV = tempV.substring(0, tempV.indexOf("."));
    }
    
    // ó�� ���� 0�̰� ���� ���� .�� �ƴ� ���
    if (tempV.charAt(0) == "0" && floatnum == "") {
        while(tempV.charAt(0) == "0") {
            tempV = tempV.substring(1);
        }
    }
    
    // ó������ - �̰� �ι�° ���� 0 �϶� ����°���� . �� �ƴ� ���
    if (tempV.charAt(0) == "-" && tempV.charAt(1) == "0" && floatnum == "") {
        while (tempV.charAt(1) == "0") {
            tempV = "-" + tempV.substring(2);
        }
    }
    
    // �Ҽ��� �տ� ���� ���ڰ� �ƴ� ���
    if (isNaN(tempV.charAt(tempV.length - 1))) {
        while(isNaN(tempV.charAt(tempV.length - 1)) && tempV.length > 0) {
            tempV = tempV.substring(0, (tempV.length >= 1 ? tempV.length-1:0));
        }
        floatnum = floatnum.substring(1);
    }
    
    var moneyReg = new RegExp('(-?[0-9]+)([0-9]{3})');
    tempV = tempV.replace(/\,/g, "");
    floatnum = floatnum.replace(/\,/g, "");
    while(moneyReg.test(tempV)) {
        tempV = tempV.replace(moneyReg, '$1,$2');
    }
    
    event.target.value = tempV + floatnum;
    setFloatOnlyBlur(event);
    event.preventDefault();
}

/*
 * E-Mail ������ �Է� �ޱ� (blur ����)
 * ex : setEmailOnlyBlur(event)
 * @param : event
 */
function setEmailOnlyBlur(event) {
    event = checkEvent(event);
    var elval = event.target.value;
    var emailReg = /^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+)$/;
    var title = "";
    
    if (event.target.title != null && event.target.title != undefined && event.target.title != "") {
        title = "[" + event.target.title + "] ";
    }
    
    if (!emailReg.test(elval)) {
        alert(title + "�̸��� ���ĸ� �Է� �����մϴ�!");
        event.target.focus();
        return false;
    }
}

/*
 * E-Mail ���� Check
 * ex : getEmailCheck(email)
 * @param : email
 */
function getEmailCheck(email) {
    var emailReg = /^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+)$/;
    
    if (!emailReg.test(email)) {
        alert("�̸��� ���Ŀ� ���� �ʽ��ϴ�.");
        return;
    }
}

/*
 * ID ������ �Է� �ޱ� (blur ����)
 * ex : setIDOnlyBlur(event)
 * @param : event
 */
function setIDOnlyBlur(event) {
    event = checkEvent(event);
    var elval = event.target.value;
    var idReg1 = /(^[a-zA-Z])/;
    var idReg2 = /([^a-zA-Z0-9\-_])/;
    var empReg = /\s/g;
    var title = "";
    
    if (event.target.title != null && event.target.title != undefined && event.target.title != "") {
        title = "[" + event.target.title + "] ";
    }
    
    if (!idReg1.test(elval)) {
        alert(title + "�� ù���ڴ� �����̾�� �մϴ�!");
        event.target.focus();
        return false;
    }
    
    if (idReg2.test(elval) || empReg.test(elval)) {
        alert(title + "�� ����,����,-,_ �� ����� �� �ֽ��ϴ�!");
        event.target.focus();
        return false;
    }
}




/*
 * FORM Validation Check 
 * ex : validateForm(form)
 * @param : üũ�� form
 * @return : boolean
 */
function validateForm(target) {
    if (!validate(target)) {
        return false;
    } else {
        return true;
    }
}

 /*
  * FORM Elements Validation Check 
  * ex : validate(form)
  * @param : üũ�� form
  * @return : boolean
  */
function validate(target) 
{
    var $input = target.find("input");
	var $select = target.find("select");

    for ( var i = 0; i < $input.size(); i++ ) {
        if ( $input.eq(i).attr("nullable") == "true" && $input.eq(i).attr("nullable") != "" ) {
            /* �ʼ� ���� üũ */
            if ( getTxtBkmgRmov($input.eq(i).val()) == "" ) {
                if ( $input.eq(i).attr("title") ) {
                    alert("["+$input.eq(i).attr("title")+"] �׸��� �ʼ��Դϴ�.");
                } else {
                    alert("�ʼ� �׸��Դϴ�.");
                }
                
                $input.eq(i).focus();
                return false;
            } else {
                /* �ִ� ����Ʈ üũ */
                if ( $input.eq(i).attr("maxbyte") != null && $input.eq(i).attr("maxbyte") != undefined && $input.eq(i).attr("maxbyte") != "" ) {
                    if ( !validationMaxByte($input.eq(i).val(), $input.eq(i).attr("maxbyte")) ) {
                        var errMsg = "�Է��� % �ڸ��� ���ֽʽÿ�."+"(BYTE)";
                        
                        /* minbyte ���� �����Ǿ� �ִ� ��� */
                        if ( $input.eq(i).attr("minbyte") != null && $input.eq(i).attr("minbyte") != undefined && $input.eq(i).attr("minbyte") != "" ) {
                            /* min, max �� ���� ������ ��� */
                            if ( $input.eq(i).attr("minbyte") == $input.eq(i).attr("maxbyte") ) {
                                errMsg = errMsg.replace("%", $input.eq(i).attr("maxbyte"));
                            } else {
                                errMsg = errMsg.replace("%", $input.eq(i).attr("minbyte") + " ~ " + $input.eq(i).attr("maxbyte"));
                            }
                            
                        /* maxbyte �� �����Ǿ� �ִ� ��� */
                        } else {
                            errMsg = errMsg.replace("%", $input.eq(i).attr("maxbyte"));
                        }
                        
                        /* �����޼��� ��� */
                        if ( $input.eq(i).attr("title") != undefined && $input.eq(i).attr("title") != "" ) {
                            alert("[" + $input.eq(i).attr("title") + "] " + errMsg);
                        } else {
                            alert(errMsg);
                        }
                        
                        $input.eq(i).focus();
                        return false;
                    }
                }
                
                /* �ּ� ����Ʈ üũ */
                if ( $input.eq(i).attr("minbyte") != undefined && $input.eq(i).attr("minbyte") != "" ) {
                    if ( $input.eq(i).val().length == 0 || ( !validationMinByte($input.eq(i).val(), $input.eq(i).attr("minbyte")) ) ) {
                        var errMsg = "�Է��� % �ڸ��� ���ֽʽÿ�."+"(BYTE)";
                        
                        /* maxbyte �����Ǿ� �ִ� ��� */
                        if ( $input.eq(i).attr("maxbyte") != undefined && $input.eq(i).attr("maxbyte") != "" ) {
                            // min, max �� ���� �����ϸ� �������� ���� ����ش�.
                            if ( $input.eq(i).attr("minbyte") == $input.eq(i).attr("maxbyte") ) {
                                errMsg = errMsg.replace("%", $input.eq(i).attr("minbyte"));
                            } else {
                                errMsg = errMsg.replace("%", $input.eq(i).attr("minbyte") + " ~ " + $input.eq(i).attr("maxbyte"));

                            }
                            
                        /* minbyte �� �����Ǿ� �ִ� ��� */
                        } else {
                            errMsg = errMsg.replace("%", $input.eq(i).attr("minbyte") + " ~ ");
                        }
                        
                        /* �����޼��� ��� */
                        if ( $input.eq(i).attr("title") != undefined && $input.eq(i).attr("title") != "" ) {
                            alert("[" + $input.eq(i).attr("title") + "]" + errMsg);
                        } else {
                            alert(errMsg);
                        }
                        
                        $input.eq(i).focus();
                        return false;
                    }
                }
                
                if ( $input.eq(i).attr("chartype") == "password" ) {
                    if (!getPasswordChk($input.eq(i).val())) {
                        alert("[" + $input.eq(i).attr("title") + "]�� �����빮��,�����ҹ���,����,Ư������ �������� �Է��ؾ� �մϴ�!");
                        $input.eq(i).focus().select();
                        return false;
                    }
                }
            }
        } else if ( $.trim($input.eq(i).val()) != "" ) {
            /* �ִ� ����Ʈ üũ */
            if ( $input.eq(i).attr("maxbyte") != null && $input.eq(i).attr("maxbyte") != undefined && $input.eq(i).attr("maxbyte") != "" ) {
                if ( !validationMaxByte($input.eq(i).val(), $input.eq(i).attr("maxbyte")) ) {
                    var errMsg = "�Է��� % �ڸ��� ���ֽʽÿ�."+"(BYTE)";
                    
                    /* minbyte ���� �����Ǿ� �ִ� ��� */
                    if ( $input.eq(i).attr("minbyte") != null && $input.eq(i).attr("minbyte") != undefined && $input.eq(i).attr("minbyte") != "" ) {
                        /* min, max �� ���� ������ ��� */
                        if ( $input.eq(i).attr("minbyte") == $input.eq(i).attr("maxbyte") ) {
                            errMsg = errMsg.replace("%", $input.eq(i).attr("maxbyte"));
                        } else {
                            errMsg = errMsg.replace("%", $input.eq(i).attr("minbyte") + " ~ " + $input.eq(i).attr("maxbyte"));
                        }
                        
                    /* maxbyte �� �����Ǿ� �ִ� ��� */
                    } else {
                        errMsg = errMsg.replace("%", $input.eq(i).attr("maxbyte"));
                    }
                    
                    /* �����޼��� ��� */
                    if ( $input.eq(i).attr("title") != undefined && $input.eq(i).attr("title") != "" ) {
                        alert("[" + $input.eq(i).attr("title") + "] " + errMsg);
                    } else {
                        alert(errMsg);
                    }
                    
                    $input.eq(i).focus();
                    return false;
                }
            }
             
            /* �ּ� ����Ʈ üũ */
            if ( $input.eq(i).attr("minbyte") != undefined && $input.eq(i).attr("minbyte") != "" ) {
                if ( $input.eq(i).val().length == 0 || ( !validationMinByte($input.eq(i).val(), $input.eq(i).attr("minbyte")) ) ) {
                    var errMsg = "�Է��� % �ڸ��� ���ֽʽÿ�."+"(BYTE)";
                    
                    /* maxbyte �����Ǿ� �ִ� ��� */
                    if ( $input.eq(i).attr("maxbyte") != undefined && $input.eq(i).attr("maxbyte") != "" ) {
                        
                        // min, max �� ���� �����ϸ� �������� ���� ����ش�.
                        if ( $input.eq(i).attr("minbyte") == $input.eq(i).attr("maxbyte") ) {
                            errMsg = errMsg.replace("%", $input.eq(i).attr("minbyte"));
                        } else {
                            errMsg = errMsg.replace("%", $input.eq(i).attr("minbyte") + " ~ " + $input.eq(i).attr("maxbyte"));
                        }
                        
                    /* minbyte �� �����Ǿ� �ִ� ��� */
                    } else {
                        errMsg = errMsg.replace("%", $input.eq(i).attr("minbyte") + " ~ ");
                    }
                    
                    /* �����޼��� ��� */
                    if ( $input.eq(i).attr("title") != undefined && $input.eq(i).attr("title") != "" ) {
                        alert("[" + $input.eq(i).attr("title") + "]" + errMsg);
                    } else {
                        alert(errMsg);
                    }
                    
                    $input.eq(i).focus();
                    return false;
                }
            }
        }
    }
    
    return true;
}


function validate_extra(target) {
    var $input = target.find("input");
	var $select = target.find("select");

    for ( var i = 0; i < $input.size(); i++ ) {
        if ( $input.eq(i).attr("nullable") == "true" && $input.eq(i).attr("nullable") != "" ) {
            /* �ʼ� ���� üũ */
            if ( getTxtBkmgRmov($input.eq(i).val()) == "" ) {
                if ( $input.eq(i).attr("title") ) {
                    alert("["+$input.eq(i).attr("title")+"] �׸��� �ʼ��Դϴ�.");
                } else {
                    alert("�ʼ� �׸��Դϴ�.");
                }
                
                $input.eq(i).focus();
                return false;
            } else {
                /* �ִ� ����Ʈ üũ */
                if ( $input.eq(i).attr("maxbyte") != null && $input.eq(i).attr("maxbyte") != undefined && $input.eq(i).attr("maxbyte") != "" ) {
                    if ( !validationMaxByte($input.eq(i).val(), $input.eq(i).attr("maxbyte")) ) {
                        var errMsg = "�Է��� % �ڸ��� ���ֽʽÿ�."+"(BYTE)";
                        
                        /* minbyte ���� �����Ǿ� �ִ� ��� */
                        if ( $input.eq(i).attr("minbyte") != null && $input.eq(i).attr("minbyte") != undefined && $input.eq(i).attr("minbyte") != "" ) {
                            /* min, max �� ���� ������ ��� */
                            if ( $input.eq(i).attr("minbyte") == $input.eq(i).attr("maxbyte") ) {
                                errMsg = errMsg.replace("%", $input.eq(i).attr("maxbyte"));
                            } else {
                                errMsg = errMsg.replace("%", $input.eq(i).attr("minbyte") + " ~ " + $input.eq(i).attr("maxbyte"));
                            }
                            
                        /* maxbyte �� �����Ǿ� �ִ� ��� */
                        } else {
                            errMsg = errMsg.replace("%", $input.eq(i).attr("maxbyte"));
                        }
                        
                        /* �����޼��� ��� */
                        if ( $input.eq(i).attr("title") != undefined && $input.eq(i).attr("title") != "" ) {
                            alert("[" + $input.eq(i).attr("title") + "] " + errMsg);
                        } else {
                            alert(errMsg);
                        }
                        
                        $input.eq(i).focus();
                        return false;
                    }
                }
                
                /* �ּ� ����Ʈ üũ */
                if ( $input.eq(i).attr("minbyte") != undefined && $input.eq(i).attr("minbyte") != "" ) {
                    if ( $input.eq(i).val().length == 0 || ( !validationMinByte($input.eq(i).val(), $input.eq(i).attr("minbyte")) ) ) {
                        var errMsg = "�Է��� % �ڸ��� ���ֽʽÿ�."+"(BYTE)";
                        
                        /* maxbyte �����Ǿ� �ִ� ��� */
                        if ( $input.eq(i).attr("maxbyte") != undefined && $input.eq(i).attr("maxbyte") != "" ) {
                            // min, max �� ���� �����ϸ� �������� ���� ����ش�.
                            if ( $input.eq(i).attr("minbyte") == $input.eq(i).attr("maxbyte") ) {
                                errMsg = errMsg.replace("%", $input.eq(i).attr("minbyte"));
                            } else {
                                errMsg = errMsg.replace("%", $input.eq(i).attr("minbyte") + " ~ " + $input.eq(i).attr("maxbyte"));

                            }
                            
                        /* minbyte �� �����Ǿ� �ִ� ��� */
                        } else {
                            errMsg = errMsg.replace("%", $input.eq(i).attr("minbyte") + " ~ ");
                        }
                        
                        /* �����޼��� ��� */
                        if ( $input.eq(i).attr("title") != undefined && $input.eq(i).attr("title") != "" ) {
                            alert("[" + $input.eq(i).attr("title") + "]" + errMsg);
                        } else {
                            alert(errMsg);
                        }
                        
                        $input.eq(i).focus();
                        return false;
                    }
                }
                
                if ( $input.eq(i).attr("chartype") == "password" ) {
                    if (!getPasswordChk($input.eq(i).val())) {
                        alert("[" + $input.eq(i).attr("title") + "]�� �����빮��,�����ҹ���,����,Ư������ �������� �Է��ؾ� �մϴ�!");
                        $input.eq(i).focus().select();
                        return false;
                    }
                }
            }
        } else if ( $.trim($input.eq(i).val()) != "" &&  $.trim($input.eq(i).val()) != "���������� �����ּ���."  &&  $.trim($input.eq(i).val()) != "%������ �����ּ���." ) {
            /* �ִ� ����Ʈ üũ */
            if ( $input.eq(i).attr("maxbyte") != null && $input.eq(i).attr("maxbyte") != undefined && $input.eq(i).attr("maxbyte") != "" ) {
                if ( !validationMaxByte($input.eq(i).val(), $input.eq(i).attr("maxbyte")) ) {
                    var errMsg = "�Է��� % �ڸ��� ���ֽʽÿ�."+"(BYTE)";
                    
                    /* minbyte ���� �����Ǿ� �ִ� ��� */
                    if ( $input.eq(i).attr("minbyte") != null && $input.eq(i).attr("minbyte") != undefined && $input.eq(i).attr("minbyte") != "" ) {
                        /* min, max �� ���� ������ ��� */
                        if ( $input.eq(i).attr("minbyte") == $input.eq(i).attr("maxbyte") ) {
                            errMsg = errMsg.replace("%", $input.eq(i).attr("maxbyte"));
                        } else {
                            errMsg = errMsg.replace("%", $input.eq(i).attr("minbyte") + " ~ " + $input.eq(i).attr("maxbyte"));
                        }
                        
                    /* maxbyte �� �����Ǿ� �ִ� ��� */
                    } else {
                        errMsg = errMsg.replace("%", $input.eq(i).attr("maxbyte"));
                    }
                    
                    /* �����޼��� ��� */
                    if ( $input.eq(i).attr("title") != undefined && $input.eq(i).attr("title") != "" ) {
                        alert("[" + $input.eq(i).attr("title") + "] " + errMsg);
                    } else {
                        alert(errMsg);
                    }
                    
                    $input.eq(i).focus();
                    return false;
                }
            }
            
            /* �ּ� ����Ʈ üũ */
            if ( $input.eq(i).attr("minbyte") != undefined && $input.eq(i).attr("minbyte") != "" ) {
                if ( $input.eq(i).val().length == 0 || ( !validationMinByte($input.eq(i).val(), $input.eq(i).attr("minbyte")) ) ) {
                    var errMsg = "�Է��� % �ڸ��� ���ֽʽÿ�."+"(BYTE)";
                    
                    /* maxbyte �����Ǿ� �ִ� ��� */
                    if ( $input.eq(i).attr("maxbyte") != undefined && $input.eq(i).attr("maxbyte") != "" ) {
                        
                        // min, max �� ���� �����ϸ� �������� ���� ����ش�.
                        if ( $input.eq(i).attr("minbyte") == $input.eq(i).attr("maxbyte") ) {
                            errMsg = errMsg.replace("%", $input.eq(i).attr("minbyte"));
                        } else {
                            errMsg = errMsg.replace("%", $input.eq(i).attr("minbyte") + " ~ " + $input.eq(i).attr("maxbyte"));
                        }
                        
                    /* minbyte �� �����Ǿ� �ִ� ��� */
                    } else {
                        errMsg = errMsg.replace("%", $input.eq(i).attr("minbyte") + " ~ ");
                    }
                    
                    /* �����޼��� ��� */
                    if ( $input.eq(i).attr("title") != undefined && $input.eq(i).attr("title") != "" ) {
                        alert("[" + $input.eq(i).attr("title") + "]" + errMsg);
                    } else {
                        alert(errMsg);
                    }
                    
                    $input.eq(i).focus();
                    return false;
                }
            }
        }
    }
    
    return true;
}

/*
 * �ִ� byte üũ ���� 
 * ex : validationMaxByte(value, number)
 * @param : üũ�� String value
 * @param : �ִ� byte
 * @return : boolean
 */
function validationMaxByte(textObj, length_limit) {
    var length = calculate_msglen(textObj);
    var kor_cnt = Math.floor(length_limit/2);
    if (length > length_limit) {
        return false;
    }
    return true;
}

/*
 * �ּ� byte üũ ���� 
 * ex : validationMinByte(value, number)
 * @param : üũ�� String value
 * @param : �ּ� byte
 * @return : boolean
 */
function validationMinByte(textObj, length_limit) {
    var length = calculate_msglen(textObj);
    var kor_cnt = Math.floor(length_limit/2);
    if (length < length_limit) {
        return false;
    }
    return true;
}

/*
 * ���ڿ��� byte ���� ���ϱ� 
 * ex : calculate_msglen(message)
 * @param : üũ�� String message
 * @return : ���ڿ��� byte ����
 */
function calculate_msglen(message) {
    var nbytes = 0;
    
    for (var i = 0; i < message.length; i++) {
        var ch = message.charAt(i);
        if (escape(ch).length > 4) {
            nbytes += 2;
        } else if (ch == '\n') {
            if (message.charAt(i-1) != '\r') {
                nbytes += 1;
            }
        } else if (ch == '<' || ch == '>') {
            nbytes += 4;
        } else {
            nbytes += 1;
        }
    }
    
    return nbytes;
}

/*
 * Password ����üũ(����+����+Ư������ ���� 1���ھ� ����)
 * ex : getPasswordChk(value)
 * @param : event
 */
function getPasswordChk(textObj) {
    var pwReg = /^.*(?=.{8,20})(?=.*[0-9])(?=.*[a-z])(?=.*[~!@\#$%^&*\()\-=+_'\"]).*$/;
    var empReg = /\s/g;
    
    if (!pwReg.test(textObj) || empReg.test(textObj)) {
        return false;
    } else {
        return true;
    }
}

/*
 * ���ڿ� Ư������ �˻�
 * ex : isSearchText(value)
 * @param : event
 */
function isSchrChk(val) {
    var valid = true;
    var cmp = "!#$%^&*|'<>-;";
    
    for (var i = 0; i < val.length; i++) {
        if (cmp.indexOf(val.charAt(i)) != -1) {
            valid = false;
            break;
        }
    }
    return valid;
}

/*
 * List CheckBox ALL Check
 * ex : setAllChk(allcheckbox, checkbox)
 * @param : event
 */
function setAllChk(formid, id) {
    if (id != null && id != undefined) {
        if (formid.checked == true) {
            if (id.length == undefined) {
                id.checked = true;
            } else {
                for (var i = 0; i < id.length; i++) {
                    id[i].checked = true;
                }
            }
        } else {
            if (id.length == undefined) {
                id.checked = false;
            } else {
                for (var i = 0; i < id.length; i++) {
                    id[i].checked = false;
                }
            }
        }
    }
}

/*
 * Upload File Download (Attach File)
 * ex : getUpFileDownload(menuScn, idx)
 * @param : event
 */
function getFileDownload(filepath) {
    $("#sFilePath").val(filepath);

	$("#fileDownFrm").attr("target", "comIframe");
	$("#fileDownFrm").attr("action", "/core/download.asp");
	$("#fileDownFrm").submit();
}

/*
 * Left, Right ��������
 * ex : getTxtBkmgRmov(txt)
 * @param : event
 */
function getTxtBkmgRmov(txtVal) {
    var trimLeftChr = /^\s+/;
    var trimRightChr = /\s+$/;
    
    return txtVal.replace(trimLeftChr,"").replace(trimRightChr,"");
}

/*
 * Ajax Submit
 * ex : ajaxSubmit(txt)
 * @param : event
 */
function ajaxSubmit(submitUrl,param,callbackJSON) {
    $.ajax({
        type : "GET"
        , async : true
        , url : submitUrl
        , dataType : "json"
        , timeout : 30000
        , cache : false
        , data : param
        , contentType : "application/x-www-form-urlencoded; charset=UTF-8"
        , error : function(request, status, error) {
            alert("����Ÿ ��ȸ�� ������ �߻��߽��ϴ�.\n �ý��۰����ڿ��� ���ǹٶ��ϴ�.");
        }
        , success : callbackJSON
    });
}

/*
 * �����ȣ��ȸ �˾� ȣ��
 * ex : doPostPop()
 * @param : event
 */
function doPostPop() {
	var postPop = $(":radio[name=postSrch]:checked").val();
	var title = "popAddr";
	var popUrl = "";
	var status = "";

	if (postPop == "R") {
		popUrl = "/popup/popAddrR.asp";
		status = "status=no,toolbar=0,menubar=0,scrollbars=no,resizable=yes,left=400,top=200,width=510,height=745";
	} else {
		popUrl = "/popup/popAddrJ.asp";
		status = "status=no,toolbar=0,menubar=0,scrollbars=no,resizable=yes,left=400,top=200,width=510,height=595";
	}

	window.open(popUrl, title, status);
}

var _ModalPopupBackgroundID = 'backgroundPopup';
function ShowModalPopup(modalPopupID) {
	var popupID = "#" + modalPopupID;
	var popupMarginTop = $(popupID).height() / 2;
	var popupMarginLeft = $(popupID).width() / 2;
		$(popupID).css({
				'left': '50%',
				'z-index': 9999,
				'top': '50%',
				'margin-top': -popupMarginTop,
				'margin-left': -popupMarginLeft,
				'display': 'block',
				'position': 'fixed'
		});
		var backgroundSelector = $('<div id="' + _ModalPopupBackgroundID + '" ></div>');
		backgroundSelector.appendTo('body');
		backgroundSelector.css({
				'width': $(document).width(),
				'height': $(document).height(),
				'display': 'none',
				'background-color': '#000',
				'filter':'alpha(opacity=50)',
				'position': 'absolute',
				'top': 0,
				'left': 0,
				'z-index': 9990
		});
		backgroundSelector.fadeTo('fast', 0.8);
}

function HideModalPopup(modalPopupID) {
	$("#" + modalPopupID).css('display', 'none');
	$("#" + _ModalPopupBackgroundID).remove();
}

function openWin(seq) {
	var title = "popProduct";
	var popUrl = "/popup/popProduct.asp?seq=" + seq;
	var status = "status=no,toolbar=0,menubar=0,scrollbars=no,resizable=yes,left=400,top=100,width=440,height=600"; /* 2015-03-26 */

	window.open(popUrl, title, status);
}
// ���ǰ�� ��Ʈ��
function treatCateControl_(val) {
	$("#treatCategory2 > option[value='']").attr("selected", "selected");
	if (val == "FF") {
		$(".ffCont").removeClass("hidden");
		$(".fdCont").addClass("hidden");
		$(".itCont").addClass("hidden");
	} else if (val == "FD") {
		$(".ffCont").addClass("hidden");
		$(".fdCont").removeClass("hidden");
		$(".itCont").addClass("hidden");
	} else if (val == "IT") {
		$(".ffCont").addClass("hidden");
		$(".fdCont").addClass("hidden");
		$(".itCont").removeClass("hidden");
	} else {
		$(".ffCont").addClass("hidden");
		$(".fdCont").addClass("hidden");
		$(".itCont").addClass("hidden");
	}
}

// ���ǰ�� ��Ʈ��
function treatCateControl(val) {
	$("#treatCategory2").html("");
	var obj = "<option value=''>����</option>";

	if (val == "FF") {
		obj = obj + "<option value='F1'>FF</option>"
		obj = obj + "<option value='F2'>��</option>"

	} else if (val == "FD") {
		obj = obj + "<option value='D1'>����, �ַ�</option>"
		obj = obj + "<option value='D2'>�õ�, ����, ����ǰ</option>"
		obj = obj + "<option value='D3'>����, �Ϲݽ�ǰ</option>"

	} else if (val == "IT") {
		obj = obj + "<option value='T1'>�ϻ��ǰ</option>"
		obj = obj + "<option value='T2'>��Ȱ��ȭ</option>"
		obj = obj + "<option value='T3'>����</option>"

	}

	$("#treatCategory2").append(obj);
}

/*
* ��õ���� & FAQ �Խ��� �� 2015-04-17
*/

function mouseOverClick() { // ��ġ�� ���߱� ó��
	// tr & block ����
	$(".m_over").mouseover(function(e) {
		$(this).css("background", "#fff9eb");
		$(this).css("cursor", "pointer");
	}).mouseout(function(e) {
		if ($(this).next().hasClass("hidden2")) {
			$(this).css("background", "none");
			$(this).css("cursor", "default");
		}
	}).click(function(e) {
		showContent( $(this) ); // �󼼳��� ���
		showContentStyle( $(this) ); // �󼼳��� ȿ��
		controlShowBtn( $(this) ); // ��ġ�� ��ư ����
	});
}

function showContent(func) { // �󼼳��� ���
	$(".m_overHidden").addClass("hidden2");
	$(func).next().removeClass("hidden2");
}

function showContentStyle(func) { // �󼼳��� ȿ��
	if (!$(func).next().hasClass("hidden2")) {
		$(".m_over").css("background", "none");
		$("#" + $(func).attr('id')).css("background", "#fff9eb");
	}
}

function controlShowBtn(func) { // ��ġ�� ��ư ����
	if ( $(func).children(":last-child").children().html() == "��" ) {
		changeBtn( $(func).children().html() );
	} else {
		changeBtn(0);
		$(".m_overHidden").addClass("hidden2");
	}
}

function changeBtn(no) { // ��ġ�� ���߱� ó��
	$(".typeTextAll").html("��");
	$(".typeTextAll").removeClass("showContent");
	$(".typeTextAll").addClass("closeContent");

	$("#typeText_" + no).html("��");
	$("#typeText_" + no).removeClass("closeContent");
	$("#typeText_" + no).addClass("showContent");
}