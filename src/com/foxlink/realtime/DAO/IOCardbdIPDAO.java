package com.foxlink.realtime.DAO;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import com.foxlink.realtime.model.IOCardMachineIP;
import com.foxlink.realtime.model.Page;
import com.foxlink.realtime.model.objectMapper.QueryIOCardMaIPMapper;


public class IOCardbdIPDAO extends DAO<IOCardMachineIP> {
	private static Logger logger = Logger.getLogger(IOCardbdIPDAO.class);

	@Override
	public boolean AddNewRecord(IOCardMachineIP newRecord) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean UpdateRecord(IOCardMachineIP updateRecord) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean DeleteRecord(String recordID, String updateUser) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public List<IOCardMachineIP> FindAllRecords() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<IOCardMachineIP> FindAllRecords(int currentPage, int totalRecord, String queryCritirea,
			String queryParam) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<IOCardMachineIP> FindRecord(String userDataCostId, int currentPage, int totalRecord,
			IOCardMachineIP t) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<IOCardMachineIP> FindRecords(IOCardMachineIP t) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int getTotalRecord(String queryCritirea, String queryParam) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int getTotalRecords(String userDataCostId, IOCardMachineIP t) {
		// TODO Auto-generated method stub
		return 0;
	}

	public int getTotalRecord(String queryCritirea, String queryParam, String updateUser, String userDataCostId,String accessRole) {
		// TODO Auto-generated method stub
		int totalRecord=-1;
    	String sSQL = "select count(*) FROM SWIPE.RT_DEVICE_INFO where Enabled='Y'";
    	try {
    		List <Object> queryList=new  ArrayList<Object>();
    		/*if(!userDataCostId.equals("ALL")){
    			String strIdArray[] = userDataCostId.split("\\*");
				StringBuffer idsStr = new StringBuffer();
				for (int i = 0; i < strIdArray.length; i++) {
					if (i > 0) {
						idsStr.append(",");
					}
					idsStr.append("'").append(strIdArray[i]).append("'");
				}
				sSQL+=" and Costid in("+idsStr+")";
			}*/
    		if(queryCritirea.equals("IP")){
				sSQL+=" and Deviceip = ?";  
			}
			/*else if(queryCritirea.equals("Name")){
				sSQL+=" and Name = ?";  
			}else if(queryCritirea.equals("Depid")){
				sSQL+=" and Depid = ?";  
			}else if(queryCritirea.equals("Costid")){
				sSQL+=" and Costid = ?";  
			}*/
			else{
				sSQL+="";
			}
    		if(accessRole!=null&&!accessRole.equals("")){
				if(!accessRole.equals("ALL")){
					sSQL+=" and bu = '"+accessRole+"' "; 
				}
			}
		  if (!queryCritirea.equals("")){
		    	queryList.add(queryParam);
		    }

		 totalRecord = jdbcTemplate.queryForObject(sSQL, queryList.toArray(), Integer.class);	
		
    	  } catch (Exception ex) {
    		  logger.error("Find Deviceip TotalRecord are failed ",ex);
    		  ex.printStackTrace();
    		  }
    	return totalRecord;
	}

	public List<IOCardMachineIP> FindAllRecord(int currentPage, int totalRecord, String queryCritirea,
			String queryParam, String updateUser, String userDataCostId,String accessRole) {
		// TODO Auto-generated method stub
		List<IOCardMachineIP> AllEmp = null;
		// TODO Auto-generated method stub
		String sSQL = "select * from(select c.*,ROWNUM rn from (SELECT Deviceip,WorkShopNo,WorkShop_Desc,Direction,Enabled,IS_SPECIAL from SWIPE.RT_DEVICE_INFO where Enabled='Y'";
		try {
			List <Object> queryList=new  ArrayList<Object>();
			/*if(!userDataCostId.equals("ALL")){
				String strIdArray[] = userDataCostId.split("\\*");
				StringBuffer idsStr = new StringBuffer();
				for (int i = 0; i < strIdArray.length; i++) {
					if (i > 0) {
						idsStr.append(",");
					}
					idsStr.append("'").append(strIdArray[i]).append("'");
				}
				sSQL+=" and Costid in("+idsStr+")";
			}*/
    		if(queryCritirea.equals("IP")){
				sSQL+=" and Deviceip = ?";  
			}
			/*else if(queryCritirea.equals("Name")){
				sSQL+=" and Name = ?";  
			}else if(queryCritirea.equals("Depid")){
				sSQL+=" and Depid = ?";  
			}else if(queryCritirea.equals("Costid")){
				sSQL+=" and Costid = ?";  
			}*/
			else{
				sSQL+="";
			}
    		if(accessRole!=null&&!accessRole.equals("")){
				if(!accessRole.equals("ALL")){
					sSQL+=" and bu = '"+accessRole+"' "; 
				}
			}
    		Page page = new Page(currentPage, totalRecord);	  
			int endIndex=page.getStartIndex() + page.getPageSize();
		    sSQL += "  order by Deviceip asc)c) where rn>"+page.getStartIndex()+" and rn<="+endIndex+"" ;	    
		  if (!queryCritirea.equals("")){
		    	queryList.add(queryParam);
		    }
		  
		  AllEmp = jdbcTemplate.query(sSQL, queryList.toArray(), new QueryIOCardMaIPMapper());	
		  System.out.println(sSQL);
    	  } catch (Exception ex) {
    		  logger.error("Find IOCardMaIP TotalRecord are failed ",ex);
    		  ex.printStackTrace();
    		  }
		return AllEmp;
	}

	public boolean checkDeviceipDuplicate(String Deviceip,String WorkShopNo,String accessRole) {
		// TODO Auto-generated method stub
		int totalRecord=-1;
    	String sSQL = "select count(*) FROM SWIPE.RT_DEVICE_INFO where Deviceip=? and ENABLED='Y'";
    	try {    	   
    		if(accessRole!=null&&!accessRole.equals("")){
				if(!accessRole.equals("ALL")){
					sSQL+=" and bu = '"+accessRole+"' "; 
				}
			}
    		totalRecord = jdbcTemplate.queryForObject(sSQL, new Object[] { Deviceip },Integer.class);	   	
    	  } catch (Exception ex) {
    		  ex.printStackTrace();
    		  }
    	/*System.out.println(sSQL);*/
    	 if(totalRecord > 0) 
			   return false; 
		 else
			 return true;
	}

	public boolean setIOCardIP(IOCardMachineIP ioCardMachineIP, String updateUser,String accessRole) {
		// TODO Auto-generated method stub
		int createRow=-1;

		txDef = new DefaultTransactionDefinition();
		txStatus = transactionManager.getTransaction(txDef);
		String sSQL="";
		if(checkSecrecyWS(ioCardMachineIP.getWorkShopNo())) {
			sSQL+="INSERT INTO SWIPE.RT_DEVICE_INFO (Deviceip,WorkShopNo,WorkShop_Desc,Direction,Update_UserId,IS_SPECIAL,BU) VALUES(?,?,?,?,?,'Y',?)";
		}else {
			sSQL+="INSERT INTO SWIPE.RT_DEVICE_INFO (Deviceip,WorkShopNo,WorkShop_Desc,Direction,Update_UserId,IS_SPECIAL,BU) VALUES(?,?,?,?,?,'N',?)";
		}
		
		try {
			if(ioCardMachineIP!=null) {
		      createRow = jdbcTemplate.update(sSQL,new PreparedStatementSetter() {
					@Override
					public void setValues(PreparedStatement arg0) throws SQLException {
						// TODO Auto-generated method stub
						arg0.setString(1, ioCardMachineIP.getDeviceip());
						arg0.setString(2, ioCardMachineIP.getWorkShopNo());
						arg0.setString(3, ioCardMachineIP.getWorkShop_Desc());
						arg0.setString(4, ioCardMachineIP.getDirection());
						arg0.setString(5, updateUser);
						arg0.setString(6, accessRole);
					}	
				});
				transactionManager.commit(txStatus);
			}			
		}
		catch(Exception ex) {
			logger.error(ex);
			transactionManager.rollback(txStatus);
		}
		
		 if(createRow > 0) 
			   return true; 
		 else
			 return false;
	}
	
	public boolean checkSecrecyWS(String WorkShopNo) {
		// TODO Auto-generated method stub
		int totalRecord=-1;
    	String sSQL = "select count(*) from SWIPE.RT_DEVICE_INFO where WorkShopNo =? and IS_SPECIAL='Y'";
    	try {   
    		totalRecord = jdbcTemplate.queryForObject(sSQL, new Object[] { WorkShopNo },Integer.class);	   	
    	  } catch (Exception ex) {
    		  ex.printStackTrace();
    		  }
    	 if(totalRecord > 0) 
			   return true; 
		 else
			 return false;
	}


	public boolean checkMachineIPExistence(String Deviceip) {
		// TODO Auto-generated method stub
		int totalRecord=-1;
    	String sSQL = "select count(*) from SWIPE.APP_LOGIN_CONTROL where COM_IP =? ";
    	try {   
    		totalRecord = jdbcTemplate.queryForObject(sSQL, new Object[] { Deviceip },Integer.class);	   	
    	  } catch (Exception ex) {
    		  ex.printStackTrace();
    		  }
    	 if(totalRecord > 0) 
			   return true; 
		 else
			 return false;
	}

	public boolean UpdateRecord(IOCardMachineIP ioCardMachineIP, String updateUser,String accessRole) {
		// TODO Auto-generated method stub
		int updateRow=-1,updateRole=-1;
		txDef = new DefaultTransactionDefinition();
		txStatus = transactionManager.getTransaction(txDef);		
		String sSQL="UPDATE SWIPE.RT_DEVICE_INFO SET WorkShopNo=?,WorkShop_Desc=?,Direction=?,Update_Userid=? WHERE Deviceip=? and Enabled='Y'";
		try {
			if(ioCardMachineIP!=null) {
				if(accessRole!=null&&!accessRole.equals("")){
					if(!accessRole.equals("ALL")){
						sSQL+=" and bu = '"+accessRole+"' "; 
					}
				}
				updateRow=jdbcTemplate.update(sSQL,new PreparedStatementSetter() {
					@Override
					public void setValues(PreparedStatement arg0) throws SQLException {
						// TODO Auto-generated method stub
						arg0.setString(1, ioCardMachineIP.getWorkShopNo());
						arg0.setString(2, ioCardMachineIP.getWorkShop_Desc());
						arg0.setString(3, ioCardMachineIP.getDirection());
						arg0.setString(4, updateUser);
						arg0.setString(5, ioCardMachineIP.getDeviceip());
						
					}	
				});
				transactionManager.commit(txStatus);
			}	
		}
		catch(Exception ex) {
			logger.error("Update IOCrdMaIP is failed",ex);
			transactionManager.rollback(txStatus);
		}			
			if(updateRow > 0) 
				   return true; 
				else
				   return false;
	}

	public boolean DeleteIOCardMaIP(IOCardMachineIP[] ioCardMachineIP, String updateUser,String accessRole) {
		// TODO Auto-generated method stub
		txDef = new DefaultTransactionDefinition();
		txStatus = transactionManager.getTransaction(txDef);
		String sSQL="update SWIPE.RT_DEVICE_INFO set ENABLED='N',Update_Userid=? WHERE Deviceip=? AND Enabled='Y'";
		int disableRow=0;
		try {
			if(ioCardMachineIP!=null) {
				if(accessRole!=null&&!accessRole.equals("")){
					if(!accessRole.equals("ALL")){
						sSQL+=" and bu = '"+accessRole+"' "; 
					}
				}
				jdbcTemplate.batchUpdate(sSQL,new BatchPreparedStatementSetter() {
					
					@Override
					public void setValues(PreparedStatement ps, int i) throws SQLException {
						// TODO Auto-generated method stub
						ps.setString(1, updateUser);
						ps.setString(2, ioCardMachineIP[i].getDeviceip());
						
					}
					
					@Override
					public int getBatchSize() {
						// TODO Auto-generated method stub
						return ioCardMachineIP.length;
					}
				});
				transactionManager.commit(txStatus);
			}
		}
		catch(Exception ex) {
			logger.error("Disable IOCardMaIP is failed",ex);
			transactionManager.rollback(txStatus);
		}
		 if(disableRow ==0) 
			   return true; 
		 else
			 return false;
	}

	public boolean setWorkShop(String secrecyWS, String updateUser, String status,String accessRole) {
		// TODO Auto-generated method stub
		int updateRow=-1,updateRole=-1;
		txDef = new DefaultTransactionDefinition();
		txStatus = transactionManager.getTransaction(txDef);		
		String sSQL="UPDATE SWIPE.RT_DEVICE_INFO SET IS_SPECIAL=?,Update_Userid=? WHERE WorkShopNo=? and Enabled='Y'";
		try {
			if(secrecyWS!=null) {
				if(accessRole!=null&&!accessRole.equals("")){
					if(!accessRole.equals("ALL")){
						sSQL+=" and bu = '"+accessRole+"' "; 
					}
				}
				updateRow=jdbcTemplate.update(sSQL,new PreparedStatementSetter() {
					@Override
					public void setValues(PreparedStatement arg0) throws SQLException {
						// TODO Auto-generated method stub
						arg0.setString(1, status);
						arg0.setString(2, updateUser);
						arg0.setString(3, secrecyWS);
						
					}	
				});
				transactionManager.commit(txStatus);
			}	
		}
		catch(Exception ex) {
			logger.error("Update SecrecyWorkShop is failed",ex);
			transactionManager.rollback(txStatus);
		}			
			if(updateRow > 0) 
				   return true; 
				else
				   return false;
	}
}
