//Se usa para poder cargar como servicio los componentes
import {ModuleWithProviders}from '@angular/core';
import {Routes,RouterModule}from '@angular/router';

//Importar componentes
import {LoginComponent}from './components/login/login.component';
import {RegisterComponent}from './components/register/register.component';
import {HomeComponent}from './components/home/home.component';
import {ErrorComponent}from './components/error/error.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { CategoryNewComponent} from './components/category-new/category-new.component'
import { PostNewComponent } from './components/post-new/post-new.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { IdentityGuard } from './services/identity.guard';
import { ProfileComponent } from './components/profile/profile.component';

//Definir las rutas
const appRoutes: Routes = [
    {path:'',component:HomeComponent},
    {path:'inicio',component:HomeComponent},
    {path:'login',component:LoginComponent},
    {path:'logout/:sure',component:LoginComponent},
    {path:'registro',component:RegisterComponent},
    {path:'ajustes',component:UserEditComponent, canActivate: [IdentityGuard]},
    {path:'crear-categoria',component:CategoryNewComponent, canActivate: [IdentityGuard]},
    {path:'crear-entrada',component:PostNewComponent, canActivate: [IdentityGuard]},
    {path:'entrada/:id',component:PostDetailComponent},
    {path:'editar-entrada/:id',component:PostEditComponent, canActivate: [IdentityGuard]},
    {path:'categoria/:id',component:CategoryDetailComponent},
    {path:'perfil/:id',component:ProfileComponent},
    {path:'**',component:ErrorComponent}
    
];

//Exportar configuracion
export const appRoutingProviders:any[]=[];
//Usar una de las tres opciones
//export const routing: ModuleWithProviders=RouterModule.forRoot(appRoutes);
//export const routing: ModuleWithProviders<Route> = RouterModule.forRoot(appRoutes);
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);

