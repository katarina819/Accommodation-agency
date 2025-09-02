import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FbxViewer } from './fbx-viewer';

describe('FbxViewer', () => {
  let component: FbxViewer;
  let fixture: ComponentFixture<FbxViewer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FbxViewer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FbxViewer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
