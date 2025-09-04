import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'relocation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="request-page">
      <h1>Relocation Form</h1>
      <form #relocationForm="ngForm" (ngSubmit)="submitRelocation()">

        <div class="form-group">
          <label>In which city are you looking for accommodation?</label>
          <input type="text" name="city" [(ngModel)]="relocationData.city" required />
        </div>

        <div class="form-group">
          <label>Postcode:</label>
          <input type="text" name="postcode" [(ngModel)]="relocationData.postcode" required />
        </div>

        <div class="form-group">
          <label>Are you looking for temporary or permanent accommodation?</label>
          <select name="stayType" [(ngModel)]="relocationData.stayType" required>
            <option value="">-- Select --</option>
            <option>Temporary</option>
            <option>Permanent</option>
          </select>
        </div>

        <div class="form-group">
          <label>Do you prefer an apartment or a house?</label>
          <select name="accommodationType" [(ngModel)]="relocationData.accommodationType" required>
            <option value="">-- Select --</option>
            <option>Apartment</option>
            <option>House</option>
          </select>
        </div>

        <div class="form-group">
          <label>Are you looking for accommodation for yourself or for someone else?</label>
          <select name="forWhom" [(ngModel)]="relocationData.forWhom" required>
            <option value="">-- Select --</option>
            <option>For myself</option>
            <option>For someone else</option>
          </select>
        </div>

        <div class="form-group">
          <label>Is anyone else moving with you?</label>
          <input type="text" name="others" [(ngModel)]="relocationData.others" placeholder="e.g. wife, children, parents" />
        </div>

        <div class="form-group">
          <label>Are you looking for a pet to move with you?</label>
          <select name="pet" [(ngModel)]="relocationData.pet">
            <option value="">-- Select --</option>
            <option>No</option>
            <option>Yes</option>
          </select>
        </div>

        <div class="form-group" *ngIf="relocationData.pet === 'Yes'">
          <label>If yes, specify the type of pet:</label>
          <input type="text" name="petType" [(ngModel)]="relocationData.petType" />
        </div>

        <div class="form-group">
          <label>Maximum distance (in km) from requested location:</label>
          <input type="number" name="distance" [(ngModel)]="relocationData.distance" />
        </div>

        <div class="form-group">
          <label>Price range (in euros):</label>
          <input type="text" name="priceRange" [(ngModel)]="relocationData.priceRange" placeholder="e.g. 300 - 600" />
        </div>

        <div class="form-group">
          <label>Do you also require individual requirements?</label>
          <div class="checkbox-group">
            <label><input type="checkbox" [(ngModel)]="relocationData.requirements.parking" name="parking" /> Parking</label>
            <label><input type="checkbox" [(ngModel)]="relocationData.requirements.garage" name="garage" /> Garage</label>
            <label><input type="checkbox" [(ngModel)]="relocationData.requirements.balcony" name="balcony" /> Balcony</label>
            <label><input type="checkbox" [(ngModel)]="relocationData.requirements.terrace" name="terrace" /> Terrace</label>
            <label><input type="checkbox" [(ngModel)]="relocationData.requirements.shops" name="shops" /> Proximity to shops</label>
            <label><input type="checkbox" [(ngModel)]="relocationData.requirements.center" name="center" /> City center</label>
            <label><input type="checkbox" [(ngModel)]="relocationData.requirements.hospital" name="hospital" /> Hospital</label>
          </div>
        </div>

        <div class="form-group">
          <label>Additional message (optional):</label>
          <textarea name="message" [(ngModel)]="relocationData.message"></textarea>
        </div>

        <div class="form-actions">
          <button type="submit" [disabled]="!relocationForm.valid">Next</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .request-page {
      max-width: 700px;
      margin: 40px auto;
      padding: 30px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      font-family: 'Segoe UI', sans-serif;
    }
    h1 { text-align: center; color: #1b3b5f; margin-bottom: 25px; }
    .form-group { margin-bottom: 15px; }
    label { display: block; margin-bottom: 6px; font-weight: 600; color: #333; }
    input, select, textarea {
      width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; font-size: 14px;
    }
    textarea { resize: vertical; min-height: 80px; }
    .checkbox-group { display: flex; flex-wrap: wrap; gap: 10px; }
    .checkbox-group label { font-weight: normal; }
    .form-actions { margin-top: 20px; text-align: right; }
    button {
      padding: 10px 20px;
      background: #2980b9;
      color: #fff;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: 0.3s;
    }
    button:hover { background: #1c5980; }
    button:disabled { background: #aaa; cursor: not-allowed; }
  `]
})
export class RelocationComponent {
    constructor(private router: Router) {} 
    
  relocationData = {
    city: '',
    postcode: '',
    stayType: '',
    accommodationType: '',
    forWhom: '',
    others: '',
    pet: '',
    petType: '',
    distance: '',
    priceRange: '',
    requirements: {
      parking: false,
      garage: false,
      balcony: false,
      terrace: false,
      shops: false,
      center: false,
      hospital: false
    },
    message: ''
  };

  submitRelocation() {
    console.log('Relocation data:', this.relocationData);
    // sljedeći korak, npr. /request/accommodation

    this.router.navigate(['/request/time']);

  }
}
