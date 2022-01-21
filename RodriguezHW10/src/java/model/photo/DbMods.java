package model.photo;

import dbUtils.*;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class DbMods {

    /*
    Returns a "StringData" object that is full of field level validation
    error messages (or it is full of all empty strings if inputData
    totally passed validation.  
     */
    
    public static StringData findById(DbConn dbc, String id) {
 
        // The find API needs to represent three cases: found web_user, not found, db error. 

        StringData sd = new StringData();
        try {
            String sql = "SELECT photo_id, location, date_taken, image_url, title, blurb, "
                    + "photo.web_user_id "
                    + "FROM photo, web_user WHERE photo.web_user_id = web_user.web_user_id "
                    + "AND photo_id = ?";

            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);

            // Encode the id (that the user typed in) into the select statement, into the first (and only) ? 
            stmt.setString(1, id);

            ResultSet results = stmt.executeQuery();
            if (results.next()) { // id is unique, one or zero records expected in result set

                // plainInteger returns integer converted to string with no commas.
                sd.photoId = FormatUtils.plainInteger(results.getObject("photo_id"));
                sd.location = FormatUtils.formatString(results.getObject("location"));
                sd.dateTaken = FormatUtils.formatDate(results.getObject("date_taken"));
                sd.imageUrl = FormatUtils.formatString(results.getObject("image_url"));
                sd.title = FormatUtils.formatString(results.getObject("title"));
                sd.blurb = FormatUtils.formatString(results.getObject("blurb"));
                sd.webUserId = FormatUtils.plainInteger(results.getObject("photo.web_user_id"));
                
            } else {
                sd.errorMsg = "Photo Entry Not Found.";
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            sd.errorMsg = "Exception thrown in DbMods.findById(): " + e.getMessage();
        }
        return sd;

    } // findById
   /*
   public static StringData newFind(DbConn dbc, String minMembership, String maxBirthday) {

        StringData sd = new StringData();

        java.math.BigDecimal myDecimal = ValidationUtils.decimalConversion(minMembership);
        java.sql.Date myDate = ValidationUtils.dateConversion(maxBirthday);
        System.out.println("myDecimal = " + myDecimal + " myDate = " + myDate);
        if ((myDate == null) || (myDecimal == null)) {
            sd.errorMsg = "Error: Must provide a valid dollar amount and a valid date for search";
            return sd;
        }

        try {
            String sql = "SELECT web_user_id, user_email, user_password, membership_fee, birthday, image, "
                    + "web_user.user_role_id, user_role_type "
                    + "FROM web_user, user_role WHERE web_user.user_role_id = user_role.user_role_id "
                    + "AND membership_fee > ? AND birthday < ?";

            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);

            // Encode the id (that the user typed in) into the select statement, into the first (and only) ? 
            stmt.setBigDecimal(1, myDecimal); // 1 means the first  ? in the SQL
            stmt.setDate(2, myDate);          // 2 means the second ? in the SQL 
            System.out.println(stmt);
            ResultSet results = stmt.executeQuery();
            if (results.next()) { // id is unique, one or zero records expected in result set

                // plainInteger returns integer converted to string with no commas.
                sd.webUserId = FormatUtils.plainInteger(results.getObject("web_user_id"));
                sd.userEmail = FormatUtils.formatString(results.getObject("user_email"));
                sd.userPassword = FormatUtils.formatString(results.getObject("user_password"));
                sd.image = FormatUtils.formatString(results.getObject("image"));
                sd.birthday = FormatUtils.formatDate(results.getObject("birthday"));
                sd.membershipFee = FormatUtils.formatDollar(results.getObject("membership_fee"));
                sd.userRoleId = FormatUtils.plainInteger(results.getObject("web_user.user_role_id"));
                sd.userRoleType = FormatUtils.formatString(results.getObject("user_role_type"));
                
            } else {
                sd.errorMsg = "Web User Not Found.";
            }
            results.close();
            stmt.close();
        }
        catch (Exception e) {
            sd.errorMsg = "Exception thrown in DbMods.findById(): " + e.getMessage();
        }
        System.out.println(sd);
        return sd;
   }*/
   
    private static StringData validate(StringData inputData) {

        StringData errorMsgs = new StringData();

        /* Useful to copy field names from StringData as a reference
    public String photoId = "";
    public String title = "";
    public String webUserId = "";
    public String location = "";
    public String dateTaken= "";
    public String imageUrl = "";
    public String blurb = "";
         */
        // Validation
        
        errorMsgs.title = ValidationUtils.stringValidationMsg(inputData.title, 45, false);
        errorMsgs.location = ValidationUtils.stringValidationMsg(inputData.location, 300, false);
        errorMsgs.imageUrl = ValidationUtils.stringValidationMsg(inputData.imageUrl, 500, true);
        errorMsgs.dateTaken = ValidationUtils.dateValidationMsg(inputData.dateTaken, false);
        errorMsgs.blurb = ValidationUtils.stringValidationMsg(inputData.blurb, 300, false);
        errorMsgs.webUserId = ValidationUtils.integerValidationMsg(inputData.webUserId, true);

        /*
        if (inputData.userPassword.compareTo(inputData.userPassword2) != 0) { // case sensative comparison
            errorMsgs.userPassword2 = "Both passwords must match";
        }
        */
        return errorMsgs;
    } // validate 

    public static StringData insert(StringData inputData, DbConn dbc) {

        StringData errorMsgs = new StringData();
        errorMsgs = validate(inputData);
        if (errorMsgs.getCharacterCount() > 0) {  // at least one field has an error, don't go any further.
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;

        } else { // all fields passed validation

            /*
                  String sql = "SELECT web_user_id, user_email, user_password, membership_fee, birthday, "+
                    "web_user.user_role_id, user_role_type "+
                    "FROM web_user, user_role where web_user.user_role_id = user_role.user_role_id " + 
                    "ORDER BY web_user_id ";
             */
            // Start preparing SQL statement
            String sql = "INSERT INTO photo (title, location, image_url, blurb, date_taken, web_user_id) "
                    + "values (?,?,?,?,?,?)";

            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            // Only difference is that Sally's class takes care of encoding null 
            // when necessary. And it also System.out.prints exception error messages.
            PrepStatement pStatement = new PrepStatement(dbc, sql);

            // Encode string values into the prepared statement (wrapper class).
            // string type is simple
            pStatement.setString(1, inputData.title);
            pStatement.setString(2, inputData.location);
            pStatement.setString(3, inputData.imageUrl);
            pStatement.setString(4, inputData.blurb);
            pStatement.setDate(5, ValidationUtils.dateConversion(inputData.dateTaken));
            pStatement.setInt(6, ValidationUtils.integerConversion(inputData.webUserId)); 
            //pStatement.setInt(7, ValidationUtils.integerConversion(inputData.photoId));

            // here the SQL statement is actually executed
            int numRows = pStatement.executeUpdate();

            // This will return empty string if all went well, else all error messages.
            errorMsgs.errorMsg = pStatement.getErrorMsg();
            if (errorMsgs.errorMsg.length() == 0) {
                if (numRows == 1) {
                    errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to the user.
                } else {
                    // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                    errorMsgs.errorMsg = numRows + " records were inserted when exactly 1 was expected.";
                }
            } else if (errorMsgs.errorMsg.contains("foreign key")) {
                errorMsgs.errorMsg = "Invalid Foreign Key";
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                errorMsgs.errorMsg = "That photo has already been uploaded! (Use a different Image URL)";
            }

        } // customerId is not null and not empty string.
        return errorMsgs;
    } // insert
    
    public static StringData update(StringData inputData, DbConn dbc) {

        StringData errorMsgs = new StringData();
        errorMsgs = validate(inputData);
        if (errorMsgs.getCharacterCount() > 0) {  // at least one field has an error, don't go any further.
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;

        } else { // all fields passed validation

            /*
                String sql = "SELECT web_user_id, user_email, user_password, membership_fee, birthday, "+
                    "web_user.user_role_id, user_role_type "+
                    "FROM web_user, user_role where web_user.user_role_id = user_role.user_role_id " + 
                    "ORDER BY web_user_id ";
             */
            String sql = "UPDATE photo SET location=?, date_taken=?, image_url= ?, title=?, blurb=?, "
                    + "web_user_id=? WHERE photo_id = ?";

            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            // Only difference is that Sally's class takes care of encoding null 
            // when necessary. And it also System.out.prints exception error messages.
            PrepStatement pStatement = new PrepStatement(dbc, sql);

            // Encode string values into the prepared statement (wrapper class).
            pStatement.setString(1, inputData.location); // string type is simple
            pStatement.setDate(2, ValidationUtils.dateConversion(inputData.dateTaken));
            pStatement.setString(3, inputData.imageUrl);
            pStatement.setString(4, inputData.title);
            pStatement.setString(5, inputData.blurb);
            pStatement.setInt(6, ValidationUtils.integerConversion(inputData.webUserId));
            pStatement.setInt(7, ValidationUtils.integerConversion(inputData.photoId));

            // here the SQL statement is actually executed
            int numRows = pStatement.executeUpdate();

            // This will return empty string if all went well, else all error messages.
            errorMsgs.errorMsg = pStatement.getErrorMsg();
            if (errorMsgs.errorMsg.length() == 0) {
                if (numRows == 1) {
                    errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to the user.
                } else {
                    // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                    errorMsgs.errorMsg = numRows + " records were updated (expected to update one record).";
                }
            } else if (errorMsgs.errorMsg.contains("foreign key")) {
                errorMsgs.errorMsg = "Invalid Web User Id";
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                errorMsgs.errorMsg = "That image url is already taken! (Use a different URL)";
            }

        } // customerId is not null and not empty string.
        return errorMsgs;
    } // update
    
    // method delete returns "" (empty string) if the delete worked fine. Otherwise, 
    // it returns an error message.
    public static String delete(String photoId, DbConn dbc) {

        if (photoId == null) {
            return "Error in model.photo.DbMods.delete: cannot delete photo record because 'photoId' is null";
        }

        // This method assumes that the calling Web API (JSP page) has already confirmed 
        // that the database connection is OK. BUT if not, some reasonable exception should 
        // be thrown by the DB and passed back anyway... 
        String result = ""; // empty string result means the delete worked fine.
        try {

            String sql = "DELETE FROM photo WHERE photo_id = ?";

            // This line compiles the SQL statement (checking for syntax errors against your DB).
            PreparedStatement pStatement = dbc.getConn().prepareStatement(sql);

            // Encode user data into the prepared statement.
            pStatement.setString(1, photoId);

            int numRowsDeleted = pStatement.executeUpdate();

            if (numRowsDeleted == 0) {
                result = "Record not deleted - there was no record with photo_id " + photoId;
            } else if (numRowsDeleted > 1) {
                result = "Programmer Error: > 1 record deleted. Did you forget the WHERE clause?";
            }

        } catch (Exception e) {
            result = "Exception thrown in model.photo.DbMods.delete(): " + e.getMessage();
        }

        return result;
    } //delete

} // class
