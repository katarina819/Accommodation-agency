import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FbxViewerComponent } from './fbx-viewer';

describe('FbxViewerComponent', () => {
  let component: FbxViewerComponent;
  let fixture: ComponentFixture<FbxViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FbxViewerComponent] // standalone component
    })
    .compileComponents();

    fixture = TestBed.createComponent(FbxViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
