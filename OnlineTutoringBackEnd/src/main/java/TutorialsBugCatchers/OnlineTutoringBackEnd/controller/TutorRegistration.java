package TutorialsBugCatchers.OnlineTutoringBackEnd.controller;

import java.util.Properties;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import TutorialsBugCatchers.OnlineTutoringBackEnd.model.Tutor;

import org.springframework.web.bind.annotation.CrossOrigin;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.ResultSet;
import java.sql.Statement;

@RestController
@RequestMapping("/API")

public class TutorRegistration {
    
    //Allows localhost:3000 to GET and POST
    @CrossOrigin
    //Sets url to localhost:8080/API/busquedaCorreo/{mail}
    //Where {mail} is the mail we want to verify in not registered already
    @GetMapping("/busquedaCorreo/{emailSearch}")
    //Return a boolean telling if the mail already exists in the DB or not
    public boolean getExistenceEmail(@PathVariable String emailSearch){
        //url for TEL_DB DataBase
        String url = "jdbc:postgresql://ingsoft.coegv0vravum.us-east-2.rds.amazonaws.com:5432/TEL_DB";
        url += "?user=" + "postgres" + "&password=" + "postgres";
        //The answer boolean
        boolean exists = false;
        //The connecion variable
        Connection conn;
        //Query for DB to count the mails whith that name, answer should be only 0 or 1
        String query = "SELECT Count(*) as cant FROM tutor WHERE correo='"+emailSearch+"'";
        try{
            //Connects to the DB
            conn = DriverManager.getConnection(url);
            Statement stmt = conn.createStatement();
            //Executes the query
            ResultSet rs = stmt.executeQuery(query);
            int resp=-1;
            //Check every object in the answer list from the query, even if we now there is just one answer
            while(rs.next()){
                resp = rs.getInt("cant");
            }
            //Ask if the answer is 0 or 1
            exists = resp==1;
        }
        catch(SQLException e){
            System.out.println("error al conectar");
        }
        return exists;
    }

    //Allows localhost:3000 to GET and POST
    @CrossOrigin
    //Sets url to localhost:8080/API/busquedaNomUsu/{nom}
    //Where {nom} is the username we want to verify in not registered already
    @GetMapping("/busquedaNomUsu/{usernameSearch}")
    public boolean getExistenceUsername(@PathVariable String usernameSearch){
        String url = "jdbc:postgresql://ingsoft.coegv0vravum.us-east-2.rds.amazonaws.com:5432/TEL_DB";
        url += "?user=" + "postgres" + "&password=" + "postgres";
        boolean exists = false;
        Connection conn;
        String query = "SELECT Count(*) as cant FROM tutor WHERE nom_usu='"+usernameSearch+"'";
        try{
            conn = DriverManager.getConnection(url);
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(query);
            int resp=-1;
            while(rs.next()){
                resp = rs.getInt("cant");
            }
            exists = resp==1;
        }
        catch(SQLException e){
            System.out.println("error al conectar");
        }
        return exists;
    }

    //Allows localhost:3000 to GET and POST
    @CrossOrigin
    //Sets url to localhost:8080/API/registrar
    @PostMapping("/registrar")
    //Gets a Json file, turns it into a Tutor object called t, validates it and inserts it into the DB
    public int registerTutor(@RequestBody Tutor t){
        int register=0;
        String url = "jdbc:postgresql://ingsoft.coegv0vravum.us-east-2.rds.amazonaws.com:5432/TEL_DB";
        url += "?user=" + "postgres" + "&password=" + "postgres";
        Connection conn;
        String query = "INSERT INTO tutor VALUES ('";
        query+=t.name+"','";
        query+=t.lastname+"',";
        query+=t.telephone+",'";
        query+=t.email+"','";
        query+=t.username+"','";
        query+=t.password2+"')";
        try{
            conn = DriverManager.getConnection(url);
            Statement stmt = conn.createStatement();
            //Validates tutor data
            register = validTutor(t);
            if(register == 11){
                //Executes the query
                stmt.executeUpdate(query);
            }

        }
        catch(SQLException e){
            System.out.println("error al conectar");
        }
        //Returns an int that tells what happened
        // 0 worng DB connection
        // 17 = wrong values
        // 29 = mail alreday exists
        // 37 = username already exists
        // 11 = registered
        System.out.println(register);
        return register;
    }

    //Verifies if the tutor has valid data and returns the correct code
    private int validTutor(Tutor t){
        //Verifies all data fulfils the requirements
        if(t.name==null || t.name.length()<3 || t.name.length()>20 || !justLetters(t.name)) return 17;
        if(t.lastname==null || t.lastname.length()<3 || t.lastname.length()>20 || !justLetters(t.lastname)) return 17;
        if(t.telephone<1000000 || t.telephone>99999999) return 17;
        if(t.email==null || !format(t.email)) return 17;
        if(t.username==null || t.username.length()<5 || t.username.length()>20 || Spaces(t.username)) return 17;
        if(t.password2==null || t.password2.length()<7 || t.password2.length()>16 || !hasNumUpLow(t.password2)) return 17;
        if(!t.password2.equals(t.password)) return 17;
        //Verifies existence
        if(getExistenceEmail(t.email)) return 29;
        if(getExistenceUsername(t.username)) return 37;
        //If all data is ok, returns registered code
        return 11;
    }

    //Tells if the email is valid
    private boolean format(String mail){
        int x=0;
        for(int i=1;i<mail.length()-1;i++){
            if(mail.charAt(i)=='@') x=i;
        }
        if(x==0 || x==mail.length()-1) return false;
        if(mail.charAt(0)=='.' || mail.charAt(x-1)=='.') return false;
        for(int i=0;i<x;i++){
            if(!(mail.charAt(i)>='0' && mail.charAt(i)<='9') && !(mail.charAt(i)>='a' && mail.charAt(i)<='z') && !(mail.charAt(i)>='A' && mail.charAt(i)<='Z') && mail.charAt(i)!='.' && mail.charAt(i)!='-' && mail.charAt(i)!='_') 
                return false;
        }
        for(int i=x+1;i<mail.length();i++){
            if(!(mail.charAt(i)>='a' && mail.charAt(i)<='z') && !(mail.charAt(i)>='A' && mail.charAt(i)<='Z') && mail.charAt(i)!='.' && mail.charAt(i)!='-')
                return false;
        }
        return true;
    }

    //Tells if the password is valid
    private boolean hasNumUpLow(String pass){
        boolean up=false, low=false,num=false;
        for(int i=0;i<pass.length();i++){
            if(pass.charAt(i)>='0' && pass.charAt(i)<='9') num=true;
            if(pass.charAt(i)>='A' && pass.charAt(i)<='Z') up=true;
            if(pass.charAt(i)>='a' && pass.charAt(i)<='z') low=true;
        }
        return up && low && num;
    }

    //Tells if the string has just alfabetic characters and space
    private boolean justLetters(String var){
        for(int i=0;i<var.length();i++){
            if((var.charAt(i)>'Z' || var.charAt(i)<'A') && (var.charAt(i)>'z' || var.charAt(i)<'a') && var.charAt(i)!=' ')
                return false;
        }
        if(var.charAt(0)==' ' || var.charAt(var.length()-1)==' ') return false;
        return true;
    }

    //Tells if there is an space
    private boolean Spaces(String var){
        for(int i=0;i<var.length();i++){
            if(var.charAt(i)==' ') return true;
        }
        return false;
    }

}
