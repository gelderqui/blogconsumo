import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import { Post} from '../../models/post';
import { global } from '../../services/global';

@Component({
  selector: 'app-post-edit',
  templateUrl: '../post-new/post-new.component.html',
  providers:[UserService,CategoryService, PostService]
})
export class PostEditComponent implements OnInit {

  public page_title : string;
  public identity;
  public token;
  public post: Post;
  public categories;
  public url;
  public status;
  public is_edit:boolean;
  public resetVar = true;

  public froala_options : Object = {
    charCounterCount: true,
    languaje:'es',
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat'],
  };
  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg, .png, .gif, .jpeg",
    maxSize: "50",
    uploadAPI:  {
      url:global.url+'post/upload',
      headers: {
     "Authorization" : this._userService.getToken()
     
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText:'Sube tu avatar'
};
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _postService: PostService
  ) { 
    this.page_title='Editar entrada';
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();
    this.is_edit=true;
    this.url=global.url;
  }

  ngOnInit(): void {
    this.getCategories();
    this.post=new Post(1,this.identity.sub,1,'','',null,null);
    this.getPost();
    //console.log(this.post);
  }

  //Se obtienen las categorias
  getCategories(){
    this._categoryService.getCategories().subscribe(
      response=>{
        if(response.status=='success'){
          this.categories=response.categories;
          //console.log(this.categories);
        }
      },
      error=>{
        console.log(error);
      }
    )
  }
  getPost(){
    this._route.params.subscribe(params=>{
      let id= +params['id'];
      //Peticion ajax para sacar los datos del post
      this._postService.getPost(id).subscribe(
        response=>{
          if(response.status=='success'){
            
            this.post=response.post;

            if(this.post.user_id!=this.identity.sub){
              this._router.navigate(['/inicio']);
            }
            //console.log(this.post);
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
  imageUpload(data){
    //console.log(JSON.parse(datos.response));
    let image_data = JSON.parse(data.response);
    this.post.image=image_data.image;
  }
  onSubmit(form){
    console.log(this.post);
    //console.log(this._postService.create())
    this._postService.update(this.token, this.post, this.post.id).subscribe(
      response=>{
        if(response.status='success'){
          //this.post=response.post;
          this.status='success';
          this._router.navigate(['/entrada', this.post.id]);
        }
        else{
          this.status='error';
        }
      },
      error=>{
        console.log(error);
        this.status='error';
      }
    )
  }
}
