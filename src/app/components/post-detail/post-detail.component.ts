import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { UserService } from 'src/app/services/user.service';
import { global } from '../../services/global';


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  viewProviders: [PostService, UserService]
  
})
export class PostDetailComponent implements OnInit {
  public post:Post;
  public identity;
  public url;
  
  constructor(
    private _postService:PostService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.identity=this._userService.getIdentity();
   }

  ngOnInit(): void {
    this.getPost();
    this.url=global.url;
  }
  getPost(){
    this._route.params.subscribe(params=>{
      let id= +params['id'];
      //Peticion ajax para sacar los datos del post
      this._postService.getPost(id).subscribe(
        response=>{
          if(response.status=='success'){
            this.post=response.post;
            console.log(this.post,"hola");
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
}
