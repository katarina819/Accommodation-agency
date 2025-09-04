import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'time',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="request-page">
      <h1>Time Frame Form</h1>
      <form #timeForm="ngForm" (ngSubmit)="submitTime()">

        <!-- Pitanje 1 -->
        <div class="form-group">
          <label>When do you plan to be accommodated in the requested accommodation?</label>
          <input type="date" name="accommodationDate" [(ngModel)]="timeData.accommodationDate" required />
        </div>

        <!-- Pitanje 2 -->
        <div class="form-group">
          <label>Do you know how long you would stay?</label>
          <select name="knowDuration" [(ngModel)]="timeData.knowDuration" required>
            <option value="">-- Select --</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        <!-- Ako je odgovor Yes -> prikaži dodatno polje -->
        <div class="form-group" *ngIf="timeData.knowDuration === 'Yes'">
          <label>Specify the duration of stay:</label>
          <input type="text" name="duration" [(ngModel)]="timeData.duration" placeholder="e.g. 6 months, 1 year" />
        </div>

        <!-- Dugme Next -->
        <div class="form-actions">
          <button type="submit" [disabled]="!timeForm.valid">Next</button>
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
export class TimeComponent {
  timeData = {
    accommodationDate: '',
    knowDuration: '',
    duration: ''
  };

  constructor(private router: Router) {}

  submitTime() {
    console.log('Time frame data:', this.timeData);
    // nakon ovog koraka možeš navigirati dalje, npr.:
    // this.router.navigate(['/request/final-step']);
  }
}
