import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import {ProductService} from '../service/product.service';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter
} from "rxjs/operators";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit,OnDestroy {
  product;
 searchForm:FormGroup;
 sub:Subscription;
  constructor(private prodService: ProductService,
    private render:Renderer2) { }

  ngOnInit() {
   this.searchForm = new FormGroup({
    "searchValue" : new FormControl('')
   }

   )
    this.prodService.userDataListener().subscribe((data) => {
      //console.log(data,"data");
      this.product = data;
    })

  }


   getUserDate(){
      console.log(this.searchForm.value.searchValue,"value");

      if(this.product){
        console.log(this.product,"prod");
        if(this.product.includes(this.searchForm.value.searchValue)){
          alert("Entered Duplicate Value");
          this.searchForm.reset();
          return;
        }
      }

        this.prodService.getUserValue(this.searchForm.value.searchValue);

    this.searchForm.reset();
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
