import { Component, OnInit } from '@angular/core';
import { ApiConnexionService } from '../api-connexion.service';
import { Groups } from '../Interface/IGroups';
import { User } from '../Interface/IUsers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  groups: any[] = [];
  id: number = 2249;
  groupAndFriends: any[] = [];
  user: any;
  parameter: number = 0;
  isMyfriends: boolean = false; 
  isMyGroupe: boolean = false;
  ismyGroupeAdmin: boolean = false;

  constructor(private service: ApiConnexionService) { }
  ngOnInit(): void {
    this.getUser(this.id);
    // this.getAll(this.id, 0);
    this.getAllGroups()

  }
  //récupère les users
  getUser(id: number) {
    this.service.getUser(id)
      .subscribe((users) => {
        this.user = users;
        console.log(this.user);
      });
  }
  //récupère tout les groups
  getAllGroups() {
    this.service.getGroups()
      .subscribe((groups: Groups[]|any) => {
        this.groups = JSON.parse(JSON.stringify(groups['hydra:member']));
        console.log(this.groups);
      });
  }
  //récupère l'url avec le paramètre à rentrer
  getAllParameter(parameter:number) {
    this.service.getAllWithParameter(this.id, parameter)
      .subscribe((groupAndFriends:Groups[]|User[]|any) => {
        this.groupAndFriends = JSON.parse(JSON.stringify(groupAndFriends['hydra:member']));
        console.log(this.groupAndFriends);
      });
  }

  //Je récupère mes amis via la méthode des paramètres
  getAllfriends(event:any):boolean{
    if ( event.target.checked ) {
      if(this.getAllmysGroupsAndFriends()){
        this.getAllmysGroupsAndFriends()
      }else{
        this.getAllParameter(3);
      }
      return this.isMyfriends = true;
    }else{
      return this.isMyfriends = false;
    }
   
  }

  //Je récupère mes groups via la méthode des paramètres
  getAllMyGroups(event:any):boolean{
    
    if ( event.target.checked ) {
      if(this.getAllmysGroupsAndFriends()){
        this.getAllmysGroupsAndFriends()
      }else{
        this.getAllParameter(1);
      }
      return this.isMyGroupe = true;
      
    }else{
      return this.isMyGroupe = false;
    }

  }

  //Je récupère mes groups admin via la méthode des paramètres
  getAllMyGroupsAdmin(event:any){
    
    if ( event.target.checked ) {
      this.getAllParameter(2);
      this.ismyGroupeAdmin = true;
    }
    
  }

  //Si mes checkbox mes amis et mes gropus sont cochés, j'affiche les 2
  getAllmysGroupsAndFriends():boolean{
    if(this.isMyGroupe && this.isMyfriends){
      this.getAllParameter(0);
      return true;
    }else{
      return false;
    }
  }

 
  

}
