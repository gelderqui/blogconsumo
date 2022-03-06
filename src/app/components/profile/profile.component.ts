import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';
import  Swal  from 'sweetalert2';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers:[PostService, UserService]
})
export class ProfileComponent implements OnInit {
  public url;
  public posts: Array<Post>;
  public user: User;
  public identity;
  public token;

  constructor(
    private _postService: PostService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.url=global.url;
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();
  }

  ngOnInit(){
this.getProfile();
  }
  getProfile(){
    this._route.params.subscribe(params=>{
      let userId= +params['id'];
      this.getUser(userId);
      this.getPosts(userId);
      });
  }
  getUser(userId){
    this._userService.getUser(userId).subscribe(
      response => {
      if(response.status=='success'){
        this.user=response.user;
        console.log(this.user);
      }
    },
    error=>{
        console.log(error);
    }
  );
  }
  getPosts(userId){
      this._userService.getPosts(userId).subscribe(
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
        this.getProfile();
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
