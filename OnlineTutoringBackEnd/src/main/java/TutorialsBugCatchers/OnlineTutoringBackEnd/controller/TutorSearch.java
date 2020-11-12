package TutorialsBugCatchers.OnlineTutoringBackEnd.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.CrossOrigin;

import TutorialsBugCatchers.OnlineTutoringBackEnd.model.Subject;
import TutorialsBugCatchers.OnlineTutoringBackEnd.model.Tutor;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.ResultSet;
import java.sql.Statement;

@RestController
@RequestMapping("/API")
public class TutorSearch {

    //Allows localhost:3000 to GET and POST
    @CrossOrigin
    //Sets url to localhost:8080/API/materias
    @GetMapping("/materias")
    //Returns a list of all subjects created in the DB
    public List<Subject> getSubjects(){
        //url for TEL_DB DataBase
        String url = "jdbc:postgresql://ingsoft.coegv0vravum.us-east-2.rds.amazonaws.com:5432/TEL_DB";
        url += "?user=" + "postgres" + "&password=" + "postgres";
        //The answer list
        List <Subject> subjects = new ArrayList<Subject>();
        //The connecion variable
        Connection conn;
        //Query for DB
        String query = "SELECT * FROM materia";
        try{
            //Connects to the DB
            conn = DriverManager.getConnection(url);
            Statement stmt = conn.createStatement();
            //Executes the query
            ResultSet rs = stmt.executeQuery(query);
            //Check every object in the answer list from the query
            while (rs.next()) {
                String id = rs.getString("codmat");
                String name = rs.getString("nombre");
                Subject s = new Subject(id, name);
                //Adds the name of the subject to the answer list
                subjects.add(s);
            }
        }
        catch(SQLException e){
            System.out.println("connection error");
        }
        //Return the list with every name of the subjects
        return subjects;
    }

    @CrossOrigin
    //Sets url to localhost:8080/API/busqueda/{name}
    //Where {name} is the code for the desired sbject
    //The code for every subject is specified in the file SubjectData.sql
    @GetMapping("/busqueda/{subject}")
    //Returns a list of all tutors registered in the DB with that subject
    public List<Tutor> getTutors(@PathVariable String subject){
        String url = "jdbc:postgresql://ingsoft.coegv0vravum.us-east-2.rds.amazonaws.com:5432/TEL_DB";
        url += "?user=" + "postgres" + "&password=" + "postgres";
        List <Tutor> tutors = new ArrayList<Tutor>();
        Connection conn;
        String query = "SELECT nombre, apellido, correo, telf FROM tutor t,materia_tutor m WHERE t.nom_usu=m.nom_usu AND '";
        //Adds the specified subject code to the query
        query += subject;
        query += "'= m.codmat";
        try{
            conn = DriverManager.getConnection(url);
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(query);
            while (rs.next()) {
                String name = rs.getString("nombre");
                String last = rs.getString("apellido");
                String mail = rs.getString("correo");
                int phone = rs.getInt("telf");
                //Creates a new tutor object with the data
                Tutor t = new Tutor(name,last,phone,mail);
                //Adds the new tutor to the answer list
                tutors.add(t);
            }
        }
        catch(SQLException e){
            System.out.println("error al conectar");
        }
        return tutors;
    }

}
