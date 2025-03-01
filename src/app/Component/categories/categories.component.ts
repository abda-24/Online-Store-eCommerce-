import { Component, inject } from '@angular/core';
import { GetAllCategoriesService } from '../../core/services/get-all-categories.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  categories: any[] = []; // Array to store categories
  isLoading: boolean = true; // Loading state
  errorMessage: string | null = null; // Error message
  private readonly _CategoryService = inject(GetAllCategoriesService);

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this._CategoryService.GetAllCategories().subscribe({
      next: (response) => {
        this.categories = response.data; // Assuming the API returns data in a `data` field
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage =
          'Failed to load categories. Please try again later.';
        this.isLoading = false;
      },
    });
  }
}
