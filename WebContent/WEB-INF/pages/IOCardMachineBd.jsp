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

<c:url value="/resources/assets/js/jquery-1.8.3.min.js" var="assetsJqueryJS" />
<c:url value="/resources/js/Project/RealTime.Modify.IOCardMachineIP.js?version=${resourceVersion}" var="modifyIOCardMaIP" /> 
<c:url value="/resources/js/jquery/jquery-1.11.3.min.js" var="JqueryJS" />
<c:url value="/resources/js/bootstrap/bootstrap.min.js" var="bootstrapJS" />
<c:url value="/resources/js/bootstrap/bootstrap-select.min.js" var="bootstrapSelectJS" />
<c:url value="/resources/js/Project/AjaxCheckSession.js?version=${resourceVersion}" var="AjaxCheckSessionJS"/> 
<script src="${JqueryJS}" type="text/javascript"></script>
<script src="${bootstrapJS}" type="text/javascript"></script>
<script src="${bootstrapSelectJS}" type="text/javascript"></script>
<script type="text/javascript" src='${AjaxCheckSessionJS}'></script>
<script src="${modifyIOCardMaIP}" type="text/javascript"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>進出車間卡機IP維護</title>
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
					<option value="IP">卡機IP</option>
				</select> <input type="text" id="queryParam" name="queryParam"
					class="input-sm"> <input type="button"
					id="searchIOCardMaIP" name="searchIOCardMaIP"
					class="btn btn-sm btn-primary" value="Search">
			</div>
			<div>
					<h4 style="position: relative;">進出車間卡機IP列表信息：</h4>
					<a id="addNewIOCardMaIP" role="button" href="#insertIOCardMaIP"class="btn btn-sm" data-toggle="modal" style="position: absolute;top: 50px;right: 500px;font-size: 14px;"><i class="glyphicon glyphicon-plus"></i>創建卡機IP與車間狀態I/O</a>
			</div>
			<div class="middle">
				<div class="left" style="width:60%;height:730px;float:left;border:1px solid #f3f5f6;padding:10px 10px;position: relative;" >
					<table id="IOCardMaIPTable" class="table table-hover" style="border:2px solid #f3f5f6;table-layout:fixed;">
						<thead>
							<tr>
								<th>卡機IP</th>
								<th>車間名稱</th>
								<th>車間描述</th>
								<th>卡機狀態</th>
								<th>是否為保密車間</th>
								<th></th>
							</tr>
						</thead>
						<tbody class='spTable'>
						</tbody>
					</table>
					<div id="IOCardMaIPListPagination" align="right" style="height: 20;position:absolute; bottom: -20px;right: 0px;">
					</div>
				</div>
				<div class="right" style="width:38%;height:730px;float:right;padding:10px 10px;position: relative;" >
					<div style="float:left;width:48%;height:730px;border:1px solid #f3f5f6;">
						<div style="padding:10px 10px;overflow-y:auto;height:650px;border-bottom: 1px solid #f3f5f6">
						<table id="deleteId" class="table table-hover" style="border:2px solid #f3f5f6;table-layout:fixed;border-collapse:separate">
							<thead>
								<tr>
									<th colspan='2'>卡機ip列表</th>
								</tr>
							</thead>
							<tbody class='dlTable'>
							</tbody>
						</table>
						</div>
						<button class="deleteIp btn btn-sm btn-primary">刪除</button>
						<button class="reset btn btn-sm btn-primary">清空</button>
					</div>
					<div style="width:48%;height:730px;float:right;padding:10px 10px;position: relative;border:1px solid #f3f5f6;">
						<h3>設置車間保密狀態</h3>
							<div class="control-group">
					    		<div class="controls">
					      			<label for="workShopSecrecy">車間號</label>
					    					<select id="workShopSecrecy" name='workShopSecrecy' class="form-control">
					    					<option value=""></option>
					    					</select>  			
		    					</div>
		  					</div>
		  					
		  					<div class="control-group">
					    		<div class="controls">
					      			<label for="secrecyStatus">是否為保密車間</label>
					    					<select id="secrecyStatus" name='secrecyStatus' class="form-control">
					    						<option value=""></option>
					    						<option value="N">否</option>
					    						<option value="Y">是</option>
					    					</select>  			
					    		</div>
					  		</div>	
					  			
		  					<button type="submit" id="setSecrecyWS" class="btn btn-primary" style="margin-top: 10px;">設置為保密車間</button>	
		  			</div>
				</div>
				
			</div>
			<jsp:include page="InsertNewIOCardMaIP.jsp" />
		</div>
	</div>
</div>	
</body>
</html>