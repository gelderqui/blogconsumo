import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params} from '@angular/router';
import {Category} from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { UserService } from '../../services/user.service';
import { global} from '../../services/global';
import { PostService } from '../../services/post.service';
import  Swal  from 'sweetalert2';


@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
  providers:[CategoryService, UserService,PostService]
})
export class CategoryDetailComponent implements OnInit {
  public page_title:string;
  public category: Category;
  public posts: any;
  public url:string;
  public identity;
  public token;
  constructor(
    private _route: ActivatedRoute,
    private _router:Router,
    private _categoryService:CategoryService,
    private _userService: UserService,
    private _postService: PostService
  ) { 
    this.url=global.url;
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();
  }

  ngOnInit(): void {
    this.getPostsByCategory();
  }
  getPostsByCategory(){
    this._route.params.subscribe(params=>{
      let id= +params['id'];
      //Peticion ajax para sacar los datos del post
      this._categoryService.getCategory(id).subscribe(
        response=>{
          if(response.status='success'){
            this.category=response.category;
            this._categoryService.getPosts(id).subscribe(
              response=>{
                if(response.status='success'){
                   this.posts=response.posts;
                   //console.log(this.posts);
                }
                else{
                  this._router.navigate(['/inicio']);
                }
              },
              error=>{
                console.log(error);
              }
            )
           // console.log(this.post);
          }
          else{
            this._router.navigate(['/inicio']);
          }
        },
        error=>{
          console.log(error);
          this._router.navigate(['/inicio']);
        }
      );
    });
  }

  deletePost(id){
    this._postService.delete(this.token,id).subscribe(
      response => {
        //if(response.status=='success'){
          this.getPostsByCategory();
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
