/**
 * 顯示未審核加班的人員列表
 */
$(document).ready(function(){
	var OverTimeType,OverTimeType1,OverTimeCal,ItemNumber,SelectedEmps;//加班類型,時間
	var pattern = new RegExp("[;']"); 
	var selectedOTEmpIDs=new Array();//報加班的員工id
	var WorkContent;//工作內容
	var HolidayType = "N";//假日類型,默認正常類型
	var ClassNo,WorkshopNo,LineNo,RCNO,AssistantAccount,
		OverTimeDate,IsIdentified,IsAbnormal,OverTimeTypeText='';
	var SDate='2017-12-26',EDate='2017-12-26',ItemNumber='';
	var currentClassNoInfo;
	var overTimeEmps=new Array();
	checkPwTime();
	var checkdepid;
	var modifyEmpBoundA=new Array();
	var modifyEmpBoundB=new Array();
	var modifyEmpBonusA=new Array();
	var modifyEmpBonusB=new Array();
	init();
	GetHoliday();
	
//	$('#workcontent').bind('keyup', function(){
//        var a =$('#workcontent').val().replace(/[^\a-\z\A-\Z0-9\.\,\-\_\;\$]/g,'');
//        console.log(123)
//        console.log(a)
//      })
	
	$(document).ajaxSend(function(event, request, settings) {
	    $('#ajaxLoader').show();
	});

	$(document).ajaxComplete(function(event, request, settings) {
	    $('#ajaxLoader').hide();
	});
	
	$('#uploadEmpIdFile').change(function(){  	
		getFileContent(this, function (str) {
			var exportEmpId=str.replace(/\s+/g,',').replace(/,$/,"");
			$('#importEmpIdSum').text(exportEmpId.split(",").length);
	        var exportEmpIdArray=exportEmpId.split(",");
			var allEmpIds=new Array();
			$(":checkbox[name='selectedEmp']").each(function(){				
				allEmpIds.push($(this).val());
				});
			
			  for (var i = 0; i < allEmpIds.length; i++) {
                  //$.inArray函数功能是判断所选元素是否在数组里，不在返回-1，其他返回0++
                  var res = $.inArray(allEmpIds[i], exportEmpIdArray);
                  if (res != -1) {
                	  var overTimehour =  $(":checkbox[value='"+allEmpIds[i]+"']").parents("tr").children().eq(9).text();
      				if(overTimehour=="0"){
      					$(this).children().children().eq(0).prop('checked',false);
      					 $(":checkbox[value='"+allEmpIds[i]+"']").parents("tr").attr("style", "background-color: white"); 
    				}else{     				
                	  $(":checkbox[value='"+allEmpIds[i]+"']").prop("checked",true);
                	  $(":checkbox[value='"+allEmpIds[i]+"']").parents("tr").attr("style", "background-color: #e6f0fc"); 
    				}
                  }
              }
			  
            });	   
		 $('#uploadEmpIdFile').val('');
	});
	
	$('#selectedAllEmps').change(function(){
		if(this.checked){
			$('#OTPendingEmpTable tbody tr').each(function(){
				var id = $(this).children().eq(2).text();
				var overTimehour = $(this).children().eq(9).text();
				//var dghour = $(this).children().eq(11).text();
				var depid=$(this).children().eq(4).text();
				var dghour;
				 if(IsAbnormal==1){
						if(modifyEmpBonusA.indexOf(id)!=-1||modifyEmpBonusB.indexOf(id)!=-1){
							  dghour = $(this).children().eq(11).find('option:selected').eq(0).text();
						}else{
							 dghour = $(this).children().eq(11).text();
						}		
					}else{
						if(modifyEmpBoundA.indexOf(id)!=-1||modifyEmpBoundB.indexOf(id)!=-1){
							  dghour = $(this).children().eq(11).find('option:selected').eq(0).text();
						}else{
							 dghour = $(this).children().eq(11).text();
						}		
					}
				if(overTimehour=="0"&&dghour=="0"){
					$(this).children().children().eq(0).prop('checked',false);
					$(this).attr("style", "background-color: white"); 
				}else{
				    $(this).children().children().eq(0).prop('checked',true);
				    $(this).attr("style", "background-color: #e6f0fc"); 
				}
				
			});
			
		}
		else{
			$('#OTPendingEmpTable tbody tr').each(function(){
				$(this).attr("style", "background-color: white"); 
				$(this).children().children().eq(0).prop('checked',false);
			});
		}
	});
	
	$('#selectedIndirectEmps').change(function(){
		if(this.checked){
			$('#OTPendingEmpTable tbody tr').each(function(){
				var id = $(this).children().eq(2).text();
				var overTimehour = $(this).children().eq(9).text();
				var directType = $(this).children().eq(6).text();
				//var dghour = $(this).children().eq(11).text();
				var depid=$(this).children().eq(4).text();
				var dghour;
				 if(IsAbnormal==1){
						if(modifyEmpBonusA.indexOf(id)!=-1||modifyEmpBonusB.indexOf(id)!=-1){
							  dghour = $(this).children().eq(11).find('option:selected').eq(0).text();
						}else{
							 dghour = $(this).children().eq(11).text();
						}		
					}else{
						if(modifyEmpBoundA.indexOf(id)!=-1||modifyEmpBoundB.indexOf(id)!=-1){
							  dghour = $(this).children().eq(11).find('option:selected').eq(0).text();
						}else{
							 dghour = $(this).children().eq(11).text();
						}		
					}
				if(directType=="I"){
					if(overTimehour=="0"&&dghour=="0"){
						$(this).children().children().eq(0).prop('checked',false);
						$(this).attr("style", "background-color: white"); 
					}else{
					    $(this).children().children().eq(0).prop('checked',true);
					    $(this).attr("style", "background-color: #e6f0fc"); 
					}
				}
				
			});
			
		}
		else{
			$('#OTPendingEmpTable tbody tr').each(function(){
				$(this).attr("style", "background-color: white"); 
				$(this).children().children().eq(0).prop('checked',false);
			});
		}
	})
		
	$('#overtimeCal').change(function(){
		//選擇時間觸發的事件
		OverTimeCal=$(this).find('option:selected').val();
		//呼叫計算加班時數的function
	//	GetPendingEmpList(WorkshopNo,RCNO,ClassNo,OverTimeDate,IsIdentified,IsAbnormal,false,OverTimeCal,currentClassNoInfo);
		var selectOverTimeDate = new Date(OverTimeDate);
		var weekday=new Array(7);
		weekday[0]="星期日";
		weekday[1]="星期一";
		weekday[2]="星期二";
		weekday[3]="星期三";
		weekday[4]="星期四";
		weekday[5]="星期五";
		weekday[6]="星期六";
		if(HolidayType == "N"){
			var vdate = OverTimeDate.replace(/-/g, '/');
			var monthDate = new Date(vdate);
			var OTDate = ""+(monthDate.getMonth()+1)+monthDate.getDate();
			if(OTDate=="38"){
				alert("今天為婦女節，加班一在實時系統提報，若要提報加班三，請用聯絡單提報");
			}
			if(weekday[selectOverTimeDate.getDay()]=="星期日" || weekday[selectOverTimeDate.getDay()]=="星期六"){
				if(OverTimeCal=="2"){
					GetCalOverTimeFromServer(WorkshopNo,LineNo,RCNO,ClassNo,OverTimeDate,
							OverTimeCal,ItemNumber,IsAbnormal);
				}else if(OverTimeCal=="1"){
					alert("報加班的日期為"+weekday[selectOverTimeDate.getDay()]+",是否選擇正常班？")
					GetCalOverTimeFromServer(WorkshopNo,LineNo,RCNO,ClassNo,OverTimeDate,
							OverTimeCal,ItemNumber,IsAbnormal);
				}
			}
			else{
				if(OverTimeCal=="2"){
					alert("報加班的日期為"+weekday[selectOverTimeDate.getDay()]+",正常班不允許選假日班時間類型，如果為調班，加班二的部分請用聯絡單作業！！！")
					/*if (confirm("報加班的日期為"+weekday[selectOverTimeDate.getDay()]+",您確定報假日班嗎？")) {
						GetCalOverTimeFromServer(WorkshopNo,LineNo,RCNO,ClassNo,OverTimeDate,
							OverTimeCal,ItemNumber,IsAbnormal);
					}*/
					$(this).prop('selectedIndex', 0);
				}
				else{
					GetCalOverTimeFromServer(WorkshopNo,LineNo,RCNO,ClassNo,OverTimeDate,
						OverTimeCal,ItemNumber,IsAbnormal);
				}
			}
		}else if(HolidayType == "L" || HolidayType == "S"){
			if(OverTimeCal=="1"){
				alert("今日為法定節假日或法定節假日補休，只允許選假日班時間類型！")
				/*if (confirm("報加班的日期為"+weekday[selectOverTimeDate.getDay()]+",您確定報正常班嗎？")) {
					GetCalOverTimeFromServer(WorkshopNo,LineNo,RCNO,ClassNo,OverTimeDate,
						OverTimeCal,ItemNumber,IsAbnormal);
				}*/
				$(this).prop('selectedIndex', 0);
			}
			else{
				GetCalOverTimeFromServer(WorkshopNo,LineNo,RCNO,ClassNo,OverTimeDate,
						OverTimeCal,ItemNumber,IsAbnormal);
			}
		}
		
		
	});
	
	$('#overtimeType').change(function(){
		//加班類型改變的觸發事件
		OverTimeType=$(this).find('option:selected').val();
		switch(OverTimeType){
			case "1":
				OverTimeTypeText='延時加班';
				break;
			case "2":
				OverTimeTypeText='例假日加班';
				break;
			case "3":
				OverTimeTypeText='節假日加班';
				break;
			case "0":
				OverTimeTypeText='';
				break;
			default:
				OverTimeTypeText='';
		}
		
		var selectOverTimeDate = new Date(OverTimeDate);
		var weekday=new Array(7);
		weekday[0]="星期日";
		weekday[1]="星期一";
		weekday[2]="星期二";
		weekday[3]="星期三";
		weekday[4]="星期四";
		weekday[5]="星期五";
		weekday[6]="星期六";
		if(HolidayType == "N"){
			if(weekday[selectOverTimeDate.getDay()]=="星期日" || weekday[selectOverTimeDate.getDay()]=="星期六"){
				if(OverTimeType=="3" || OverTimeType=="1"){ //延時加班
					alert("報加班的日期為"+weekday[selectOverTimeDate.getDay()]+",只能選加班二類型！");
					$(this).prop('selectedIndex', 0);
					/*if (!confirm("報加班的日期為"+weekday[selectOverTimeDate.getDay()]+",您確定報"+OverTimeTypeText+"嗎？")) {
						OverTimeTypeText='';
					}	*/			
				}
			}
			else{
				if(OverTimeType=="2" || OverTimeType=="3"){
					alert("報加班的日期為"+weekday[selectOverTimeDate.getDay()]+",不允許報"+OverTimeTypeText+"只允許報加班一！");
					$(this).prop('selectedIndex', 0);
					/*if (!confirm("報加班的日期為"+weekday[selectOverTimeDate.getDay()]+",您確定報"+OverTimeTypeText+"嗎？")){
						OverTimeTypeText='';
					}*/				
				}
			}
		}else if(HolidayType == "S"){
			if(OverTimeType=="1" || OverTimeType=="3"){
				alert("今日為補休，只允許報加班二！");
				$(this).prop('selectedIndex', 0);
				/*if (!confirm("報加班的日期為"+weekday[selectOverTimeDate.getDay()]+",您確定報"+OverTimeTypeText+"嗎？")){
					OverTimeTypeText='';
				}*/				
			}
		}else{
			if(OverTimeType=="1" || OverTimeType=="2"){
				alert("今日為法定節假日，只允許報加班三！");
				$(this).prop('selectedIndex', 0);
				/*if (!confirm("報加班的日期為"+weekday[selectOverTimeDate.getDay()]+",您確定報"+OverTimeTypeText+"嗎？")){
					OverTimeTypeText='';
				}*/				
			}
		}
		
		/*顯示加班類型*/
		$('#OTPendingEmpTable tbody tr').each(function(){
			$(this).children().eq(10).html(OverTimeTypeText);
		});
		
	});

	/*送出加班單審核*/
	$('.OTHrsSubmitBtn').click(function(){
		OverTimeType=$('#overtimeType').find('option:selected').val();
		OverTimeType1=$('#overtimeCal').find('option:selected').val();
		WorkContent=$('#workcontent').val().trim();
		var judge = true;
		if(WorkContent != "" && WorkContent != null){  
	        if(pattern.test(WorkContent)){  
	            alert("内容存在非法字符;'請勿輸入以上字符");  
	            $("#workcontent").focus();  
	            judge = false;  
	        }  
	    }  
		OverTimeCal=$('#overtimeCal').find('option:selected').val();
		selectedOTEmpIDs=GetOTSubmitEmps();//取得選取的人員id數組
		var newHour = [];
	    //SelectedEmps=GetOTSubmitEmps(); //取得選取的人員
		if(CheckConditionValid()&&judge){
//			console.log(123)
			if (confirm("你确定提交當前選擇人員名單吗？")) {
				var OTBoolean = true;
				var OTResult;
				var max = 400;
				var length = selectedOTEmpIDs.length;
				var curlength ;
				var count = Math.ceil(length/max);
				for(var i = 0 ;i<count;i++){
					SelectedEmps='';
					OTResult=''
					if(i*max+max>=length){
						curlength = length; 
					}else{
						curlength = i*max+max;
					}
					for(var j=i*max;j<curlength;j++){
						if(j==i*max)
							SelectedEmps+=selectedOTEmpIDs[j];
						else
							SelectedEmps+='*'+selectedOTEmpIDs[j];
					}
					var OTConfirmInfo=new OThourConfirmInfo(ClassNo,RCNO,WorkshopNo,LineNo,OverTimeDate,0,null,null,
							OverTimeType,OverTimeType1,ItemNumber,SelectedEmps,IsAbnormal,WorkContent);
					OTResult = SubmitEmployeeOverTimeInfo2Server(IsAbnormal,OTConfirmInfo);
					if(OTResult != 200){
						OTBoolean = false;
						break;
					}
				}
				$('#OTPendingEmpTable tbody tr').find('input:checked').each(function(){
					$(this).each(function(){
						var xhr =$(this).parent().nextAll('td');
						var title = xhr.eq(11).text();
						console.log(title);
						var data={};
						if(title=='已修改時數'){
							data.ID = xhr.eq(1).text();
							data.OverTimeDate = xhr.eq(6).text();
							data.Bonus = xhr.eq(10).find('option:selected').text();
							newHour.push(data);
						}
					})
				})
				UpdateBonus(newHour);
				if(OTBoolean){
					alert('加班提報成功，視窗將關閉');
        			window.open('', '_self', '');
        			window.close();
				}else{
					alert(OTResult);
				}
				var OTConfirmInfo=new OThourConfirmInfo(ClassNo,RCNO,WorkshopNo,LineNo,OverTimeDate,0,null,null,
						OverTimeType,OverTimeType1,ItemNumber,SelectedEmps,IsAbnormal,WorkContent);
				SubmitEmployeeOverTimeInfo2Server(IsAbnormal,OTConfirmInfo);
				
				$('#OTPendingEmpTable tbody tr').find('input:checked').each(function(){
					$(this).each(function(){
						var xhr =$(this).parent().nextAll('td');
						var title = xhr.eq(11).text();
						console.log(title);
						var data={};
						if(title=='已修改時數'){
							data.ID = xhr.eq(1).text();
							data.OverTimeDate = xhr.eq(6).text();
							data.Bonus = xhr.eq(10).find('option:selected').text();
							newHour.push(data);
						}
					})
				})
				UpdateBonus(newHour);
			}
					
		}
		//(JSON.stringify(OThourConfirm));
	});
	
	function CheckConditionValid(){
		var alertMessage='',isValid=true;

		if(OverTimeType=="0"){
			alertMessage+='請選擇加班類型\n';
		}
		
		if(OverTimeCal=="0"){
			alertMessage+='請選擇加班時間\n'
		}
		
		if(WorkContent==""){
			alertMessage+='請填寫加班內容\n'
		}
		else if(WorkContent.length>70){
			alertMessage+='填寫加班內容不得超過70個字\n'
		}
		
		if(selectedOTEmpIDs.length=="0"){
			alertMessage+='請選擇所要提報加班的人員\n'
		}
		
		if(alertMessage.length>0){
			alert(alertMessage);
			isValid=false;
		}
		return isValid;
	}
	
	function init(callback){
		WorkshopNo=getParameterByName("WorkshopNo");
		LineNo=getParameterByName("LineNo");
		RCNO=getParameterByName("RCNO");
	//	AssistantAccount=getParameterByName("AssistantAccount");
		ClassNo=getParameterByName("ClassNo");
		OverTimeDate=getParameterByName("OverTimeDate");
		IsIdentified=getParameterByName("IsIdentified");
		IsAbnormal=getParameterByName("IsAbnormal");
		SDate=getParameterByName("SDate");
		EDate=getParameterByName("EDate");
		ItemNumber=getParameterByName("ItemNumber");
		GetClassNoFromServer(ClassNo,true);
		if(RCNO!=''){
			$('#workcontent').val(RCNO+'_'+ItemNumber);
		}
	}
	
	/*取得班別詳細資訊*/
	function GetClassNoFromServer(CurrentShift,isInit){
		$.getJSON("../Utils/ClassInfo.show?currentShift="+CurrentShift,function(result){
			currentClassNoInfo=new ClassNoInfo(result.ClassStart,result.RestStart1,result.RestEnd1,
				result.RestStart2,result.RestEnd2,result.ClassEnd,result.OvertimeStart);
			GetPendingEmpList(WorkshopNo,LineNo,RCNO,ClassNo,OverTimeDate,
					IsIdentified,IsAbnormal,null,null);
	    });
		
	}
	
	function ShowPendingEmpList(EmployeeInfos,isInit){
		var HTMLElement;
		var PendingEmpsList=new Array();
		for(var i=0;i<EmployeeInfos.length;i++){
			PendingEmpsList.push(EmployeeInfos[i].employeeID);
		}
		CheckModifyEmpA(PendingEmpsList);
		CheckModifyEmpB(PendingEmpsList);
		CheckModifyAEmpA(PendingEmpsList);
		CheckModifyAEmpB(PendingEmpsList);
		$('#OTPendingEmpTable tbody').empty();
		var j=1;
		for(var i=0;i<EmployeeInfos.length;i++){
			//將取出的資料塞入Table
			var EmpInfo=EmployeeInfos[i];
			if(isInit){
				HTMLElement='<tr><td><input type="checkbox" class="selectedEmp" name="selectedEmp" value='+EmpInfo.employeeID+'></td>'+
				'<td>'+j+'</td>'+
				'<td>'+EmpInfo.employeeID+'</td>'+
				'<td>'+EmpInfo.employeeName+'</td>'+
				'<td>'+EmpInfo.deptID+'</td>'+
				'<td>'+EmpInfo.costID+'</td>'+
				'<td>'+EmpInfo.direct+'</td>'+
				'<td>'+EmpInfo.yd+'</td>'+
				'<td></td>'+
				'<td>0</td>'+
				'<td></td>'+
				'<td>0</td>'+
				'<td></td>'+
				'<td>未審核</td></tr>';				
			}
			else{
				HTMLElement='<tr><td><input type="checkbox" class="selectedEmp" name="selectedEmp" value='+EmpInfo.employeeID+'></td>'+
				'<td>'+j+'</td>'+
				'<td>'+EmpInfo.employeeID+'</td>'+
				'<td>'+EmpInfo.employeeName+'</td>'+
				'<td>'+EmpInfo.deptID+'</td>'+
				'<td>'+EmpInfo.costID+'</td>'+
				'<td>'+EmpInfo.direct+'</td>'+
				'<td>'+EmpInfo.yd+'</td>'+
				'<td>'+EmpInfo.overTimeInterval+'</td>'+
				'<td>'+EmpInfo.overTimeHours+'</td>'+
				'<td>'+OverTimeTypeText+'</td>';
				//console.log('时数为 '+EmpInfo.bonus);
				//判断人员是属于顶岗津贴A类还是B类或者是其他
				if(modifyEmpBonusB.indexOf(EmpInfo.employeeID)!=-1){
					//判断是忘卡还是不忘卡页面
					if(IsAbnormal==1){
						HTMLElement+='<td><select>';
						HTMLElement+='<option>1</option><option>0.5</option>';
						HTMLElement+='<option selected>'+EmpInfo.bonus+'</option>'
						HTMLElement+='</select></td>';
					}else{
						//判断人员是否是B类可以有权限修改顶岗时数
						if(modifyEmpBoundB.indexOf(EmpInfo.employeeID)!=-1){
							HTMLElement+='<td><select>';
							if(EmpInfo.bonus!=0){
								var leng = Number(EmpInfo.bonus)/0.5;
								for(var z=0;z<leng+1;z++){
									var num = EmpInfo.bonus-(0.5*z);
									HTMLElement+='<option>'+num+'</option>';
								}
							}else{
								HTMLElement+='<option>'+EmpInfo.bonus+'</option>';
							}
							console.log('xxxx');
							HTMLElement+='</select></td>';
						}else{
							HTMLElement+='<td>'+EmpInfo.bonus+'</td>';
						}
					}
					//判断人员是属于顶岗津贴A类还是B类或者是其他
				}else if(modifyEmpBonusA.indexOf(EmpInfo.employeeID)!=-1) {
					//判断是忘卡还是不忘卡页面
					if(IsAbnormal==1){
						HTMLElement+='<td><select>';
						HTMLElement+='<option>2</option><option>1.5</option><option>1</option><option>0.5</option>';
						HTMLElement+='<option selected>'+EmpInfo.bonus+'</option>'
						HTMLElement+='</select></td>';
					}else{
						//判断人员是否是B类可以有权限修改顶岗时数
						if(modifyEmpBoundA.indexOf(EmpInfo.employeeID)!=-1){
							HTMLElement+='<td><select>';	
							if(EmpInfo.bonus!=0){
								var leng = Number(EmpInfo.bonus)+1;
								//console.log('leng时数 '+leng);
								var num;
								for(var k=0;k<leng;k++){		
									if(k==0){
										 num = EmpInfo.bonus;
									}else{
										 num = Math.round(EmpInfo.bonus)-k
									}					
									HTMLElement+='<option>'+num+'</option>';
								}
							}else{
								HTMLElement+='<option>'+EmpInfo.bonus+'</option>';
							}
							HTMLElement+='</select></td>';
						}else{
							HTMLElement+='<td>'+EmpInfo.bonus+'</td>';
						}
						
					}
				}else{
					HTMLElement+='<td>'+EmpInfo.bonus+'</td>';
				}
				/*if(modifyEmpBoundB.indexOf(EmpInfo.employeeID)!=-1){
					if(IsAbnormal==0){
						HTMLElement+='<td><select>';
						if(EmpInfo.bonus!=0){
							var leng = Number(EmpInfo.bonus)/0.5;
							for(var z=0;z<leng+1;z++){
								var num = EmpInfo.bonus-(0.5*z)
								HTMLElement+='<option>'+num+'</option>';
							}
						}else{
							HTMLElement+='<option>'+EmpInfo.bonus+'</option>';
						}
						HTMLElement+='</select></td>';
					}else{
						HTMLElement+='<td><select>';
						HTMLElement+='<option>1</option><option>0.5</option>';
						HTMLElement+='<option selected>'+EmpInfo.bonus+'</option>'
						HTMLElement+='</select></td>';
					}
					
				}else if (modifyEmpBoundA.indexOf(EmpInfo.employeeID)!=-1) {
					if(IsAbnormal==0){
						HTMLElement+='<td><select>';	
						if(EmpInfo.bonus!=0){
							var leng = Number(EmpInfo.bonus)+1;
							//console.log('leng时数 '+leng);
							var num;
							for(var k=0;k<leng;k++){		
								if(k==0){
									 num = EmpInfo.bonus;
								}else{
									 num = Math.round(EmpInfo.bonus)-k
								}					
								HTMLElement+='<option>'+num+'</option>';
							}
						}else{
							HTMLElement+='<option>'+EmpInfo.bonus+'</option>';
						}
						HTMLElement+='</select></td>';
					}else{
						HTMLElement+='<td><select>';
						HTMLElement+='<option>2</option><option>1.5</option><option>1</option><option>0.5</option>';
						HTMLElement+='<option selected>'+EmpInfo.bonus+'</option>'
						HTMLElement+='</select></td>';
					}	
				}else{
					HTMLElement+='<td>'+EmpInfo.bonus+'</td>';
				}					*/
				HTMLElement+='<td>未修改時數</td><td>未審核</td></tr>';
				
			}
			j++;
			$('#OTPendingEmpTable tbody').append(HTMLElement);		
			
		}
		
		$('#OTPendingEmpTable tbody tr td').find('select').each(function(){
			var bonusHour = $(this).find('option:selected').text(); 
			$(this).change(function(){
				var newBonus = $(this).find('option:selected').text(); 
				if(newBonus!=bonusHour){
					$(this).parent().next().text('已修改時數');

					$(this).parent().next().css('color','red');
				}else{
					$(this).parent().next().text('未修改時數');

					$(this).parent().next().css('color','#768399');
				}
			})
		})
		
		$('.selectedEmp').click(function(){
		    if($(this).prop("checked")==true){
		        //当前为选中状态
		    	$(this).parent().parent().attr("style", "background-color: #e6f0fc"); 
		    }else{
		        //
		    	$(this).parent().parent().attr("style", "background-color: white"); 
		    }
		});
		
	}
	
	function GetPendingEmpList(WorkshopNo,LineNo,RCNO,ClassNo,OverTimeDate,
			IsIdentified,IsAbnormal,OverTimeCal,currentClassNoInfo){				
		return $.ajax({
			type:'GET',
			url:'EmpsInOTSheet.show',
			data:{"WorkshopNo":WorkshopNo,"LineNo":LineNo,"RCNO":RCNO,
				"ClassNo":ClassNo,"OverTimeDate":OverTimeDate,
				"IsIdentified":IsIdentified,"IsAbnormal":IsAbnormal},
			error:function(e){
				alert(e);
			},
			success:function(result){
				var HTMLElement='';
				if(result!=null && result!=''){
					if(result.ErrorCode && result.ErrorCode==500){
						alert('無資料');
					}
					else{
						SetOverTimeEmps(result);
						
						ShowPendingEmpList(overTimeEmps,true);
					
					}
				}else{
					alert('無資料');
				}
			}
		});
	}
	
	function GetCalOverTimeFromServer(WorkshopNo,LineNo,RCNO,ClassNo,OverTimeDate,
			OverTimeType,ItemNumber,IsAbnormal) {

	    $.ajax({
	        type: 'GET',
	        url: 'GetCalOverTime.show',
	        data: {
	        	"WorkshopNo": WorkshopNo,
	        	"LineNo":LineNo,
	            "RCNO": RCNO,
	            "ClassNo": ClassNo,
	            "CheckState": 0,
	            "OverTimeDate": OverTimeDate,
	            "OverTimeType": OverTimeType,
	            "ItemNumber":ItemNumber,
	            "IsAbnormal": IsAbnormal
	        },
	        error: function(e) {
	            alert(e);
	        },
	        success: function(result) {
				var HTMLElement='';
				if(result!=null && result!=''){
					if(result.ErrorCode && result.ErrorCode==500){
						alert('無資料,请检查所使用的賬號對應助理是否存在，或核對班別是否正確！！！');
					}
					else{
						SetOverTimeEmps(result);
					
						ShowPendingEmpList(overTimeEmps,false);
					
					}
				}
				else{
					alert('無資料,请检查所使用的賬號對應助理是否存在，或核對班別是否正確！！！');
				}
			}
	    });
	}

	
	function SetOverTimeEmps(result){
		overTimeEmps=[];
		
		for(var i=0;i<result.length;i++){
			//將Server取出的資料放入javaScript Object中
			var OTEmpInfo=new OverTimeSheet(result[i]["EmpID"],
					result[i]["EmpName"],
					result[i]["DeptID"],
					result[i]["Direct"],
					result[i]["CostID"],
					result[i]["SwipeCardDate"],
					result[i]["OnDutyTime"],
					result[i]["OffDutyTime"],
					result[i]["OverTimeInterval"],
					result[i]["OverTimeHour"],
					result[i]["BONUS"]);
			overTimeEmps.push(OTEmpInfo);
		}
	}
	
	/* *
	 * 將提報加班的人員資訊從DB取出後，存入Array
	 * 降低DB存取次數
	 * */
	function GetOTSubmitEmps(){
		//var selectedOTEmps='';
		var selectedEmpIDs=new Array();
		/*將已勾選人員的工號存入Array*/
		$('#OTPendingEmpTable tbody .selectedEmp:checked').each(function(){
			var id = $(this).children().eq(2).text();
			var xhr=$(this).parent().parent();		
			 var overTimehour = $(xhr).children().eq(9).text();
			 var depid=$(xhr).children().eq(4).text();
			 var dghour;
			 if(IsAbnormal==1){
					if(modifyEmpBonusA.indexOf(id)!=-1||modifyEmpBonusB.indexOf(id)!=-1){
						  dghour = $(this).children().eq(11).find('option:selected').eq(0).text();
					}else{
						 dghour = $(this).children().eq(11).text();
					}		
				}else{
					if(modifyEmpBoundA.indexOf(id)!=-1||modifyEmpBoundB.indexOf(id)!=-1){
						  dghour = $(this).children().eq(11).find('option:selected').eq(0).text();
					}else{
						 dghour = $(this).children().eq(11).text();
					}		
				}
	//		 console.log(dghour);
				if(overTimehour=="0"&&dghour=="0"){
					  alert("工時和頂崗津貼小於等於0，有誤，請重新選擇加班人員！");
				}
				else{
					selectedEmpIDs.push($(xhr).children().eq(2).text());
				}
			
		});
		/*將已勾選人員的詳細刷卡訊息存入Array*/
		/*for(var i=0;i<selectedEmpIDs.length;i++){
			if(i==0)
				selectedOTEmps+=selectedEmpIDs[i];
			else
				selectedOTEmps+='*'+selectedEmpIDs[i];
		}*/
		return selectedEmpIDs;
	}
	
	function GetSelectedEmps(){
		var SelectedEmps=new Array();
		$('#OTPendingEmpTable tbody tr').each(function(){
			if($(this).children().children().eq(0).checked){								
				  var overTimehour = $(this).children().children().eq(9).text();
    				if(overTimehour=="0"){
    					  alert("工時小於等於0，有誤，請重新選擇加班人員！");
    				}
    				else{
    					SelectedEmps.push($(this).children().children().eq(2).text());
    				}
			}
		});
		return SelectedEmps;
	}
	
	function GetHoliday(){
		$.ajax({
	        type: 'GET',
	        url: 'checkHoliday.show',
	        data: {
	        	"OverTimeDate": OverTimeDate
	        },
	        error: function(e) {
	            alert("獲取節假日失敗！！！");
	        },
	        success: function(result) {
				if(result!=null && result!=''){
					HolidayType = result[0]["HolidayType"];
				}
				else{
					HolidayTpye = "N";
				}
			}
	    });
	}
	
	function checkPwTime(){
			$.ajax({
				type:'POST',
				url:'../Overtime/checkdepId.show',
				data:{},
				async:false,
				error:function(e){
					alert(e);
				},
				success:function(data){	
					 if(data!=null && data!=''){
						 checkdepid=data;
				}else{
					console.log(123);
					}
				}
			});
		}
	
	
	function CheckModifyEmpA(PendingEmpsList){
		$.ajax({
			type:'POST',
			url:'../Overtime/checkModifyEmpBonusA.do',
			data:JSON.stringify(PendingEmpsList),
			async:false,
			contentType:'application/json',
			error:function(e){
				alert(e);
			},
			success:function(data){	
				 if(data!=null && data!=''){
					 modifyEmpBonusA=data;
					 console.log(modifyEmpBonusA);
			}else{
				console.log(123);
				}
			}
		});
	}
	
	function CheckModifyAEmpA(PendingEmpsList){
		$.ajax({
			type:'POST',
			url:'../Overtime/checkModifyEmpA.do',
			data:JSON.stringify(PendingEmpsList),
			async:false,
			contentType:'application/json',
			error:function(e){
				alert(e);
			},
			success:function(data){	
				 if(data!=null && data!=''){
					 modifyEmpBoundA=data;
					 console.log(modifyEmpBoundA);
			}else{
				console.log(456);
				}
			}
		});
	}
	
	function CheckModifyEmpB(PendingEmpsList){
		$.ajax({
			type:'POST',
			url:'../Overtime/checkModifyEmpBonusB.do',
			data:JSON.stringify(PendingEmpsList),
			async:false,
			contentType:'application/json',
			error:function(e){
				alert(e);
			},
			success:function(data){	
				 if(data!=null && data!=''){
					 modifyEmpBonusB=data;
					 console.log(modifyEmpBonusB);
			}else{
				console.log(789);
				}
			}
		});
	}
	
	function CheckModifyAEmpB(PendingEmpsList){
		$.ajax({
			type:'POST',
			url:'../Overtime/checkModifyEmpB.do',
			data:JSON.stringify(PendingEmpsList),
			async:false,
			contentType:'application/json',
			error:function(e){
				alert(e);
			},
			success:function(data){	
				 if(data!=null && data!=''){
					 modifyEmpBoundB=data;
					 console.log(modifyEmpBoundB);
			}else{
				console.log(012);
				}
			}
		});
	}
	
	function UpdateBonus(newHour){
		$.ajax({
			type:'POST',
			contentType: "application/json",
			url:'../Overtime/updataBonus.show',
			data:JSON.stringify(newHour),
			dataType:'json',
			async:false,
			error:function(e){
				alert(e);
				},
			success:function(data){
				  if(data!=null && data!=''){
					  if(data.StatusCode=="200"){
 
					  }
					  else{
						  alert(data.Message);
					  }
				  }else{
					  alert('操作失敗！')
				  }
				}
		})
	}
	
});