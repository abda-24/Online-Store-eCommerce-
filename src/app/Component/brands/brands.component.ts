import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent  implements OnInit{
  brands: any[] = []; // Array to store brands
  isLoading: boolean = true; // Loading state
  errorMessage: string | null = null; // Error message
  private readonly _BrandService = inject(BrandsService)

  ngOnInit(): void {
    this.loadBrands();
  }

  loadBrands(): void {
    this._BrandService.getAllBrands().subscribe({
      next: (response) => {
        this.brands = response.data; // Assuming the API returns data in a `data` field
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load brands. Please try again later.';
        this.isLoading = false;
      }
    });
  }

}
