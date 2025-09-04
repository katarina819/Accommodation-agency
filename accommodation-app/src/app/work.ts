import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'work',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="work-page">
      <div class="work-content">
        <h1>Welcome to BookStore!</h1>
        <p class="intro">
          In a few steps, we will explain how to make an agreement and cooperate with our agency.
        </p>
        
        <ol class="steps">
          <li>
            <span class="step-title">Finding Accommodation:</span>
            If you need accommodation in another place, whether temporary or permanent, and you do not want
            to have additional obligations regarding the search for accommodation, then you are in the right place
            because BookStore is here for you.
          </li>
          <li>
            <span class="step-title">Cooperation Steps:</span>
            Follow these steps to work with us:
            <ol type="a" class="sub-steps">
              <li>Fill out a short form with your personal information</li>
              <li>Fill out a short form related to the location of your relocation</li>
              <li>Select the required time frame for the requested accommodation</li>
              <li>Confirmation by the BookStore agency of receipt of the request</li>
              <li>Sending the found accommodation offers</li>
              <li>The client chooses which accommodation suits him best</li>
              <li>Signing the contract between the client and the agency</li>
              <li>Making payment to the BookStore agency</li>
            </ol>
          </li>
        </ol>

        <!-- New ending section -->
        <div class="request-section">
          <p>Do you like it? If you do, then click and submit the request! We can't wait to hear how we can help you.</p>
          <button class="request-button" [routerLink]="['/request']">Request</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .work-page {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      min-height: 100vh;
      padding: 50px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(to bottom, #f0f4f8, #d9e2ec);
    }

    .work-content {
      max-width: 800px;
      background: #fff;
      padding: 40px;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
    }

    .work-content:hover { transform: translateY(-5px); }

    h1 { font-size: 42px; font-weight: bold; margin-bottom: 25px; color: #1b3b5f; text-align: center; text-shadow: 1px 1px 2px rgba(0,0,0,0.1); }

    .intro { font-size: 20px; margin-bottom: 30px; color: #34495e; line-height: 1.7; text-align: justify; }

    ol.steps { font-size: 18px; line-height: 1.8; counter-reset: step-counter; margin-left: 0; padding-left: 0; }

    ol.steps > li {
      list-style: none; margin-bottom: 30px; padding-left: 50px; position: relative;
      background: #f9fafb; border-left: 5px solid #2980b9; border-radius: 8px; padding: 20px; transition: background 0.3s ease;
    }
    ol.steps > li:hover { background: #eef6fc; }

    ol.steps > li::before {
      counter-increment: step-counter;
      content: counter(step-counter);
      position: absolute; left: -25px; top: 20px;
      background: #2980b9; color: #fff; font-weight: bold;
      width: 35px; height: 35px; line-height: 35px; text-align: center;
      border-radius: 50%; box-shadow: 0 3px 8px rgba(0,0,0,0.2);
    }

    .step-title { display: block; font-weight: bold; font-size: 20px; color: #1b3b5f; margin-bottom: 10px; }

    ol.sub-steps { list-style: lower-alpha; margin-left: 25px; margin-top: 10px; }
    ol.sub-steps li { margin-bottom: 8px; }

    /* Request section */
    .request-section { margin-top: 40px; text-align: center; }
    .request-section p { font-size: 18px; margin-bottom: 20px; color: #1b3b5f; font-weight: 500; }
    .request-button {
      background-color: #2980b9;
      color: #fff;
      border: none;
      padding: 12px 25px;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
      transition: background 0.3s, transform 0.3s;
    }
    .request-button:hover { background-color: #1c5980; transform: translateY(-2px); }

    @media (max-width: 768px) {
      .work-content { padding: 25px; }
      h1 { font-size: 32px; }
      .intro, ol.steps, .request-section p { font-size: 16px; }
    }
  `]
})
export class WorkComponent {}
