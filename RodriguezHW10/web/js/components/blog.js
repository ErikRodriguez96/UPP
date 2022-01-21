function blog() {

    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = ` 
    <h2>My Blog</h2>

    <h4>Web Design/Dev Experience</h4>
    <p>
        I have very little web design and dev experience, I have some experience with SQL
        but that was about 3 years ago at BCCC. I've never designed or really dabbled in web pages before either.
    </p>

    <h4>Database Design</h4>
    <p>
        Users will be photographers and the other table will be photos/albums.
        This is a straightforward design where one user creates many things (that can only be associated with one user.)
        But this also lets me try and implement some more complex work where individual pictures can be associated with multiple albums.
    </p>

    <h4>HomePage Homework</h4>
    <p>
        Implementing a responsive titlenav was the most difficult part of this HW.
        I was confused as to what elements pertained to just the mobile part of the style sheet and which also pertained to the desktop version.
        I ended up just looking at the example code to figure out how to write it all out after failing to do so on my own for about an hour.
    </p>    

    <h4>JS UI Homework</h4>
    <p> 
        This introduces quite a lot of concepts and elements to work with. I think that
        the toughest part of this homework has been trying to get all these little disparate elements
        to play nice with one another, because they work easily enough on their own in the sample code
        but actually implementing them all at once is difficult.
    </p>

    <h4> JS Object Homework</h4>
    <p>
        This homework flowed a lot more easily than before, I think I had trouble
        with the previous homeworks because of being overwhelmed by all the concepts.
        I'm interested in seeing what more I can do with Javascript, it seems very flexible
        despite being so intuitive which is rare in programing. 
        The most difficulty I had with this lab was probably my own syntax
        errors, I broke all my styling for example because I had an errant "<" out of place for example.
        My private mutators were also broken the entire time and I didn't realize it till the end that it was because 
        I had mistyped the function header to react to the wrong var.
    <p>

    <h4> SQL Database Homework</h4>
    <p>
        I've had some prior experience with SQL before so this assignment wasn't too daunting.
        For the most part my experience just helped me by having knowledge of a lot of the syntax and 
        language used in SQL so I wasn't overwhelmed like I have been with prior modules.
    </p>
    <p>
        In fact I'd say it's very straight forward, SQL is fairly easy to understand and intuitive
        though adding foreign keys was a bit painful thanks to some trouble with workbench.
        It's interesting to see how everything is beginning to come together now like big 
        puzzle pieces, I wasn't expecting to have learned so much so quick. Its only been a month since
        the semester even started and here I am with a basic functioning website and a database!
        Click <a target = "_blank" href = 'Rodriguez_db.pdf'>here</a> to see my homework pdf.

    </p>

    <h4> JS Object ClickSort Homework</h4>
    <p>
        This was a tough homework for me, primarily because I took so long to figure out why I kept getting a certain error.
        When isToShow ran in my make table function, I would keep getting weird errors that 
        appeared as if the function was being passed some kind of empty prototype object. Fortunately after about 
        4 hours, during which I got to fully use chrome's javascript debugger for the first time, I realized that
        unlike the sample code I had to use obj[prop].innerHTML to get the value of each property in the object rather than just
        obj[prop].
    </p>
    <p>
        However once I overcame that hurdle everything came together much more quickly, making a reverse function
        was a snap since all I had to do was make a new attribute for the table header tag and do a simple if/else
        check before the addTableBody is called. I was able to quickly just export my previous "other" table from the
        previous homeworks to a JSON table, but then I realized I had entered all my image URLs incorrectly and went about 
        redoing them all by hand. Combining the functionality of the clicksort and filter make functions required me to really
        go through step by step of every line in the js to understand what was going on, I feel like I have a good grasp on
        how it all works now. 
    </p>
    <p>
        Lastly I ran into some trouble with, of all things, the icon used for sorting. The way it is now
        was the best I could get it ready before the late deadline, previously it was huge and took up about half my screen.
        I'm going to want to redo my styling at some point to get a handle on it since it's all over the place right now.
    </p>

    <h4> Web API Homework </h4>
    <p>
        So this homework wasn't too bad compared to what I was initially expecting. However I have had a very tumultuous 
        last few weeks in my personal life which has led me to having to do this late.
    </p>
    <p>
        I digress, I have no experience with APIs whatsoever so this was all new to me but the sample code made this very enjoyable to go through
        and easy to understand. I did run into an issue which held me up debugging for several hours however where I was repeatedly
        getting a null userList in my ajax callback function. In the end I found the error, when setting the userlist = initial list in my 'other' API 
        js file I was still using initList.webUser, thus referencing a non-existent webUser object as opposed to my 'other' object, photo. So simply
        changing it to userList = initList.photo fixed basically all my problems and it was smooth sailing from there. I learned how to debug 
        better from this but it was a very nasty bug because for all intents and purposes the database was being made correctly, so all my debugging
        statements where showing me logically correct data that I was expecting or literally nothing, just null fields. So in the end I ended up just spamming debug statements everywhere
        and sort of ping-ponging back and forth from the correct, expected data to all the null objects and I was able to narrow it down to that one line of code.

    </p>
    <p>
        Here is my error pdf: Click <a target="_blank" href="RodriguezHW6.pdf">here</a> to see my error document.
    </p>
    <p>
        And here are my APIs: 
        Click <a target="_blank" href="webAPIs/listUsersAPI.jsp">here</a> for my List Users Web API.
        Click <a target="_blank" href="webAPIs/listOtherAPI.jsp">here</a> for my List Photo API.
    </p>

    <h4> Log On/Off Homework </h4>
    <p> 
        This homework went pretty swimmingly all things considered. Building a UI for logging on and off seemed
        a little daunting at first, but reusing code from Lab7 parts A&B made it go very smoothly. Having the
        more tricky backend work already done  made things much less stressful. In fact the most hard part of the
        whole assignment for me was figuring out why my routing table wasn't working, which turned out to be a single
        uncapitalized letter in the file path for my account.js file
    </p>
    <p>
        The implicit session object seems like a powerful tool going forward in the future, having a security-validated
        object that can be accessed by the whole website opens up a lot of options as far as features. Its interesting
        to finally be implementing what could be considered very basic website functionality, referring to a user session.
        In the associated labs with this homework we've been introduced to a lot of security aspects to keep in mind, I can only
        imagine that'll get more serious and involved as we continue.'
    </p>
    <p>
        Links: <br>
        Log On w/ valid URL credentials: <a href="webAPIs/logOnAPI.jsp?userEmailInput=erik%40gmail.com&userPwdInput=pumpkin" target='_blank'>Log On</a><br>
        Log Off: <a href="webAPIs/logOffAPI.jsp" target='_blank'>Log Off</a> <br>
        Get Profile: <a href="webAPIs/getProfileAPI.jsp" target='_blank'>Get Profile</a> <br>
        List All Users: <a href="webAPIs/listUsersAPI.jsp" target='_blank'>List Users</a>  <br>
    </p>
    
    <h4> Insert Homework </h4>
    <p>
        This homework seemed very daunting at first when I looked at the size of everything in the sample code
        but the sample code itself made it quite easy to follow and understand.
        Inserting records requires so much validation and checking! It seems like the vast majority of work for this homework
        is making sure a record works with the database, as opposed to actually inserting the record which is pretty simple
        and straight forward. 
    
        What I did find somewhat confusing though is figuring out exactly what the inserting object should include
        and what my SQL should look like, as well as what exactly to validate. Its very tough to track down errors
        to do with database design I found. 
    </p>
    <p>
        I got quite stuck for an hour trying to understand why this simple record I was trying to 
        insert wasn't working, when I realized I had made a mistake in the design of my database 
        and my photo records had their titles set as unique and not the URL like I thought.
        So when I tried inserting a record with a blank title, there was already an existing one because its a nullable field!
        I also got hung up for a while trying to figure out why I kept getting an error message that implied the user needed to provide
        a primary key, until I realized I needed to remove the primary key from being validated in DBMods.
        Click <a target = "_blank" href = 'Rodriguez_db.pdf'>here</a> to see my database design pdf.
    </p>
    
    <h4> Update Homework </h4>
    <p>
        This homework went very smooth! In fact once I began modifying and creating the code for my other table, I didn't stop
        till I was done and it ran bug free from the first test! The most challenging part of this lab was implementing the user_email
        from web_user to be part of my photo (other) stringData object, which required modifying a lot of code all over my project.
        However even that went smoother than I thought, and its good to know that I can add and remove fields from the database design
        without too much trouble (though we're not going to be doing that at this juncture in class).'
    </p>
    
    <p>
        I think I've mentioned this in previous blogs, but it still makes my head spin how much validation and sanitation has to be
        done when a user interacts with the databases. Its something that makes sense and logically takes a lot of effort, but you
        don't appreciate just how much work it really is until you're doing it yourself. Nobody ever said cyber security was easy!
    </p>
    
    <h4> Delete Homework </h4>
    <p>
        The last homework! I was able to get delete functionality working pretty quickly, all I have left to do now for
        is do try and do some last minute cleanup. Creating the API call seemed a bit scary at first but I realized
        I just had to do what was previously in our previous API calls but now contained within this single js file.
    </p>
    <p>
        Making it compatible with my photo table didn't give me any issues either. What is giving me issues still even now
        is that my projects refuse to compile compatible java classes for publishing, even when using both a standard
        Windows 10 machine and on my main M1 Macbook. I have to get this fixed before publishing but I am uploading the project
        now anyway so as to not turn it in late.'
    </p>
    `;
    
    var ele = document.createElement("div");
    ele.innerHTML = content;
    return ele;    
}