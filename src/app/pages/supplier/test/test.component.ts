import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent {
  selectedFile: File | undefined;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  constructor(private http: HttpClient) {}

  onSubmit() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);

      this.http.post('http://localhost:3000/images', formData).subscribe(
        (response) => {
          console.log('Image uploaded successfully!');
          // Handle any further actions after successful upload
        },
        (error) => {
          console.error('Error uploading image:', error);
          // Handle any error scenarios
        }
      );
    }
  }
}
