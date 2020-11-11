package TutorialsBugCatchers.OnlineTutoringBackEnd.model;

public class Tutor {

    public String name;
    public String lastname;
    public int telephone;
    public String email;
    public String username;
    public String password2;
    public String password;

    public Tutor(String name, String lastName, int telephone, String email) {
        this.name = name;
        this.lastname = lastName;
        this.telephone = telephone;
        this.email = email;
    }

    public Tutor(String name, String email, int telephone) {
        this.name = name;
        this.telephone = telephone;
        this.email = email;
    }

    public Tutor(){

    }


    
}
