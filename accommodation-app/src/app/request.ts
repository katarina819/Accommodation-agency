import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'request',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="request-page">
      <h1>Personal Data Form</h1>
      <form #personalForm="ngForm" (ngSubmit)="nextStep()">
        
        <div class="form-group">
          <label>Name:</label>
          <input type="text" name="name" [(ngModel)]="formData.name" required />
        </div>

        <div class="form-group">
          <label>Surname:</label>
          <input type="text" name="surname" [(ngModel)]="formData.surname" required />
        </div>

        <div class="form-group">
          <label>Email:</label>
          <input type="email" name="email" [(ngModel)]="formData.email" required />
        </div>

        <div class="form-group">
          <label>Contact Number:</label>
          <input type="tel" name="contact" [(ngModel)]="formData.contact" />
        </div>

        <div class="form-group">
          <label>Residential Address:</label>
          <input type="text" name="address" [(ngModel)]="formData.address" />
        </div>

        <div class="form-group">
          <label>Place of Residence:</label>
          <input type="text" name="residence" [(ngModel)]="formData.residence" />
        </div>

        <div class="form-group">
          <label>Postal Code:</label>
          <input type="text" name="postal" [(ngModel)]="formData.postal" />
        </div>

        <div class="form-group">
          <label>Do you consume alcohol?</label>
          <select name="alcohol" [(ngModel)]="formData.alcohol">
            <option value="">-- Select --</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        <div class="form-group">
          <label>Are you a smoker?</label>
          <select name="smoker" [(ngModel)]="formData.smoker">
            <option value="">-- Select --</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        <div class="form-group">
          <label>Are you employed?</label>
          <select name="employed" [(ngModel)]="formData.employed">
            <option value="">-- Select --</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        <div class="form-group">
          <label>Have you ever been criminally exiled?</label>
          <select name="criminal" [(ngModel)]="formData.criminal">
            <option value="">-- Select --</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        <!-- Dugme Next -->
        <div class="form-actions">
          <button type="submit" [disabled]="!personalForm.valid">Next</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .request-page {
      max-width: 600px;
      margin: 40px auto;
      padding: 30px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      font-family: 'Segoe UI', sans-serif;
    }
    h1 {
      text-align: center;
      color: #1b3b5f;
      margin-bottom: 25px;
    }
    .form-group {
      margin-bottom: 15px;
    }
    label {
      display: block;
      margin-bottom: 6px;
      font-weight: 600;
      color: #333;
    }
    input, select {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-size: 14px;
    }
    .form-actions {
      margin-top: 20px;
      text-align: right;
    }
    button {
      padding: 10px 20px;
      background: #2980b9;
      color: #fff;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: 0.3s;
    }
    button:hover {
      background: #1c5980;
    }
    button:disabled {
      background: #aaa;
      cursor: not-allowed;
    }
  `]
})
export class RequestComponent {
    constructor(private router: Router) {}
    
  formData = {
    name: '',
    surname: '',
    email: '',
    contact: '',
    address: '',
    residence: '',
    postal: '',
    alcohol: '',
    smoker: '',
    employed: '',
    criminal: ''
  };

  nextStep() {
    console.log('Personal data:', this.formData);
    // kasnije možeš navigirati na drugi form (npr. /request/step2)
    // this.router.navigate(['/request/step2']);

    this.router.navigate(['/request/relocation']);

  }
}
