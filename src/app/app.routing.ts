import {ModuleWithProviders}from '@angular/core';
import {Routes,RouterModule}from '@angular/router';

//Importar componentes
import {LoginComponent}from './components/login/login.component';
import {RegisterComponent}from './components/register/register.component';
import {HomeComponent}from './components/home/home.component';
import {ErrorComponent}from './components/error/error.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';

//Definir las rutas
const appRoutes: Routes = [
    {path:'',component:HomeComponent},
    {path:'inicio',component:HomeComponent},
    {path:'login',component:LoginComponent},
    {path:'logout/:sure',component:LoginComponent},
    {path:'registro',component:RegisterComponent},
    {path:'ajustes',component:UserEditComponent},
    {path:'**',component:ErrorComponent}
];

//Exportar configuracion
export const appRoutingProviders:any[]=[];
//Usar una de las tres opciones
//export const routing: ModuleWithProviders=RouterModule.forRoot(appRoutes);
//export const routing: ModuleWithProviders<Route> = RouterModule.forRoot(appRoutes);
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);

