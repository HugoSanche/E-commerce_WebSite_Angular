import { TestBed } from '@angular/core/testing';

import { MyShopFormService } from './my-shop-form.service';

describe('MyShopFormService', () => {
  let service: MyShopFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyShopFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
