import React, { Component } from 'react'
import './Pagination.css'

export class Pagination extends Component {
    render() {
        const { postsPerPage, totalPosts, paginate, nextPage, prevPage, currentPage } = this.props;

        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
            pageNumbers.push(i);
        }

        if (pageNumbers.length==1){
            pageNumbers.length=0;
        }

        console.log(currentPage)

        return (
            <nav>
                <ul className="pagination justify-content-center">
                    {totalPosts <= 5 || currentPage === 1 ?
                        <li class="page-item disabled"> <a className="page-link" href="#" onClick={() => prevPage()} dis >Anterior</a> </li> :
                        <li className="page-item"> <a className="page-link" href="#" onClick={() => prevPage()} dis >Anterior</a> </li> }
                    {pageNumbers.map(num => (
                        <li className="page-item" key={num}>
                            <a onClick={() => paginate(num)} href="#" className="page-link">{num}</a>
                        </li>
                    ))}
                    {totalPosts <=5 || currentPage === pageNumbers[pageNumbers.length-1] ?
                        <li class="page-item disabled"> <a className="page-link" href="#" onClick={() => nextPage()}>Siguiente</a> </li> :
                        <li className="page-item"> <a className="page-link" href="#" onClick={() => nextPage()}>Siguiente</a></li>
                    }
                </ul>
            </nav>
        )
    }
}

export default Pagination