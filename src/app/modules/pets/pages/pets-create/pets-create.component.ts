import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pets-create',
  templateUrl: './pets-create.component.html',
  styleUrls: ['./pets-create.component.css'],
})
export class PetsCreateComponent implements OnInit {
  id: any;

  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.queryParamMap.get('id');
    // console.log(this.id);
  }
  sendPets() {
    this.router.navigateByUrl('/pets');
    // this.router.navigate(['/pets/create'], { queryParams: { id: 0 } });
  }
}
