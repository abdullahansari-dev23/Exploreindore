import { Routes } from '@angular/router';
import { ThingsToDoComponent } from './things-to-do/things-to-do.component';
import { AppComponent } from './app.component';
import { WhereToGoComponent } from './where-to-go/where-to-go.component';
import { HomeComponent } from './home/home.component';
import { HistoryComponent } from './history/history.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';

export const routes: Routes = [
    {
        path:'',component:AppComponent,
        children:[
            {path:'',component:HomeComponent},
            {path:'Thingtodo',component:ThingsToDoComponent},
            {path:'wheretogo',component:WhereToGoComponent},
            {path:'History',component:HistoryComponent},
            {path:'PrivacyPolicy',component:PrivacypolicyComponent},
        ]
    },

];


