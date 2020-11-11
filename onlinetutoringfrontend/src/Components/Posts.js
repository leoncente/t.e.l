import React, { Component } from 'react'
import './Posts.css';
import './Posts.css';
import swal from 'sweetalert';

export class Posts extends Component {

    render() {

        alert=() =>{
            swal({
              text:"No disponible",
              icon:"warning",
            });
        }
        const { posts, loading } = this.props;

        if (loading) {
            return <h2>No hay Tutor que dicte esta materia</h2>
        }

        return (
            <div className = 'list-posts'>
                {posts.map(post => (
                    <div key={post.telephone} className="alert alert-primary">
                        <h4 className="alert-heading">Nombre: {post.name}</h4>
                        <p>Apellido: {post.lastname}</p>
                        <p>Email: {post.email}</p>
                        <p>Telefono: {post.telephone}</p>
                        <button>VER</button>
                    </div>
                ))}
            </div>
        )
    }
}

export default Posts