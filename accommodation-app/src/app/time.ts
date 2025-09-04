import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'time',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="request-page">
      <h1 *ngIf="!submitted">Time Frame Form</h1>

      <!-- Forma -->
      <form *ngIf="!submitted" #timeForm="ngForm" (ngSubmit)="submitTime()">
        <div class="form-group">
          <label>When do you plan to be accommodated in the requested accommodation?</label>
          <input type="date" name="accommodationDate" [(ngModel)]="timeData.accommodationDate" required />
        </div>

        <div class="form-group">
          <label>Do you know how long you would stay?</label>
          <select name="knowDuration" [(ngModel)]="timeData.knowDuration" required>
            <option value="">-- Select --</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        <div class="form-group" *ngIf="timeData.knowDuration === 'Yes'">
          <label>Specify the duration of stay:</label>
          <input type="text" name="duration" [(ngModel)]="timeData.duration" placeholder="e.g. 6 months, 1 year" />
        </div>

        <div class="form-actions">
          <button type="submit" [disabled]="!timeForm.valid || loading">Submit</button>
        </div>
      </form>

      <!-- Loader -->
      <div class="loader" *ngIf="loading"></div>

      <!-- Poruka nakon slanja -->
      <div class="thank-you" *ngIf="submitted && !loading">
        <h2>✅ Thank you for your trust.</h2>
        <p>BookStore has received your request.</p>
      </div>
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
      text-align: center;
    }
    h1 { color: #1b3b5f; margin-bottom: 25px; }
    .form-group { margin-bottom: 15px; text-align: left; }
    label { display: block; margin-bottom: 6px; font-weight: 600; color: #333; }
    input, select {
      width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; font-size: 14px;
    }
    .form-actions { margin-top: 20px; text-align: right; }
    button {
      padding: 10px 20px; background: #2980b9; color: #fff; border: none;
      border-radius: 6px; cursor: pointer; transition: 0.3s;
    }
    button:hover { background: #1c5980; }
    button:disabled { background: #aaa; cursor: not-allowed; }

    /* Loader stil */
    .loader {
      margin: 40px auto;
      border: 6px solid #f3f3f3;
      border-top: 6px solid #2980b9;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .thank-you h2 { color: green; margin-bottom: 10px; }
    .thank-you p { font-size: 16px; color: #333; }
  `]
})
export class TimeComponent {
  timeData = {
    accommodationDate: '',
    knowDuration: '',
    duration: ''
  };

  loading = false;
  submitted = false;

  submitTime() {
    console.log('Time frame data:', this.timeData);

    this.loading = true;

    // simulacija server poziva (2 sekunde)
    setTimeout(() => {
      this.loading = false;
      this.submitted = true;
    }, 2000);
  }
}
