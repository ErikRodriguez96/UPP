<%@page language="java" import="java.sql.*"%>
<%@page language="java" import="dbUtils.DbConn" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>
        <%
            String strUserEmail = "";
            String strUserPwd = "";
            String logonMsg = "";
            String sql = "";
            String storedProcLike = "";
            
            StringData webUserObj = new StringData();
            webUserObj.webUserId = "";
            webUserObj.errorMsg = "";
            webUserObj.birthday = "";
            webUserObj.membershipFee = "";
            webUserObj.userEmail = "";
            
            if (request.getParameter("userEmailInput") != null) {

                strUserEmail = request.getParameter("userEmailInput");
                strUserPwd = request.getParameter("userPwdInput");

                DbConn dbc = new DbConn();

                //Statement stmt = null; // DO NOT USE a Statement object (holds the SQL with user input embedded)
                PreparedStatement prepStmt = null; // Instead, use a PreparedStatement (holds the SQL with ?s for user input)

                ResultSet results = null; // holds the result set if the SQL is SELECT

                logonMsg = dbc.getErr();
                if (logonMsg.length() == 0) {

                    try {
                        //results = stmt.executeQuery("select user_email, user_password from web_user order by user_email");
                        sql = "select user_email, user_password, web_user_id from web_user "
                                + "where user_email = ? and user_password = ?";

                        storedProcLike = "EXEC storedProcedure with 1st parameter = \"" + strUserEmail
                                + "\" and second parameter = \"" + strUserPwd + "\"";

                        //stmt = con.createStatement();
                        prepStmt = dbc.getConn().prepareStatement(sql);

                        //results = stmt.executeQuery(sql);
                        prepStmt.setString(1, strUserEmail);
                        prepStmt.setString(2, strUserPwd);
                        results = prepStmt.executeQuery();

                        if (results.next()) {
                            /*logonMsg += "Hello, user " + results.getString("user_email") + ". "
                                    + "I see your password is " + results.getString("user_password") + ". "
                                    + "You are user number " + results.getString("web_user_id") + ".";
                            */
                            webUserObj = DbMods.findById(dbc, results.getString("web_user_id")); 
                            session.setAttribute("userLoggedOn", webUserObj);              
                            
                        } else {
                            webUserObj.errorMsg = "Credentials not found.";
                            session.invalidate();
                        }
                        Gson gson = new Gson();
                        out.print(gson.toJson(webUserObj));

                        results.close();  // close the result set
                        prepStmt.close(); // close the statement
                    } catch (Exception e) {
                        logonMsg += "problem creating statement & running query:" + e.getMessage();
                        results.close();  // close the result set
                        prepStmt.close(); // close the statement
                    }

                } // db connection good
                dbc.close();

            } // postback
        %>