import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { LoaderSelector } from 'src/app/store/loader/loader.selector';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent {
  @Select(LoaderSelector.getLoader) isLoading!: Observable<boolean>;
  constructor() {}
}
