package view;

// classes imported from java.sql.*
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import model.photo.*;

// classes in my project
import dbUtils.*;

public class photoView {

    public static StringDataList getAllPhotos(DbConn dbc) {

        // sdl will be an empty array and DbError with "" 
        StringDataList sdl = new StringDataList(); 
        
        // sd will have all of it's fields initialized to ""
        StringData sd = new StringData();
        
        try {
            String sql = "SELECT photo_id, title, location, date_taken, image_url, blurb, "
                    + "photo.web_user_id, user_email "
                    + "FROM photo, web_user where photo.web_user_id = web_user.web_user_id "
                    + "ORDER BY photo_id ";  // you always want to order by something, not just random order.
            
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();

            while (results.next()) {
                
                sd = new StringData();
                
                // the formatUtils methods do not throw exceptions, but if they find illegal data, they write 
                // a message right in the field that they are trying to format.

                // plainInteger returns integer converted to string with no commas.
                sd.photoId = FormatUtils.plainInteger(results.getObject("photo_id"));
                sd.title = FormatUtils.formatString(results.getObject("title"));               
                sd.location = FormatUtils.formatString(results.getObject("location"));
                sd.dateTaken = FormatUtils.formatDate(results.getObject("date_taken"));
                sd.userEmail = FormatUtils.formatString(results.getObject("user_email"));
                //sd.albumId = FormatUtils.formatInteger(results.getObject("album_id"));
                sd.imageUrl = FormatUtils.formatString(results.getObject("image_url"));
                sd.blurb = FormatUtils.formatString(results.getObject("blurb"));
                sd.webUserId = FormatUtils.plainInteger(results.getObject("web_user_id"));
                
                sdl.add(sd);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            sd.errorMsg = "Exception thrown in photoView.getAllPhotos(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;
    }
}