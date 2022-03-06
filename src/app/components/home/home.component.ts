import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[PostService, UserService]
})
export class HomeComponent implements OnInit {
  public page_title:string;
  public url;
  public posts: Array<Post>;
  public identity;
  public token;

  constructor(
    private _postService: PostService,
    private _userService: UserService
  ) {
    this.page_title='Inicio de la pagina';
    this.url=global.url;
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();
  }

  ngOnInit(): void {
    this.getPosts();
  }
  getPosts(){
      this._postService.getPosts().subscribe(
        response => {
          if(response.status=='success'){
            this.posts=response.posts;
            console.log(this.posts);
          }
        },
        error=>{
            console.log(error);
        }
      )
  }
  deletePost(id){
    this._postService.delete(this.token,id).subscribe(
      response => {
        //if(response.status=='success'){
          this.getPosts();
        //}
      },
      error=>{
          console.log(error);
      }
    )
  }
  showModal(id){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Estas seguro?',
      text: "Quieres borrar esto?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Borrar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.deletePost(id);
        swalWithBootstrapButtons.fire(
          'Eliminado!',
          'Tu publicacion ha sido eliminado.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'No se ha eliminado',
          'error'
        )
      }
    })
  }

}
