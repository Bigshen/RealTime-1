<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page import="java.io.*,java.util.*,java.sql.*"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<html>
<head>
<c:url value="/resources/assets/css/icons.css" var="iconsCSS" />
<c:url value="/resources/assets/css/bootstrap.css" var="bootstrapCSS" />
<c:url value="/resources/assets/css/plugins.css" var="pluginsCSS" />
<c:url value="/resources/assets/css/main.css" var="mainCSS" />
<c:url value="/resources/css/bootstrap/bootstrap-select.min.css" var="bootstrapSelectCSS" />
<link href="${iconsCSS}" rel="stylesheet">
<link href="${bootstrapCSS}" rel="stylesheet">
<link href="${pluginsCSS}" rel="stylesheet">
<link href="${mainCSS}" rel="stylesheet">
<link href="${bootstrapSelectCSS}" rel="stylesheet">

<c:url value="/resources/assets/My97DatePicker/WdatePicker.js" var="wdatePickerJS" />
<c:url value="/resources/assets/js/jquery-1.8.3.min.js" var="assetsJqueryJS" />
<c:url value="/resources/js/Project/RealTime.Modify.LineNoByDepid.js?version=${resourceVersion}" var="FourteenROP" /> 
<c:url value="/resources/js/jquery/jquery-1.11.3.min.js" var="JqueryJS" />
<c:url value="/resources/js/bootstrap/bootstrap.min.js" var="bootstrapJS" />
<c:url value="/resources/js/bootstrap/bootstrap-select.min.js" var="bootstrapSelectJS" />
<c:url value="/resources/js/Project/AjaxCheckSession.js?version=${resourceVersion}" var="AjaxCheckSessionJS"/> 
<script src="${JqueryJS}" type="text/javascript"></script>
<script src="${bootstrapJS}" type="text/javascript"></script>
<script src="${wdatePickerJS}" language="javascript" type="text/javascript"></script>
<script src="${bootstrapSelectJS}" type="text/javascript"></script>
<script type="text/javascript" src='${AjaxCheckSessionJS}'></script>
<script src="${FourteenROP}" type="text/javascript"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>進入車間員工携帶物品權限</title>
</head>
<body style="position:relative;">
		<div id="header" class="header-fixed">
		<div class="navbar">
			<a class="navbar-brand" href="Login"> <i
				class="im-windows8 text-logo-element animated bounceIn"></i> <span
				class="text-logo">FOX</span><span class="text-slogan">LINK</span>
			</a>
		</div>
		<!-- Start .header-inner -->
	</div>
<div class="container-fluid"  style="margin: 50px 10% 0 0;">
	<div style="top: 55px; margin-left: 10px">
		<div class="panel-body" style="border: 1px solid #e1e3e6;">
			<div align="right">
				查詢條件：<select id="queryCritirea" class="input-small">
					<option value="depid">綫別代碼</option>
				</select> <input type="text" id="queryParam" name="queryParam"
					class="input-sm"> <input type="button"
					id="searchLineNoByDepid" name="searchLineNoByDepid"
					class="btn btn-sm btn-primary" value="Search">
			</div>
			<div>
					<h4 style="position: relative;">員工携帶物品權限信息：</h4>
			        <!-- <a id="addNewFourteenROP" role="button" href="#insertFourteenROP"class="btn btn-sm" data-toggle="modal" style="position: absolute;top: 50px;right: 300px;font-size: 14px;"><i class="glyphicon glyphicon-plus"></i>創建十四休一信息</a> -->
			</div>
			<div class="middle">
				<div class="left" style="width:70%;float:left;border:1px solid #f3f5f6;padding:10px 10px;position: relative;" >
					<table id="LineNoByDepidTable" class="table table-hover" style="border:2px solid #f3f5f6;table-layout:fixed;">
						<thead>
							<tr>
								<th>車間號</th>
								<th>綫體號</th>
								<th>綫別代碼</th>
								<th></th>
							</tr>
						</thead>
						<tbody class='spTable'>
						</tbody>
					</table>
					<div id="LineNoByDepidPagination" align="right" style="height: 20;position:absolute; bottom: -20px;right: 0px;">
					</div>
				</div>
				
				<div class="right" style="width:25%;height:700px;float:right;border:1px solid #f3f5f6;padding:10px 10px;position: relative;" >
					<h2>設置綫體綁定綫組別代碼</h2>
					<div class="control-group">
			    		<label class="control-label" for="workShopNo">車間號</label>
			    		<div class="controls">
			    			<select id="workShopNo"></select>
			    		</div>	
			  		</div>
			  		<div class="control-group">
			    		<label class="control-label" for="LineNo">綫體號</label>
			    		<div class="controls">
			      			<select id="LineNo" name="LineNo" class="selectpicker show-tick" multiple data-live-search="true">
				    		</select> 
			    		</div>
			  		</div>
			  		<div class="control-group">
				      			<label class="control-label" for="depid">綫組別代碼</label>
				      			<div class="controls">
				    				<div class="controls">
						      			<input type="text" id="depid" name="depid" class="required form-control" placeholder="綫組別代碼">
						    		</div>	
				    			</div>			
	    			</div>
				
			        <br>
			  		<button type="submit" id="setData" class="btn btn-primary">設置</button>
			  		<button type="reset" id="resetSubmit" class="btn">清除</button>
						</div>	
				</div>
			</div>
			
			<%-- <jsp:include page="InsertFourteenROP.jsp" /> --%>
		</div>
	</div>
</div>	
</body>
</html>