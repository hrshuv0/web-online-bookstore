import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Book } from 'src/app/common/book';
import { CartItem } from 'src/app/common/cart-item';
import { BookService } from 'src/app/services/book.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-book-list',
  //templateUrl: './book-list.component.html',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  currentCategoryId: number = 1;
  searchMode: boolean = false;
  previousCategory: number = 1;

  //new properties for server side paging
  currentPage: number = 1;
  pageSize: number = 2;
  totalRecords: number = 0;


  constructor(private _bookService: BookService,
    private _activatedRoute: ActivatedRoute,
    private _cartService: CartService,
    private _spinnerService: NgxSpinnerService,
    _config: NgbPaginationConfig
  ) {
    _config.maxSize = 3;
    _config.boundaryLinks = true;
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(() => {
      this.listBooks();
    });
  }

  // pageClick(pageOfItems: Array<Book>){
  //   this.pageOfItems = pageOfItems;

  // }



  listBooks() {

    this._spinnerService.show();

    this.searchMode = this._activatedRoute.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchBooks();
    }
    else {
      this.handleListBooks();
    }



  }

  handleListBooks() {
    const hasCategoryId: boolean = this._activatedRoute.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this._activatedRoute.snapshot.paramMap.get('id');
    }
    else {
      this.currentCategoryId = 1;
    }

    if (this.previousCategory != this.currentCategoryId) {
      this.currentPage = 1;
    }
    this.previousCategory = this.currentCategoryId;


    this._bookService.getBooks(this.currentCategoryId,
      this.currentPage - 1,
      this.pageSize)
      .subscribe(
        this.processPaginate()
      );

  }
  processPaginate() {

    return data => {

      setTimeout(() => {
        this._spinnerService.hide();

        this.books = data._embedded.books;
        this.currentPage = data.page.number + 1;
        this.totalRecords = data.page.totalElements;
        this.pageSize = data.page.size;

      }, 1000)

      // this._spinnerService.hide();

      // this.books = data._embedded.books;
      // this.currentPage = data.page.number+1;
      // this.totalRecords = data.page.totalElements;
      // this.pageSize = data.page.size;
    }

  }

  handleSearchBooks() {
    const keyword: string = this._activatedRoute.snapshot.paramMap.get('keyword');

    this._bookService.searchBooks(keyword,
      this.currentPage - 1,
      this.pageSize)
      .subscribe(this.processPaginate());
  }

  updatePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.listBooks();
  }

  addToCart(book: Book) {
    console.log(`book name: ${book.name}, and price : ${book.unitPrice}`);

    const cartItem = new CartItem(book);
    this._cartService.addToCart(cartItem);
  }








}
