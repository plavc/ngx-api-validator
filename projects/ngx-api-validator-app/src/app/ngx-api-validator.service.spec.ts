import { TestBed, async } from '@angular/core/testing';

import { NgxApiValidatorService, NgxApiValidatorModule } from '@plavc/ngx-api-validator';
import { HttpClientModule, HttpClient } from '@angular/common/http';

fdescribe('NgxApiValidatorService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientModule, NgxApiValidatorModule ]
  }));

  it('should be created', () => {
    const service: NgxApiValidatorService = TestBed.get(NgxApiValidatorService);
    expect(service).toBeTruthy();
  });

  it('should be created', async(() => {
  
    const http: HttpClient = TestBed.get(HttpClient);
    expect(http).toBeTruthy();

    const service: NgxApiValidatorService = TestBed.get(NgxApiValidatorService);

    service.validateObservable('test/data/_iuser.json', http.get('test/data/user.json')).subscribe(res => {
      console.log(res);
    });

  }));

});
