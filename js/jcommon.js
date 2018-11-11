
/*
 * Element 확장자 Check
 * ex : checkFile(name,val)
 * @return : 
 */
function checkFile(name,val) {
	var fileName = "";
	
	if (fileName == val) {
		return false;
		
	} else {
		var thumbext = val; //파일을 추가한 input 박스의 값
		thumbext = thumbext.slice(thumbext.indexOf(".") + 1).toLowerCase(); //파일 확장자를 잘라내고, 비교를 위해 소문자로 만듭니다.

		if(thumbext == "jpg" || thumbext == "png" ||  thumbext == "gif"){ //확장자를 확인합니다.
			fileName = val;
			return true;
		} else {
			alert('이미지 파일(jpg, png, gif)만 등록 가능합니다.');
			if ($.browser.msie) {
			    $("#"+fileName).replaceWith( $("#"+fileName).clone(true) );
			} else {
			    $("#"+fileName).val('');
			}
			return false;
		}
	}
}

//확장자 컨트롤
function checkimg(val, id) {
	var thumbext = val; //파일을 추가한 input 박스의 값
	thumbext = thumbext.slice(thumbext.indexOf(".") + 1).toLowerCase(); //파일 확장자를 잘라내고, 비교를 위해 소문자로 만듭니다.

	if(thumbext == "jpg" || thumbext == "png" ||  thumbext == "gif"){ //확장자를 확인합니다.
			return true;
	} else {
		alert('이미지 파일(jpg, png, gif, bmp)만 등록 가능합니다.');
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
 * @param : 체크할 id
 * @param : 체크후 반환할 text
 * @return : boolean
 */
function isSelectNullChk(id, title) {
	var val = $("#" + id + " option:selected").val();
	var len = val.length;
	
    if (len > 0) {
        return true;
    } else {
    	alert(title + " 을(를) 선택해 주세요");
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
 * Element Character Type별 Check
 * ex : initSetCharType(element)
 * @param : element
 * @return : 
 */
function initSetCharType(elem) {
    /* 한글만 */
    if ( elem.attr("chartype") == "kor" ) {
        elem.css("ime-mode", "active");
        elem.bind("blur", function (event) {
            setKoreanOnlyBlur(event);
        });
    
    /* 한글 + 숫자 */
    } else if ( elem.attr("chartype") == "kornum" ) {
        elem.css("ime-mode", "active");
        elem.bind("blur", function (event) {
            setKorNumOnlyBlur(event);
        });
        
    /* 한글 + 영문 */
    } else if ( elem.attr("chartype") == "koreng" ) {
        elem.css("ime-mode", "auto");
        elem.bind("blur", function (event) {
            setKorEngOnlyBlur(event);
        });
        
    /* 한글 + 영문 + 숫자 */
    } else if ( elem.attr("chartype") == "korengnum" ) {
        elem.css("ime-mode", "auto");
        elem.bind("blur", function (event) {
            setKorEngNumOnlyBlur(event);
        });
        
    /* 영어만 */
    } else if ( elem.attr("chartype") == "eng" ) {
        elem.css("ime-mode", "inactive");
        elem.bind("blur", function (event) {
            setEnglishOnlyBlur(event);
        });
        
    /* 영어 + 숫자 */
    } else if ( elem.attr("chartype") == "engnum" ) {
        elem.css("ime-mode", "inactive");
        elem.bind("blur", function (event) {
            setEngNumOnlyBlur(event);
        });
        
    /* 실수형 */
    } else if ( elem.attr("chartype") == "float" ) {
        elem.css("ime-mode", "disabled");
        elem.bind("blur", function (event) {
            setFloatOnlyBlur(event);
        });
        
    /* 정수형 */
    } else if ( elem.attr("chartype") == "int" ) {
        elem.css("ime-mode", "disabled");
        elem.bind("blur", function (event) {
            setIntegerOnlyBlur(event);
        });
        
    /* 숫자만 */
    } else if ( elem.attr("chartype") == "onlynum" ) {
        elem.css("ime-mode", "disabled");
        
        elem.bind("keypress", function (event) {
            setNumberOnlyPress(event);
        });
        
        elem.bind("blur", function (event) {
            setNumberOnlyBlur(event);
        });
        
    /* 정수로만 된 아주 기본적인 금액 표시 */
    } else if ( elem.attr("chartype") == "money" ) {
        elem.css({"text-align":"right", "ime-mode":"disabled"});
        elem.bind("blur", function (event) {
            setMoneyBlur(event);
        });
        
    /* 실수형 금액 */
    } else if ( elem.attr("chartype") == "floatmoney" ) {
        elem.css({"text-align":"right", "ime-mode":"disabled"});
        elem.bind("blur", function (event) {
            setFloatMoneyBlur(event);
        });
        
    /* 이메일 형식 */
    } else if ( elem.attr("chartype") == "email" ) {
        elem.css("ime-mode", "inactive");
        elem.bind("blur", function (event) {
            setEmailOnlyBlur(event);
        });
        
    /* ID 형식체크 */
    } else if ( elem.attr("chartype") == "id" ) {
        elem.css("ime-mode", "inactive");
        elem.bind("blur", function (event) {
            setIDOnlyBlur(event);
        });
    }
}

/*
 * 이벤트 체크 : Firefox 와 호환을 위함
 * ex : checkEvent(event)
 * @param : event
 */
function checkEvent(event) {
    /* IE 일 경우 */
    if (!event) {
        event = window.event;
        event.target = event.srcElement;
        event.which = event.keyCode;
    }
    return event;
}

/*
 * 키 입력시 한글만 입력받기 (blur 버젼)
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
            alert(title + "한글만 입력 가능합니다!");
            event.target.value = "";
            event.target.focus();
            return false;
        }
    }
}

/*
 * 키 입력시 한글+숫자만 입력받기 (blur 버젼)
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
            alert(title + "한글, 숫자만 입력 가능합니다!");
            event.target.value = "";
            event.target.focus();
            return false;
        }
    }
}

/*
 * 키 입력시 숫자만 입력받기 (keypress 버젼)
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
 * 키 입력시 숫자만 입력받기 (blur 버젼)
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
            alert(title + "숫자만 입력 가능합니다!");
            event.target.value = "";
            event.target.focus();
            return false;
        }
    }
}

/*
 * 키 입력시 한글 + 영문만 입력받기 (blur 버젼)
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
				alert(title + "한글, 영어만 입력 가능합니다!");
				event.target.value = "";
				event.target.focus();
				return false;
			}
        }
    }
}

/*
 * 키 입력시 한글 + 영문만 입력받기 (blur 버젼)
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
				alert(title + "한글,영어,숫자만 입력 가능합니다!");
				event.target.value = "";
				event.target.focus();
				return false;
			}
        }
    }
}

/*
 * 키 입력시 영문만 입력받기 (blur 버젼)
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
            alert(title + "영어만 입력 가능합니다!");
            event.target.value = "";
            event.target.focus();
            return false;
        }
    }
}

/*
 * 키 입력시 영문+숫자만 입력받기 (blur 버젼)
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
            alert(title + "영어,숫자만 입력 가능합니다!");
            event.target.value = "";
            event.target.focus();
            return false;
        }
    }
}

/*
 * 키 입력시 실수만 입력받기 (blur 버젼)
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
        
        // - 만 입력됐을 경우
        if (evtValueLength == 1 && pKey == 45) {
            alert(title + "- 만 입력될 수 없습니다!");
            event.target.focus();
            return false;
        }
        
        // 입력 값중 '.'가 맨 앞이나 맨 뒤에 존재할 경우 경고 메세지
        if ((i == 0 && pKey == 46) || (i == (evtValueLength-1) && pKey == 46)) {
            alert(title + "소수점은 맨 앞이나 맨 뒤에 있을 수 없습니다!");
            event.target.value = "";
            event.target.focus();
            return false;
        }
        
        // 소수점 이상의 수일 경우
        if (i < floatPoint) {
            if ( ((floatPoint-1)-i)%4 == 3 && (floatPoint-1) != 0 && elval.charAt(i) == ',' ) continue;
            if ( i == 0 && elval.charAt(i) == '-' ) continue;
        }
        
        if (i > floatPoint && elval.charAt(i) == '.') {
            alert(title + "소수점은 한개 이상 있을 수 없습니다!");
            event.target.focus();
            return false;
        }
        
        // 입력값 중 '-' 가 중간에 존재할 경우 경고 메세지
        if (i != 0 && pKey == 45) {
            alert(title + "- 는 입력값 중 맨 앞에만 존재하여야 합니다!");
            event.target.focus();
            return false;
        }
        
        if ( !(pKey > 47 && pKey < 58) && !(pKey == 45 || pKey == 46) ) {
            alert(title + "숫자, . , - 만 입력 가능합니다!");
            reset();
			event.target.focus();
			
            return false;
        }
    }
}

/*
 * 키 입력시 정수만 입력받기 (blur 버젼)
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
        
        // - 만 입력했을 경우
        if (evtValueLength == 1 && pKey == 45) {
            alert(title + "- 만 입력할 수 없습니다!");
            event.target.focus();
            return false;
        }
        
        if(((evtValueLength-1)-i)%4 == 3 && (evtValueLength-1) != 0 && elval.charAt(i) == ',' ) continue;
        if(i == 0 && elval.charAt(i) == '-' ) continue;
        
        // 입력값 중 '-' 가 중간에 존재할 경우 경고 메세지
        if (i != 0 && pKey == 45) {
            alert(title + "- 는 입력값 중 맨 앞에만 존재하여야 합니다!");
            event.target.focus();
            return false;
        }
        
        if ( !(pKey > 47 && pKey < 58) && !(pKey == 45) ) {
            alert(title + "숫자만 입력 가능합니다!");
            event.target.focus();
            return false;
        }
    }
}

/*
 * 키 입력시 money(숫자만 입력, 3자리마다 ',' 처리) 입력받기 (blur 버젼)
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
 * 키 입력시 money('.',숫자만 입력, 3자리마다 ',' 처리) 입력받기 (blur 버젼)
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
    
    // 처음 값이 0이고 다음 값이 .이 아닐 경우
    if (tempV.charAt(0) == "0" && floatnum == "") {
        while(tempV.charAt(0) == "0") {
            tempV = tempV.substring(1);
        }
    }
    
    // 처음값이 - 이고 두번째 값이 0 일때 세번째값이 . 가 아닐 경우
    if (tempV.charAt(0) == "-" && tempV.charAt(1) == "0" && floatnum == "") {
        while (tempV.charAt(1) == "0") {
            tempV = "-" + tempV.substring(2);
        }
    }
    
    // 소수점 앞에 값이 숫자가 아닌 경우
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
 * E-Mail 형식의 입력 받기 (blur 버젼)
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
        alert(title + "이메일 형식만 입력 가능합니다!");
        event.target.focus();
        return false;
    }
}

/*
 * E-Mail 형식 Check
 * ex : getEmailCheck(email)
 * @param : email
 */
function getEmailCheck(email) {
    var emailReg = /^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+)$/;
    
    if (!emailReg.test(email)) {
        alert("이메일 형식에 맞지 않습니다.");
        return;
    }
}

/*
 * ID 형식의 입력 받기 (blur 버젼)
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
        alert(title + "의 첫글자는 영문이어야 합니다!");
        event.target.focus();
        return false;
    }
    
    if (idReg2.test(elval) || empReg.test(elval)) {
        alert(title + "는 영문,숫자,-,_ 만 사용할 수 있습니다!");
        event.target.focus();
        return false;
    }
}




/*
 * FORM Validation Check 
 * ex : validateForm(form)
 * @param : 체크할 form
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
  * @param : 체크할 form
  * @return : boolean
  */
function validate(target) 
{
    var $input = target.find("input");
	var $select = target.find("select");

    for ( var i = 0; i < $input.size(); i++ ) {
        if ( $input.eq(i).attr("nullable") == "true" && $input.eq(i).attr("nullable") != "" ) {
            /* 필수 여부 체크 */
            if ( getTxtBkmgRmov($input.eq(i).val()) == "" ) {
                if ( $input.eq(i).attr("title") ) {
                    alert("["+$input.eq(i).attr("title")+"] 항목은 필수입니다.");
                } else {
                    alert("필수 항목입니다.");
                }
                
                $input.eq(i).focus();
                return false;
            } else {
                /* 최대 바이트 체크 */
                if ( $input.eq(i).attr("maxbyte") != null && $input.eq(i).attr("maxbyte") != undefined && $input.eq(i).attr("maxbyte") != "" ) {
                    if ( !validationMaxByte($input.eq(i).val(), $input.eq(i).attr("maxbyte")) ) {
                        var errMsg = "입력을 % 자리로 해주십시오."+"(BYTE)";
                        
                        /* minbyte 까지 설정되어 있는 경우 */
                        if ( $input.eq(i).attr("minbyte") != null && $input.eq(i).attr("minbyte") != undefined && $input.eq(i).attr("minbyte") != "" ) {
                            /* min, max 의 값이 동일한 경우 */
                            if ( $input.eq(i).attr("minbyte") == $input.eq(i).attr("maxbyte") ) {
                                errMsg = errMsg.replace("%", $input.eq(i).attr("maxbyte"));
                            } else {
                                errMsg = errMsg.replace("%", $input.eq(i).attr("minbyte") + " ~ " + $input.eq(i).attr("maxbyte"));
                            }
                            
                        /* maxbyte 만 설정되어 있는 경우 */
                        } else {
                            errMsg = errMsg.replace("%", $input.eq(i).attr("maxbyte"));
                        }
                        
                        /* 에러메세지 출력 */
                        if ( $input.eq(i).attr("title") != undefined && $input.eq(i).attr("title") != "" ) {
                            alert("[" + $input.eq(i).attr("title") + "] " + errMsg);
                        } else {
                            alert(errMsg);
                        }
                        
                        $input.eq(i).focus();
                        return false;
                    }
                }
                
                /* 최소 바이트 체크 */
                if ( $input.eq(i).attr("minbyte") != undefined && $input.eq(i).attr("minbyte") != "" ) {
                    if ( $input.eq(i).val().length == 0 || ( !validationMinByte($input.eq(i).val(), $input.eq(i).attr("minbyte")) ) ) {
                        var errMsg = "입력을 % 자리로 해주십시오."+"(BYTE)";
                        
                        /* maxbyte 설정되어 있는 경우 */
                        if ( $input.eq(i).attr("maxbyte") != undefined && $input.eq(i).attr("maxbyte") != "" ) {
                            // min, max 의 값이 동일하면 범위없이 값만 찍어준다.
                            if ( $input.eq(i).attr("minbyte") == $input.eq(i).attr("maxbyte") ) {
                                errMsg = errMsg.replace("%", $input.eq(i).attr("minbyte"));
                            } else {
                                errMsg = errMsg.replace("%", $input.eq(i).attr("minbyte") + " ~ " + $input.eq(i).attr("maxbyte"));

                            }
                            
                        /* minbyte 만 설정되어 있는 경우 */
                        } else {
                            errMsg = errMsg.replace("%", $input.eq(i).attr("minbyte") + " ~ ");
                        }
                        
                        /* 에러메세지 출력 */
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
                        alert("[" + $input.eq(i).attr("title") + "]는 영문대문자,영문소문자,숫자,특수문자 조합으로 입력해야 합니다!");
                        $input.eq(i).focus().select();
                        return false;
                    }
                }
            }
        } else if ( $.trim($input.eq(i).val()) != "" ) {
            /* 최대 바이트 체크 */
            if ( $input.eq(i).attr("maxbyte") != null && $input.eq(i).attr("maxbyte") != undefined && $input.eq(i).attr("maxbyte") != "" ) {
                if ( !validationMaxByte($input.eq(i).val(), $input.eq(i).attr("maxbyte")) ) {
                    var errMsg = "입력을 % 자리로 해주십시오."+"(BYTE)";
                    
                    /* minbyte 까지 설정되어 있는 경우 */
                    if ( $input.eq(i).attr("minbyte") != null && $input.eq(i).attr("minbyte") != undefined && $input.eq(i).attr("minbyte") != "" ) {
                        /* min, max 의 값이 동일한 경우 */
                        if ( $input.eq(i).attr("minbyte") == $input.eq(i).attr("maxbyte") ) {
                            errMsg = errMsg.replace("%", $input.eq(i).attr("maxbyte"));
                        } else {
                            errMsg = errMsg.replace("%", $input.eq(i).attr("minbyte") + " ~ " + $input.eq(i).attr("maxbyte"));
                        }
                        
                    /* maxbyte 만 설정되어 있는 경우 */
                    } else {
                        errMsg = errMsg.replace("%", $input.eq(i).attr("maxbyte"));
                    }
                    
                    /* 에러메세지 출력 */
                    if ( $input.eq(i).attr("title") != undefined && $input.eq(i).attr("title") != "" ) {
                        alert("[" + $input.eq(i).attr("title") + "] " + errMsg);
                    } else {
                        alert(errMsg);
                    }
                    
                    $input.eq(i).focus();
                    return false;
                }
            }
             
            /* 최소 바이트 체크 */
            if ( $input.eq(i).attr("minbyte") != undefined && $input.eq(i).attr("minbyte") != "" ) {
                if ( $input.eq(i).val().length == 0 || ( !validationMinByte($input.eq(i).val(), $input.eq(i).attr("minbyte")) ) ) {
                    var errMsg = "입력을 % 자리로 해주십시오."+"(BYTE)";
                    
                    /* maxbyte 설정되어 있는 경우 */
                    if ( $input.eq(i).attr("maxbyte") != undefined && $input.eq(i).attr("maxbyte") != "" ) {
                        
                        // min, max 의 값이 동일하면 범위없이 값만 찍어준다.
                        if ( $input.eq(i).attr("minbyte") == $input.eq(i).attr("maxbyte") ) {
                            errMsg = errMsg.replace("%", $input.eq(i).attr("minbyte"));
                        } else {
                            errMsg = errMsg.replace("%", $input.eq(i).attr("minbyte") + " ~ " + $input.eq(i).attr("maxbyte"));
                        }
                        
                    /* minbyte 만 설정되어 있는 경우 */
                    } else {
                        errMsg = errMsg.replace("%", $input.eq(i).attr("minbyte") + " ~ ");
                    }
                    
                    /* 에러메세지 출력 */
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
            /* 필수 여부 체크 */
            if ( getTxtBkmgRmov($input.eq(i).val()) == "" ) {
                if ( $input.eq(i).attr("title") ) {
                    alert("["+$input.eq(i).attr("title")+"] 항목은 필수입니다.");
                } else {
                    alert("필수 항목입니다.");
                }
                
                $input.eq(i).focus();
                return false;
            } else {
                /* 최대 바이트 체크 */
                if ( $input.eq(i).attr("maxbyte") != null && $input.eq(i).attr("maxbyte") != undefined && $input.eq(i).attr("maxbyte") != "" ) {
                    if ( !validationMaxByte($input.eq(i).val(), $input.eq(i).attr("maxbyte")) ) {
                        var errMsg = "입력을 % 자리로 해주십시오."+"(BYTE)";
                        
                        /* minbyte 까지 설정되어 있는 경우 */
                        if ( $input.eq(i).attr("minbyte") != null && $input.eq(i).attr("minbyte") != undefined && $input.eq(i).attr("minbyte") != "" ) {
                            /* min, max 의 값이 동일한 경우 */
                            if ( $input.eq(i).attr("minbyte") == $input.eq(i).attr("maxbyte") ) {
                                errMsg = errMsg.replace("%", $input.eq(i).attr("maxbyte"));
                            } else {
                                errMsg = errMsg.replace("%", $input.eq(i).attr("minbyte") + " ~ " + $input.eq(i).attr("maxbyte"));
                            }
                            
                        /* maxbyte 만 설정되어 있는 경우 */
                        } else {
                            errMsg = errMsg.replace("%", $input.eq(i).attr("maxbyte"));
                        }
                        
                        /* 에러메세지 출력 */
                        if ( $input.eq(i).attr("title") != undefined && $input.eq(i).attr("title") != "" ) {
                            alert("[" + $input.eq(i).attr("title") + "] " + errMsg);
                        } else {
                            alert(errMsg);
                        }
                        
                        $input.eq(i).focus();
                        return false;
                    }
                }
                
                /* 최소 바이트 체크 */
                if ( $input.eq(i).attr("minbyte") != undefined && $input.eq(i).attr("minbyte") != "" ) {
                    if ( $input.eq(i).val().length == 0 || ( !validationMinByte($input.eq(i).val(), $input.eq(i).attr("minbyte")) ) ) {
                        var errMsg = "입력을 % 자리로 해주십시오."+"(BYTE)";
                        
                        /* maxbyte 설정되어 있는 경우 */
                        if ( $input.eq(i).attr("maxbyte") != undefined && $input.eq(i).attr("maxbyte") != "" ) {
                            // min, max 의 값이 동일하면 범위없이 값만 찍어준다.
                            if ( $input.eq(i).attr("minbyte") == $input.eq(i).attr("maxbyte") ) {
                                errMsg = errMsg.replace("%", $input.eq(i).attr("minbyte"));
                            } else {
                                errMsg = errMsg.replace("%", $input.eq(i).attr("minbyte") + " ~ " + $input.eq(i).attr("maxbyte"));

                            }
                            
                        /* minbyte 만 설정되어 있는 경우 */
                        } else {
                            errMsg = errMsg.replace("%", $input.eq(i).attr("minbyte") + " ~ ");
                        }
                        
                        /* 에러메세지 출력 */
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
                        alert("[" + $input.eq(i).attr("title") + "]는 영문대문자,영문소문자,숫자,특수문자 조합으로 입력해야 합니다!");
                        $input.eq(i).focus().select();
                        return false;
                    }
                }
            }
        } else if ( $.trim($input.eq(i).val()) != "" &&  $.trim($input.eq(i).val()) != "만원단위로 적어주세요."  &&  $.trim($input.eq(i).val()) != "%단위로 적어주세요." ) {
            /* 최대 바이트 체크 */
            if ( $input.eq(i).attr("maxbyte") != null && $input.eq(i).attr("maxbyte") != undefined && $input.eq(i).attr("maxbyte") != "" ) {
                if ( !validationMaxByte($input.eq(i).val(), $input.eq(i).attr("maxbyte")) ) {
                    var errMsg = "입력을 % 자리로 해주십시오."+"(BYTE)";
                    
                    /* minbyte 까지 설정되어 있는 경우 */
                    if ( $input.eq(i).attr("minbyte") != null && $input.eq(i).attr("minbyte") != undefined && $input.eq(i).attr("minbyte") != "" ) {
                        /* min, max 의 값이 동일한 경우 */
                        if ( $input.eq(i).attr("minbyte") == $input.eq(i).attr("maxbyte") ) {
                            errMsg = errMsg.replace("%", $input.eq(i).attr("maxbyte"));
                        } else {
                            errMsg = errMsg.replace("%", $input.eq(i).attr("minbyte") + " ~ " + $input.eq(i).attr("maxbyte"));
                        }
                        
                    /* maxbyte 만 설정되어 있는 경우 */
                    } else {
                        errMsg = errMsg.replace("%", $input.eq(i).attr("maxbyte"));
                    }
                    
                    /* 에러메세지 출력 */
                    if ( $input.eq(i).attr("title") != undefined && $input.eq(i).attr("title") != "" ) {
                        alert("[" + $input.eq(i).attr("title") + "] " + errMsg);
                    } else {
                        alert(errMsg);
                    }
                    
                    $input.eq(i).focus();
                    return false;
                }
            }
            
            /* 최소 바이트 체크 */
            if ( $input.eq(i).attr("minbyte") != undefined && $input.eq(i).attr("minbyte") != "" ) {
                if ( $input.eq(i).val().length == 0 || ( !validationMinByte($input.eq(i).val(), $input.eq(i).attr("minbyte")) ) ) {
                    var errMsg = "입력을 % 자리로 해주십시오."+"(BYTE)";
                    
                    /* maxbyte 설정되어 있는 경우 */
                    if ( $input.eq(i).attr("maxbyte") != undefined && $input.eq(i).attr("maxbyte") != "" ) {
                        
                        // min, max 의 값이 동일하면 범위없이 값만 찍어준다.
                        if ( $input.eq(i).attr("minbyte") == $input.eq(i).attr("maxbyte") ) {
                            errMsg = errMsg.replace("%", $input.eq(i).attr("minbyte"));
                        } else {
                            errMsg = errMsg.replace("%", $input.eq(i).attr("minbyte") + " ~ " + $input.eq(i).attr("maxbyte"));
                        }
                        
                    /* minbyte 만 설정되어 있는 경우 */
                    } else {
                        errMsg = errMsg.replace("%", $input.eq(i).attr("minbyte") + " ~ ");
                    }
                    
                    /* 에러메세지 출력 */
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
 * 최대 byte 체크 로직 
 * ex : validationMaxByte(value, number)
 * @param : 체크할 String value
 * @param : 최대 byte
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
 * 최소 byte 체크 로직 
 * ex : validationMinByte(value, number)
 * @param : 체크할 String value
 * @param : 최소 byte
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
 * 문자열의 byte 길이 구하기 
 * ex : calculate_msglen(message)
 * @param : 체크할 String message
 * @return : 문자열의 byte 길이
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
 * Password 형식체크(영문+숫자+특수문자 각각 1글자씩 포함)
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
 * 문자열 특수문자 검색
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
 * Left, Right 공백제거
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
            alert("데이타 조회시 에러가 발생했습니다.\n 시스템관리자에게 문의바랍니다.");
        }
        , success : callbackJSON
    });
}

/*
 * 우편번호조회 팝업 호출
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
// 취급품목 컨트롤
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

// 취급품목 컨트롤
function treatCateControl(val) {
	$("#treatCategory2").html("");
	var obj = "<option value=''>선택</option>";

	if (val == "FF") {
		obj = obj + "<option value='F1'>FF</option>"
		obj = obj + "<option value='F2'>빵</option>"

	} else if (val == "FD") {
		obj = obj + "<option value='D1'>음료, 주류</option>"
		obj = obj + "<option value='D2'>냉동, 냉장, 유제품</option>"
		obj = obj + "<option value='D3'>과자, 일반식품</option>"

	} else if (val == "IT") {
		obj = obj + "<option value='T1'>일상용품</option>"
		obj = obj + "<option value='T2'>생활잡화</option>"
		obj = obj + "<option value='T3'>서비스</option>"

	}

	$("#treatCategory2").append(obj);
}

/*
* 추천점포 & FAQ 게시판 용 2015-04-17
*/

function mouseOverClick() { // 펼치기 감추기 처리
	// tr & block 셋팅
	$(".m_over").mouseover(function(e) {
		$(this).css("background", "#fff9eb");
		$(this).css("cursor", "pointer");
	}).mouseout(function(e) {
		if ($(this).next().hasClass("hidden2")) {
			$(this).css("background", "none");
			$(this).css("cursor", "default");
		}
	}).click(function(e) {
		showContent( $(this) ); // 상세내용 출력
		showContentStyle( $(this) ); // 상세내용 효과
		controlShowBtn( $(this) ); // 펼치기 버튼 제어
	});
}

function showContent(func) { // 상세내용 출력
	$(".m_overHidden").addClass("hidden2");
	$(func).next().removeClass("hidden2");
}

function showContentStyle(func) { // 상세내용 효과
	if (!$(func).next().hasClass("hidden2")) {
		$(".m_over").css("background", "none");
		$("#" + $(func).attr('id')).css("background", "#fff9eb");
	}
}

function controlShowBtn(func) { // 펼치기 버튼 제어
	if ( $(func).children(":last-child").children().html() == "∨" ) {
		changeBtn( $(func).children().html() );
	} else {
		changeBtn(0);
		$(".m_overHidden").addClass("hidden2");
	}
}

function changeBtn(no) { // 펼치기 감추기 처리
	$(".typeTextAll").html("∨");
	$(".typeTextAll").removeClass("showContent");
	$(".typeTextAll").addClass("closeContent");

	$("#typeText_" + no).html("∧");
	$("#typeText_" + no).removeClass("closeContent");
	$("#typeText_" + no).addClass("showContent");
}