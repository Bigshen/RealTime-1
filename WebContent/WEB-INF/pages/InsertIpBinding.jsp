<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div id="insertIpBinding" class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-sm" >
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
    			<h5>電腦Ip綁定費用代碼</h5>
			</div>
			<div class="modal-body">
		<!--		<form id="addNewUserForm" action="modifyReceiverDevice.do" method="post" class="form-horizontal">   -->
		<div class="control-group">
    		<label class="control-label" for="inputIp">電腦Ip</label>
    		<div class="controls">
      			<input type="text" id="inputIp" name="inputIp" class="required form-control" placeholder="電腦Ip">
    		</div>
  		</div>
  			
  	 	<!-- <div class="control-group">
    		<label class="control-label" for="inputCostId">費用代碼</label>
    		<div class="controls">
      			<input type="text" id="inputCostId" name="inputCostId" class="required nameCheck form-control" placeholder="費用代碼">
    		</div>
  		</div>  -->
  		<div class="control-group">
    		<div class="controls">
      			<label for="outCard">费用代码</label>
    					<select id="CostNo" name='CostNo' class="form-control">
    						<option value=" "></option>
    					</select>  			
    		</div>
  		</div> 	
  			<div class="control-group">
    		<div class="controls">
      			<label for="deptNo">綫組別號</label>
    					<select id="deptNo" name='deptNo' class="form-control"></select>  			
    		</div>
  		</div>	
  		
  			<!-- <div class="control-group">
    		<label class="control-label" for="inputCostID">部門代碼</label>
    		<div class="controls">
      			<input type="text" id="inputCostID" name="inputCostID" class="required costIDCheck" placeholder="費用代碼(格式:costId1*costId2)">
    		      <select id="inputDeptID" name="inputCostID" class="selectpicker show-tick" multiple data-live-search="true">
                  </select>
    		</div>
  		</div> -->
  	<!-- <div class="control-group">
    		<label class="control-label" for="inputId">工號</label>
    		<div class="controls">
      			<input type="text" id="inputId" name="inputId" class="required nameCheck form-control" placeholder="工號">
    		</div>
  		</div> -->
	
        <br>
  		<button type="submit" id="changebdOT" class="btn btn-primary">綁定</button>
  		<button type="reset" id="resetSubmit" class="btn">清除</button>
<!-- 	</form>	  -->
			</div>	
		</div>
	</div>
</div>