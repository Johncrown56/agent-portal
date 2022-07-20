import { Component, OnInit } from '@angular/core';
declare var $: any;
declare var HSFormSearch:any;

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.css']
})
export class SearchComponentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(document).on('ready', function() {
    $('.js-form-search').each(function(this: HTMLInputElement) {
      new HSFormSearch($(this)).init();
    });
  })
  }

}
