import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  listProducts: any;
  form: boolean = false;
  product!: Product;
  //product: Product[] = [];
  closeResult!: string;

  constructor(
    private productService: ProductService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getProductDetail();

    this.product = {
      id: null,
      productName: null,
      purchaseDate: null,
      quantity: null,
      productCode: null,
      emailAddress: null,
      profileImage: null,
    };
  }

  getProductDetail() {
    this.productService
      .getProductDetail()
      .subscribe((res) => (this.listProducts = res));
  }

  createProduct(p: any) {
    this.productService.createProduct(p).subscribe(() => {
      this.getProductDetail();
      this.form = false;
      console.log('Product created successfully!');
    });
  }

  updateProduct(product: Product): void {
    this.productService.updateProduct(product.id, product).subscribe(
      (updatedProduct) => {
        console.log('Product updated successfully!', updatedProduct);
      },
      (error) => console.log(error)
    );
  }

  deleteProduct(id: any) {
    this.productService
      .deleteProduct(id)
      .subscribe(() => this.getProductDetail());
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = 'Closed with: ${result}';
        },
        (reason) => {
          this.closeResult = 'Dismissed ${this.getDismissReason(reason)}';
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return 'with: ${reason}';
    }
  }
  closeForm() {}
  cancel() {
    this.form = false;
  }
}
